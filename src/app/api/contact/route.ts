import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/config/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hard caps so nobody mails us a novel (or an attack payload). */
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;

/**
 * Sender identity. Resend's shared `onboarding@resend.dev` works out of the box but only
 * delivers to the email on the Resend account. Verify your domain in the Resend
 * dashboard, then set CONTACT_FROM_EMAIL to e.g. "Brand Name <leads@yourdomain.com>".
 */
const DEFAULT_FROM = `${site.name} <onboarding@resend.dev>`;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Keep header-bound strings on one line. */
function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

type Inquiry = {
  name: string;
  email: string;
  company: string;
  interest: string;
  budget: string;
  message: string;
};

function buildEmail(inquiry: Inquiry) {
  const { name, email, company, interest, budget, message } = inquiry;
  const subjectName = oneLine(name);
  const subject = company
    ? `New inquiry from ${subjectName} (${oneLine(company)})`
    : `New inquiry from ${subjectName}`;

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Interested in", interest || "—"],
    ["Budget", budget || "—"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
    "",
    `Sent from the ${site.name} contact form. Reply to this email to answer ${name}.`,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#ebebeb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;">
    <div style="max-width:560px;margin:0 auto;">
      <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#636363;">${escapeHtml(site.name)} · New inquiry</p>
      <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;line-height:1.3;">${escapeHtml(name)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 12px 8px 0;color:#636363;white-space:nowrap;vertical-align:top;border-top:1px solid #d2d2d2;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;vertical-align:top;border-top:1px solid #d2d2d2;">${
            label === "Email"
              ? `<a href="mailto:${escapeHtml(value)}" style="color:#c22414;">${escapeHtml(value)}</a>`
              : escapeHtml(value)
          }</td>
        </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:24px 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#636363;">Message</p>
      <div style="padding:16px;border:1px solid #d2d2d2;border-radius:12px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin:24px 0 0;font-size:12px;color:#636363;">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON." }, { status: 400 });
  }
  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Body must be a JSON object." }, { status: 400 });
  }

  const body: Record<string, unknown> = Object.fromEntries(Object.entries(payload));

  // Honeypot: real visitors never fill "website". Answer 200 so bots learn nothing.
  if (asString(body.website) !== "") {
    return NextResponse.json({ ok: true });
  }

  const inquiry: Inquiry = {
    name: asString(body.name),
    email: asString(body.email),
    company: asString(body.company),
    interest: asString(body.interest),
    budget: asString(body.budget),
    message: asString(body.message),
  };
  const { name, email, message } = inquiry;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: "One of the fields is longer than we can accept." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      // Fail loudly rather than silently dropping a lead. The form shows the mailto fallback.
      console.error("[contact] RESEND_API_KEY is not set — inquiry not delivered.");
      return NextResponse.json(
        { error: "Email delivery is not configured." },
        { status: 500 },
      );
    }
    // Local dev without a key: log the inquiry so the form is still testable end to end.
    console.log(
      JSON.stringify({
        event: "contact.submission.dev-log",
        at: new Date().toISOString(),
        to,
        ...inquiry,
      }),
    );
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const { subject, text, html } = buildEmail(inquiry);

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
    tags: [{ name: "source", value: "contact-form" }],
  });

  if (error) {
    console.error("[contact] Resend rejected the send:", error.name, error.message);
    return NextResponse.json(
      { error: "We couldn't send your message right now." },
      { status: 502 },
    );
  }

  console.log(
    JSON.stringify({
      event: "contact.submission",
      at: new Date().toISOString(),
      resendId: data?.id ?? null,
      interest: inquiry.interest || null,
      budget: inquiry.budget || null,
      messageChars: message.length,
    }),
  );

  return NextResponse.json({ ok: true });
}
