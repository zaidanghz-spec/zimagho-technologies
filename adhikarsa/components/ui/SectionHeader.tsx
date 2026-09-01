import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  /** Authored line breaks — the reveal masks each line independently. */
  headline: readonly string[];
  copy?: string;
  index?: string;
  align?: "left" | "center";
  className?: string;
  headlineClassName?: string;
  as?: "h2" | "h3";
};

export function SectionHeader({
  eyebrow,
  headline,
  copy,
  index,
  align = "left",
  className,
  headlineClassName,
  as = "h2",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        className,
      )}
    >
      {(eyebrow || index) && (
        <Reveal preset="fadeUp" className={cn("flex items-center gap-4", centered && "justify-center")}>
          {index && (
            <span className="mono-label text-[var(--color-signal)]/70">{index}</span>
          )}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </Reveal>
      )}

      <RevealText
        as={as}
        lines={headline}
        className={cn(
          "text-headline font-medium text-gradient",
          headlineClassName,
        )}
      />

      {copy && (
        <Reveal preset="blurUp" delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[1.0625rem] leading-[1.62] text-[var(--color-dim)] sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
