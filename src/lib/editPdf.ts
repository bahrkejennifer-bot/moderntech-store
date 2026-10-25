import { type EditPdfModel, type WeeklyPick } from "@/lib/signalPdf";

const INK = [28, 26, 23];
const MUTED = [107, 101, 96];
const FAINT = [138, 133, 128];
const RULE = [217, 210, 202];
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;
const PHOTO_BOX = 96;
const COLUMN_X = MARGIN + PHOTO_BOX + 14;
const COLUMN_W = CONTENT_W - PHOTO_BOX - 14;

export type EditPdf = { blob: Blob; filename: string };

const ink = (doc: { setTextColor: (r: number, g: number, b: number) => void }, c: number[]) =>
  doc.setTextColor(c[0], c[1], c[2]);

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "official source";
  }
};

/**
 * Pulls a product photo into a JPEG data URL the PDF can embed. Amazon's image CDN
 * sends CORS headers, but anything that fails to load is simply left out of the PDF —
 * a missing photo never becomes a stand-in picture.
 */
async function loadPhoto(url: string) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { mode: "cors", signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const objectUrl = URL.createObjectURL(await res.blob());
    const img = new Image();
    img.src = objectUrl;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(objectUrl);
      return null;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const data = canvas.toDataURL("image/jpeg", 0.9);
    URL.revokeObjectURL(objectUrl);
    return { data, width: img.naturalWidth, height: img.naturalHeight };
  } catch {
    return null;
  }
}

/**
 * Composes The Edit's weekly edition into a US Letter PDF with jsPDF's own text engine.
 * html2pdf.js (html2canvas) silently produces blank pages in this project, so the PDF is
 * laid out from the same model the page reads — no screenshots of the DOM.
 */
export async function buildEditPdf(model: EditPdfModel): Promise<EditPdf> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait", compress: true });
  doc.setProperties({
    title: `${model.publication} — ${model.title}`,
    subject: `Week of ${model.weekOfLabel}`,
    author: "Modern Tech LLC",
    creator: "Modern Tech LLC",
    keywords: "Modern Tech, The Edit, weekly newsletter, tech picks",
  });

  let y = MARGIN;
  const ensure = (h: number) => {
    if (y + h > PAGE_H - MARGIN - 26) {
      doc.addPage();
      y = MARGIN;
    }
  };
  const rule = (gap = 10) => {
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.6);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += gap;
  };
  const para = (
    text: string,
    o: {
      font?: "times" | "helvetica";
      style?: "normal" | "bold" | "italic" | "bolditalic";
      size?: number;
      color?: number[];
      leading?: number;
      gap?: number;
      width?: number;
      x?: number;
    } = {},
  ) => {
    const size = o.size ?? 11;
    const leading = o.leading ?? Math.round(size * 1.45);
    const width = o.width ?? CONTENT_W;
    const x = o.x ?? MARGIN;
    doc.setFont(o.font ?? "times", o.style ?? "normal");
    doc.setFontSize(size);
    ink(doc, o.color ?? INK);
    const lines = doc.splitTextToSize(text, width) as string[];
    ensure(lines.length * leading);
    for (const line of lines) {
      doc.text(line, x, y + size * 0.82);
      y += leading;
    }
    y += o.gap ?? 0;
  };
  const heading = (text: string, keepWith = 0) => {
    ensure(26 + keepWith);
    rule(14);
    para(text, { font: "times", style: "bold", size: 13.5, leading: 18, gap: 8 });
  };
  const label = (text: string, size = 8, space = 1.4) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setCharSpace(space);
    ink(doc, MUTED);
    doc.text(text.toUpperCase(), MARGIN, y + size);
    doc.setCharSpace(0);
    y += size + 5;
  };
  const linkLine = (text: string, url: string, size = 8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    ink(doc, INK);
    const w = doc.getTextWidth(text);
    doc.text(text, MARGIN, y + size);
    doc.link(MARGIN, y, w, size + 2, { url });
    y += size + 6;
  };

  // Masthead
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setCharSpace(2.4);
  ink(doc, FAINT);
  doc.text("MODERN TECH LLC", MARGIN, y + 7);
  y += 13;
  doc.text("THE EDIT  ·  WEEKLY NEWSLETTER", MARGIN, y + 7);
  doc.setCharSpace(0);
  y += 10;
  rule(18);

  para(model.title, { font: "times", style: "italic", size: 21, leading: 26, gap: 6 });
  para(`Week of ${model.weekOfLabel}`, { font: "helvetica", size: 9, color: MUTED, leading: 13, gap: 14 });

  for (const p of model.intro) para(p, { size: 11, leading: 16, gap: 9 });

  heading(model.newsHeading);
  for (const note of model.newsNotes) {
    ensure(52);
    label(note.label);
    para(note.text, { size: 10.5, leading: 14.5, gap: 2 });
    linkLine(`Source: ${hostOf(note.url)}`, note.url);
    y += 4;
  }

  // Affiliate disclosure, before any product link
  doc.setFont("times", "italic");
  doc.setFontSize(8.5);
  const disclosureLines = doc.splitTextToSize(model.disclosure, CONTENT_W - 22) as string[];
  const boxH = disclosureLines.length * 12 + 16;
  ensure(boxH + 10);
  doc.setFillColor(250, 248, 246);
  doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN, y, CONTENT_W, boxH, "FD");
  ink(doc, MUTED);
  disclosureLines.forEach((line, i) => doc.text(line, MARGIN + 11, y + 15 + i * 12));
  y += boxH + 16;

  heading(
    "This week's picks",
    model.picks[0] ? Math.max(await measurePick(doc, model.picks[0]), PHOTO_BOX) + 18 : 0,
  );
  for (const pick of model.picks) {
    const photo = pick.image_url ? await loadPhoto(pick.image_url) : null;
    const blockH = await measurePick(doc, pick);
    ensure(Math.max(blockH, PHOTO_BOX) + 8);
    const top = y;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setCharSpace(2);
    ink(doc, FAINT);
    doc.text(pick.index, MARGIN, y + 8);
    doc.setCharSpace(0);
    y += 13;

    para(pick.title, { font: "times", style: "bold", size: 12.5, leading: 16, width: COLUMN_W, x: COLUMN_X, gap: 2 });
    para(pick.audience, { font: "helvetica", style: "italic", size: 9, color: MUTED, leading: 12, width: COLUMN_W, x: COLUMN_X, gap: 5 });
    para(pick.benefit, { size: 10.5, leading: 14.5, width: COLUMN_W, x: COLUMN_X, gap: 4 });
    para(`Good to know: ${pick.limitation}`, { font: "times", style: "italic", size: 10, color: MUTED, leading: 13.5, width: COLUMN_W, x: COLUMN_X, gap: 5 });

    const linkText = `View on Amazon: ${pick.affiliate_link}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    ink(doc, INK);
    doc.text(linkText, COLUMN_X, y + 7);
    doc.link(COLUMN_X, y, doc.getTextWidth(linkText), 9, { url: pick.affiliate_link });
    y += 12;

    if (photo) {
      const scale = Math.min(PHOTO_BOX / photo.width, PHOTO_BOX / photo.height);
      const w = photo.width * scale;
      const h = photo.height * scale;
      doc.addImage(photo.data, "JPEG", MARGIN + (PHOTO_BOX - w) / 2, top + (PHOTO_BOX - h) / 2, w, h);
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.setLineWidth(0.5);
      doc.rect(MARGIN, top, PHOTO_BOX, PHOTO_BOX);
    }

    y = Math.max(y, top + PHOTO_BOX) + 18;
  }

  rule(12);
  para(
    "Prices and availability are set by Amazon and can change after this edition is published. Check the current price on the product page before buying.",
    { font: "helvetica", size: 8, color: MUTED, leading: 11 },
  );

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i += 1) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    ink(doc, FAINT);
    doc.text(`${model.publication} · ${model.siteUrl}`, MARGIN, PAGE_H - 30);
    doc.text(`Page ${i} of ${pages}`, PAGE_W - MARGIN, PAGE_H - 30, { align: "right" });
  }

  return {
    blob: doc.output("blob"),
    filename: `The-Edit-${model.weekOf}-Modern-Tech.pdf`,
  };
}

/** Height of a pick block, so a product never splits across two pages. */
async function measurePick(doc: any, pick: WeeklyPick) {
  const lines = (text: string, font: string, style: string, size: number, width: number) => {
    doc.setFont(font, style);
    doc.setFontSize(size);
    return (doc.splitTextToSize(text, width) as string[]).length * Math.round(size * 1.4);
  };
  return (
    13 +
    lines(pick.title, "times", "bold", 12.5, COLUMN_W) +
    2 +
    lines(pick.audience, "helvetica", "italic", 9, COLUMN_W) +
    5 +
    lines(pick.benefit, "times", "normal", 10.5, COLUMN_W) +
    4 +
    lines(`Good to know: ${pick.limitation}`, "times", "italic", 10, COLUMN_W) +
    12
  );
}

/** Triggers the saved file from a click handler, keeping the browser's user activation. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
