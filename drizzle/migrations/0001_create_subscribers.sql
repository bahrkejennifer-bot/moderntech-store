CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  source_page text,
  freebie text,
  consent boolean NOT NULL DEFAULT false,
  consent_text text,
  signup_date timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT subscribers_email_format CHECK (email = lower(btrim(email)) AND length(email) BETWEEN 3 AND 255 AND email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  CONSTRAINT subscribers_name_len CHECK (name IS NULL OR length(name) <= 100),
  CONSTRAINT subscribers_source_len CHECK (source_page IS NULL OR length(source_page) <= 300),
  CONSTRAINT subscribers_freebie_len CHECK (freebie IS NULL OR length(freebie) <= 100),
  CONSTRAINT subscribers_consent_len CHECK (consent_text IS NULL OR length(consent_text) <= 300)
);
CREATE UNIQUE INDEX subscribers_email_key ON public.subscribers (email);

GRANT INSERT ON public.subscribers TO anon, authenticated;
GRANT SELECT ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up" ON public.subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (signup_date > now() - interval '5 minutes' AND signup_date < now() + interval '5 minutes');
CREATE POLICY "Admins can view subscribers" ON public.subscribers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.subscribers (email, name, source_page, freebie, consent, signup_date)
SELECT DISTINCT ON (lower(btrim(email))) lower(btrim(email)), left(name, 100), 'earlier signup', left(lead_magnet, 100), false, created_at
FROM public.lead_captures
WHERE lower(btrim(email)) ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
ORDER BY lower(btrim(email)), created_at ASC
ON CONFLICT (email) DO NOTHING;