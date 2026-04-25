// Shared zod schemas + types reused across edge functions.
// Single source of truth so validation stays consistent across deployments.
//
// Uses esm.sh so both Deno (https) and npm-style edge functions can import
// without requiring a deno.json nodeModulesDir setting.
import { z } from "https://esm.sh/zod@3.23.8";

// ============================================================
// scraped_products — used by webhook-ingest
// ============================================================

// Schema for incoming product payloads from external scrapers (Twin, Gumloop, n8n).
// Fail fast on missing/invalid fields.
export const IncomingProductSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(500),
  price: z.string().trim().max(50).optional().nullable(),
  image_url: z.string().url("image_url must be a valid URL").max(2000).optional().nullable(),
  product_url: z.string().url().max(2000).optional().nullable(),
  affiliate_link: z.string().url().max(2000).optional().nullable(),
  category: z.string().trim().max(100).optional().nullable(),
});
export type IncomingProduct = z.infer<typeof IncomingProductSchema>;

export const WebhookIngestBodySchema = z.object({
  products: z.array(z.unknown()).min(1, "products array is required").max(50),
  url: z.string().url().max(2000).optional().nullable(),
});
export type WebhookIngestBody = z.infer<typeof WebhookIngestBodySchema>;

// Typed row shape for scraped_products SELECT used during upsert dedup
export type ScrapedProductRow = {
  id: string;
  title: string;
  affiliate_link: string;
  price: string | null;
  image_url: string | null;
};

// ============================================================
// email queue — used by process-email-queue
// ============================================================

// Required fields for any email payload pulled off the queue.
// Anything missing these → fail fast and route to DLQ.
export const EmailPayloadSchema = z.object({
  to: z.string().trim().email().max(320),
  from: z.string().trim().min(1).max(320),
  subject: z.string().trim().min(1).max(998),
  html: z.string().min(1),
  text: z.string().min(1),
  message_id: z.string().trim().min(1).max(255).optional(),
  label: z.string().trim().max(100).optional(),
  sender_domain: z.string().optional(),
  purpose: z.string().optional(),
  run_id: z.string().optional(),
  idempotency_key: z.string().optional(),
  unsubscribe_token: z.string().optional(),
  queued_at: z.string().optional(),
}).passthrough();
export type EmailPayload = z.infer<typeof EmailPayloadSchema>;

// Typed shape for rows written to email_send_log
export type EmailSendLogInsert = {
  message_id?: string | null;
  template_name: string;
  recipient_email: string;
  status: "pending" | "sent" | "failed" | "dlq" | "rate_limited" | "bounced" | "complained";
  error_message?: string | null;
};
