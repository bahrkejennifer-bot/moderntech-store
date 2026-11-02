/**
 * Builds a free-guide PDF with jsPDF's own text engine, reading the guide's hidden print
 * markup (headings, paragraphs, lists, tables). html2pdf.js / html2canvas produce blank
 * pages in this project, so nothing here screenshots the DOM.
 */
const INK: [number, number, number] = [28, 26, 23];
const MUTED: [number, number, number] = [107, 101, 96];
const ACCENT: [number, number, number] = [150, 98, 88];
const RULE: [number, number, number] = [217, 210, 202];
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

type Block =
  | { kind: "h1" | "h2" | "h3" | "p" | "li" | "small"; text: string }
  | { kind: "table"; rows: string[][] }
  | { kind: "break" };

const clean = (s: string) =>
  s
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/\u2013/g, "-")
    .replace(/[★]/g, "*")
    .replace(/[☆]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const BLOCK_TAGS = new Set(["H1", "H2", "H3", "H4", "P", "LI", "TABLE", "BLOCKQUOTE"]);

function hasBlockChild(el: Element) {
  return Array.from(el.querySelectorAll("*")).some((c) => BLOCK_TAGS.has(c.tagName));
}

export function extractGuideBlocks(root: Element): Block[] {
  const blocks: Block[] = [];
  const walk = (el: Element) => {
    if (el.classList.contains("pdf-page-break")) {
      blocks.push({ kind: "break" });
      return;
    }
    const tag = el.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "IMG" || tag === "SVG") return;
    if (tag === "TABLE") {
      const rows = Array.from(el.querySelectorAll("tr")).map((tr) =>
        Array.from(tr.querySelectorAll("th,td")).map((c) => clean(c.textContent || "")),
      );
      if (rows.length) blocks.push({ kind: "table", rows });
      return;
    }
    const text = clean(el.textContent || "");
    if (!text) return;
    if (tag === "H1") return void blocks.push({ kind: "h1", text });
    if (tag === "H2") return void blocks.push({ kind: "h2", text });
    if (tag === "H3" || tag === "H4") return void blocks.push({ kind: "h3", text });
    if (tag === "LI") return void blocks.push({ kind: "li", text });
    if ((tag === "P" || tag === "BLOCKQUOTE") && !hasBlockChild(el)) {
      return void blocks.push({ kind: "p", text });
    }
    if (el.children.length === 0 || !hasBlockChild(el)) {
      // Leaf container (div/span/a with plain text).
      return void blocks.push({ kind: el.children.length === 0 && text.length < 60 ? "small" : "p", text });
    }
    Array.from(el.children).forEach(walk);
  };
  Array.from(root.children).forEach(walk);
  return blocks;
}

export async function buildGuidePdf(root: Element, opts: { title: string }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait", compress: true });
  doc.setProperties({ title: opts.title, author: "Modern Tech LLC", creator: "Modern Tech LLC" });
  const blocks = extractGuideBlocks(root);
  let y = MARGIN;
  const color = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const newPage = () => {
    doc.addPage();
    y = MARGIN;
  };
  const ensure = (h: number) => {
    if (y + h > PAGE_H - MARGIN - 20) newPage();
  };
  const write = (text: string, size: number, font: [string, string], c: [number, number, number], gapAfter: number, indent = 0) => {
    doc.setFont(font[0], font[1]);
    doc.setFontSize(size);
    color(c);
    const lines = doc.splitTextToSize(text, CONTENT_W - indent) as string[];
    const lh = size * 1.4;
    for (const line of lines) {
      ensure(lh);
      doc.text(line, MARGIN + indent, y + size);
      y += lh;
    }
    y += gapAfter;
  };

  for (const b of blocks) {
    if (b.kind === "break") {
      // Flow content continuously; html2pdf-era forced breaks left near-empty pages.
      continue;
    }
    if (b.kind === "h1") {
      write(b.text, 24, ["times", "bolditalic"], INK, 6);
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.line(MARGIN, y, PAGE_W - MARGIN, y);
      y += 14;
    } else if (b.kind === "h2") {
      ensure(60);
      y += 8;
      write(b.text, 16, ["times", "bold"], ACCENT, 6);
    } else if (b.kind === "h3") {
      ensure(40);
      write(b.text, 12.5, ["times", "bold"], INK, 4);
    } else if (b.kind === "li") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      color(INK);
      ensure(15);
      doc.text("\u2022", MARGIN + 4, y + 10.5);
      write(b.text, 10.5, ["helvetica", "normal"], INK, 3, 16);
    } else if (b.kind === "small") {
      write(b.text, 9.5, ["helvetica", "normal"], MUTED, 4);
    } else if (b.kind === "p") {
      write(b.text, 10.5, ["helvetica", "normal"], INK, 8);
    } else if (b.kind === "table") {
      const cols = Math.max(...b.rows.map((r) => r.length));
      const cw = CONTENT_W / cols;
      b.rows.forEach((row, ri) => {
        doc.setFont("helvetica", ri === 0 ? "bold" : "normal");
        doc.setFontSize(9);
        const cells = row.map((c) => doc.splitTextToSize(c, cw - 8) as string[]);
        const h = Math.max(1, ...cells.map((c) => c.length)) * 12 + 8;
        ensure(h);
        doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
        cells.forEach((lines, ci) => {
          doc.rect(MARGIN + ci * cw, y, cw, h);
          color(INK);
          lines.forEach((l, li) => doc.text(l, MARGIN + ci * cw + 4, y + 13 + li * 12));
        });
        y += h;
      });
      y += 12;
    }
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    color(MUTED);
    doc.text(`Modern Tech LLC  |  moderntech.store  |  ${i} / ${pages}`, PAGE_W / 2, PAGE_H - 30, { align: "center" });
  }
  return { doc, blockCount: blocks.length };
}

export async function downloadGuidePdf(root: Element, opts: { title: string; filename: string }) {
  const { doc, blockCount } = await buildGuidePdf(root, opts);
  if (blockCount === 0) throw new Error("Guide has no content to print");
  doc.save(opts.filename);
}
