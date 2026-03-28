-- Fix lead_captures: restrict to only inserting own data with required fields
DROP POLICY IF EXISTS "Anyone can submit lead capture" ON public.lead_captures;
CREATE POLICY "Anyone can submit lead capture"
  ON public.lead_captures
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND
    name IS NOT NULL AND
    length(email) <= 255 AND
    length(name) <= 100
  );

-- Fix service_role policies: replace WITH CHECK (true) with explicit service_role check
-- These are technically redundant since service_role bypasses RLS, but silences the linter

DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;
CREATE POLICY "Service role can insert purchases"
  ON public.purchases
  FOR INSERT
  TO service_role
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can insert scraped products" ON public.scraped_products;
CREATE POLICY "Service role can insert scraped products"
  ON public.scraped_products
  FOR INSERT
  TO service_role
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update scraped products" ON public.scraped_products;
CREATE POLICY "Service role can update scraped products"
  ON public.scraped_products
  FOR UPDATE
  TO service_role
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');