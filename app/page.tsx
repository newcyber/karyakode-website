import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import CodeTypingEditor from "@/components/code-typing-editor";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  Fish,
  Globe2,
  Layers3,
  MessageCircle,
  Smartphone,
  Truck,
  Workflow,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Globe2,
    number: "01",
    slug: "website-bisnis",
    title: "Website & Landing Page",
    description:
      "Website company profile, landing page, dan website bisnis yang cepat, responsif, serta mudah dikembangkan.",
    tags: ["Next.js", "SEO", "Responsive UI"],
  },
  {
    icon: Workflow,
    number: "02",
    slug: "aplikasi-web",
    title: "Web Application",
    description:
      "Dashboard, portal pelanggan, sistem reservasi, dan aplikasi web yang mengikuti alur kerja bisnismu.",
    tags: ["React", "Node.js", "Laravel"],
  },
  {
    icon: Database,
    number: "03",
    slug: "backend-api",
    title: "Backend & API",
    description:
      "Backend, REST API, autentikasi, integrasi layanan, dan database yang terstruktur untuk kebutuhan aplikasi.",
    tags: ["Node.js", "PHP", "SQL"],
  },
  {
    icon: Smartphone,
    number: "04",
    slug: "aplikasi-mobile",
    title: "Aplikasi Android & iOS",
    description:
      "Pengembangan aplikasi mobile Android dan iOS yang terhubung dengan layanan dan alur kerja produkmu.",
    tags: ["Android", "iOS", "API Integration"],
  },
  {
    icon: Workflow,
    number: "05",
    slug: "maintenance-dukungan",
    title: "Maintenance & Dukungan",
    description:
      "Pemeliharaan, perbaikan bug, dan dukungan teknis untuk membantu website atau aplikasi tetap terawat setelah rilis.",
    tags: ["Bug Fixing", "Maintenance", "Technical Support"],
  },
];

const process = [
  ["01", "Diskusi kebutuhan", "Kita bahas tujuan, pengguna, fitur, timeline, dan ruang lingkup proyek."],
  ["02", "Rencana & desain", "Menyusun alur pengguna, prioritas fitur, dan arah tampilan sebelum development."],
  ["03", "Development & testing", "Membangun secara bertahap, menguji fitur, dan memberi ruang untuk feedback."],
  ["04", "Launch & dukungan", "Deploy aplikasi, serah terima, dan membahas kebutuhan maintenance bila diperlukan."],
];

const technologies = ["Next.js", "Node.js", "Laravel", "PHP", "SQL", "REST API", "Android", "iOS"];

export const metadata: Metadata = {
  metadataBase: new URL("https://karyakode.com"),
  title: "KaryaKode — Solusi Digital untuk Bisnis",
  description:
    "KaryaKode membantu bisnis merencanakan dan membangun website, aplikasi web, backend, dan solusi digital sesuai kebutuhan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://karyakode.com",
    siteName: "KaryaKode",
    title: "KaryaKode — Solusi Digital untuk Bisnis",
    description:
      "Website, aplikasi web, backend dan API, aplikasi Android/iOS, serta maintenance dan dukungan untuk kebutuhan bisnis.",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaryaKode — Solusi Digital untuk Bisnis",
    description:
      "Website, aplikasi web, backend dan API, aplikasi Android/iOS, serta maintenance dan dukungan untuk kebutuhan bisnis.",
  },
};

export default function Home() {
  // Kontak resmi belum dikonfirmasi. Semua CTA diarahkan ke bagian kontak,
  // bukan ke nomor WhatsApp contoh atau kanal yang belum tersedia.
  const contactUrl = "#kontak";

  return (
    <>
    <a href="#konten-utama" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-slate-950">
      Lewati ke konten utama
    </a>
    <main id="konten-utama" className="min-h-screen overflow-hidden bg-[#0b0d12] text-[#f3f4f6]">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#beranda" className="flex items-center gap-3" aria-label="KaryaKode, ke beranda">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#10131a]">
            <Code2 size={23} strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">KaryaKode</span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-slate-500">DIGITAL STUDIO</span>
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          <a className="transition hover:text-white" href="#beranda">Beranda</a>
          <a className="transition hover:text-white" href="#layanan">Layanan</a>
          <a className="transition hover:text-white" href="#proses">Proses</a>
          <a className="transition hover:text-white" href="#teknologi">Teknologi</a>
          <a className="transition hover:text-white" href="/tentang-kami">Tentang Kami</a>
          <a className="transition hover:text-white" href="/price-list">Price List</a>
          <a className="transition hover:text-white" href="#kontak">Kontak</a>
        </nav>

        <a
          href={contactUrl}
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 sm:inline-flex"
        >
          Konsultasi proyek <ArrowUpRight size={16} />
        </a>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="/tentang-kami" className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/[0.05]">
            Tentang
          </a>
          <a href="/price-list" className="inline-flex items-center rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/[0.05]">
            Harga
          </a>
          <a href="#kontak" className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/[0.05]" aria-label="Ke bagian kontak">
            Kontak <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <section id="beranda" className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:pb-32 lg:pt-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3.5 py-2 text-xs font-medium text-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            PARTNER PENGEMBANGAN PRODUK DIGITAL
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[4.35rem]">
            Ide besar. <span className="text-blue-400">Karya digital.</span> Hasil nyata.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            KaryaKode membantu bisnis membangun website, software, backend, dan aplikasi mobile yang dirancang sesuai kebutuhan nyata.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={contactUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400">
              <MessageCircle size={17} /> Mulai diskusi <ArrowUpRight size={16} />
            </a>
            <a href="#layanan" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.04]">
              Jelajahi layanan <ArrowDownRight size={16} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-blue-400" /> Komunikasi transparan</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-blue-400" /> Solusi sesuai kebutuhan</span>
            <span className="inline-flex items-center gap-2"><Check size={14} className="text-blue-400" /> Siap dikembangkan</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-[#11151e]/90 p-4 shadow-2xl shadow-black/40 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#F87171]"/><span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]"/><span className="h-2.5 w-2.5 rounded-full bg-[#34D399]"/></div>
              <span className="text-xs text-slate-500">karyakode / project.ts</span>
              <Code2 size={16} className="text-slate-500" />
            </div>
            <CodeTypingEditor />
            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4 sm:gap-3">
              <div className="rounded-xl bg-white/[0.04] p-3"><Globe2 size={18} className="mb-3 text-blue-400"/><p className="text-xs font-medium text-slate-200">Web</p><p className="mt-1 text-[10px] text-slate-500">Sites & apps</p></div>
              <div className="rounded-xl bg-white/[0.04] p-3"><Braces size={18} className="mb-3 text-blue-400"/><p className="text-xs font-medium text-slate-200">Backend</p><p className="mt-1 text-[10px] text-slate-500">API & systems</p></div>
              <div className="rounded-xl bg-white/[0.04] p-3"><Smartphone size={18} className="mb-3 text-blue-400"/><p className="text-xs font-medium text-slate-200">Mobile</p><p className="mt-1 text-[10px] text-slate-500">Android & iOS</p></div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#171c27] px-4 py-3 shadow-xl sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Zap size={18}/></span>
            <span><span className="block text-xs font-semibold text-white">Dibangun untuk kebutuhanmu</span><span className="mt-1 block text-[10px] text-slate-500">Bukan solusi satu untuk semua</span></span>
          </div>
        </div>
      </section>

      <section id="layanan" className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">APA YANG KAMI KERJAKAN</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Solusi digital yang mengikuti kebutuhan bisnismu.</h2>
            <p className="mt-4 leading-7 text-slate-400">Mulai dari kebutuhan online sederhana hingga sistem yang mendukung proses bisnis lebih kompleks.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link href={`/layanan/${service.slug}`} key={service.number} className="group block rounded-2xl border border-white/[0.09] bg-[#10131a] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 sm:p-7" aria-label={`Pelajari layanan ${service.title}`}>
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-blue-300"><Icon size={22}/></span>
                    <span className="font-mono text-xs text-slate-600">/{service.number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-400">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400">{tag}</span>)}</div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition group-hover:text-blue-200">Pelajari layanan <ArrowUpRight size={15} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      <section id="portofolio" className="relative z-10 border-y border-white/[0.07] bg-[#0e1118]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">STUDI KASUS PILIHAN</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Solusi yang dibangun untuk kebutuhan nyata.</h2>
              <p className="mt-4 leading-7 text-slate-400">Contoh ruang lingkup produk digital yang dikembangkan, dari pengalaman belanja online hingga dukungan operasional logistik.</p>
            </div>
            <a href={contactUrl} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200">
              Diskusikan proyekmu <ArrowRight size={16}/>
            </a>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="group overflow-hidden rounded-3xl border border-white/[0.09] bg-[#11151e] transition hover:border-blue-400/30">
              <div className="relative overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_80%_10%,rgba(59,130,246,0.22),transparent_48%),linear-gradient(135deg,#151c2a,#10131a)] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-blue-300/20 bg-blue-300/[0.08] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-blue-200">MARKETPLACE</span>
                  <span className="font-mono text-xs text-slate-500">CASE 01</span>
                </div>
                <div className="mt-8 flex min-h-32 items-center gap-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-200 shadow-lg shadow-blue-950/20">
                    <Fish size={38} strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Pisjo Market</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Marketplace ikan segar</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Pengalaman belanja produk perikanan dengan alur katalog, keranjang, checkout, dan pengelolaan pesanan.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">FOKUS PENGEMBANGAN</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Katalog dan informasi produk", "Alur checkout dan pengiriman", "Pengelolaan pesanan dan admin", "SEO teknis dan pengalaman mobile"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300"><Check size={16} className="mt-1 shrink-0 text-blue-300"/>{item}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Prisma", "PostgreSQL"].map((tag) => <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400">{tag}</span>)}
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-3xl border border-white/[0.09] bg-[#11151e] transition hover:border-amber-300/30">
              <div className="relative overflow-hidden border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_80%_10%,rgba(245,158,11,0.16),transparent_48%),linear-gradient(135deg,#211b13,#10131a)] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-amber-200">LOGISTICS PLATFORM</span>
                  <span className="font-mono text-xs text-slate-500">CASE 02</span>
                </div>
                <div className="mt-8 flex min-h-32 items-center gap-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-200 shadow-lg shadow-amber-950/20">
                    <Truck size={38} strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="text-sm text-amber-200">Pinarak Express</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Platform operasional logistik</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Fondasi platform untuk mendukung alur pengiriman, pemantauan status, dan kebutuhan operasional kurir.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">FOKUS PENGEMBANGAN</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Siklus hidup pengiriman", "Dashboard operasional", "Status dan tindak lanjut kiriman", "Fondasi integrasi API dan data"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300"><Check size={16} className="mt-1 shrink-0 text-amber-200"/>{item}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Prisma", "PostgreSQL"].map((tag) => <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-slate-400">{tag}</span>)}
                </div>
              </div>
            </article>
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-500">Ringkasan ini menjelaskan area pengembangan, bukan klaim metrik bisnis. Tautan demo publik dan angka hasil hanya akan ditambahkan setelah tersedia dan terverifikasi.</p>
        </div>
      </section>

      <section id="proses" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-blue-400">PROSES KERJA</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Jelas dari awal. Terarah sampai rilis.</h2>
            <p className="mt-4 max-w-md leading-7 text-slate-400">Proses yang transparan membantu kita menyepakati prioritas, ruang lingkup, dan ekspektasi sebelum proyek berjalan.</p>
            <a href={contactUrl} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200">Mulai diskusi <ArrowRight size={16}/></a>
          </div>
          <div className="divide-y divide-white/[0.08]">
            {process.map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[44px_1fr] gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[56px_1fr] sm:gap-5">
                <span className="pt-1 font-mono text-sm text-blue-400">{number}</span>
                <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teknologi" className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-semibold tracking-[0.22em] text-blue-400">TEKNOLOGI</p><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Teknologi yang tepat untuk masalah yang tepat.</h2></div>
            <p className="max-w-md text-sm leading-7 text-slate-400">Pemilihan stack mengikuti kebutuhan produk, integrasi, anggaran, dan rencana pengembangan ke depan.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">{technologies.map((tech) => <span key={tech} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#10131a] px-4 py-3 text-sm text-slate-300"><Layers3 size={15} className="text-blue-400"/>{tech}</span>)}</div>
        </div>
      </section>

      <section id="kontak" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
  <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#111a2a] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
    <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
    <div className="relative">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-blue-300">PUNYA IDE ATAU KEBUTUHAN?</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Mari wujudkan solusi digital yang kamu butuhkan.</h2>
        <p className="mt-4 leading-7 text-slate-300">Ceritakan tujuan dan tantangan bisnismu. Status pengiriman akan dikonfirmasi setelah sistem memproses permintaan konsultasimu.</p>
      </div>
      <div className="mt-8">
        <ContactForm />
        <p className="mt-4 text-xs leading-6 text-slate-500">Dengan mengirim formulir, Anda memahami pemrosesan informasi konsultasi sebagaimana dijelaskan dalam <a href="/kebijakan-privasi" className="text-slate-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Kebijakan Privasi</a>.</p>
      </div>
    </div>
  </div>
</section>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <a href="#beranda" className="flex items-center gap-2 font-semibold"><Code2 size={18}/> KaryaKode</a>
          <p className="text-slate-500">Website, aplikasi, dan dukungan teknis untuk kebutuhan bisnis.</p>
          <nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400">
            <a href="/tentang-kami" className="transition hover:text-white">Tentang Kami</a>
            <a href="/price-list" className="transition hover:text-white">Price List</a>
            <a href="#layanan" className="transition hover:text-white">Layanan</a>
            <a href="#kontak" className="transition hover:text-white">Kontak</a>
            <a href="/kebijakan-privasi" className="transition hover:text-white">Kebijakan Privasi</a>
          </nav>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} KaryaKode. All rights reserved.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
