import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "default" | "sm";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", loading, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-3 rounded-[9px] font-semibold transition-all duration-200 cursor-pointer touch-manipulation",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          size === "default" && "px-5 py-[13px] text-sm",
          size === "sm" && "px-4 py-2.5 text-xs",
          variant === "primary" && [
            "bg-[var(--color-primary)] border border-transparent text-white",
            "hover:bg-[#6358f0] hover:-translate-y-0.5",
          ],
          variant === "ghost" && [
            "bg-white/5 border border-white/[0.14] text-white",
            "hover:bg-white/[0.09]",
          ],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            Enviando...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
