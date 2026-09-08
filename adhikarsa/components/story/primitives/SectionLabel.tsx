import { cn } from "@/lib/utils";
import { Reveal } from "@/components/story/primitives/Reveal";

/**
 * A chapter marker.
 *
 * The narrative names its chapters here rather than in a heading, which frees
 * every section to open on a sentence instead of a title — the difference
 * between a story and a table of contents.
 */
export function SectionLabel({
  children,
  tone = "paper",
  className,
}: {
  children: React.ReactNode;
  tone?: "paper" | "void";
  className?: string;
}) {
  return (
    <Reveal preset="fade" className={cn("flex items-center gap-4", className)}>
      <span
        aria-hidden
        className={cn(
          "h-px w-8 shrink-0",
          tone === "paper" ? "bg-cobalt" : "bg-cobalt-deep",
        )}
      />
      <span
        className={cn(
          "marker",
          tone === "paper" ? "text-paper-dim" : "text-void-raise",
        )}
      >
        {children}
      </span>
    </Reveal>
  );
}
