import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { serviceDetails } from "@/lib/services";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Price List Layanan",
  description:
    "Lihat daftar layanan KaryaKode untuk website, aplikasi web, backend dan API, aplikasi mobile, serta maintenance. Konsultasikan kebutuhan untuk mendapatkan estimasi biaya proyek.",
  alternates: {
    canonical: "/price-list",
  },
  openGraph: {
    type: "website",
    url: "https://karyakode.com/price-list",
    siteName: "KaryaKode",
    title: "Price List Layanan | KaryaKode",
    description:
      "Daftar layanan pengembangan produk digital KaryaKode. Konsultasikan kebutuhan untuk memperoleh estimasi biaya yang sesuai dengan ruang lingkup proyek.",
    locale: "id_ID",
  },
};

const pricingBySlug: Record<
  string,
  { price: string; timeline: string; note: string; plannerService: string }
> = {
  "website-bisnis": {
    price: "Rp4.500.000–Rp9.000.000",
    timeline: "Estimasi 2–4 minggu",
    note: "Untuk website bisnis dengan scope awal yang disepakati. Landing page sederhana dapat dimulai dari Rp2.500.000.",
    plannerService: "website",
  },
  "aplikasi-web": {
    price: "Mulai Rp12.000.000",
    timeline: "Estimasi MVP 4–8 minggu",
    note: "Harga akhir mengikuti jumlah fitur, peran pengguna, aturan bisnis, dan integrasi.",
    plannerService: "webapp",
  },
  "backend-api": {
    price: "Mulai Rp3.500.000",
    timeline: "Estimasi 1–3 minggu",
    note: "Untuk API atau integrasi sederhana. Sistem kompleks dan integrasi multi-layanan dihitung terpisah.",
    plannerService: "api",
  },
  "aplikasi-mobile": {
    price: "Mulai Rp25.000.000",
    timeline: "Estimasi MVP 6–12 minggu",
    note: "Untuk MVP dengan scope terbatas. Platform, backend, integrasi, dan proses publikasi memengaruhi biaya.",
    plannerService: "mobile",
  },
  "maintenance-dukungan": {
    price: "Rp750.000–Rp3.000.000/bulan",
    timeline: "Paket dukungan bulanan",
    note: "Kuota pengerjaan, prioritas, dan waktu respons ditentukan dalam kesepakatan layanan.",
    plannerService: "maintenance",
  },
};

export default function PriceListPage() {
  return (
    <main
      id="konten-utama"
      className="min-h-screen overflow-hidden bg-[#0b0d12] text-[#f3f4f6]"
    >
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />

      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:px-10 lg:pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke beranda
        </Link>

        <div className="mt-10 max-w-4xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3.5 py-2 text-xs font-medium text-blue-200">
            <Sparkles size={14} />
            LAYANAN & ESTIMASI BIAYA
          </p>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Investasi digital yang{" "}
            <span className="text-blue-400">sesuai kebutuhan.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Setiap bisnis memiliki kebutuhan dan ruang lingkup berbeda.
            Pilih layanan yang ingin Anda kembangkan, lalu diskusikan
            kebutuhan proyek bersama KaryaKode untuk mendapatkan estimasi
            biaya yang relevan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#kontak"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400"
            >
              <MessageCircle size={17} />
              Konsultasikan proyek
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/project-planner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400/30 px-6 py-3.5 text-sm font-semibold text-blue-200 transition hover:bg-blue-400/[0.08]"
            >
              Susun brief proyek
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#daftar-layanan"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04]"
            >
              Lihat semua layanan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          id="daftar-layanan"
          className="mt-16 scroll-mt-8 border-t border-white/[0.08] pt-10 sm:mt-20"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
              DAFTAR LAYANAN
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Pilih layanan sesuai tujuan proyek
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Estimasi biaya ditentukan setelah ruang lingkup, fitur,
              integrasi, dan kebutuhan teknis dibahas bersama.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-blue-400/20 bg-[#101722] p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue-300">
                PAKET LANDING PAGE
              </p>
              <h3 className="mt-3 text-xl font-semibold">Landing Page Bisnis</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Untuk promosi produk, pengumpulan prospek, kampanye, atau
                memperkenalkan satu layanan bisnis.
              </p>
              <p className="mt-5 text-2xl font-bold text-blue-300">
                Rp2.500.000–Rp5.000.000
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Estimasi 1–2 minggu. Harga mengikuti struktur halaman,
                kebutuhan formulir, desain, dan integrasi.
              </p>
              <Link
                href="/project-planner?service=website"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
              >
                Susun brief landing page
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-2xl border border-blue-400/20 bg-[#101722] p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue-300">
                PAKET TOKO ONLINE
              </p>
              <h3 className="mt-3 text-xl font-semibold">Toko Online</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Untuk katalog produk, keranjang belanja, checkout, dan alur
                pesanan sesuai kebutuhan bisnis.
              </p>
              <p className="mt-5 text-2xl font-bold text-blue-300">
                Rp8.000.000–Rp20.000.000
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Estimasi awal 3–8 minggu. Pembayaran, pengiriman, dashboard
                admin, dan integrasi dapat memengaruhi biaya.
              </p>
              <Link
                href="/project-planner?service=webapp"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
              >
                Susun brief toko online
                <ArrowRight size={15} />
              </Link>
            </article>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {serviceDetails.map((service) => (
              <article
                key={service.slug}
                className="flex flex-col rounded-2xl border border-white/[0.09] bg-[#10131a] p-6 transition hover:border-blue-400/30 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-blue-300">
                    <Code2 size={22} />
                  </span>
                  <span className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400">
                    {service.eyebrow}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {service.summary}
                </p>

                <div className="mt-6 rounded-xl border border-blue-400/20 bg-blue-400/[0.06] p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Estimasi investasi
                  </p>
                  <p className="mt-2 text-xl font-bold leading-snug tracking-tight text-blue-300">
                    {pricingBySlug[service.slug]?.price ?? "Konsultasi scope"}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-300">
                    {pricingBySlug[service.slug]?.timeline}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-slate-400">
                    {pricingBySlug[service.slug]?.note}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {service.useCases.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={17}
                        className="mt-1 shrink-0 text-blue-400"
                      />
                      <span className="text-sm leading-6 text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04]"
                  >
                    Detail layanan
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href={`/project-planner?service=${pricingBySlug[service.slug]?.plannerService ?? "website"}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
                  >
                    Susun brief proyek
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="mt-16 rounded-3xl border border-blue-400/20 bg-[#111a2a] p-6 sm:mt-20 sm:p-9 lg:p-10">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-300">
            LANGKAH SELANJUTNYA
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold sm:text-3xl">
            Punya kebutuhan khusus di luar daftar layanan?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Ceritakan tujuan, fitur, dan kendala yang ingin diselesaikan.
            Kita dapat membahas ruang lingkup, prioritas, estimasi biaya,
            dan timeline sebelum pekerjaan dimulai.
          </p>
          <Link
            href="/#kontak"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Diskusikan kebutuhan
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </section>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Code2 size={18} />
            KaryaKode
          </Link>
          <p className="text-slate-500">
            Website, aplikasi, dan dukungan teknis untuk kebutuhan bisnis.
          </p>
          <Link
            href="/kebijakan-privasi"
            className="text-slate-400 transition hover:text-white"
          >
            Kebijakan Privasi
          </Link>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} KaryaKode. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
