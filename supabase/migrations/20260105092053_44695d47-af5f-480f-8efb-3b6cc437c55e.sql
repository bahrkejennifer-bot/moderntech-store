-- Fix 1: Drop overly permissive policies on digital_products
DROP POLICY IF EXISTS "Authenticated can delete" ON public.digital_products;
DROP POLICY IF EXISTS "Authenticated can insert" ON public.digital_products;
DROP POLICY IF EXISTS "Authenticated can update" ON public.digital_products;

-- Create admin-only policies for digital_products
CREATE POLICY "Admins can insert products" 
ON public.digital_products 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update products" 
ON public.digital_products 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete products" 
ON public.digital_products 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix 2: Drop the overly permissive purchases INSERT policy
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;

-- Create a proper service-role-only INSERT policy (uses auth.role() check)
CREATE POLICY "Service role can insert purchases" 
ON public.purchases 
FOR INSERT 
TO service_role
WITH CHECK (true);