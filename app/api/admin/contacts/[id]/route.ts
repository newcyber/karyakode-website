import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { db } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  if (!db) return NextResponse.json({ message: "Database belum dikonfigurasi." }, { status: 503 });
  const { id } = await context.params;
  if (!/^\d{1,19}$/.test(id)) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
  try {
    const result = await db.query(`SELECT id::text, name, email, company, service, message, status, created_at FROM contact_submissions WHERE id = $1::bigint`, [id]);
    if (!result.rows[0]) return NextResponse.json({ message: "Pesan tidak ditemukan." }, { status: 404 });
    return NextResponse.json({ submission: result.rows[0] });
  } catch (error) {
    console.error("Failed to read contact submission:", error);
    return NextResponse.json({ message: "Detail pesan belum dapat dimuat." }, { status: 500 });
  }
}
