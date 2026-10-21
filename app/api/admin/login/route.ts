import { NextRequest, NextResponse } from "next/server";
import { adminCookieOptions, createAdminSession, isAdminAuthConfigured, verifyAdminCredentials, ADMIN_COOKIE, isSameOriginRequest } from "@/lib/admin-auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Permintaan tidak diizinkan." }, { status: 403 });
  const rate = checkRateLimit(`admin-login:${getClientIp(request)}`, 5, 15 * 60_000);
  if (!rate.allowed) return NextResponse.json({ message: "Terlalu banyak percobaan. Coba lagi nanti." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
  if (!isAdminAuthConfigured()) return NextResponse.json({ message: "Autentikasi admin belum dikonfigurasi di server." }, { status: 503 });
  let body: { email?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Permintaan tidak valid." }, { status: 400 }); }
  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (email.length > 254 || password.length > 1024 || !verifyAdminCredentials(email, password)) {
    return NextResponse.json({ message: "Email atau password tidak sesuai." }, { status: 401 });
  }
  const response = NextResponse.json({ message: "Login berhasil." });
  response.cookies.set(ADMIN_COOKIE, createAdminSession(email), adminCookieOptions());
  return response;
}
