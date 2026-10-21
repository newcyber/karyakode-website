-- Run this migration against the PostgreSQL database configured for KaryaKode.
-- The table stores consultation requests only; it does not send email or WhatsApp messages.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(120),
  service VARCHAR(40) NOT NULL CHECK (
    service IN (
      'website-bisnis',
      'aplikasi-web',
      'backend-api',
      'aplikasi-mobile',
      'maintenance-dukungan',
      'belum-yakin'
    )
  ),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 20 AND 3000),
  status VARCHAR(20) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'IN_PROGRESS', 'CLOSED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_status_created_at_idx
  ON contact_submissions (status, created_at DESC);
