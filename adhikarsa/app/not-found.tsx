import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <main
      id="main"
      className="shell flex min-h-[100svh] flex-col items-center justify-center py-32 text-center"
    >
      <Reveal preset="fadeUp">
        <Eyebrow tone="neutral">Error 404</Eyebrow>
      </Reveal>
      <Reveal preset="blurUp" delay={0.08}>
        <h1 className="mt-8 text-headline font-medium gradient-paper">
          No route to that resource.
        </h1>
      </Reveal>
      <Reveal preset="blurUp" delay={0.16}>
        <p className="mt-6 max-w-md text-[var(--color-dim)]">
          The page you requested is not part of this system.
        </p>
      </Reveal>
      <Reveal preset="fadeUp" delay={0.24}>
        <div className="mt-10">
          <Button href="/" icon>
            Return to homepage
          </Button>
        </div>
      </Reveal>
      <Link href="/" className="sr-only">
        Homepage
      </Link>
    </main>
  );
}
