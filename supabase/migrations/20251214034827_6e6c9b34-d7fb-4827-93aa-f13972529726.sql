-- Add UPDATE policy to allow authenticated users to update/replace files
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'digital-products')
WITH CHECK (bucket_id = 'digital-products');