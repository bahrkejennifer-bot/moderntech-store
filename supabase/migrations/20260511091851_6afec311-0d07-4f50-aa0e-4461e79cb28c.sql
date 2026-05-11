-- Allow RLS policies that call has_role() to evaluate for browser/API roles.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

-- Expose only non-sensitive product metadata via a safe definer view.
-- Direct digital_products access remains governed by RLS, so pdf_path stays private.
DROP VIEW IF EXISTS public.products_public;
CREATE VIEW public.products_public
WITH (security_barrier = true) AS
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
  NULL::text AS pdf_path
FROM public.digital_products;

GRANT SELECT ON public.products_public TO anon, authenticated;

-- Keep customer purchase reads scoped to the signed-in user and avoid exposing Stripe session IDs.
DROP VIEW IF EXISTS public.my_purchases;
CREATE VIEW public.my_purchases
WITH (security_invoker = true, security_barrier = true) AS
SELECT
  p.id,
  p.user_id,
  p.product_id,
  p.purchased_at
FROM public.purchases p
WHERE p.user_id = auth.uid();

GRANT SELECT ON public.my_purchases TO authenticated;

-- Let bundle checkouts record multiple fulfilled products from a single Stripe session.
ALTER TABLE public.purchases DROP CONSTRAINT IF EXISTS unique_stripe_session;
DROP INDEX IF EXISTS public.unique_stripe_session;
CREATE UNIQUE INDEX IF NOT EXISTS purchases_unique_stripe_session_product
ON public.purchases (stripe_session_id, product_id)
WHERE stripe_session_id IS NOT NULL;