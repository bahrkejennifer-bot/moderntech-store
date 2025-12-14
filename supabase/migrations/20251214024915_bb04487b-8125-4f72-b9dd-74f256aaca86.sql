-- Make the digital-products bucket public so users can download the free PDF
UPDATE storage.buckets SET public = true WHERE id = 'digital-products';

-- Add RLS policy to allow public read access to all files in the bucket
CREATE POLICY "Public can download digital products"
ON storage.objects
FOR SELECT
USING (bucket_id = 'digital-products');