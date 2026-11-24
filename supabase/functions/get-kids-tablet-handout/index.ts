import { createClient } from "npm:@supabase/supabase-js@2";
import { createHandoutHandler, readHandoutFromStorage } from "./handout.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const url = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!url || !serviceKey) throw new Error("Missing server configuration");
const client = createClient(url, serviceKey);

// Public signup uses validated email rather than a login JWT; GET requires a signed token.
// Reuse the existing server-only key with a handout-specific HMAC domain, never expose it.
Deno.serve(createHandoutHandler({
  client, secret: serviceKey,
  functionUrl: `${url}/functions/v1/get-kids-tablet-handout`,
  readPdf: () => readHandoutFromStorage(client),
  cors: corsHeaders,
  background: (work) => EdgeRuntime.waitUntil(work),
}));