CREATE TABLE public.weekly_tech_specs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  html_content text NOT NULL,
  plain_text text,
  blog_post_ids uuid[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  generated_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  recipients_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.weekly_tech_specs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tech specs"
ON public.weekly_tech_specs
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role full access to tech specs"
ON public.weekly_tech_specs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);