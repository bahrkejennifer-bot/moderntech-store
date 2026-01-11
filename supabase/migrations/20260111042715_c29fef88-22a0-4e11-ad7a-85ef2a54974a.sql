-- Remove the existing authenticated reads policy (allows any authenticated user to download)
DROP POLICY IF EXISTS "Allow authenticated reads" ON storage.objects;

-- Create restrictive policy: only service role can read from digital-products bucket
-- This forces all downloads to go through the generate-download-link edge function
CREATE POLICY "Service role only can read digital products" ON storage.objects
FOR SELECT TO service_role
USING (bucket_id = 'digital-products');