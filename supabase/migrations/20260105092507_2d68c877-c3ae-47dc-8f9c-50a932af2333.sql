-- Drop the security definer view that was causing issues
DROP VIEW IF EXISTS public.products_public;

-- Instead, we'll use a security invoker view (which is the default and secure)
CREATE VIEW public.products_public 
WITH (security_invoker = true)
AS
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