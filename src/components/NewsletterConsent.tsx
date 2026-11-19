import { useId } from "react";

import { SUBSCRIBE_CONSENT_LINE } from "@/lib/subscribers";

export const NEWSLETTER_CONSENT_LABEL = SUBSCRIBE_CONSENT_LINE;

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

/** Optional, unchecked-by-default newsletter consent. Never required for delivery. */
export function NewsletterConsent({ checked, onChange, className = "" }: Props) {
  const id = useId();
  return (
    <div className={`flex items-start gap-3 text-left ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
      />
      <label htmlFor={id} className="cursor-pointer text-sm leading-snug text-foreground/80">
        {NEWSLETTER_CONSENT_LABEL}
        <span className="block text-xs text-muted-foreground">Optional. Your purchase or download doesn't depend on this.</span>
      </label>
    </div>
  );
}
