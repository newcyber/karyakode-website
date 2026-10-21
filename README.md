# KaryaKode — Website Agency

Website publik KaryaKode untuk menawarkan layanan pengembangan digital kepada bisnis. Desain awal menggunakan gaya modern/dark dengan aksen biru.

## Stack

- Next.js App Router (Next.js 16)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- Lucide React

## Mulai lokal

Persyaratan: Node.js 20.9 atau lebih baru.

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Perintah validasi

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Cakupan saat ini

- Landing page: hero, layanan, proses kerja, teknologi, kontak, dan footer.
- Layanan yang dikonfirmasi: website bisnis, aplikasi web, backend/API, aplikasi Android/iOS, serta maintenance dan dukungan.
- Metadata dasar: title, description, canonical, Open Graph, Twitter Card, robots, locale Indonesia, dan theme color.
- Aksesibilitas dasar: `lang="id"`, skip link, fokus keyboard yang terlihat, label link mobile, dan dukungan preferensi reduced motion.
- Tidak ada nomor WhatsApp contoh atau detail kontak fiktif. CTA mengarah ke bagian kontak sampai kanal resmi dikonfirmasi.

## Konfigurasi sebelum publikasi

1. Konfirmasi domain `karyakode.com`, DNS, dan HTTPS. Metadata saat ini menggunakan domain tersebut sebagai domain rencana.
2. Isi `DATABASE_URL`, jalankan SQL migration, dan uji formulir konsultasi ke database. Formulir belum mengirim email atau WhatsApp.
3. Verifikasi isi layanan dan teknologi berdasarkan kapasitas aktual.
4. Siapkan gambar sosial/Open Graph yang berlisensi dan identitas brand final.
5. Jalankan type-check, lint, dan production build; lakukan pemeriksaan tampilan di mobile dan desktop.

## Belum termasuk

CMS, analytics, portfolio/studi kasus, testimoni, harga, pengiriman email otomatis, dan deployment. Fitur-fitur tersebut belum termasuk.


## Halaman detail layanan

Landing page menyediakan tautan ke lima halaman statis di bawah `/layanan/`: `website-bisnis`, `aplikasi-web`, `backend-api`, `aplikasi-mobile`, dan `maintenance-dukungan`. Konten dikelola di `lib/services.ts`; setiap halaman menghasilkan metadata dan canonical sendiri. Informasi harga, testimoni, portofolio, dan kontak tidak ditambahkan karena belum dikonfirmasi.

## Form konsultasi + PostgreSQL

Form kontak mengirim JSON ke `POST /api/contact`. Server memvalidasi data dan hanya mengembalikan status berhasil setelah perintah `INSERT` ke PostgreSQL berhasil. Form tidak mengirim email atau WhatsApp.

### Environment

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `DATABASE_URL` dengan connection string PostgreSQL milikmu. Jangan commit `.env.local`.
3. Jalankan SQL migration berikut ke database tersebut:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f database/migrations/001_create_contact_submissions.sql
```

Di Git Bash pada Windows, jika `psql` tidak ada di PATH, jalankan file SQL melalui pgAdmin/SQL editor database yang kamu gunakan.

### Jalankan dan validasi

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm build
pnpm dev
```

Kunjungi `http://localhost:3000` dan kirim permintaan uji setelah database siap. Pastikan baris baru benar-benar muncul di `contact_submissions`.

### Endpoint

- `POST /api/contact`
- Required: `name` (2–100), `email`, `service`, `message` (20–3.000)
- Optional: `company` (maks. 120)
- Honeypot: `website` (harus kosong)

### Keamanan dan batasan

- Query memakai parameter `$1`–`$5` untuk menghindari SQL injection.
- Validasi dilakukan di server; pesan error database tidak ditampilkan ke pengguna.
- Honeypot dan rate limiting dalam memori mengurangi spam sederhana. Limit formulir saat ini 5 pengiriman per IP dalam 10 menit pada satu proses Node.js.
- Rate limiting dalam memori bukan perlindungan produksi multi-instance/serverless; gunakan shared store (misalnya Redis) atau rate limiting di edge/WAF. Header forwarding IP hanya boleh dipercaya jika platform hosting menimpa header tersebut.
- `DATABASE_URL` tidak diperlukan untuk proses build; jika belum dikonfigurasi, endpoint mengembalikan `503` dan UI menampilkan kegagalan, bukan keberhasilan palsu.
- Belum ada dashboard admin untuk membaca lead, pengiriman email, autentikasi staf, kebijakan retensi/penghapusan data, atau pengujian integrasi dengan database nyata.
- Data yang dikirim pengunjung adalah data pribadi. Sebelum publikasi, tambahkan pemberitahuan privasi yang menjelaskan tujuan pemrosesan, akses, dan retensi data.


## Dashboard admin kontak (v1)

### Environment admin

Salin `.env.example` menjadi `.env.local` dan isi nilai nyata untuk `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET`. Jangan commit file `.env.local`. `ADMIN_SESSION_SECRET` harus minimal 32 karakter; buat nilai acak dengan:

```bash
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Admin v1 menggunakan satu akun dari environment variables, sesi bertanda tangan HMAC selama 8 jam, cookie `HttpOnly`, `SameSite=Strict`, dan `Secure` di produksi. Password admin tidak disimpan di database. Login dibatasi 5 percobaan per IP per 15 menit per proses. Jika environment admin belum diatur, login mengembalikan `503`.

Buka `/admin/contacts` setelah server berjalan. Dashboard dapat mencari nama/email/perusahaan, memfilter status, melihat detail pesan, dan mengubah status. API daftar/detail dan perubahan status memerlukan sesi admin; perubahan juga memeriksa origin. Tidak ada migrasi tambahan: dashboard memakai tabel `contact_submissions` yang sudah ada.

**Batasan deployment:** rate limiter saat ini disimpan dalam memori proses dan hanya cocok sebagai perlindungan awal/local single-process. Untuk produksi, tambahkan shared rate-limit store atau edge/WAF. Jangan expose PostgreSQL langsung ke internet; gunakan koneksi privat/TLS dan kredensial database dengan hak minimum. Tambahkan juga backup, retensi/penghapusan data, dan pemberitahuan privasi sebelum publikasi.


## Notifikasi email lead (Fase 6)

Notifikasi email opsional dikirim melalui API Resend setelah lead berhasil tersimpan di PostgreSQL. Email tidak menjadi syarat keberhasilan formulir: jika layanan email belum dikonfigurasi atau sedang gagal, data lead tetap tersimpan dan endpoint tetap mengembalikan referensi yang sama.

### Konfigurasi

Tambahkan variabel berikut ke `.env.local`:

- `RESEND_API_KEY`: API key Resend yang disimpan hanya di server.
- `CONTACT_NOTIFICATION_EMAIL`: alamat inbox yang menerima lead baru.
- `CONTACT_FROM_EMAIL`: alamat pengirim atau format `Nama <email@domain-terverifikasi>` dari domain yang sudah diverifikasi di Resend.

Semua variabel email bersifat opsional. Jika salah satu belum diisi, notifikasi dilewati. Jangan menggunakan alamat pengirim dari domain yang belum diverifikasi. Jangan menambahkan API key ke kode frontend, commit, atau log.

Setelah mengubah `.env.local`, restart `pnpm dev`. Uji dengan mengirim formulir konsultasi dan pastikan:
1. Respons formulir sukses dan nomor referensi tampil.
2. Baris lead baru ada di `contact_submissions`.
3. Email notifikasi tiba di inbox yang dikonfigurasi (periksa folder spam bila perlu).

Kegagalan email dicatat secara ringkas di log server tanpa menampilkan data pribadi atau detail provider kepada pengunjung. Untuk kebutuhan produksi yang lebih kuat, pertimbangkan outbox/retry queue agar notifikasi yang gagal dapat dicoba ulang tanpa mengirim duplikat.


## Fase 7.1 — Portofolio / studi kasus

Landing page kini memiliki bagian `#portofolio` dengan dua studi kasus berdasarkan proyek yang dikembangkan:
- Pisjo Market: marketplace ikan segar, dengan fokus katalog, checkout, pesanan, pengalaman mobile, dan SEO.
- Pinarak Express: platform operasional logistik, dengan fokus siklus pengiriman, dashboard operasional, status kiriman, dan integrasi data.

Bagian ini tidak menggunakan metrik hasil yang belum diverifikasi, testimoni fiktif, atau tautan demo yang belum tersedia. Teknologi dan ruang lingkup perlu ditinjau kembali sebelum publikasi. Setelah demo publik atau repository yang boleh dibagikan tersedia, tautan dapat ditambahkan secara terukur.


## Fase 7.2 — Analytics konversi lead

Dashboard admin menggunakan endpoint terlindungi `GET /api/admin/analytics` untuk membaca agregat dari tabel `contact_submissions` yang sudah ada. Tidak ada tabel baru atau migration database.

Ringkasan mencakup total lead, lead baru, lead diproses, lead dalam 30 hari terakhir, jumlah lead selesai, serta distribusi minat layanan. Perhitungan dilakukan di PostgreSQL sehingga tidak bergantung pada batas 50 pesan yang ditampilkan di tabel dashboard.

Tidak ada pelacakan kunjungan individu, cookie analytics, atau data pribadi tambahan. Metrik saat ini adalah lead yang berhasil tersimpan, bukan total pengunjung atau conversion rate berbasis pengunjung karena website belum mengumpulkan jumlah kunjungan. Endpoint analytics memerlukan sesi admin.
