import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Code2 } from "lucide-react";
import { getServiceBySlug, serviceDetails } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Layanan tidak ditemukan" };

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/layanan/${service.slug}` },
    openGraph: {
      type: "website",
      url: `https://karyakode.com/layanan/${service.slug}`,
      siteName: "KaryaKode",
      title: `${service.title} | KaryaKode`,
      description: service.summary,
      locale: "id_ID",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main id="konten-utama" className="min-h-screen overflow-hidden bg-[#0b0d12] text-[#f3f4f6]">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="KaryaKode, ke beranda">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#10131a]"><Code2 size={23} strokeWidth={2.5} /></span>
          <span><span className="block text-lg font-bold tracking-tight">KaryaKode</span><span className="block text-[10px] font-semibold tracking-[0.22em] text-slate-500">DIGITAL STUDIO</span></span>
        </Link>
        <Link href="/#kontak" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 sm:px-5">Diskusikan kebutuhan <ArrowUpRight size={16} /></Link>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-20 lg:px-10 lg:pb-20">
        <Link href="/#layanan" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><ArrowLeft size={16} /> Semua layanan</Link>
        <div className="mt-10 max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">{service.eyebrow} · LAYANAN {service.number}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">{service.summary}</p>
          <p className="mt-5 max-w-3xl leading-8 text-slate-400">{service.description}</p>
          <Link href="/#kontak" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400">Diskusikan kebutuhan proyek <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">CONTOH KEBUTUHAN</p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Kapan layanan ini relevan?</h2>
            <ul className="mt-7 space-y-4">
              {service.useCases.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300"><CheckCircle2 size={19} className="mt-1 shrink-0 text-blue-400" />{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">RUANG LINGKUP</p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Hal yang dapat direncanakan</h2>
            <ul className="mt-7 space-y-4">
              {service.scope.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300"><CheckCircle2 size={19} className="mt-1 shrink-0 text-blue-400" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">SEBELUM MEMULAI</p>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Apa yang perlu kita sepakati?</h2>
          <p className="mt-4 leading-7 text-slate-400">Diskusi awal membantu menentukan prioritas dan batas pekerjaan. Detail implementasi, biaya, timeline, dan kebutuhan teknis dibahas setelah konteks proyek dipahami.</p>
          <ul className="mt-7 space-y-3">
            {service.questions.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />{item}</li>)}
          </ul>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-5 rounded-3xl border border-blue-400/20 bg-[#111a2a] p-6 sm:p-9 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-semibold">Punya kebutuhan yang ingin dibahas?</h2><p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">Mulai dari tujuan dan kendala yang ada. Rincian berikutnya ditentukan bersama setelah kebutuhan dipahami.</p></div>
          <Link href="/#kontak" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100">Kembali ke kontak <ArrowRight size={16} /></Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2 font-semibold"><Code2 size={18} /> KaryaKode</Link>
          <p className="text-slate-500">Website, aplikasi, dan dukungan teknis untuk kebutuhan bisnis.</p>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} KaryaKode. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
