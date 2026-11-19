// Render-only corrections. Stored articles, identifiers and campaign selections remain intact.
export function editorialText(text: string): string {
  return text
    .replace(/The Signal|Weekly Edit|Weekly Blog/gi, "The Edit")
    .replace(/Prices and ratings were checked[^.!?]*[.!?]/gi, "Check current product details on Amazon.")
    .replace(/this week's edit/gi, "this dated edition")
    .replace(/\b(?:price|rating|reviews?|review count)\s*:\s*(?:\$?\d[\d,.]*(?:\s*\/\s*5)?(?:\s*(?:stars?|reviews?|ratings?|out of 5))?)/gi, "")
    .replace(/\bUnder\s+\$[\d,.]+/gi, "Everyday essentials")
    .replace(/\$[\d,]+(?:\.\d{1,2})?(?:\s*[–-]\s*\$?[\d,.]+)?(?:\s*\/\s*month)?\+?/g, "current Amazon pricing")
    .replace(/\b\d(?:\.\d+)?\s*(?:out of\s*5\s*)?(?:stars?|★)/gi, "")
    .replace(/\b\d\.\d+\s*\/\s*5\b/g, "")
    .replace(/\b[\d,]+\s*(?:ratings?|reviews?)\b/gi, "")
    .replace(/\b\d+(?:\.\d+)?\s*%\s*off\b/gi, "")
    .replace(/—/g, ",")
    .replace(/\s+([,.])/g, "$1")
    .trim();
}

export function editorialHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  for (const paragraph of doc.querySelectorAll("p")) {
    const text = paragraph.textContent || "";
    if (/\$\d/.test(text) && /\bstars?\b|\breviews?\b|\bratings?\b/i.test(text)) {
      paragraph.textContent = "Check current product details on Amazon.";
    }
  }
  // Work on text only, never URLs, image sources or product identifiers.
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const nodes: Node[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const text = node.textContent || "";
    node.textContent = `${/^\s/.test(text) ? " " : ""}${editorialText(text)}${/\s$/.test(text) ? " " : ""}`;
  }
  return doc.body.innerHTML;
}

export const compactArchivePreview = (excerpt: string) => editorialText(excerpt).slice(0, 420);