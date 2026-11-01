import { Ribbons } from "@/components/three/Ribbons";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Vercel",
  "AWS",
  "Stripe",
  "Claude API",
  "OpenAI API",
] as const;

const principles = ["Typed", "Tested", "Fast", "Documented", "Accessible"] as const;

/** Tools we build on, as crossing 3D tapes. The list stays readable for screen readers. */
export function StackMarquee() {
  return (
    <section aria-labelledby="stack-heading">
      <h2 id="stack-heading" className="sr-only">
        The stack we build on
      </h2>
      <ul className="sr-only">
        {stack.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div aria-hidden>
        <Ribbons front={stack.map((label) => ({ label }))} back={principles} />
      </div>
    </section>
  );
}
