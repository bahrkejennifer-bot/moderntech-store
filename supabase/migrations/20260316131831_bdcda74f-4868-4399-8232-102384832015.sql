-- Create a public storage bucket for episode thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('episode-thumbnails', 'episode-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view episode thumbnails
CREATE POLICY "Anyone can view episode thumbnails"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'episode-thumbnails');

-- Allow authenticated admins to upload episode thumbnails
CREATE POLICY "Admins can upload episode thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow authenticated admins to update episode thumbnails
CREATE POLICY "Admins can update episode thumbnails"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow authenticated admins to delete episode thumbnails
CREATE POLICY "Admins can delete episode thumbnails"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'episode-thumbnails'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);