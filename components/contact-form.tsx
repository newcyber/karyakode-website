"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const serviceOptions = [
  { value: "website-bisnis", label: "Website bisnis" },
  { value: "aplikasi-web", label: "Aplikasi web" },
  { value: "backend-api", label: "Backend & API" },
  { value: "aplikasi-mobile", label: "Aplikasi Android & iOS" },
  { value: "maintenance-dukungan", label: "Maintenance & dukungan" },
  { value: "belum-yakin", label: "Belum yakin / perlu konsultasi" },
];

type SubmitResult = {
  message?: string;
  reference?: string;
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SubmitResult | null>(null);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const key = "karyakode:project-brief";
      const stored = sessionStorage.getItem(key);
      if (!stored) return;

      sessionStorage.removeItem(key);
      const brief = JSON.parse(stored) as {
        service?: unknown;
        message?: unknown;
      };

      const validService = serviceOptions.some(
        (option) => option.value === brief.service,
      );

      if (validService) {
        setService(brief.service as string);
      }

      if (typeof brief.message === "string") {
        setMessage(brief.message.slice(0, 3000));
      }
    } catch {
      setError("Brief tidak dapat dimuat otomatis. Silakan isi formulir secara manual.");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setSuccess(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as SubmitResult;

      if (!response.ok) {
        setError(result.message ?? "Pesan belum berhasil dikirim. Silakan coba lagi.");
        return;
      }

      setSuccess(result);
      form.reset();
    } catch {
      setError("Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      {success ? (
        <div role="status" aria-live="polite" className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-6">
          <CheckCircle2 size={28} className="text-emerald-300" />
          <h3 className="mt-4 text-lg font-semibold text-white">Pesan berhasil disimpan</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">{success.message}</p>
          {success.reference && <p className="mt-3 text-xs text-slate-400">Nomor referensi: <span className="font-mono text-slate-200">{success.reference}</span></p>}
          <button type="button" onClick={() => setSuccess(null)} className="mt-5 text-sm font-semibold text-blue-300 hover:text-blue-200">
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-slate-200">Nama lengkap <span aria-hidden="true" className="text-blue-300">*</span></label>
              <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} className={fieldClass} placeholder="Nama kamu" />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-sm font-medium text-slate-200">Email aktif <span aria-hidden="true" className="text-blue-300">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} placeholder="nama@perusahaan.com" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-company" className="text-sm font-medium text-slate-200">Nama bisnis / perusahaan <span className="text-slate-500">(opsional)</span></label>
              <input id="contact-company" name="company" autoComplete="organization" maxLength={120} className={fieldClass} placeholder="Nama bisnis" />
            </div>
            <div>
              <label htmlFor="contact-service" className="text-sm font-medium text-slate-200">Layanan yang dibutuhkan <span aria-hidden="true" className="text-blue-300">*</span></label>
              <select id="contact-service" name="service" required value={service} onChange={(event) => setService(event.target.value)} className={fieldClass}>
                <option value="" disabled>Pilih layanan</option>
                {serviceOptions.map((option) => <option key={option.value} value={option.value} className="bg-[#0b0d12]">{option.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-medium text-slate-200">Ceritakan kebutuhan proyek <span aria-hidden="true" className="text-blue-300">*</span></label>
            <textarea id="contact-message" name="message" required minLength={20} maxLength={3000} rows={5} value={message} onChange={(event) => setMessage(event.target.value.slice(0, 3000))} className={`${fieldClass} resize-y`} placeholder="Tujuan, masalah yang ingin diselesaikan, fitur yang dibutuhkan, atau konteks lainnya (minimal 20 karakter)." />
            <p className="mt-2 text-xs leading-5 text-slate-500">20–3.000 karakter. Jangan masukkan kata sandi atau data rahasia.</p>
          </div>

          <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Jangan isi kolom ini</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-sm leading-6 text-red-200">{error}</p>}

          <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
            {pending ? <><LoaderCircle size={17} className="animate-spin" /> Menyimpan pesan...</> : <>Kirim permintaan konsultasi <Send size={16} /></>}
          </button>
          <p className="text-xs leading-6 text-slate-500">Pesan hanya dinyatakan berhasil setelah server mengonfirmasi penyimpanan ke database.</p>
        </form>
      )}
    </div>
  );
}
