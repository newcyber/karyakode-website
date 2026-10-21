
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Informasi tentang pengumpulan, penggunaan, penyimpanan, dan perlindungan data pribadi melalui formulir konsultasi KaryaKode.",
  alternates: { canonical: "/kebijakan-privasi" },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://karyakode.com/kebijakan-privasi",
    siteName: "KaryaKode",
    title: "Kebijakan Privasi | KaryaKode",
    description:
      "Ketahui bagaimana informasi yang dikirim melalui formulir konsultasi KaryaKode digunakan dan dikelola.",
    locale: "id_ID",
  },
};

const privacyEmail = "newcyber.inc@gmail.com";

export default function PrivacyPolicyPage() {
  return (
    <main
      id="konten-utama"
      className="min-h-screen bg-[#0b0d12] text-[#f3f4f6]"
    >
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(57,120,246,0.15),transparent_42%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="KaryaKode, ke beranda"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#10131a]">
            <Code2 size={23} strokeWidth={2.5} />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">
              KaryaKode
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-slate-500">
              DIGITAL STUDIO
            </span>
          </span>
        </Link>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke beranda
        </Link>

        <p className="mt-10 text-xs font-semibold tracking-[0.22em] text-blue-400">
          INFORMASI PRIVASI
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Kebijakan Privasi
        </h1>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          Kebijakan ini menjelaskan bagaimana KaryaKode menangani informasi
          pribadi yang Anda kirim melalui formulir konsultasi di website ini.
          Dengan mengirim formulir, Anda dapat membaca informasi berikut
          mengenai penggunaan dan pengelolaan data tersebut.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Informasi yang Dikumpulkan
            </h2>
            <p className="mt-3">
              Formulir konsultasi dapat meminta nama, alamat email, nama bisnis
              atau perusahaan (opsional), jenis layanan yang diminati, dan
              pesan mengenai kebutuhan proyek. Website juga dapat memproses
              informasi teknis yang diperlukan untuk menjaga keamanan dan
              mencegah penyalahgunaan formulir, seperti informasi terkait
              permintaan jaringan.
            </p>
            <p className="mt-3">
              Mohon jangan mengirim kata sandi, data pembayaran, atau informasi
              sensitif yang tidak diperlukan untuk konsultasi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Tujuan Penggunaan Informasi
            </h2>
            <p className="mt-3">
              Informasi yang Anda kirim digunakan untuk menerima dan meninjau
              permintaan konsultasi, memahami kebutuhan proyek, menghubungi
              Anda terkait permintaan tersebut, serta mengelola komunikasi
              mengenai layanan KaryaKode.
            </p>
            <p className="mt-3">
              Pengiriman formulir tidak dengan sendirinya berarti bahwa suatu
              proyek telah disetujui, kontrak telah terbentuk, atau pekerjaan
              telah dimulai.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Penyimpanan dan Perlindungan Data
            </h2>
            <p className="mt-3">
              Informasi permintaan konsultasi disimpan dalam database aplikasi.
              Akses terhadap data administratif dibatasi melalui mekanisme
              autentikasi aplikasi. Langkah teknis dan operasional diterapkan
              untuk membantu melindungi data dari akses atau penggunaan yang
              tidak sah.
            </p>
            <p className="mt-3">
              Data disimpan selama diperlukan untuk menangani permintaan
              konsultasi, menjalankan layanan terkait, dan memenuhi kewajiban
              yang berlaku. Masa penyimpanan dapat bergantung pada tujuan
              pemrosesan, kebutuhan operasional, serta kewajiban hukum yang
              relevan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Layanan Pihak Ketiga
            </h2>
            <p className="mt-3">
              Untuk mendukung operasional website, data dapat diproses oleh
              penyedia infrastruktur yang digunakan aplikasi. Aplikasi juga
              dapat menggunakan layanan Resend untuk mengirim notifikasi email
              terkait permintaan konsultasi, bergantung pada konfigurasi yang
              aktif.
            </p>
            <p className="mt-3">
              Pemrosesan oleh penyedia tersebut mengikuti layanan dan ketentuan
              yang berlaku bagi penyedia bersangkutan. Kami tidak menyatakan
              bahwa semua data selalu dikirim kepada setiap penyedia; hal
              tersebut bergantung pada alur dan konfigurasi operasional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Akses, Koreksi, dan Penghapusan Data
            </h2>
            <p className="mt-3">
              Anda dapat menghubungi kami untuk menanyakan informasi pribadi
              yang telah dikirim, meminta koreksi data yang tidak akurat, atau
              mengajukan permintaan penghapusan data. Setiap permintaan akan
              ditinjau dan ditangani sesuai ketentuan yang berlaku serta
              kewajiban penyimpanan yang relevan.
            </p>
            <p className="mt-3">
              Untuk membantu kami menemukan permintaan yang dimaksud, sertakan
              konteks yang wajar, misalnya alamat email yang digunakan saat
              mengirim formulir. Jangan mengirim kata sandi atau informasi
              sensitif tambahan melalui email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Pertanyaan dan Kontak Privasi
            </h2>
            <p className="mt-3">
              Jika Anda memiliki pertanyaan atau ingin mengajukan permintaan
              terkait privasi dan informasi pribadi, silakan hubungi KaryaKode
              melalui alamat email berikut.
            </p>

            <a
              href={`mailto:${privacyEmail}`}
              className="mt-4 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-medium text-blue-300 transition hover:border-blue-400/40 hover:bg-white/[0.07] hover:text-blue-200"
            >
              <Mail size={18} />
              <span>{privacyEmail}</span>
            </a>
          </section>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-slate-500">
          Jika terdapat perubahan pada cara pengelolaan informasi pribadi,
          kebijakan ini dapat diperbarui agar mencerminkan praktik yang berlaku.
          Silakan periksa halaman ini secara berkala.
        </p>
      </article>

      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-7 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/" className="font-semibold">
            KaryaKode
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <Link
              href="/kebijakan-privasi"
              className="transition hover:text-white"
            >
              Kebijakan Privasi
            </Link>
            <span>
              © {new Date().getFullYear()} KaryaKode. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
