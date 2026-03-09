import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID || "hvjhtfyxecnuehndnyrd";
const ENDPOINT = `https://${PROJECT_ID}.supabase.co/functions/v1/pinterest-conversions`;

type PinterestEventName =
  | "page_visit"
  | "view_category"
  | "search"
  | "add_to_cart"
  | "checkout"
  | "custom";

interface TrackingEvent {
  event_name: PinterestEventName;
  event_source_url: string;
  user_agent: string;
  email?: string;
  custom_data?: Record<string, unknown>;
}

const sendEvents = async (events: TrackingEvent[]) => {
  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
    });
  } catch {
    // Silently fail — don't break UX for tracking
  }
};

export const usePinterestPageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Fire page_visit on every route change
    sendEvents([
      {
        event_name: "page_visit",
        event_source_url: window.location.href,
        user_agent: navigator.userAgent,
      },
    ]);
  }, [location.pathname]);
};

export const usePinterestEvent = () => {
  const trackEvent = useCallback(
    (
      eventName: PinterestEventName,
      customData?: Record<string, unknown>,
      email?: string
    ) => {
      sendEvents([
        {
          event_name: eventName,
          event_source_url: window.location.href,
          user_agent: navigator.userAgent,
          email,
          custom_data: customData,
        },
      ]);
    },
    []
  );

  return { trackEvent };
};
