import { NextResponse } from "next/server";
import { contactSchema, projectTypeLabels } from "@/lib/validations";
import { resend, isResendConfigured } from "@/lib/resend";

const MAX_PAYLOAD_BYTES = 8_000;

const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 5;

  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ message: "Payload muito grande." }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Muitas solicitações. Aguarde alguns minutos." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Dados inválidos.", errors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, company, email, phone, projectType, message, honeypot } = parsed.data;

  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!isResendConfigured()) {
    return NextResponse.json(
      {
        message:
          "O serviço de e-mail ainda não está configurado. Configure as variáveis de ambiente RESEND_API_KEY, CONTACT_FROM_EMAIL e CONTACT_TO_EMAIL.",
      },
      { status: 503 }
    );
  }

  const projectLabel = projectTypeLabels[projectType];

  const emailBody = `
Nova solicitação de contato — B2byte

Nome: ${name}
Empresa: ${company ?? "Não informado"}
E-mail: ${email}
Telefone: ${phone ?? "Não informado"}
Tipo de projeto: ${projectLabel}

Mensagem:
${message}
  `.trim();

  try {
    await resend!.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: [process.env.CONTACT_TO_EMAIL!],
      replyTo: email,
      subject: `[B2byte] Novo contato: ${name} — ${projectLabel}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Resend error:", err);
    return NextResponse.json(
      { message: "Erro ao enviar mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
