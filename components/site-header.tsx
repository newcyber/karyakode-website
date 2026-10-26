"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";

const navigation = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Proses", href: "/#proses" },
  { label: "Teknologi", href: "/#teknologi" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Price List", href: "/price-list" },
  { label: "Project Planner", href: "/project-planner" },
  { label: "Kontak", href: "/#kontak" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0b0d12]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[84px] lg:px-10">
        <Link
          href="/#beranda"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="KaryaKode, ke beranda"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#10131a] sm:h-11 sm:w-11">
            <Code2 size={23} strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-white sm:text-lg">
              KaryaKode
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.2em] text-slate-500 sm:text-[10px]">
              DIGITAL STUDIO
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-3 text-xs text-slate-300 xl:flex 2xl:gap-5 2xl:text-sm"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#kontak"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-4 xl:inline-flex"
        >
          Konsultasi proyek <ArrowUpRight size={15} />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 xl:hidden"
          aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi mobile"
          className="border-t border-white/[0.08] bg-[#0b0d12] px-4 pb-5 pt-3 shadow-2xl sm:px-6 xl:hidden"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-between gap-2 rounded-xl border border-white/[0.07] px-3 py-3 text-sm text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-400/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                {item.label}
                <ArrowUpRight size={14} className="shrink-0 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-3 max-w-7xl">
            <Link
              href="/#kontak"
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300"
            >
              Konsultasi proyek <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
