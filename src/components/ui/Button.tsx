import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, Ref } from "react";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "default" | "sm";

export interface ButtonVariantsOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonVariants({
  variant = "primary",
  size = "default",
  className,
}: ButtonVariantsOptions = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-200 cursor-pointer touch-manipulation",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    size === "default" && "px-[23px] py-[14px] text-sm",
    size === "sm" && "px-4 py-2.5 text-xs",
    variant === "primary" && [
      "bg-[var(--color-primary)] border border-[var(--color-accent)] text-white",
      "hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]",
    ],
    variant === "ghost" && [
      "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-brand-text)]",
      "hover:bg-white/[0.09]",
    ],
    className
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  loading,
  loadingText = "Enviando...",
  children,
  disabled,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
