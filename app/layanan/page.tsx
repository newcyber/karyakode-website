import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { serviceDetails } from "@/lib/services";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Layanan Pengembangan Digital",
  description:
    "Jelajahi layanan website bisnis, aplikasi web, backend dan API, aplikasi mobile, serta maintenance dari KaryaKode.",
  alternates: {
    canonical: "/layanan",
  },
  openGraph: {
    type: "website",
    url: "https://karyakode.com/layanan",
    siteName: "KaryaKode",
    title: "Layanan Pengembangan Digital | KaryaKode",
    description:
      "Pilih layanan pengembangan website dan aplikasi sesuai kebutuhan bisnis Anda.",
    locale: "id_ID",
  },
};

export default function ServicesPage() {
  return (
    <main
      id="konten-utama"
      className="min-h-screen overflow-hidden bg-[#0b0d12] text-[#f3f4f6]"
    >
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />

      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:px-10 lg:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowRight className="rotate-180" size={16} />
          Kembali ke beranda
        </Link>

        <div className="mt-10 max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
            LAYANAN KARYAKODE
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Solusi digital sesuai kebutuhan bisnis Anda
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Mulai dari website bisnis hingga aplikasi dan dukungan teknis.
            Pilih layanan untuk mempelajari ruang lingkup, contoh kebutuhan,
            dan hal yang perlu disiapkan sebelum proyek dimulai.
          </p>

          <Link
            href="/price-list"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Lihat estimasi harga <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
              PILIH LAYANAN
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Apa yang ingin Anda bangun?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Setiap proyek memiliki kebutuhan berbeda. Pelajari layanan
              berikut untuk menentukan titik awal yang paling sesuai.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceDetails.map((service) => (
              <article
                key={service.slug}
                className="flex flex-col rounded-2xl border border-white/[0.09] bg-[#10131a] p-6 transition hover:border-blue-400/30 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-blue-300">
                    <Code2 size={22} />
                  </span>
                  <span className="text-xs font-medium tracking-wide text-slate-500">
                    LAYANAN {service.number}
                  </span>
                </div>

                <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-blue-300">
                  {service.eyebrow}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-3">
                  {service.useCases.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-1 shrink-0 text-blue-400"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-7">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
                  >
                    Pelajari layanan <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/project-planner"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-400/30 hover:bg-white/[0.04] hover:text-white"
                  >
                    Susun brief proyek <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-blue-400/20 bg-[#111a2a] p-6 sm:p-9 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              Belum yakin layanan mana yang tepat?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Mulai dari tujuan proyek dan masalah yang ingin diselesaikan.
              Ruang lingkup, estimasi biaya, dan timeline dapat dibahas
              setelah kebutuhan Anda dipahami.
            </p>
          </div>
          <Link
            href="/project-planner"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Mulai rencana proyek <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Code2 size={18} /> KaryaKode
          </Link>
          <Link
            href="/price-list"
            className="text-slate-400 transition hover:text-white"
          >
            Daftar Harga
          </Link>
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
