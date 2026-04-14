CREATE OR REPLACE FUNCTION public.increment_redirect_clicks(redirect_slug TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.product_redirects
  SET click_count = click_count + 1, updated_at = now()
  WHERE slug = redirect_slug;
END;
$$;
