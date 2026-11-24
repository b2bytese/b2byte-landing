import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, forwardRef } from "react";

const inputBase =
  "w-full bg-[var(--color-background)] text-white border border-[var(--color-border)] rounded-lg px-3 py-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[var(--color-accent)] placeholder:text-[var(--color-muted)] text-sm";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputBase, className)} {...props} />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(inputBase, "min-h-[100px] resize-y", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(inputBase, "cursor-pointer appearance-none", className)}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, error, children, className }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-xs text-[var(--color-muted)]", className)}>
      {label}
      {children}
      {error && (
        <span role="alert" className="text-[var(--color-danger)] text-xs">
          {error}
        </span>
      )}
    </label>
  );
}
