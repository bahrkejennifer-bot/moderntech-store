-- Make the digital-products bucket private
UPDATE storage.buckets SET public = false WHERE id = 'digital-products';

-- Remove the public SELECT policy that allows anyone to download
DROP POLICY IF EXISTS "Public can download digital products" ON storage.objects;