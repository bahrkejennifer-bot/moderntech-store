-- Replace the safe product view with a real metadata table so public/customer reads
-- do not depend on bypassing digital_products RLS.
DROP VIEW IF EXISTS public.products_public;

CREATE TABLE IF NOT EXISTS public.products_public (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  price numeric DEFAULT 0,
  is_free boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  pdf_path text
);

ALTER TABLE public.products_public ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view safe product metadata" ON public.products_public;
CREATE POLICY "Anyone can view safe product metadata"
ON public.products_public
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Service role can manage safe product metadata" ON public.products_public;
CREATE POLICY "Service role can manage safe product metadata"
ON public.products_public
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Populate/refresh current metadata. pdf_path is deliberately forced to NULL.
INSERT INTO public.products_public (
  id, slug, title, description, price, is_free, display_order, created_at, updated_at, pdf_path
)
SELECT
  id, slug, title, description, price, is_free, display_order, created_at, updated_at, NULL::text
FROM public.digital_products
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  is_free = EXCLUDED.is_free,
  display_order = EXCLUDED.display_order,
  created_at = EXCLUDED.created_at,
  updated_at = EXCLUDED.updated_at,
  pdf_path = NULL;

CREATE OR REPLACE FUNCTION public.sync_products_public_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.products_public WHERE id = OLD.id;
    RETURN OLD;
  END IF;

  INSERT INTO public.products_public (
    id, slug, title, description, price, is_free, display_order, created_at, updated_at, pdf_path
  )
  VALUES (
    NEW.id, NEW.slug, NEW.title, NEW.description, NEW.price, NEW.is_free,
    NEW.display_order, NEW.created_at, NEW.updated_at, NULL
  )
  ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    is_free = EXCLUDED.is_free,
    display_order = EXCLUDED.display_order,
    created_at = EXCLUDED.created_at,
    updated_at = EXCLUDED.updated_at,
    pdf_path = NULL;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_products_public_metadata() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sync_products_public_metadata() FROM anon, authenticated;

DROP TRIGGER IF EXISTS sync_products_public_metadata_trigger ON public.digital_products;
CREATE TRIGGER sync_products_public_metadata_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.digital_products
FOR EACH ROW
EXECUTE FUNCTION public.sync_products_public_metadata();

GRANT SELECT ON public.products_public TO anon, authenticated;

-- has_role is needed by RLS policies but should not be callable anonymously.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;