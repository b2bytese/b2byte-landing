"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.1] py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "w-full flex items-center justify-between gap-5 text-left font-semibold text-[var(--color-brand-text)]",
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        )}
      >
        <span>{question}</span>
        <span
          className="text-[var(--color-accent)] text-xl leading-none select-none flex-shrink-0"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="mt-3.5 mb-0 text-[var(--color-muted)] leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("max-w-[800px] mx-auto", className)}>
      {items.map((item) => (
        <AccordionItem key={item.question} {...item} />
      ))}
    </div>
  );
}
