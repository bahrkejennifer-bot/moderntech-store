-- Remove the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view products" ON public.digital_products;

-- Allow only admins to SELECT directly from digital_products (which includes pdf_path)
CREATE POLICY "Admins can view all products"
  ON public.digital_products
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Ensure anon and authenticated can read from products_public view
GRANT SELECT ON public.products_public TO anon, authenticated;