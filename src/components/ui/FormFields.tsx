import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type {
  InputHTMLAttributes,
  ReactNode,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const inputBase =
  "w-full bg-[var(--color-background)] text-white border border-[var(--color-border)] rounded-lg px-3 py-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:border-[var(--color-accent)] placeholder:text-[var(--color-muted)] text-sm";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function Input({ className, ref, ...props }: InputProps) {
  return <input ref={ref} className={cn(inputBase, className)} {...props} />;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(inputBase, "min-h-[100px] resize-y", className)}
      {...props}
    />
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: Ref<HTMLSelectElement>;
}

export function Select({ className, children, ref, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          inputBase,
          "cursor-pointer appearance-none pr-10",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)]"
      />
    </div>
  );
}

export interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs text-[var(--color-muted)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-[var(--color-danger)] text-xs"
        >
          {error}
        </span>
      )}
    </div>
  );
}
