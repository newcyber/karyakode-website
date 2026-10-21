type ContactNotificationInput = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  createdAt: Date | string;
};

const serviceLabels: Record<string, string> = {
  "website-bisnis": "Website bisnis",
  "aplikasi-web": "Aplikasi web",
  "backend-api": "Backend & API",
  "aplikasi-mobile": "Aplikasi Android & iOS",
  "maintenance-dukungan": "Maintenance & dukungan",
  "belum-yakin": "Belum yakin / perlu konsultasi",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Sends an optional notification through Resend.
 * Email is deliberately non-blocking for lead persistence: callers should
 * catch failures and must not turn a successful database insert into failure.
 */
export async function sendContactNotification(
  submission: ContactNotificationInput,
): Promise<"sent" | "skipped" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !recipient || !from) {
    return "skipped";
  }

  const createdAt =
    submission.createdAt instanceof Date
      ? submission.createdAt.toISOString()
      : new Date(submission.createdAt).toISOString();
  const serviceLabel = serviceLabels[submission.service] ?? submission.service;
  const safeName = escapeHtml(submission.name);
  const safeEmail = escapeHtml(submission.email);
  const safeCompany = escapeHtml(submission.company || "Tidak dicantumkan");
  const safeService = escapeHtml(serviceLabel);
  const safeMessage = escapeHtml(submission.message).replaceAll("\n", "<br>");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject: `Lead baru KaryaKode — ${submission.name}`,
      html: `
        <h2>Permintaan konsultasi baru</h2>
        <p><strong>Referensi:</strong> ${escapeHtml(submission.id)}</p>
        <p><strong>Nama:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Bisnis/perusahaan:</strong> ${safeCompany}</p>
        <p><strong>Layanan:</strong> ${safeService}</p>
        <p><strong>Waktu:</strong> ${escapeHtml(createdAt)}</p>
        <hr />
        <p><strong>Pesan:</strong></p>
        <p>${safeMessage}</p>
      `,
      text: [
        "Permintaan konsultasi baru",
        `Referensi: ${submission.id}`,
        `Nama: ${submission.name}`,
        `Email: ${submission.email}`,
        `Bisnis/perusahaan: ${submission.company || "Tidak dicantumkan"}`,
        `Layanan: ${serviceLabel}`,
        `Waktu: ${createdAt}`,
        "",
        "Pesan:",
        submission.message,
      ].join("\n"),
      reply_to: submission.email,
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    // Do not log the provider response body or customer information.
    console.error("Contact notification provider returned HTTP", response.status);
    return "failed";
  }

  return "sent";
}
