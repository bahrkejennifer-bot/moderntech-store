CREATE TABLE public.product_redirects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  amazon_url TEXT NOT NULL,
  search_fallback_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active redirects"
ON public.product_redirects
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage redirects"
ON public.product_redirects
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role full access to redirects"
ON public.product_redirects
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE INDEX idx_product_redirects_slug ON public.product_redirects (slug);
