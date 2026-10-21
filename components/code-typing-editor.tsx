
"use client";

import { useEffect, useState } from "react";

type Segment = {
  text: string;
  className?: string;
};

type CodeLine = {
  segments: Segment[];
};

const codeLines: CodeLine[] = [
  {
    segments: [
      { text: "const ", className: "text-purple-300" },
      { text: "digitalProduct", className: "text-blue-300" },
      { text: " = {" },
    ],
  },
  {
    segments: [
      { text: "    idea: " },
      { text: '"Your business goal"', className: "text-emerald-300" },
      { text: "," },
    ],
  },
  {
    segments: [
      { text: "    design: " },
      { text: '"Thoughtful & useful"', className: "text-emerald-300" },
      { text: "," },
    ],
  },
  {
    segments: [{ text: "    technology: [" }],
  },
  {
    segments: [
      {
        text: '      "Web", "Backend", "Mobile"',
        className: "text-amber-200",
      },
    ],
  },
  {
    segments: [{ text: "    ]," }],
  },
  {
    segments: [{ text: "};" }],
  },
];

const lineText = codeLines.map((line) =>
  line.segments.map((segment) => segment.text).join(""),
);

const totalCharacters = lineText.reduce(
  (total, line) => total + line.length,
  0,
);

const charactersBeforeLine = lineText.map((_, index) =>
  lineText
    .slice(0, index)
    .reduce((total, line) => total + line.length, 0),
);

export default function CodeTypingEditor() {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mengikuti preferensi animasi dari sistem operasi pengguna.
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  // Animasi mengetik dan menghapus kode berulang kali.
  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let position = 0;
    let deleting = false;
    let pauseUntil = Date.now() + 900;

    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntil) {
        return;
      }

      if (!deleting) {
        position = Math.min(position + 1, totalCharacters);
        setVisibleCharacters(position);

        if (position === totalCharacters) {
          deleting = true;
          pauseUntil = Date.now() + 1500;
        }
      } else {
        position = Math.max(position - 1, 0);
        setVisibleCharacters(position);

        if (position === 0) {
          deleting = false;
          pauseUntil = Date.now() + 450;
        }
      }
    }, 28);

    return () => {
      window.clearInterval(interval);
    };
  }, [reducedMotion]);

  // Jika reduced motion aktif, langsung tampilkan seluruh kode.
  const displayCharacters = reducedMotion
    ? totalCharacters
    : visibleCharacters;

  // Tentukan baris tempat kursor animasi berada tanpa mutasi variabel.
  const activeCaretLine = lineText.findIndex((text, index) => {
    const lineEnd = charactersBeforeLine[index] + text.length;

    return displayCharacters < lineEnd;
  });

  const caretLineIndex =
    activeCaretLine === -1 ? lineText.length - 1 : activeCaretLine;

  const renderedLines = codeLines.map((line, lineIndex) => {
    const text = lineText[lineIndex];

    const shownOnLine = Math.max(
      0,
      Math.min(
        text.length,
        displayCharacters - charactersBeforeLine[lineIndex],
      ),
    );

    let lineRemaining = shownOnLine;

    const renderedSegments = line.segments.map(
      (segment, segmentIndex) => {
        const visibleLength = Math.max(
          0,
          Math.min(segment.text.length, lineRemaining),
        );

        lineRemaining -= visibleLength;

        if (visibleLength === 0) {
          return null;
        }

        return (
          <span
            className={segment.className}
            key={`${lineIndex}-${segmentIndex}`}
          >
            {segment.text.slice(0, visibleLength)}
          </span>
        );
      },
    );

    return (
      <div className="min-h-[1.75em]" key={lineIndex}>
        {renderedSegments}

        {!reducedMotion &&
          caretLineIndex === lineIndex && (
            <span
              aria-hidden="true"
              className="code-typing-caret"
            />
          )}
      </div>
    );
  });

  return (
    <div
      className="grid grid-cols-[44px_1fr] gap-3 py-6 font-mono text-xs leading-7 sm:text-sm"
      aria-label="Animasi kode KaryaKode"
    >
      <div
        aria-hidden="true"
        className="select-none text-right text-slate-600"
      >
        {codeLines.map((_, index) => (
          <div className="min-h-[1.75em]" key={index}>
            {String(index + 1).padStart(2, "0")}
          </div>
        ))}
      </div>

      <div
        className="overflow-hidden whitespace-pre text-slate-300"
        aria-hidden="true"
      >
        {renderedLines}
      </div>

      <span className="sr-only">
        Contoh kode produk digital dengan tujuan bisnis, desain yang
        bermanfaat, serta teknologi web, backend, dan mobile.
      </span>
    </div>
  );
}
