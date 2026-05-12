-- 1. Lock down trigger functions (only the trigger system needs to call them)
REVOKE EXECUTE ON FUNCTION public.sync_products_public_metadata() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.assign_first_admin() FROM PUBLIC, anon, authenticated;

-- 2. Checkout error log
CREATE TABLE IF NOT EXISTS public.checkout_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage TEXT NOT NULL, -- 'create_checkout' | 'session_expired' | 'payment_failed' | 'webhook_error'
  product_slug TEXT,
  customer_email TEXT,
  stripe_session_id TEXT,
  amount_cents INTEGER,
  error_code TEXT,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS checkout_errors_created_at_idx ON public.checkout_errors (created_at DESC);
CREATE INDEX IF NOT EXISTS checkout_errors_stage_idx ON public.checkout_errors (stage);

ALTER TABLE public.checkout_errors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view checkout errors"
  ON public.checkout_errors FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can insert checkout errors"
  ON public.checkout_errors FOR INSERT
  TO service_role
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access to checkout errors"
  ON public.checkout_errors FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);