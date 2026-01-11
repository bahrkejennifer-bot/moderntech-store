-- Fix products_public view to use SECURITY INVOKER instead of SECURITY DEFINER
-- First get the view definition
DO $$
DECLARE
  view_def text;
BEGIN
  SELECT definition INTO view_def 
  FROM pg_views 
  WHERE schemaname = 'public' AND viewname = 'products_public';
END $$;

-- Drop and recreate with SECURITY INVOKER
DROP VIEW IF EXISTS public.products_public;

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
  -- Exclude pdf_path for security - use Edge Function for downloads
  NULL::text as pdf_path
FROM public.digital_products;

-- Grant access
GRANT SELECT ON public.products_public TO anon, authenticated;