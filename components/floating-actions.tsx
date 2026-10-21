"use client";

import { ArrowUp, MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/6285182525707?text=" +
  encodeURIComponent(
    "Halo KaryaKode, saya ingin berkonsultasi mengenai proyek digital..",
  );

export default function FloatingActions() {
  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex items-end justify-between px-4 sm:bottom-6 sm:px-6">
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
        className="pointer-events-auto grid size-12 shrink-0 place-items-center rounded-full border border-white/15 bg-[#171b25] text-white shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-[#252b38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
      >
        <ArrowUp size={22} aria-hidden="true" />
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp KaryaKode"
        title="Chat WhatsApp KaryaKode"
        className="pointer-events-auto inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d12]"
      >
        <MessageCircle size={27} strokeWidth={2.3} aria-hidden="true" />
      </a>
    </div>
  );
}
