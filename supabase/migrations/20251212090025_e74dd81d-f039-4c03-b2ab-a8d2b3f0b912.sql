-- Create storage bucket for digital products
INSERT INTO storage.buckets (id, name, public) 
VALUES ('digital-products', 'digital-products', false);

-- Allow authenticated users to upload files (admin only - you'll be the only authenticated user)
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'digital-products');

-- Allow authenticated users to view files
CREATE POLICY "Allow authenticated reads" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'digital-products');

-- Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'digital-products');

-- Create a table to track which PDF is associated with which product
CREATE TABLE public.digital_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  pdf_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products (for display)
CREATE POLICY "Anyone can view products" ON public.digital_products
FOR SELECT USING (true);

-- Only authenticated can modify
CREATE POLICY "Authenticated can insert" ON public.digital_products
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update" ON public.digital_products
FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can delete" ON public.digital_products
FOR DELETE TO authenticated USING (true);

-- Insert the 6 products
INSERT INTO public.digital_products (slug, title, description, price, is_free) VALUES
('kids-tech-guide', 'Age-Appropriate Technology for Kids & Teens', 'The Parent''s Guide to Safe, Educational Tech from Ages 3-18', 0, true),
('smart-home-guide', 'Top 10 Smart Home Devices', 'Complete guide to smart home automation and security', 10, false),
('gaming-monitors-guide', 'Best Gaming Monitors Under $500', 'Expert picks for every gaming setup and budget', 10, false),
('earbuds-guide', 'Wireless Earbuds Comparison 2025', 'Find your perfect audio companion', 10, false),
('student-tech-guide', 'Student Tech Essentials 2025', 'Everything students need for academic success', 10, false),
('fitness-trackers-guide', 'Fitness Trackers for Every Budget', 'Track your health goals with the right device', 10, false);