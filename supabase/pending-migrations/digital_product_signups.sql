-- STAGED, NOT YET APPLIED. Apply only after the owner approves the backend rollout.
ALTER TABLE public.pending_lead_confirmations
  ADD COLUMN IF NOT EXISTS newsletter_opt_in boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS newsletter_consent_at timestamptz;

CREATE TABLE IF NOT EXISTS public.digital_product_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dedupe_key text NOT NULL UNIQUE,
  kind text NOT NULL CHECK (kind IN ('free', 'paid')),
  email text NOT NULL,
  product_slug text,
  product_label text,
  source text,
  amount_cents integer,
  stripe_session_id text,
  newsletter_opt_in boolean NOT NULL DEFAULT false,
  newsletter_consent_text text,
  newsletter_consent_at timestamptz,
  newsletter_enrolled_at timestamptz,
  admin_notified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.digital_product_signups TO authenticated;
GRANT ALL ON public.digital_product_signups TO service_role;

ALTER TABLE public.digital_product_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view digital product signups"
  ON public.digital_product_signups FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role manages digital product signups"
  ON public.digital_product_signups FOR ALL TO service_role
  USING (true) WITH CHECK (true);
