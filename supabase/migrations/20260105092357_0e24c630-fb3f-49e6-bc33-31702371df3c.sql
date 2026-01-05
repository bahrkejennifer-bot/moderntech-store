-- Fix: Ensure purchases SELECT policy strictly validates user ownership via auth.uid()
-- The current policy already uses (auth.uid() = user_id), but let's reinforce it

-- Drop and recreate the SELECT policy with explicit auth validation  
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.purchases;

CREATE POLICY "Users can view their own purchases" 
ON public.purchases 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Add admin access to purchases for customer support
CREATE POLICY "Admins can view all purchases" 
ON public.purchases 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));