
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.sync_products_public_metadata() FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.assign_first_admin() FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.increment_redirect_clicks(text) FROM authenticated, anon;
