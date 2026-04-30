import { supabase } from "@/integrations/supabase/client";

export interface RequestConfirmationInput {
  name?: string;
  email: string;
  lead_magnet?: string;
  /** Optional override; defaults to current window.location.pathname + search */
  source_path?: string;
}

export interface RequestConfirmationResult {
  success: boolean;
  alreadyConfirmed?: boolean;
  error?: string;
}

/**
 * Double opt-in entry point for free guide signups.
 * Sends a confirmation email to the user instead of immediately
 * creating a lead_captures row or delivering the guide.
 *
 * Returns:
 *   { success: true, alreadyConfirmed: false } — confirmation email sent
 *   { success: true, alreadyConfirmed: true }  — email already verified, guide re-sent
 *   { success: false, error }                  — failure
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
  try {
    const { data, error } = await supabase.functions.invoke("request-lead-confirmation", {
      body: {
        name: input.name?.trim() || email.split("@")[0],
        email,
        lead_magnet: input.lead_magnet || "90-day-amazon-associate-roadmap",
        source_path: sourcePath,
      },
    });
    if (error || !data?.success) {
      return { success: false, error: data?.error || error?.message || "Could not send confirmation email." };
    }
    return { success: true, alreadyConfirmed: !!data.already_confirmed };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

export const CHECK_INBOX_MESSAGE =
  "Check your inbox — click the confirmation link to get your guide.";
export const ALREADY_CONFIRMED_MESSAGE =
  "Welcome back! We've resent your guide to your inbox.";
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
 * and re-sends the confirmation email — without asking the user
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

