
-- Create table for scraped Amazon products
CREATE TABLE public.scraped_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT,
  image_url TEXT,
  affiliate_link TEXT NOT NULL,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scraped_products ENABLE ROW LEVEL SECURITY;

-- Anyone can view scraped products (public product pages)
CREATE POLICY "Anyone can view scraped products"
ON public.scraped_products FOR SELECT
USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert scraped products"
ON public.scraped_products FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete scraped products"
ON public.scraped_products FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
