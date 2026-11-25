import { Resend } from "resend";

let cachedClient: Resend | null = null;
let cachedApiKey: string | undefined;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  if (!cachedClient || cachedApiKey !== apiKey) {
    cachedClient = new Resend(apiKey);
    cachedApiKey = apiKey;
  }

  return cachedClient;
}

export function isResendConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_FROM_EMAIL?.trim() &&
      process.env.CONTACT_TO_EMAIL?.trim()
  );
}
