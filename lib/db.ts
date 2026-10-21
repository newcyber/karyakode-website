import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Do not throw during module import: build should work without production secrets.
  console.warn("DATABASE_URL is not configured; contact submissions will be unavailable.");
}

declare global {
  // Reuse a pool during Next.js development hot reloads.
  var karyakodePgPool: Pool | undefined;
}

function createPool() {
  if (!connectionString) return null;

  return new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    application_name: "karyakode-website",
  });
}

export const db = globalThis.karyakodePgPool ?? createPool();

if (process.env.NODE_ENV !== "production" && db) {
  globalThis.karyakodePgPool = db;
}
