import { Reveal } from "@/components/motion/Reveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  /** Authored line breaks — the reveal masks each line independently. */
  headline: readonly string[];
  copy?: string;
  align?: "left" | "center";
  className?: string;
  headlineClassName?: string;
  copyClassName?: string;
  tone?: "light" | "dark";
  as?: "h2" | "h3";
};

export function SectionHeader({
  eyebrow,
  headline,
  copy,
  align = "left",
  className,
  headlineClassName,
  copyClassName,
  tone = "light",
  as = "h2",
}: Props) {
  const centered = align === "center";

  return (
    <div className={cn("measure flex flex-col gap-6", centered && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal preset="rise">
          <Eyebrow tone={tone === "dark" ? "onDark" : "brand"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <AnimatedText
        as={as}
        lines={headline}
        className={cn(
          "text-headline font-medium",
          tone === "dark" ? "text-white" : "text-ink",
          headlineClassName,
        )}
      />

      {copy && (
        <Reveal preset="riseSoft" delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-lead",
              tone === "dark" ? "text-white/70" : "text-slate",
              centered && "mx-auto",
              copyClassName,
            )}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
