import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/contact-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedServices = new Set([
  "website-bisnis",
  "aplikasi-web",
  "backend-api",
  "aplikasi-mobile",
  "maintenance-dukungan",
  "belum-yakin",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(`contact:${getClientIp(request)}`, 5, 10 * 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { message: "Terlalu banyak pengiriman. Silakan coba lagi beberapa menit lagi." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let payload: ContactPayload;

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { message: "Format permintaan tidak didukung." },
        { status: 415 },
      );
    }

    const rawBody = await request.text();
    const bodySize = new TextEncoder().encode(rawBody).byteLength;
    if (bodySize > 20_000) {
      return NextResponse.json(
        { message: "Ukuran pesan terlalu besar." },
        { status: 413 },
      );
    }

    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Permintaan tidak valid." },
      { status: 400 },
    );
  }

  // Honeypot field: ordinary visitors never see or fill this field.
  if (cleanString(payload.website)) {
    return NextResponse.json(
      { message: "Permintaan tidak valid." },
      { status: 400 },
    );
  }

  const name = cleanString(payload.name);
  const email = cleanString(payload.email).toLowerCase();
  const company = cleanString(payload.company);
  const service = cleanString(payload.service);
  const message = cleanString(payload.message);

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { message: "Nama harus berisi 2–100 karakter." },
      { status: 400 },
    );
  }
  if (!validEmail(email)) {
    return NextResponse.json(
      { message: "Masukkan alamat email yang valid." },
      { status: 400 },
    );
  }
  if (company.length > 120) {
    return NextResponse.json(
      { message: "Nama perusahaan maksimal 120 karakter." },
      { status: 400 },
    );
  }
  if (!allowedServices.has(service)) {
    return NextResponse.json(
      { message: "Pilih salah satu jenis layanan." },
      { status: 400 },
    );
  }
  if (message.length < 20 || message.length > 3000) {
    return NextResponse.json(
      { message: "Pesan harus berisi 20–3.000 karakter." },
      { status: 400 },
    );
  }

  if (!db) {
    return NextResponse.json(
      {
        message:
          "Formulir belum aktif karena koneksi database belum dikonfigurasi. Silakan coba lagi nanti.",
      },
      { status: 503 },
    );
  }

  try {
    const result = await db.query<{ id: string; created_at: Date }>(
      `INSERT INTO contact_submissions
        (name, email, company, service, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [name, email, company || null, service, message],
    );

    const submission = result.rows[0];
    if (!submission) {
      throw new Error("Contact submission insert returned no row.");
    }

    // PostgreSQL is the source of truth. Notification failure must not make
    // a saved lead look unsaved, which could cause duplicate submissions.
    try {
      const notificationStatus = await sendContactNotification({
        id: submission.id,
        name,
        email,
        company: company || null,
        service,
        message,
        createdAt: submission.created_at,
      });
      if (notificationStatus === "failed") {
        console.warn("Lead was saved, but email notification was not delivered.");
      }
    } catch {
      // Keep provider errors and personal data out of the public response.
      console.error("Lead was saved, but email notification failed unexpectedly.");
    }

    return NextResponse.json(
      {
        message: "Pesan konsultasi berhasil disimpan.",
        reference: submission.id,
        createdAt: submission.created_at,
      },
      { status: 201 },
    );
  } catch (error) {
    // Keep details in server logs; never expose database errors to visitors.
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      {
        message:
          "Pesan belum dapat disimpan karena terjadi kendala server. Silakan coba lagi beberapa saat lagi.",
      },
      { status: 500 },
    );
  }
}
