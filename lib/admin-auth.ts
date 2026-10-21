import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "karyakode_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;

type SessionPayload = { email: string; exp: number };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) return null;
  return value;
}

function sign(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("base64url");
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword || !secret()) return false;
  const emailMatches = email.trim().toLowerCase() === configuredEmail;
  const a = Buffer.from(password);
  const b = Buffer.from(configuredPassword);
  const passwordMatches = a.length === b.length && timingSafeEqual(a, b);
  return emailMatches && passwordMatches;
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_PASSWORD && secret());
}

export function createAdminSession(email: string) {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  const payload: SessionPayload = { email: email.trim().toLowerCase(), exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded, key)}`;
}

export function verifyAdminSession(token: string | undefined): SessionPayload | null {
  const key = secret();
  if (!key || !token) return null;
  const [encoded, suppliedSignature, extra] = token.split(".");
  if (!encoded || !suppliedSignature || extra) return null;
  const expected = Buffer.from(sign(encoded, key));
  const supplied = Buffer.from(suppliedSignature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.email !== "string" || typeof payload.exp !== "number" || payload.exp <= Date.now() / 1000) return null;
    if (payload.email !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
