"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ArrowLeft, LogOut, RefreshCw, Search, ShieldCheck, Inbox, X } from "lucide-react";
import Link from "next/link";

type Status = "NEW" | "IN_PROGRESS" | "CLOSED";
type Submission = {
  id: string; name: string; email: string; company: string | null; service: string;
  message: string; status: Status; created_at: string;
};
type ContactAnalytics = {
  totals: { all: number; new: number; inProgress: number; closed: number; last30Days: number };
  services: { service: string; count: number }[];
};
const serviceLabels: Record<string, string> = {
  "website-bisnis": "Website bisnis", "aplikasi-web": "Aplikasi web", "backend-api": "Backend / API",
  "aplikasi-mobile": "Aplikasi mobile", "maintenance-dukungan": "Maintenance & dukungan", "belum-yakin": "Belum yakin",
};

export default function AdminContactsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [analytics, setAnalytics] = useState<ContactAnalytics | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadSubmissions = useCallback(async (filterStatus = statusFilter, query = search) => {
    setBusy(true);
    try {
      const params = new URLSearchParams({ status: filterStatus, q: query });
      const response = await fetch(`/api/admin/contacts?${params}`, { cache: "no-store" });
      if (response.status === 401) { setAuthenticated(false); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Pesan gagal dimuat.");
      setSubmissions(data.submissions as Submission[]);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally { setBusy(false); }
  }, [statusFilter, search]);

  const loadAnalytics = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (response.status === 401) { setAuthenticated(false); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Analytics gagal dimuat.");
      setAnalytics(data as ContactAnalytics);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Analytics gagal dimuat.");
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/contacts", { cache: "no-store" }).then(async (response) => {
      if (!active) return;
      if (response.status === 401) { setAuthenticated(false); return; }
      if (!response.ok) { const data = await response.json(); throw new Error(data.message ?? "Tidak dapat memeriksa sesi."); }
      setAuthenticated(true);
      const data = await response.json();
      setSubmissions(data.submissions as Submission[]);
      void loadAnalytics();
    }).catch((error: unknown) => { if (active) setMessage(error instanceof Error ? error.message : "Terjadi kesalahan."); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [loadAnalytics]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Login gagal.");
      setAuthenticated(true); setPassword("");
      await Promise.all([loadSubmissions(), loadAnalytics()]);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Login gagal."); }
    finally { setBusy(false); setChecking(false); }
  }

  async function updateStatus(item: Submission, status: Status) {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/contacts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, status }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Status gagal diperbarui.");
      setSubmissions((current) => current.map((entry) => entry.id === item.id ? data.submission : entry));
      setSelected((current) => current?.id === item.id ? data.submission : current);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Status gagal diperbarui."); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false); setSubmissions([]); setSelected(null); setMessage("");
  }

  if (checking) return <main className="flex min-h-screen items-center justify-center bg-[#0b0d12] text-slate-300">Memeriksa sesi admin…</main>;

  if (!authenticated) return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d12] px-4 py-12 text-slate-100">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#11151e] p-7 shadow-2xl sm:p-9">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16} /> Kembali ke website</Link>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300"><ShieldCheck size={24} /></div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">KaryaKode Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Masuk ke dashboard</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Gunakan kredensial admin yang dikonfigurasi pada environment server.</p>
        <form onSubmit={handleLogin} className="mt-7 space-y-4">
          <label className="block text-sm text-slate-300">Email admin<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0d12] px-4 py-3 text-white outline-none focus:border-blue-400" /></label>
          <label className="block text-sm text-slate-300">Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0d12] px-4 py-3 text-white outline-none focus:border-blue-400" /></label>
          {message && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{message}</p>}
          <button disabled={busy} className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60">{busy ? "Memeriksa…" : "Masuk"}</button>
        </form>
      </section>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#0b0d12] px-4 py-6 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div><Link href="/" className="text-sm text-slate-400 hover:text-white">KaryaKode / Website</Link><h1 className="mt-2 text-3xl font-semibold tracking-tight">Pesan kontak</h1><p className="mt-2 text-sm text-slate-400">Kelola permintaan konsultasi yang masuk dari website.</p></div>
          <div className="flex gap-2"><button onClick={() => { void loadSubmissions(); void loadAnalytics(); }} disabled={busy} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5 disabled:opacity-60"><RefreshCw size={16} /> Muat ulang</button><button onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5"><LogOut size={16} /> Keluar</button></div>
        </header>
        <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total lead", value: analytics?.totals.all },
            { label: "Baru", value: analytics?.totals.new },
            { label: "Diproses", value: analytics?.totals.inProgress },
            { label: "Lead 30 hari", value: analytics?.totals.last30Days },
          ].map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-[#11151e] p-5"><p className="text-sm text-slate-400">{item.label}</p><p className="mt-2 text-3xl font-semibold">{item.value ?? "—"}</p></div>)}
        </section>
        <section className="mt-3 rounded-2xl border border-white/10 bg-[#11151e] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div><h2 className="font-semibold">Minat layanan</h2><p className="mt-1 text-xs text-slate-500">Berdasarkan semua permintaan yang tersimpan di database.</p></div>
            <p className="text-xs text-slate-500">Selesai: {analytics?.totals.closed ?? "—"}</p>
          </div>
          {analytics && analytics.services.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {analytics.services.map((item) => {
                const label = serviceLabels[item.service] ?? item.service;
                const percentage = analytics.totals.all > 0 ? Math.round((item.count / analytics.totals.all) * 100) : 0;
                return <div key={item.service} className="rounded-xl border border-white/[0.07] bg-[#0b0d12] p-4">
                  <div className="flex items-start justify-between gap-3"><p className="text-sm text-slate-300">{label}</p><p className="text-sm font-semibold text-white">{item.count}</p></div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-400" style={{ width: `${percentage}%` }} /></div>
                  <p className="mt-2 text-xs text-slate-500">{percentage}% dari seluruh lead</p>
                </div>;
              })}
            </div>
          ) : <p className="mt-4 text-sm text-slate-500">{analytics ? "Belum ada data layanan." : "Memuat analytics…"}</p>}
        </section>
        <section className="mt-6 rounded-2xl border border-white/10 bg-[#11151e] p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative block flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input aria-label="Cari nama, email, atau perusahaan" placeholder="Cari nama, email, perusahaan…" value={search} onChange={(event) => { const value = event.target.value; setSearch(value); void loadSubmissions(statusFilter, value); }} className="w-full rounded-xl border border-white/10 bg-[#0b0d12] py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-400" /></label>
            <select aria-label="Filter status" value={statusFilter} onChange={(event) => { const value = event.target.value; setStatusFilter(value); void loadSubmissions(value, search); }} className="rounded-xl border border-white/10 bg-[#0b0d12] px-3 py-3 text-sm"><option value="ALL">Semua status</option><option value="NEW">Baru</option><option value="IN_PROGRESS">Diproses</option><option value="CLOSED">Selesai</option></select>
          </div>
          {message && <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{message}</p>}
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3 font-medium">Kontak</th><th className="px-3 py-3 font-medium">Layanan</th><th className="px-3 py-3 font-medium">Tanggal</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Detail</th></tr></thead><tbody>
            {submissions.map((item) => <tr key={item.id} className="border-b border-white/5 align-top hover:bg-white/[0.025]"><td className="px-3 py-4"><p className="font-medium text-white">{item.name}</p><p className="mt-1 text-slate-400">{item.email}</p>{item.company && <p className="mt-1 text-xs text-slate-500">{item.company}</p>}</td><td className="px-3 py-4 text-slate-300">{serviceLabels[item.service] ?? item.service}</td><td className="whitespace-nowrap px-3 py-4 text-slate-400">{new Date(item.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</td><td className="px-3 py-4"><select aria-label={`Status pesan ${item.id}`} value={item.status} disabled={busy} onChange={(event) => void updateStatus(item, event.target.value as Status)} className="rounded-lg border border-white/10 bg-[#0b0d12] px-2 py-2 text-xs"><option value="NEW">Baru</option><option value="IN_PROGRESS">Diproses</option><option value="CLOSED">Selesai</option></select></td><td className="px-3 py-4"><button onClick={() => setSelected(item)} className="rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5">Lihat pesan</button></td></tr>)}
          </tbody></table>
          {!submissions.length && <div className="flex flex-col items-center py-14 text-center"><Inbox size={30} className="text-slate-600" /><p className="mt-3 font-medium">Belum ada pesan yang cocok</p><p className="mt-1 text-sm text-slate-500">Coba ubah filter atau kata pencarian.</p></div>}
          </div>
          <p className="mt-4 text-xs text-slate-500">Menampilkan maksimal 50 pesan terbaru yang cocok dengan filter.</p>
        </section>
      </div>
      {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#11151e] p-6 sm:rounded-3xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-blue-300">Pesan #{selected.id}</p><h2 id="detail-title" className="mt-2 text-2xl font-semibold">{selected.name}</h2></div><button aria-label="Tutup detail" onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><X size={20} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div><p className="text-xs text-slate-500">Email</p><a className="mt-1 inline-block break-all text-blue-300 hover:underline" href={`mailto:${selected.email}`}>{selected.email}</a></div><div><p className="text-xs text-slate-500">Perusahaan</p><p className="mt-1">{selected.company || "Tidak diisi"}</p></div><div><p className="text-xs text-slate-500">Layanan</p><p className="mt-1">{serviceLabels[selected.service] ?? selected.service}</p></div><div><p className="text-xs text-slate-500">Dikirim</p><p className="mt-1">{new Date(selected.created_at).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" })}</p></div></div><div className="mt-6 rounded-2xl border border-white/10 bg-[#0b0d12] p-4"><p className="text-xs text-slate-500">Isi pesan</p><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">{selected.message}</p></div><div className="mt-6 flex flex-wrap justify-end gap-2"><a href={`mailto:${selected.email}?subject=${encodeURIComponent("Tindak lanjut konsultasi KaryaKode")}`} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Balas via email</a><button onClick={() => setSelected(null)} className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold hover:bg-blue-400">Selesai</button></div></section></div>}
    </main>
  );
}
