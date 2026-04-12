
-- 1. Add RLS policy to products_public view (it's a view, enable RLS on it)
ALTER VIEW public.products_public SET (security_invoker = true);

-- 2. Add UPDATE and DELETE policies on user_roles for admins
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Drop the first-admin auto-assignment trigger (admin already exists)
DROP TRIGGER IF EXISTS on_first_user_created ON auth.users;
