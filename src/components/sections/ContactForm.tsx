"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormData,
  projectTypeLabels,
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select, Field } from "@/components/ui/FormFields";

type FormStatus = "idle" | "loading" | "success" | "error";

const DEFAULT_ERROR_MESSAGE =
  "Erro ao enviar mensagem. Tente novamente mais tarde.";

export function ContactForm() {
  const idPrefix = useId();
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

  const fieldIds = {
    name: `${idPrefix}-name`,
    nameError: `${idPrefix}-name-error`,
    company: `${idPrefix}-company`,
    companyError: `${idPrefix}-company-error`,
    email: `${idPrefix}-email`,
    emailError: `${idPrefix}-email-error`,
    phone: `${idPrefix}-phone`,
    phoneError: `${idPrefix}-phone-error`,
    projectType: `${idPrefix}-project-type`,
    projectTypeError: `${idPrefix}-project-type-error`,
    message: `${idPrefix}-message`,
    messageError: `${idPrefix}-message-error`,
    consent: `${idPrefix}-consent`,
    consentError: `${idPrefix}-consent-error`,
  };

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result: { message?: string } | null = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result?.message || DEFAULT_ERROR_MESSAGE);
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div
          className="text-[var(--color-success)] text-2xl"
          aria-hidden="true"
        >
          ✓
        </div>
        <h3 className="font-display text-xl font-semibold">
          Mensagem enviada!
        </h3>
        <p className="text-[var(--color-muted)]">
          Recebemos sua solicitação e entraremos em contato em breve.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-[var(--color-accent)] hover:underline underline-offset-2 cursor-pointer"
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
        autoComplete="off"
        className="hidden"
        {...register("honeypot")}
      />

      <Field
        label="Seu nome *"
        htmlFor={fieldIds.name}
        error={errors.name?.message}
        errorId={fieldIds.nameError}
      >
        <Input
          id={fieldIds.name}
          placeholder="Como podemos chamar você?"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? fieldIds.nameError : undefined}
          {...register("name")}
        />
      </Field>

      <Field
        label="Empresa"
        htmlFor={fieldIds.company}
        error={errors.company?.message}
        errorId={fieldIds.companyError}
      >
        <Input
          id={fieldIds.company}
          placeholder="Nome da empresa (opcional)"
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? fieldIds.companyError : undefined}
          {...register("company")}
        />
      </Field>

      <Field
        label="E-mail *"
        htmlFor={fieldIds.email}
        error={errors.email?.message}
        errorId={fieldIds.emailError}
      >
        <Input
          id={fieldIds.email}
          type="email"
          placeholder="voce@empresa.com.br"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? fieldIds.emailError : undefined}
          {...register("email")}
        />
      </Field>

      <Field
        label="Telefone"
        htmlFor={fieldIds.phone}
        error={errors.phone?.message}
        errorId={fieldIds.phoneError}
      >
        <Input
          id={fieldIds.phone}
          type="tel"
          placeholder="(61) 9 0000-0000"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? fieldIds.phoneError : undefined}
          {...register("phone")}
        />
      </Field>

      <Field
        label="Tipo de projeto *"
        htmlFor={fieldIds.projectType}
        error={errors.projectType?.message}
        errorId={fieldIds.projectTypeError}
      >
        <Select
          id={fieldIds.projectType}
          defaultValue=""
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={
            errors.projectType ? fieldIds.projectTypeError : undefined
          }
          {...register("projectType")}
        >
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

      <Field
        label="Sobre seu projeto *"
        htmlFor={fieldIds.message}
        error={errors.message?.message}
        errorId={fieldIds.messageError}
      >
        <Textarea
          id={fieldIds.message}
          placeholder="Conte um pouco sobre seu desafio..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? fieldIds.messageError : undefined}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldIds.consent}
          className="flex items-start gap-2 text-xs text-[var(--color-muted)] cursor-pointer"
        >
          <input
            id={fieldIds.consent}
            type="checkbox"
            className="mt-0.5 accent-[var(--color-primary)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? fieldIds.consentError : undefined
            }
            {...register("consent")}
          />
          <span>
            Concordo que os dados informados sejam utilizados conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline underline-offset-2 text-[var(--color-brand-text)] hover:text-white"
            >
              Política de Privacidade
            </Link>{" "}
            para retorno de contato comercial.
          </span>
        </label>
        {errors.consent?.message && (
          <span
            id={fieldIds.consentError}
            role="alert"
            className="text-[var(--color-danger)] text-xs"
          >
            {errors.consent.message}
          </span>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[var(--color-danger)]">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        loading={status === "loading"}
        className="mt-1 w-full md:w-auto"
      >
        Enviar solicitação <span aria-hidden="true">↗</span>
      </Button>
    </form>
  );
}
