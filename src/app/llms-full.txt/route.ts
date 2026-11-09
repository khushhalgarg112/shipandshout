import { llmsOverview } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsOverview(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
