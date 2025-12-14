-- Add display_order column to digital_products
ALTER TABLE public.digital_products 
ADD COLUMN display_order integer DEFAULT 0;