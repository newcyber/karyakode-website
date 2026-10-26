import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Compass,
  Lightbulb,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali KaryaKode, partner pengembangan produk digital untuk membantu bisnis membangun website, aplikasi, backend, dan solusi teknologi sesuai kebutuhan.",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    type: "website",
    url: "https://karyakode.com/tentang-kami",
    siteName: "KaryaKode",
    title: "Tentang Kami | KaryaKode",
    description:
      "Mengenal pendekatan KaryaKode dalam merencanakan dan membangun solusi digital untuk kebutuhan bisnis.",
    locale: "id_ID",
  },
};

const principles = [
  {
    icon: Target,
    title: "Berangkat dari kebutuhan",
    description:
      "Memahami tujuan, kendala, dan proses bisnis sebelum menentukan solusi yang akan dibangun.",
  },
  {
    icon: Lightbulb,
    title: "Solusi yang relevan",
    description:
      "Memilih pendekatan dan teknologi berdasarkan kebutuhan proyek, bukan sekadar mengikuti tren.",
  },
  {
    icon: Compass,
    title: "Bertumbuh secara terarah",
    description:
      "Merencanakan produk agar dapat dikembangkan secara bertahap seiring perubahan kebutuhan.",
  },
];

const capabilities = [
  "Website bisnis dan landing page",
  "Aplikasi web dan dashboard operasional",
  "Backend, API, dan integrasi layanan",
  "Aplikasi Android dan iOS",
  "Maintenance dan dukungan teknis",
];

export default function AboutPage() {
  return (
    <main
      id="konten-utama"
      className="min-h-screen overflow-hidden bg-[#0b0d12] text-[#f3f4f6]"
    >
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />


<SiteHeader />


      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:px-10 lg:pb-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke beranda
        </Link>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3.5 py-2 text-xs font-medium text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              TENTANG KARYAKODE
            </p>

            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Teknologi yang tepat untuk{" "}
              <span className="text-blue-400">kebutuhan nyata.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              KaryaKode berfokus pada pengembangan website, aplikasi, dan
              sistem digital yang dirancang berdasarkan tujuan serta kebutuhan
              setiap proyek. Kami percaya solusi yang baik dimulai dari
              memahami masalah yang ingin diselesaikan.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#kontak"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400"
              >
                Diskusikan proyek <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/#layanan"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                Lihat layanan <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#11151e]/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-5">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                  <Code2 size={24} />
                </span>
                <div>
                  <p className="font-semibold text-white">KaryaKode</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Digital product development
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-400">
                Setiap proyek memiliki tantangan berbeda. Karena itu, proses
                pengembangan perlu mempertimbangkan tujuan bisnis, pengalaman
                pengguna, keandalan sistem, dan ruang untuk pengembangan
                berikutnya.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Memahami kebutuhan sebelum membangun",
                  "Menentukan prioritas dan ruang lingkup",
                  "Mengembangkan dan menguji secara bertahap",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-400"
                    />
                    <span className="text-sm leading-6 text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
              PENDEKATAN KAMI
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bukan sekadar membuat aplikasi.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Kami menempatkan kebutuhan pengguna dan tujuan bisnis sebagai
              bagian penting dari proses pengembangan. Setiap keputusan teknis
              sebaiknya memiliki alasan yang jelas dan manfaat yang relevan
              bagi proyek.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-white/[0.09] bg-[#10131a] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-blue-300">
                      <Icon size={22} />
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
            VISI KAMI
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Membantu ide berkembang melalui teknologi.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Menjadi partner pengembangan digital yang membantu bisnis
            menerjemahkan kebutuhan dan ide menjadi solusi teknologi yang
            berguna, terarah, dan dapat terus dikembangkan.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
            MISI KAMI
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Membangun dengan tujuan yang jelas.
          </h2>
          <ul className="mt-6 space-y-4">
            {[
              "Memahami kebutuhan dan konteks setiap proyek.",
              "Merancang solusi yang sesuai dengan prioritas bisnis.",
              "Menjaga kualitas melalui pengujian dan evaluasi.",
              "Mendorong pengembangan yang terukur dan berkelanjutan.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-1 shrink-0 text-blue-400"
                />
                <span className="text-sm leading-7 text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.07] bg-[#0e1118]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">
              KAPABILITAS
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Satu partner, beragam kebutuhan digital.
            </h2>
            <p className="mt-5 leading-7 text-slate-400">
              Ruang lingkup pekerjaan disesuaikan dengan kebutuhan, prioritas,
              dan kondisi proyek yang dibahas bersama.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.09] bg-[#10131a] p-6 sm:p-8">
            <ul className="space-y-5">
              {capabilities.map((capability, index) => (
                <li
                  key={capability}
                  className="flex items-start gap-4 border-b border-white/[0.07] pb-5 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-xs text-blue-400">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-200">
                    {capability}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/#layanan"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
            >
              Pelajari detail layanan <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-blue-400/20 bg-[#111a2a] p-7 sm:p-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-300">
              MARI MULAI DISKUSI
            </p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Punya ide atau tantangan digital?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Ceritakan kebutuhan dan tujuan proyekmu. Kita bisa mulai dengan
              memahami masalah, lalu membahas pendekatan yang paling relevan.
            </p>
          </div>
          <Link
            href="/#kontak"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
          >
            Hubungi KaryaKode <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Code2 size={18} /> KaryaKode
          </Link>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Beranda
            </Link>
            <Link href="/#layanan" className="transition hover:text-white">
              Layanan
            </Link>
            <Link href="/price-list" className="transition hover:text-white">
              Price List
            </Link>
            <Link href="/#kontak" className="transition hover:text-white">
              Kontak
            </Link>
            <Link href="/kebijakan-privasi" className="transition hover:text-white">
              Kebijakan Privasi
            </Link>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} KaryaKode. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
