"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Code2,
  Layers3,
  Clock3,
  Wallet,
} from "lucide-react";

const services = [
  { value: "website", label: "Website bisnis", description: "Website company profile, landing page, dan situs bisnis." },
  { value: "webapp", label: "Aplikasi web", description: "Dashboard, marketplace, dan aplikasi operasional." },
  { value: "mobile", label: "Aplikasi mobile", description: "Aplikasi Android atau iOS." },
  { value: "api", label: "Backend & API", description: "Backend, integrasi layanan, dan pengelolaan data." },
  { value: "maintenance", label: "Maintenance", description: "Perbaikan, peningkatan, dan dukungan teknis." },
];

const featureOptions = [
  { value: "responsive", label: "Responsive mobile" },
  { value: "admin", label: "Dashboard admin" },
  { value: "auth", label: "Login dan manajemen pengguna" },
  { value: "payment", label: "Payment gateway" },
  { value: "integration", label: "Integrasi API pihak ketiga" },
  { value: "seo", label: "SEO dan optimasi performa" },
];

const timelines = [
  { value: "urgent", label: "Secepatnya", description: "Perlu diskusi prioritas dan ketersediaan." },
  { value: "flexible", label: "Fleksibel", description: "Jadwal dapat dibahas bersama." },
  { value: "scheduled", label: "Jadwal tertentu", description: "Saya memiliki target peluncuran." },
];

const budgets = [
  { value: "under5", label: "Di bawah Rp5 juta" },
  { value: "5to15", label: "Rp5–15 juta" },
  { value: "over15", label: "Di atas Rp15 juta" },
  { value: "discuss", label: "Belum ditentukan" },
];

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

export default function ProjectPlanner() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("flexible");
  const [budget, setBudget] = useState("discuss");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedService = services.find((item) => item.value === service);
  const selectedTimeline = timelines.find((item) => item.value === timeline);
  const selectedBudget = budgets.find((item) => item.value === budget);

  const brief = useMemo(() => {
    return [
      "BRIEF PROYEK — KARYAKODE",
      "",
      `Layanan: ${selectedService?.label ?? "Belum dipilih"}`,
      `Fitur: ${
        features.length
          ? featureOptions
              .filter((item) => features.includes(item.value))
              .map((item) => item.label)
              .join(", ")
          : "Belum ditentukan"
      }`,
      `Timeline: ${selectedTimeline?.label ?? timeline}`,
      `Preferensi anggaran: ${selectedBudget?.label ?? budget}`,
      `Catatan proyek: ${notes.trim() || "Belum ada catatan"}`,
      "",
      "Catatan: anggaran merupakan preferensi calon klien, bukan penawaran harga resmi.",
    ].join("\n");
  }, [selectedService, features, selectedTimeline, timeline, selectedBudget, budget, notes]);

  function nextStep() {
    if (step === 1 && !service) {
      setError("Pilih jenis layanan terlebih dahulu.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Brief tidak dapat disalin otomatis. Silakan pilih dan salin teks ringkasan.");
    }
  }

  function continueToContact() {
    if (!selectedService) {
      setStep(1);
      setError("Pilih jenis layanan terlebih dahulu.");
      return;
    }

    const serviceMap: Record<string, string> = {
      website: "website-bisnis",
      webapp: "aplikasi-web",
      mobile: "aplikasi-mobile",
      api: "backend-api",
      maintenance: "maintenance-dukungan",
    };

    try {
      sessionStorage.setItem(
        "karyakode:project-brief",
        JSON.stringify({
          service: serviceMap[service] ?? "belum-yakin",
          message: brief.slice(0, 3000),
        }),
      );
      window.location.assign("/#kontak");
    } catch {
      setError("Brief tidak dapat diteruskan otomatis. Silakan salin brief dan tempelkan di formulir kontak.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
      <section className="rounded-3xl border border-white/10 bg-[#10131a] p-5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-300">
              LANGKAH {step} DARI 4
            </p>
            <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
              {["", "Pilih layanan", "Tentukan fitur", "Atur ekspektasi", "Periksa brief"][step]}
            </h2>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-300">
            {step === 1 ? <Code2 /> : step === 2 ? <Layers3 /> : step === 3 ? <Clock3 /> : <Clipboard />}
          </span>
        </div>

        <div
          className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Progres project planner"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step}
        >
          <div
            className="h-full rounded-full bg-blue-400 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="mt-7 grid gap-3">
            {services.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setService(item.value);
                  setError("");
                }}
                aria-pressed={service === item.value}
                className={`rounded-2xl border p-4 text-left transition ${
                  service === item.value
                    ? "border-blue-400/60 bg-blue-400/[0.08]"
                    : "border-white/10 hover:border-white/25 hover:bg-white/[0.02]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium text-white">{item.label}</span>
                  <span className={`grid h-5 w-5 place-items-center rounded-full border ${
                    service === item.value ? "border-blue-400 bg-blue-400 text-slate-950" : "border-white/20"
                  }`}>
                    {service === item.value && <Check size={13} />}
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-400">
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="mt-7">
            <p className="text-sm leading-6 text-slate-400">
              Pilih fitur yang relevan. Anda boleh memilih beberapa atau melewati pilihan ini jika belum yakin.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {featureOptions.map((item) => {
                const checked = features.includes(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={checked}
                    onClick={() =>
                      setFeatures((current) =>
                        checked
                          ? current.filter((value) => value !== item.value)
                          : [...current, item.value]
                      )
                    }
                    className={`flex min-h-16 items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                      checked
                        ? "border-blue-400/50 bg-blue-400/[0.08] text-white"
                        : "border-white/10 text-slate-300 hover:border-white/25"
                    }`}
                  >
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                      checked ? "border-blue-400 bg-blue-400 text-slate-950" : "border-white/20"
                    }`}>
                      {checked && <Check size={13} />}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-7 space-y-7">
            <fieldset>
              <legend className="text-sm font-medium text-slate-200">Target waktu pengerjaan</legend>
              <div className="mt-3 grid gap-3">
                {timelines.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                    timeline === item.value ? "border-blue-400/50 bg-blue-400/[0.06]" : "border-white/10"
                  }`}>
                    <input
                      type="radio"
                      name="planner-timeline"
                      value={item.value}
                      checked={timeline === item.value}
                      onChange={() => setTimeline(item.value)}
                      className="mt-1 accent-blue-400"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">{item.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-slate-200">Preferensi anggaran</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {budgets.map((item) => (
                  <label key={item.value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                    budget === item.value ? "border-blue-400/50 bg-blue-400/[0.06] text-white" : "border-white/10 text-slate-300"
                  }`}>
                    <input
                      type="radio"
                      name="planner-budget"
                      value={item.value}
                      checked={budget === item.value}
                      onChange={() => setBudget(item.value)}
                      className="accent-blue-400"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Ini hanya preferensi anggaran dari Anda, bukan tarif atau penawaran resmi KaryaKode.
              </p>
            </fieldset>
          </div>
        )}

        {step === 4 && (
          <div className="mt-7 space-y-5">
            <div className="rounded-xl border border-white/10 bg-[#0b0d12] p-4">
              <p className="text-sm font-medium text-white">Tambahkan konteks (opsional)</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Ceritakan tujuan, masalah, atau kebutuhan khusus. Jangan masukkan kata sandi atau data rahasia.
              </p>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value.slice(0, 1500))}
                maxLength={1500}
                rows={5}
                placeholder="Contoh: Saya ingin memudahkan pelanggan memesan layanan secara online..."
                className={`${fieldClass} mt-4 resize-y`}
              />
              <p className="mt-2 text-right text-xs text-slate-500">{notes.length}/1500 karakter</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-300" />
              <p className="text-sm leading-6 text-slate-300">
                Periksa ringkasan di samping. Anda dapat menyalinnya untuk disimpan atau digunakan saat meminta konsultasi.
              </p>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Kembali
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
            >
              Lanjutkan <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={copyBrief}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.04]"
              >
                {copied ? <ClipboardCheck size={17} /> : <Clipboard size={17} />}
                {copied ? "Brief tersalin" : "Salin brief proyek"}
              </button>
              <button
                type="button"
                onClick={continueToContact}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Lanjutkan ke Konsultasi <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      <aside className="h-fit rounded-3xl border border-white/10 bg-[#10131a] p-5 sm:p-7 lg:sticky lg:top-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-400/[0.08] text-blue-300">
            <Clipboard size={20} />
          </span>
          <div>
            <h2 className="font-semibold text-white">Ringkasan proyek</h2>
            <p className="text-xs text-slate-500">Diperbarui otomatis</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-xs text-slate-500">Layanan</p>
            <p className="mt-1 text-sm font-medium text-slate-100">{selectedService?.label ?? "Belum dipilih"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Fitur dipilih</p>
            {features.length ? (
              <ul className="mt-2 space-y-2">
                {featureOptions.filter((item) => features.includes(item.value)).map((item) => (
                  <li key={item.value} className="flex items-start gap-2 text-sm leading-5 text-slate-300">
                    <Check size={15} className="mt-0.5 shrink-0 text-blue-300" />
                    {item.label}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-slate-400">Belum ditentukan</p>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-500">Timeline</p>
            <p className="mt-1 text-sm text-slate-200">{selectedTimeline?.label ?? "Fleksibel"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Preferensi anggaran</p>
            <p className="mt-1 text-sm text-slate-200">{selectedBudget?.label ?? "Belum ditentukan"}</p>
          </div>
          {notes.trim() && (
            <div>
              <p className="text-xs text-slate-500">Catatan</p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{notes.trim()}</p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-blue-400/15 bg-blue-400/[0.05] p-4">
          <div className="flex items-center gap-2 text-blue-200">
            <Wallet size={17} />
            <p className="text-sm font-medium">Estimasi biaya</p>
          </div>
          <p className="mt-2 text-lg font-semibold text-white">Konsultasikan harga</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Harga final dibahas setelah ruang lingkup dan kebutuhan teknis dipahami.
          </p>
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Ringkasan ini dibuat di browser Anda. Belum ada data yang dikirim ke server.
        </p>
      </aside>
    </div>
  );
}
