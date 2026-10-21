export type ServiceDetail = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  useCases: string[];
  scope: string[];
  questions: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    "slug": "website-bisnis",
    "number": "01",
    "eyebrow": "WEBSITE BISNIS",
    "title": "Website bisnis yang jelas, cepat, dan mudah dikembangkan",
    "summary": "Bangun kehadiran digital yang menjelaskan bisnis, layanan, dan langkah berikutnya bagi calon pelanggan.",
    "description": "Website bisnis dapat menjadi pusat informasi resmi untuk memperkenalkan perusahaan, menjelaskan layanan, dan membantu pengunjung memahami cara menghubungi bisnis. Struktur dan fitur ditentukan berdasarkan tujuan, konten, serta kebutuhan pengguna.",
    "useCases": [
      "Company profile untuk memperkenalkan bisnis dan tim.",
      "Landing page untuk menjelaskan satu layanan atau penawaran.",
      "Halaman informasi produk, layanan, FAQ, dan kontak.",
      "Pembaruan struktur konten dan tampilan website yang sudah ada."
    ],
    "scope": [
      "Struktur halaman dan navigasi berdasarkan kebutuhan.",
      "Tampilan responsif untuk ponsel, tablet, dan desktop.",
      "Metadata SEO dasar dan struktur heading yang teratur.",
      "CTA dan tautan yang mengarah ke kanal resmi setelah dikonfirmasi."
    ],
    "questions": [
      "Tujuan utama website dan siapa pengunjungnya.",
      "Halaman, konten, bahasa, dan aset visual yang tersedia.",
      "Integrasi yang dibutuhkan serta siapa yang memperbarui konten."
    ]
  },
  {
    "slug": "aplikasi-web",
    "number": "02",
    "eyebrow": "APLIKASI WEB",
    "title": "Aplikasi web yang mengikuti alur kerja bisnis",
    "summary": "Rancang aplikasi berbasis browser untuk mengelola proses, data, dan interaksi sesuai kebutuhan operasional.",
    "description": "Aplikasi web berbeda dari website informasi karena biasanya memiliki alur pengguna, data, dan fungsi interaktif. Ruang lingkup perlu disepakati sebelum development agar fitur prioritas, hak akses, dan aturan bisnis dapat diuji dengan jelas.",
    "useCases": [
      "Dashboard internal untuk melihat informasi operasional.",
      "Portal pelanggan atau mitra dengan akses sesuai peran.",
      "Alur reservasi, permintaan layanan, atau pengelolaan data.",
      "Digitalisasi proses yang sebelumnya dilakukan secara manual."
    ],
    "scope": [
      "Pemetaan alur pengguna dan kebutuhan fitur.",
      "Komponen antarmuka dan validasi input.",
      "Integrasi API atau database sesuai rancangan yang disepakati.",
      "Pengujian alur utama dan kondisi error yang relevan."
    ],
    "questions": [
      "Siapa pengguna aplikasi dan apa peran masing-masing.",
      "Proses mana yang ingin disederhanakan atau didigitalisasi.",
      "Data apa yang dikelola serta kebutuhan integrasi dan keamanan."
    ]
  },
  {
    "slug": "backend-api",
    "number": "03",
    "eyebrow": "BACKEND & API",
    "title": "Backend dan API sebagai fondasi aplikasi",
    "summary": "Susun logika server, struktur data, dan integrasi agar aplikasi memiliki fondasi yang terarah.",
    "description": "Backend menangani logika aplikasi, akses data, autentikasi, dan komunikasi dengan layanan lain. Desainnya mengikuti kebutuhan produk dan sistem yang sudah tersedia, bukan memakai satu pola yang sama untuk semua proyek.",
    "useCases": [
      "REST API untuk website atau aplikasi mobile.",
      "Autentikasi dan otorisasi berbasis peran.",
      "Integrasi dengan layanan pihak ketiga yang didukung.",
      "Perancangan struktur database dan alur pemrosesan data."
    ],
    "scope": [
      "Pendefinisian endpoint, payload, dan respons error.",
      "Validasi input dan pemeriksaan hak akses.",
      "Rancangan model data dan migrasi jika diperlukan.",
      "Dokumentasi teknis untuk endpoint dan konfigurasi integrasi."
    ],
    "questions": [
      "Sistem yang akan memakai API dan kebutuhan integrasinya.",
      "Jenis data, volume penggunaan, dan kebutuhan akses.",
      "Lingkungan deployment, aturan keamanan, dan sistem yang sudah ada."
    ]
  },
  {
    "slug": "aplikasi-mobile",
    "number": "04",
    "eyebrow": "APLIKASI ANDROID & IOS",
    "title": "Aplikasi mobile yang terhubung dengan kebutuhan produk",
    "summary": "Rencanakan pengalaman mobile Android dan iOS berdasarkan pengguna, fitur inti, dan kebutuhan integrasi.",
    "description": "Pengembangan aplikasi mobile dimulai dari penentuan platform, fitur utama, alur pengguna, serta hubungan dengan backend. Teknologi dan pendekatan implementasi ditentukan setelah kebutuhan dan batasan proyek dipahami.",
    "useCases": [
      "Aplikasi pelanggan untuk mengakses layanan.",
      "Aplikasi internal untuk mendukung kegiatan operasional.",
      "Aplikasi yang menggunakan API dari sistem yang sudah ada.",
      "Pengembangan fitur atau perbaikan pada aplikasi yang berjalan."
    ],
    "scope": [
      "Pemetaan alur layar dan fitur prioritas.",
      "Perancangan komunikasi aplikasi dengan API.",
      "Penanganan loading, error, dan keadaan kosong.",
      "Persiapan pengujian pada perangkat dan proses rilis sesuai cakupan."
    ],
    "questions": [
      "Platform target dan perangkat pengguna.",
      "Fitur wajib untuk versi pertama.",
      "Apakah backend sudah tersedia dan bagaimana distribusi aplikasinya."
    ]
  },
  {
    "slug": "maintenance-dukungan",
    "number": "05",
    "eyebrow": "MAINTENANCE & DUKUNGAN",
    "title": "Pemeliharaan teknis untuk website dan aplikasi",
    "summary": "Jaga agar sistem tetap terawat melalui perbaikan, pembaruan terencana, dan peninjauan masalah teknis.",
    "description": "Maintenance dimulai dengan memahami kondisi sistem, akses yang tersedia, dokumentasi, serta risiko perubahan. Lingkup dukungan dan waktu respons harus disepakati terlebih dahulu berdasarkan kebutuhan dan kapasitas yang tersedia.",
    "useCases": [
      "Investigasi dan perbaikan bug yang dapat direproduksi.",
      "Pembaruan dependency atau komponen yang relevan.",
      "Pemeriksaan error dan masalah performa yang teridentifikasi.",
      "Bantuan teknis untuk perubahan kecil pada website atau aplikasi."
    ],
    "scope": [
      "Audit awal terhadap sistem dan cara menjalankannya.",
      "Daftar masalah berdasarkan dampak dan prioritas.",
      "Perubahan terukur dengan validasi setelah perbaikan.",
      "Catatan perubahan dan rekomendasi tindak lanjut."
    ],
    "questions": [
      "Teknologi yang digunakan dan akses yang tersedia.",
      "Masalah yang sedang terjadi serta langkah reproduksinya.",
      "Kebutuhan dukungan, prioritas, dan batas waktu yang diharapkan."
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
