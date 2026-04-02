
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Thumbnails are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

CREATE POLICY "Admins can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));
