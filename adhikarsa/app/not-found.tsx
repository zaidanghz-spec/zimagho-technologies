import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { en } from "@/data/dictionaries/en";
import { DEFAULT_LOCALE } from "@/lib/i18n";

/**
 * Root 404. It sits outside `[locale]`, so it cannot know the reader's
 * language and answers in the default one — an unmatched URL has no locale to
 * read from.
 */
export default function NotFound() {
  const home = `/${DEFAULT_LOCALE}`;

  return (
    <main
      id="main"
      className="shell flex min-h-[100svh] flex-col items-center justify-center py-32 text-center"
    >
      <Reveal preset="rise">
        <Eyebrow tone="neutral">{en.notFound.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal preset="riseSoft" delay={0.08}>
        <h1 className="mt-8 text-headline font-medium text-ink">{en.notFound.heading}</h1>
      </Reveal>
      <Reveal preset="riseSoft" delay={0.16}>
        <p className="mt-6 max-w-md text-slate">{en.notFound.body}</p>
      </Reveal>
      <Reveal preset="rise" delay={0.24}>
        <div className="mt-10">
          <Button href={home} arrow>
            {en.actions.backHome}
          </Button>
        </div>
      </Reveal>
      <Link href={home} className="sr-only">
        {en.nav.home}
      </Link>
    </main>
  );
}
