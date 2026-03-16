ALTER TABLE public.scraped_products 
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Allow admins to update scraped products (needed for toggling is_active and upsert)
CREATE POLICY "Admins can update scraped products"
  ON public.scraped_products
  FOR UPDATE
  TO public
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow service_role to insert (for webhook-ingest)
CREATE POLICY "Service role can insert scraped products"
  ON public.scraped_products
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service_role to update (for webhook-ingest upsert)
CREATE POLICY "Service role can update scraped products"
  ON public.scraped_products
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);