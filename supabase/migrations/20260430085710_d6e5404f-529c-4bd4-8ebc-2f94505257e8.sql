CREATE TABLE public.pending_lead_confirmations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token text NOT NULL UNIQUE,
  email text NOT NULL,
  name text NOT NULL,
  lead_magnet text NOT NULL DEFAULT '90-day-amazon-associate-roadmap',
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  confirmed_at timestamptz,
  CONSTRAINT email_length CHECK (length(email) <= 255),
  CONSTRAINT name_length CHECK (length(name) <= 100)
);

CREATE INDEX idx_pending_lead_confirmations_token ON public.pending_lead_confirmations(token);
CREATE INDEX idx_pending_lead_confirmations_email ON public.pending_lead_confirmations(email);

ALTER TABLE public.pending_lead_confirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request confirmation"
ON public.pending_lead_confirmations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND name IS NOT NULL
  AND token IS NOT NULL
  AND length(email) <= 255
  AND length(name) <= 100
);

CREATE POLICY "Admins can view pending confirmations"
ON public.pending_lead_confirmations
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role full access to pending confirmations"
ON public.pending_lead_confirmations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);