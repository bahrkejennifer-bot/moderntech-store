import { supabase } from "@/integrations/supabase/client";

/** The one consent line shown next to every email signup. */
export const SUBSCRIBE_CONSENT_LINE = "Get The Signal every week. Unsubscribe anytime.";

export interface SaveSubscriberInput {
  email: string;
  name?: string;
  /** Which freebie they took, or a short label like "newsletter". */
  freebie?: string;
  consent?: boolean;
  /** Defaults to the current page path. */
  sourcePage?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeSubscriber(input: SaveSubscriberInput) {
  const email = (input.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 255) return null;
  let source = input.sourcePage;
  if (!source && typeof window !== "undefined") source = window.location.pathname;
  return {
    email,
    name: input.name?.trim().slice(0, 100) || null,
    freebie: input.freebie?.slice(0, 100) || null,
    source_page: source?.slice(0, 300) || null,
    consent: input.consent === true,
    consent_text: input.consent === true ? SUBSCRIBE_CONSENT_LINE : null,
  };
}

/**
 * Saves the email to the single subscribers list. One row per email:
 * a repeat signup is treated as success and never creates a duplicate.
 */
export async function saveSubscriber(input: SaveSubscriberInput): Promise<{ ok: boolean; error?: string }> {
  const row = normalizeSubscriber(input);
  if (!row) return { ok: false, error: "Please enter a valid email address." };
  const { error } = await supabase.from("subscribers").insert(row);
  if (error && error.code !== "23505") return { ok: false, error: "Could not save your email. Please try again." };
  return { ok: true };
}
