-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

ALTER TABLE subscribers
  ADD COLUMN IF NOT EXISTS ref_token  TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- Backfill existing rows so ref_token is never null going forward
UPDATE subscribers
SET ref_token = encode(gen_random_bytes(6), 'hex')
WHERE ref_token IS NULL;

ALTER TABLE subscribers
  ALTER COLUMN ref_token SET NOT NULL;
