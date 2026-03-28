-- Fix email_send_log: scope policies to service_role instead of public
DROP POLICY IF EXISTS "Service role can insert send log" ON public.email_send_log;
CREATE POLICY "Service role can insert send log" ON public.email_send_log FOR INSERT TO service_role WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can read send log" ON public.email_send_log;
CREATE POLICY "Service role can read send log" ON public.email_send_log FOR SELECT TO service_role USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update send log" ON public.email_send_log;
CREATE POLICY "Service role can update send log" ON public.email_send_log FOR UPDATE TO service_role USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Fix email_unsubscribe_tokens: scope to service_role
DROP POLICY IF EXISTS "Service role can insert tokens" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can insert tokens" ON public.email_unsubscribe_tokens FOR INSERT TO service_role WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can read tokens" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can read tokens" ON public.email_unsubscribe_tokens FOR SELECT TO service_role USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can mark tokens as used" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can mark tokens as used" ON public.email_unsubscribe_tokens FOR UPDATE TO service_role USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Fix suppressed_emails: scope to service_role
DROP POLICY IF EXISTS "Service role can insert suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Service role can insert suppressed emails" ON public.suppressed_emails FOR INSERT TO service_role WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can read suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Service role can read suppressed emails" ON public.suppressed_emails FOR SELECT TO service_role USING (auth.role() = 'service_role');

-- Fix email_send_state: scope to service_role
DROP POLICY IF EXISTS "Service role can manage send state" ON public.email_send_state;
CREATE POLICY "Service role can manage send state" ON public.email_send_state FOR ALL TO service_role USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');