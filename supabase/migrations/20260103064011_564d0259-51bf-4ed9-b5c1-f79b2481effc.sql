-- Drop problematic policy that references auth.users
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.purchases;

-- Create simpler policy that uses auth.uid() directly
CREATE POLICY "Users can view their own purchases"
ON public.purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Add unique constraint to prevent duplicate purchases from webhook retries
ALTER TABLE public.purchases ADD CONSTRAINT unique_stripe_session UNIQUE (stripe_session_id);