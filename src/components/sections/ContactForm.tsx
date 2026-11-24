"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData, projectTypeLabels } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select, Field } from "@/components/ui/FormFields";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Erro ao enviar mensagem.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Erro ao enviar mensagem."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="text-[var(--color-success)] text-2xl" aria-hidden="true">✓</div>
        <h3 className="font-display text-xl font-semibold">Mensagem enviada!</h3>
        <p className="text-[var(--color-muted)]">
          Recebemos sua solicitação e entraremos em contato em breve.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-[var(--color-accent)] hover:underline underline-offset-2"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3"
      noValidate
      aria-label="Formulário de contato"
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        {...register("honeypot")}
      />

      <Field label="Seu nome *" error={errors.name?.message}>
        <Input
          placeholder="Como podemos chamar você?"
          autoComplete="name"
          {...register("name")}
        />
      </Field>

      <Field label="Empresa" error={errors.company?.message}>
        <Input
          placeholder="Nome da empresa (opcional)"
          autoComplete="organization"
          {...register("company")}
        />
      </Field>

      <Field label="E-mail *" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="voce@empresa.com.br"
          autoComplete="email"
          {...register("email")}
        />
      </Field>

      <Field label="Telefone" error={errors.phone?.message}>
        <Input
          type="tel"
          placeholder="(61) 9 0000-0000"
          autoComplete="tel"
          {...register("phone")}
        />
      </Field>

      <Field label="Tipo de projeto *" error={errors.projectType?.message}>
        <Select defaultValue="" {...register("projectType")}>
          <option value="" disabled>
            Selecione uma solução
          </option>
          {Object.entries(projectTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Sobre seu projeto *" error={errors.message?.message}>
        <Textarea
          placeholder="Conte um pouco sobre seu desafio..."
          {...register("message")}
        />
      </Field>

      <Field label="" error={errors.consent?.message}>
        <label className="flex items-start gap-2 text-xs text-[var(--color-muted)] cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 accent-[var(--color-primary)]"
            {...register("consent")}
          />
          <span>
            Concordo que os dados informados sejam utilizados exclusivamente
            para retorno de contato comercial.
          </span>
        </label>
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-[var(--color-danger)]">
          {errorMessage}
        </p>
      )}

      <Button type="submit" loading={status === "loading"} className="mt-1 w-full md:w-auto">
        Enviar solicitação ↗
      </Button>
    </form>
  );
}
