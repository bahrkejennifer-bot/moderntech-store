import { supabase } from "@/integrations/supabase/client";
import { saveSubscriber } from "@/lib/subscribers";
import { markFreebieUnlocked } from "@/lib/freebies";

export interface RequestConfirmationInput {
  name?: string;
  email: string;
  lead_magnet?: string;
  /** Optional override; defaults to current window.location.pathname + search */
  source_path?: string;
  /** Optional, unchecked by default: explicit consent to the weekly newsletter. */
  newsletter_opt_in?: boolean;
  /** Set for newsletter-only forms, where signing up is itself the consent. */
  consent?: boolean;
}

export interface RequestConfirmationResult {
  success: boolean;
  alreadyConfirmed?: boolean;
  error?: string;
}

/**
 * Free signup entry point: saves the email to the subscribers list, unlocks
 * the freebie on screen right away, and emails a copy in the background.
 * Sends a confirmation email to the user instead of immediately
 * creating a lead_captures row or delivering the guide.
 *
 * Returns:
 *   { success: true, alreadyConfirmed: false } - confirmation email sent
 *   { success: true, alreadyConfirmed: true }  - email already verified, guide re-sent
 *   { success: false, error }                  - failure
 */
export async function requestLeadConfirmation(
  input: RequestConfirmationInput
): Promise<RequestConfirmationResult> {
  const email = (input.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  // Capture the page the user signed up from so /confirm-email can return them there.
  let sourcePath = input.source_path;
  if (!sourcePath && typeof window !== "undefined") {
    try {
      sourcePath = `${window.location.pathname}${window.location.search || ""}`;
    } catch {
      sourcePath = undefined;
    }
  }
  const leadMagnet = input.lead_magnet || "90-day-amazon-associate-roadmap";
  // 1) Save to the single subscribers list. This is what unlocks the freebie.
  const saved = await saveSubscriber({
    email,
    name: input.name,
    freebie: leadMagnet,
    consent: input.newsletter_opt_in === true || input.consent === true,
    sourcePage: sourcePath?.split("?")[0],
  });
  if (!saved.ok) return { success: false, error: saved.error };
  markFreebieUnlocked(leadMagnet);
  // 2) Email a copy through the existing flow in the background. Delivery on
  //    screen never waits on it, and a failure here doesn't block the visitor.
  void supabase.functions
    .invoke("request-lead-confirmation", {
      body: {
        name: input.name?.trim() || email.split("@")[0],
        email,
        lead_magnet: leadMagnet,
        source_path: sourcePath,
        newsletter_opt_in: input.newsletter_opt_in === true,
      },
    })
    .catch(() => undefined);
  return { success: true, alreadyConfirmed: true };
}

export const CHECK_INBOX_MESSAGE =
  "You're in. Your freebie is ready on this page.";
export const ALREADY_CONFIRMED_MESSAGE = CHECK_INBOX_MESSAGE;
export const RESENT_CONFIRMATION_MESSAGE =
  "We just sent a fresh confirmation link to your inbox.";

export interface ResendConfirmationInput {
  /** A token from a previously-sent confirmation email (preferred). */
  token?: string;
  /** Falls back to email lookup when no token is available. */
  email?: string;
}

/**
 * Generates a NEW confirmation token for an existing pending signup
 * and re-sends the confirmation email - without asking the user
 * to re-enter their email address.
 */
export async function resendLeadConfirmation(
  input: ResendConfirmationInput
): Promise<RequestConfirmationResult> {
  const token = input.token?.trim();
  const email = input.email?.trim().toLowerCase();
  if (!token && !email) {
    return { success: false, error: "Missing confirmation reference." };
  }
  try {
    const { data, error } = await supabase.functions.invoke("resend-lead-confirmation", {
      body: { token, email },
    });
    if (error || !data?.success) {
      return { success: false, error: data?.error || error?.message || "Could not resend confirmation email." };
    }
    return { success: true, alreadyConfirmed: !!data.already_confirmed };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

