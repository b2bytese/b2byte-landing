import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
}

export function Badge({ children, className, withDot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-[#8b7cf64d] rounded-[30px] px-[13px] py-1.5 bg-[#8b7cf610]",
        "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-lavender)]",
        className
      )}
    >
      {withDot && (
        <span
          className="size-[7px] rounded-full bg-[var(--color-accent)]"
          style={{ boxShadow: "0 0 12px var(--color-accent)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-lavender)]",
        className
      )}
    >
      {children}
    </span>
  );
}
