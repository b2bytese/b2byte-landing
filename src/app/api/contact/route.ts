import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, projectTypeLabels } from "@/lib/validations";
import { getResendClient, isResendConfigured } from "@/lib/resend";
import { createRateLimiter, extractClientIp } from "@/lib/rate-limit";

const MAX_PAYLOAD_BYTES = 8_000;

const contactRateLimiter = createRateLimiter({
  windowMs: 60_000,
  limit: 5,
  maxEntries: 1_000,
});

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const parsedLength = Number.parseInt(contentLength, 10);
    if (!Number.isNaN(parsedLength) && parsedLength > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { message: "Payload muito grande." },
        { status: 413 }
      );
    }
  }

  const ip = extractClientIp(request.headers);

  if (!contactRateLimiter.check(ip)) {
    return NextResponse.json(
      { message: "Muitas solicitações. Aguarde alguns minutos." },
      { status: 429 }
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { message: "Payload muito grande." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Dados inválidos.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 }
    );
  }

  const { name, company, email, phone, projectType, message, honeypot } =
    parsed.data;

  if (honeypot) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const resendClient = getResendClient();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

  if (!resendClient || !isResendConfigured() || !fromEmail || !toEmail) {
    console.error("[contact/route] Missing email configuration");
    return NextResponse.json(
      {
        message:
          "Serviço temporariamente indisponível. Tente novamente mais tarde.",
      },
      { status: 503 }
    );
  }

  const projectLabel = projectTypeLabels[projectType];
  const safeName = name.replace(/[\r\n]+/g, " ").trim();

  const emailBody = `
Nova solicitação de contato — B2byte

Nome: ${safeName}
Empresa: ${company || "Não informado"}
E-mail: ${email}
Telefone: ${phone || "Não informado"}
Tipo de projeto: ${projectLabel}

Mensagem:
${message}
  `.trim();

  try {
    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[B2byte] Novo contato: ${safeName} — ${projectLabel}`,
      text: emailBody,
    });

    if (error) {
      console.error("[contact/route] Resend API error:", error);
      return NextResponse.json(
        { message: "Erro ao enviar mensagem. Tente novamente mais tarde." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Unexpected Resend error:", err);
    return NextResponse.json(
      { message: "Erro ao enviar mensagem. Tente novamente mais tarde." },
      { status: 502 }
    );
  }
}
