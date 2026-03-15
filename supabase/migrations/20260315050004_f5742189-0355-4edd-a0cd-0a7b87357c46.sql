
-- Table to persist Pinterest OAuth tokens so edge functions auto-read them
CREATE TABLE public.pinterest_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token text NOT NULL,
  refresh_token text,
  token_type text DEFAULT 'bearer',
  scope text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Only admins can view/manage tokens
ALTER TABLE public.pinterest_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage pinterest tokens"
  ON public.pinterest_tokens
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Service role needs access from edge functions
CREATE POLICY "Service role full access to pinterest tokens"
  ON public.pinterest_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
