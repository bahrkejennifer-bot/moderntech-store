// Queue bodies share one conversion so HTML-only producers satisfy the text schema.
const decodeEntities = (value: string): string => value.replace(
  /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|mdash|ndash);/gi,
  (_, entity: string) => {
    const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "-", ndash: "-" };
    if (entity.startsWith("#")) {
      const number = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : "";
    }
    return named[entity.toLowerCase()] ?? "";
  },
);

const amazonUrl = /https?:\/\/(?:[\w-]+\.)?(?:amazon\.[a-z.]+|amzn\.(?:to|com))(?=[:/?#\s"'<>]|$)[^\s"'<>]*/gi;

export function emailHtmlWithoutAmazonLinks(html: string): string {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, attributes: string, label: string) => {
    const href = attributes.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const destination = decodeEntities(href?.[1] ?? href?.[2] ?? href?.[3] ?? "");
    return /^(?:https?:)?\/\/(?:[\w-]+\.)?(?:amazon\.[a-z.]+|amzn\.(?:to|com))(?:[:/?#]|$)/i.test(destination) ? label : anchor;
  }).replace(amazonUrl, "");
}

export function emailTextFromHtml(html: string): string {
  const text = decodeEntities(emailHtmlWithoutAmazonLinks(html)
    .replace(/<(head|style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>([\s\S]*?)<\/a>/gi,
      (_, double: string, single: string, label: string) => `${label} (${double || single})`)
    .replace(/<br\s*\/?\s*>|<\/(?:p|div|h[1-6]|tr|li|table)>/gi, "\n")
    .replace(/<\/td>/gi, ": ")
    .replace(/<[^>]*>/g, ""))
    .replace(/\u2014/g, "-").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text) throw new Error("Email body must contain meaningful text");
  return text;
}

export function newsletterEmailHtml(html: string): string {
  // No deployed token handler or newsletter unsubscribe route is present in this repo.
  // Use the existing business reply inbox, not a fabricated token destination.
  const footer = '<p><a href="mailto:info@moderntech.store?subject=Unsubscribe">Unsubscribe</a></p>';
  const clean = emailHtmlWithoutAmazonLinks(html);
  return /<\/body>/i.test(clean) ? clean.replace(/<\/body>/i, `${footer}</body>`) : `${clean}${footer}`;
}