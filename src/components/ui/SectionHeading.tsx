import { cn } from "@/lib/utils";
import { Eyebrow } from "./Badge";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  center,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-[690px] mb-10",
        center && "text-center mx-auto mb-11",
        className
      )}
    >
      {eyebrow && <Eyebrow className="block mb-3">{eyebrow}</Eyebrow>}
      <h2 id={id} className="font-display text-[clamp(34px,4.5vw,57px)] font-semibold tracking-[-0.055em] leading-[1.06] mt-[15px] mb-5">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--color-muted)]">{description}</p>
      )}
    </div>
  );
}
