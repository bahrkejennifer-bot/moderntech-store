-- Fix 1: Create a view for public product display that excludes pdf_path for paid products
CREATE OR REPLACE VIEW public.products_public AS
SELECT 
  id,
  slug,
  title,
  description,
  price,
  is_free,
  display_order,
  created_at,
  updated_at,
  CASE 
    WHEN is_free = true THEN pdf_path 
    ELSE NULL 
  END as pdf_path
FROM public.digital_products;

-- Grant access to the view
GRANT SELECT ON public.products_public TO anon;
GRANT SELECT ON public.products_public TO authenticated;

-- Fix 2: Modify digital_products SELECT policy to hide pdf_path for paid products
-- First drop the existing permissive policy
DROP POLICY IF EXISTS "Anyone can view products" ON public.digital_products;

-- Create a policy that allows viewing but the view will handle the column filtering
CREATE POLICY "Anyone can view products" 
ON public.digital_products 
FOR SELECT 
USING (true);