-- Create a secure view for user purchases that excludes customer_email
-- This view uses auth.uid() to only return the authenticated user's purchases
CREATE OR REPLACE VIEW public.my_purchases AS
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

-- Remove the direct SELECT policy for regular users on purchases table
-- Keep admin access for management purposes
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.purchases;