import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, isSameOriginRequest } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const statuses = new Set(["NEW", "IN_PROGRESS", "CLOSED"]);

export async function GET(request: NextRequest) {
  if (!(await getAdminSession())) return NextResponse.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  if (!db) return NextResponse.json({ message: "Database belum dikonfigurasi." }, { status: 503 });
  const url = request.nextUrl;
  const status = url.searchParams.get("status") ?? "ALL";
  const search = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? 50) || 50));
  if (status !== "ALL" && !statuses.has(status)) return NextResponse.json({ message: "Filter status tidak valid." }, { status: 400 });
  try {
    const result = await db.query(
      `SELECT id::text, name, email, company, service, message, status, created_at
       FROM contact_submissions
       WHERE ($1 = 'ALL' OR status = $1)
         AND ($2 = '' OR name ILIKE '%' || $2 || '%' OR email ILIKE '%' || $2 || '%' OR COALESCE(company, '') ILIKE '%' || $2 || '%')
       ORDER BY created_at DESC
       LIMIT $3`, [status, search, limit]);
    return NextResponse.json({ submissions: result.rows });
  } catch (error) {
    console.error("Failed to list contact submissions:", error);
    return NextResponse.json({ message: "Pesan belum dapat dimuat." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ message: "Permintaan tidak diizinkan." }, { status: 403 });
  if (!(await getAdminSession())) return NextResponse.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  if (!db) return NextResponse.json({ message: "Database belum dikonfigurasi." }, { status: 503 });
  let body: { id?: unknown; status?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Permintaan tidak valid." }, { status: 400 }); }
  const id = typeof body.id === "string" ? body.id : typeof body.id === "number" ? String(body.id) : "";
  const status = typeof body.status === "string" ? body.status : "";
  if (!/^\d{1,19}$/.test(id) || !statuses.has(status)) return NextResponse.json({ message: "ID atau status tidak valid." }, { status: 400 });
  try {
    const result = await db.query(
      `UPDATE contact_submissions SET status = $2 WHERE id = $1::bigint
       RETURNING id::text, name, email, company, service, message, status, created_at`, [id, status]);
    if (!result.rows[0]) return NextResponse.json({ message: "Pesan tidak ditemukan." }, { status: 404 });
    return NextResponse.json({ submission: result.rows[0] });
  } catch (error) {
    console.error("Failed to update contact submission:", error);
    return NextResponse.json({ message: "Status pesan belum dapat diperbarui." }, { status: 500 });
  }
}
