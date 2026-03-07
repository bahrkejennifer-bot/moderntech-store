CREATE TABLE public.lead_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  lead_magnet text NOT NULL DEFAULT '90-day-amazon-associate-roadmap',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(email, lead_magnet)
);

ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit lead capture" ON public.lead_captures
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view leads" ON public.lead_captures
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));