import type { Metadata, Viewport } from "next";
import "./globals.css";
import FloatingActions from "@/components/floating-actions";

export const metadata: Metadata = {
  metadataBase: new URL("https://karyakode.com"),
  applicationName: "KaryaKode",
  title: {
    default: "KaryaKode — Solusi Digital untuk Bisnis",
    template: "%s | KaryaKode",
  },
  description:
    "KaryaKode membantu bisnis membangun website, aplikasi web, backend dan API, aplikasi Android/iOS, serta layanan maintenance dan dukungan.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://karyakode.com",
    siteName: "KaryaKode",
    title: "KaryaKode — Solusi Digital untuk Bisnis",
    description:
      "Website, aplikasi web, backend dan API, aplikasi Android/iOS, serta dukungan teknis untuk kebutuhan bisnis.",
  },
  twitter: {
    card: "summary",
    title: "KaryaKode — Solusi Digital untuk Bisnis",
    description:
      "Solusi website, aplikasi, backend, dan dukungan teknis untuk bisnis.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
