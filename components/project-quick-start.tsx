"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Globe2,
  Layers3,
  Smartphone,
  Wrench,
} from "lucide-react";

const projectTypes = [
  {
    value: "website",
    label: "Website bisnis",
    description: "Company profile, landing page, atau website penjualan.",
    icon: Globe2,
  },
  {
    value: "webapp",
    label: "Aplikasi web",
    description: "Dashboard, marketplace, portal, atau sistem operasional.",
    icon: Layers3,
  },
  {
    value: "mobile",
    label: "Aplikasi mobile",
    description: "Produk Android atau iOS yang sesuai kebutuhan pengguna.",
    icon: Smartphone,
  },
  {
    value: "api",
    label: "Backend & API",
    description: "Integrasi layanan, database, dan fondasi aplikasi.",
    icon: Code2,
  },
  {
    value: "maintenance",
    label: "Perbaikan & maintenance",
    description: "Perbaikan bug dan peningkatan aplikasi yang sudah ada.",
    icon: Wrench,
  },
];

export default function ProjectQuickStart() {
  const [selected, setSelected] = useState("website");

  const selectedProject =
    projectTypes.find((project) => project.value === selected) ??
    projectTypes[0];

  const SelectedIcon = selectedProject.icon;
  const plannerUrl = `/project-planner?service=${selected}`;

  return (
    <section
      aria-labelledby="quick-start-title"
      className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#101722] p-5 shadow-2xl shadow-blue-950/20 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          MULAI DARI SINI
        </div>

        <h2
          id="quick-start-title"
          className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          Apa yang ingin kamu bangun?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Pilih kebutuhanmu. Kami bantu susun langkah berikutnya tanpa harus
          mengetahui semua detail teknis sejak awal.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {projectTypes.map((project) => {
            const Icon = project.icon;
            const active = selected === project.value;

            return (
              <button
                key={project.value}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(project.value)}
                className={`group flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                  active
                    ? "border-blue-400/60 bg-blue-400/[0.09] shadow-lg shadow-blue-950/20"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                    active
                      ? "bg-blue-400 text-slate-950"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-white">
                    {project.label}
                    {active && (
                      <Check
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-blue-300"
                      />
                    )}
                  </span>
                  <span className="mt-1.5 block text-xs leading-5 text-slate-400">
                    {project.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-5 flex flex-col gap-4 rounded-2xl border border-blue-400/20 bg-blue-400/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
              <SelectedIcon size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-blue-300">
                PILIHAN PROYEKMU
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {selectedProject.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {selectedProject.description}
              </p>
            </div>
          </div>

          <Link
            href={plannerUrl}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            Lanjutkan
            <ArrowRight size={16} />
          </Link>
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-slate-500 sm:text-left">
          Pilihan ini akan dibawa ke planner. Kamu masih bisa menyesuaikannya di sana.
        </p>
      </div>
    </section>
  );
}
