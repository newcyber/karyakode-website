import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ message: "Silakan login sebagai admin." }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ message: "Database belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const [totalsResult, servicesResult] = await Promise.all([
      db.query<{
        total: number;
        new_count: number;
        in_progress_count: number;
        closed_count: number;
        last_30_days: number;
      }>(`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE status = 'NEW')::int AS new_count,
          COUNT(*) FILTER (WHERE status = 'IN_PROGRESS')::int AS in_progress_count,
          COUNT(*) FILTER (WHERE status = 'CLOSED')::int AS closed_count,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS last_30_days
        FROM contact_submissions
      `),
      db.query<{ service: string; count: number }>(`
        SELECT service, COUNT(*)::int AS count
        FROM contact_submissions
        GROUP BY service
        ORDER BY count DESC, service ASC
      `),
    ]);

    const totals = totalsResult.rows[0];
    if (!totals) throw new Error("Contact analytics query returned no totals.");

    return NextResponse.json({
      totals: {
        all: totals.total,
        new: totals.new_count,
        inProgress: totals.in_progress_count,
        closed: totals.closed_count,
        last30Days: totals.last_30_days,
      },
      services: servicesResult.rows,
    });
  } catch (error) {
    console.error("Failed to load contact analytics:", error);
    return NextResponse.json({ message: "Analytics kontak belum dapat dimuat." }, { status: 500 });
  }
}
