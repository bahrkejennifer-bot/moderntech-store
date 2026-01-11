-- Drop and recreate the view with SECURITY INVOKER (default, safer)
DROP VIEW IF EXISTS public.my_purchases;

CREATE VIEW public.my_purchases 
WITH (security_invoker = true)
AS
SELECT 
  p.id,
  p.user_id,
  p.product_id,
  p.purchased_at,
  p.stripe_session_id
FROM public.purchases p
WHERE p.user_id = auth.uid();

-- Grant access to authenticated users
GRANT SELECT ON public.my_purchases TO authenticated;