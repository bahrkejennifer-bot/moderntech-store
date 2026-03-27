
-- 1. Enable RLS on the my_purchases view
ALTER VIEW public.my_purchases SET (security_barrier = true);

-- 2. Drop the overly permissive user_roles INSERT policy
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;

-- 3. Recreate it restricted to authenticated users only (not public)
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
);
