-- Drop overly permissive storage policies that allow ANY authenticated user to upload/update/delete
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;

-- Create admin-only storage policies for the digital-products bucket
CREATE POLICY "Admins can upload to digital-products" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'digital-products' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update digital-products" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'digital-products' AND
  public.has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  bucket_id = 'digital-products' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete from digital-products" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'digital-products' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);