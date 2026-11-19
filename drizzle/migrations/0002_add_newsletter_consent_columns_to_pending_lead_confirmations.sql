ALTER TABLE public.pending_lead_confirmations
  ADD COLUMN IF NOT EXISTS newsletter_opt_in boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS newsletter_consent_at timestamptz;