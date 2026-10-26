import type { Metadata } from "next";
import Link from "next/link";
import ProjectPlanner from "@/components/project-planner";

export const metadata: Metadata = {
  title: "Project Planner Interaktif | KaryaKode",
  description:
    "Rencanakan kebutuhan website, aplikasi web, aplikasi mobile, atau backend bersama KaryaKode melalui project planner interaktif.",
  alternates: {
    canonical: "https://karyakode.com/project-planner",
  },
};

export default async function ProjectPlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedService = params.service;

  const allowedServices = [
    "website",
    "webapp",
    "mobile",
    "api",
    "maintenance",
  ] as const;

  const initialService =
    typeof requestedService === "string" &&
    allowedServices.some((service) => service === requestedService)
      ? requestedService
      : "";

  return (
    <main className="min-h-screen bg-[#090b10] text-white">
      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            KaryaKode<span className="text-blue-400">.</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm text-slate-300 sm:gap-6">
            <Link href="/layanan" className="transition hover:text-white">
              Layanan
            </Link>
            <Link href="/price-list" className="transition hover:text-white">
              Price List
            </Link>
            <Link
              href="/"
              className="rounded-full bg-blue-500 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-400"
            >
              Beranda
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-300">
            PROJECT PLANNER INTERAKTIF
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Ubah ide menjadi rencana proyek yang lebih jelas.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Pilih jenis layanan, tentukan fitur, dan jelaskan kebutuhan Anda.
            Ringkasan proyek akan diperbarui otomatis sehingga lebih mudah
            digunakan saat konsultasi.
          </p>
        </div>

        <ProjectPlanner initialService={initialService} />

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm leading-6 text-slate-400">
            Masih belum yakin layanan mana yang sesuai? Anda dapat meninjau
            layanan KaryaKode terlebih dahulu.
          </p>
          <Link
            href="/price-list"
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
          >
            Lihat Price List
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} KaryaKode.</p>
          <div className="flex gap-5">
            <Link href="/" className="transition hover:text-white">
              Beranda
            </Link>
            <Link href="/tentang-kami" className="transition hover:text-white">
              Tentang Kami
            </Link>
            <Link href="/price-list" className="transition hover:text-white">
              Price List
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
