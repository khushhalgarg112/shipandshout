"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleCheck } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";

const INTERESTS = [
  "Creator marketing",
  "Web development",
  "Mobile app",
  "SaaS build",
  "SEO",
  "Systems & infrastructure",
  "AI integration",
  "Hourly development",
  "Maintenance & support",
  "Something else",
] as const;

const BUDGETS = ["Under $1K", "$1K–5K", "$5K–15K", "$15K+", "Not sure yet"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = {
  name: string;
  email: string;
  company: string;
  interest: string;
  budget: string;
  message: string;
  website: string; // honeypot — humans never see or fill this
};

type ErrorField = "name" | "email" | "message";
type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: Values = {
  name: "",
  email: "",
  company: "",
  interest: "",
  budget: "",
  message: "",
  website: "",
};

const labelCls = "mb-2 block text-sm font-medium text-ink";
const inputCls =
  "w-full rounded-2xl border border-line-strong bg-card px-4 py-3.5 text-base text-ink " +
  "placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] focus:border-ink focus:ring-4 focus:ring-flame/25";

function validate(values: Values): Partial<Record<ErrorField, string>> {
  const errors: Partial<Record<ErrorField, string>> = {};
  if (!values.name.trim()) errors.name = "Tell us your name.";
  if (!values.email.trim()) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.message.trim()) errors.message = "A sentence or two about the project helps.";
  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<ErrorField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update =
    (field: keyof Values) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === "name" || field === "email" || field === "message") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      });
      return;
    }
    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus("success");
      // GA4 lead conversion — no-op when NEXT_PUBLIC_GA_ID is unset. Never send PII here.
      sendGAEvent("event", "generate_lead", {
        interest: values.interest || "(none)",
        budget: values.budget || "(none)",
      });
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="surface p-6 sm:p-8">
        <CircleCheck size={22} aria-hidden className="text-flame-deep" />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Got it — your brief is in.
        </h3>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Thanks for writing. A real person reads every message, and you&apos;ll hear back at the
          email you gave us within 24 hours.
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          Reply within 24 hours
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"}>
      <fieldset className="contact-fields" disabled={status === "submitting"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className={inputCls}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-xs font-medium text-flame-deep">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputCls}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-xs font-medium text-flame-deep">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-company" className={labelCls}>
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Optional"
          className={inputCls}
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-interest" className={labelCls}>
            Interested in
          </label>
          <div className="relative">
            <select
              id="contact-interest"
              name="interest"
              className={`${inputCls} appearance-none pr-10`}
              value={values.interest}
              onChange={update("interest")}
            >
              <option value="">Pick one</option>
              {INTERESTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-budget" className={labelCls}>
            Budget
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              className={`${inputCls} appearance-none pr-10`}
              value={values.budget}
              onChange={update("budget")}
            >
              <option value="">Pick a range</option>
              {BUDGETS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelCls}>
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, and where does it need help?"
          className={`${inputCls} resize-y`}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-2 text-xs font-medium text-flame-deep">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm leading-relaxed text-flame-deep">
          We couldn&apos;t confirm delivery. Your entries are still here. Try again, or email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>{" "}
          directly.
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send the brief"}
        </Button>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          Reply within 24h
        </p>
      </div>
      </fieldset>
    </form>
  );
}
