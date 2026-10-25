import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Check, Download, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterConsent } from "@/components/NewsletterConsent";
import { requestLeadConfirmation } from "@/lib/leadConfirmation";
import {
  buildEditPdfModel,
  EDIT_PDF_DELIVERY_PATH,
  EDIT_PDF_DELIVERY_PARAM,
  EDIT_PDF_DELIVERY_VALUE,
  EDIT_PDF_MAGNET,
  type EditPdfModel,
  type WeeklyPick,
} from "@/lib/signalPdf";

const schema = z.object({ email: z.string().trim().email("Enter a valid email address.").max(255) });

const PDF_OPT = {
  margin: [0.5, 0.6, 0.5, 0.6] as [number, number, number, number],
  image: { type: "jpeg" as const, quality: 0.95 },
  html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
  jsPDF: { unit: "in", format: "letter" as const, orientation: "portrait" as const },
  pagebreak: { mode: ["css", "legacy"] as ("css" | "legacy")[] },
};

const PDF_STYLE: Record<string, React.CSSProperties> = {
  page: { fontFamily: "Georgia, 'Times New Roman', serif", color: "#1c1a17", lineHeight: 1.5 },
  masthead: { fontSize: "9pt", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8a8580", margin: 0 },
  rule: { borderBottom: "1px solid #d9d2ca", margin: "10pt 0 14pt" },
  title: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20pt", fontWeight: 400, margin: "0 0 4pt" },
  week: { fontSize: "10pt", color: "#6b6560", margin: "0 0 12pt" },
  body: { fontSize: "10.5pt", margin: "0 0 8pt" },
  heading: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "13pt",
    fontWeight: 600,
    margin: "14pt 0 6pt",
    borderTop: "1px solid #e8e3de",
    paddingTop: "10pt",
  },
  note: { fontSize: "9.5pt", margin: "0 0 6pt" },
  disclosure: {
    fontSize: "8.5pt",
    color: "#6b6560",
    border: "0.5pt solid #d9d2ca",
    padding: "7pt 9pt",
    margin: "12pt 0",
    background: "#faf8f6",
  },
  pick: { breakInside: "avoid", display: "flex", gap: "12pt", margin: "0 0 14pt", alignItems: "flex-start" },
  img: { width: "1.5in", height: "1.5in", objectFit: "contain", border: "0.5pt solid #e8e3de", padding: "4pt", flexShrink: 0 },
  pickTitle: { fontSize: "12pt", fontWeight: 700, margin: "0 0 2pt" },
  pickMeta: { fontSize: "9pt", color: "#6b6560", margin: "0 0 4pt" },
  pickBody: { fontSize: "10pt", margin: "0 0 3pt" },
  link: { fontSize: "9pt", color: "#1c1a17", wordBreak: "break-all", margin: 0 },
  footer: { fontSize: "8.5pt", color: "#8a8580", borderTop: "1px solid #e8e3de", paddingTop: "8pt", margin: "16pt 0 0" },
};

const PdfSheet = ({ model }: { model: EditPdfModel }) => (
  <div style={PDF_STYLE.page}>
    <p style={PDF_STYLE.masthead}>{model.brand}</p>
    <p style={PDF_STYLE.masthead}>{model.publication}</p>
    <div style={PDF_STYLE.rule} />
    <h1 style={PDF_STYLE.title}>{model.title}</h1>
    <p style={PDF_STYLE.week}>Week of {model.weekOfLabel}</p>
    {model.intro.map((para) => (
      <p key={para} style={PDF_STYLE.body}>{para}</p>
    ))}

    <h2 style={PDF_STYLE.heading}>{model.newsHeading}</h2>
    {model.newsNotes.map((note) => (
      <p key={note.label} style={PDF_STYLE.note}>
        <strong>{note.label}</strong> — {note.text} <em>({note.url})</em>
      </p>
    ))}

    <p style={PDF_STYLE.disclosure}>{model.disclosure}</p>

    <h2 style={PDF_STYLE.heading}>This week's picks</h2>
    {model.picks.map((pick) => (
      <div key={pick.index} style={PDF_STYLE.pick}>
        {pick.image_url ? (
          <img src={pick.image_url} alt={pick.title} crossOrigin="anonymous" loading="eager" style={PDF_STYLE.img} />
        ) : null}
        <div>
          <p style={PDF_STYLE.pickMeta}>{pick.index}</p>
          <p style={PDF_STYLE.pickTitle}>{pick.title}</p>
          <p style={PDF_STYLE.pickMeta}>{pick.audience}</p>
          <p style={PDF_STYLE.pickBody}>{pick.benefit}</p>
          <p style={PDF_STYLE.pickBody}>Good to know: {pick.limitation}</p>
          <p style={PDF_STYLE.link}>
            View on Amazon: <a href={pick.affiliate_link} style={{ color: "#1c1a17" }}>{pick.affiliate_link}</a>
          </p>
        </div>
      </div>
    ))}

    <p style={PDF_STYLE.footer}>
      {model.publication} · {model.siteUrl} — prices and availability are set by Amazon and can change after this
      edition is published. Check the current price on the product page before buying.
    </p>
  </div>
);

/**
 * The Edit's PDF download, gated behind the existing double opt-in: a visitor leaves an
 * email, confirms it, and the confirmation returns them here with the download revealed.
 * The edition itself stays readable without signing up for anything.
 */
const SignalPdfDownload = ({ picks }: { picks: readonly WeeklyPick[] }) => {
  const [params] = useSearchParams();
  const model = useMemo(() => buildEditPdfModel(picks), [picks]);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(params.get(EDIT_PDF_DELIVERY_PARAM) === EDIT_PDF_DELIVERY_VALUE);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setStatus({ ok: false, msg: parsed.error.errors[0]?.message || "Check your email." });
      return;
    }
    setLoading(true);
    const res = await requestLeadConfirmation({
      email: parsed.data.email,
      lead_magnet: EDIT_PDF_MAGNET,
      source_path: EDIT_PDF_DELIVERY_PATH,
      newsletter_opt_in: optIn,
    });
    setLoading(false);
    if (!res.success) {
      setStatus({ ok: false, msg: res.error || "Something went wrong. Please try again." });
      return;
    }
    if (res.alreadyConfirmed) {
      setReady(true);
      setStatus({ ok: true, msg: "You're already on the list — your PDF is ready below, and a copy is on its way to your inbox." });
      return;
    }
    setStatus({ ok: true, msg: "Check your inbox — click the confirmation link and we'll bring you straight back here with your PDF." });
    setEmail("");
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    setBusy(true);
    setPdfError("");
    try {
      const imgs = Array.from(pdfRef.current.querySelectorAll("img"));
      await Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined))));
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set({ ...PDF_OPT, filename: `The-Edit-${model.weekOf}-Modern-Tech.pdf` }).from(pdfRef.current).save();
    } catch (err) {
      console.error("The Edit PDF generation error:", err);
      setPdfError("The PDF couldn't be built in this browser. Your Print dialog can save the same page as a PDF.");
    } finally {
      setBusy(false);
    }
  };

  if (ready) {
    return (
      <>
        <section aria-labelledby="pdf-ready-heading" className="print:hidden mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 id="pdf-ready-heading" className="text-xl font-semibold tracking-tight">Your PDF is ready</h2>
          <p className="mt-2 text-base text-muted-foreground">
            A clean, one-page copy of this week's edition — the same picks, notes and links you're reading now.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={handleDownload} disabled={busy} className="min-h-12 rounded-full px-6 text-base">
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-label="Building your PDF" /> : <Download className="mr-2 h-4 w-4" aria-hidden="true" />}
              Download the PDF
            </Button>
            <p className="text-sm text-muted-foreground">
              {busy ? "Building your file…" : "Prices and availability are set by Amazon and can change."}
            </p>
          </div>
          {pdfError && (
            <p role="alert" className="mt-4 text-sm text-destructive">{pdfError}</p>
          )}
        </section>
        <div ref={pdfRef} aria-hidden="true" className="fixed left-[-9999px] top-0 w-[8.5in] bg-white">
          <PdfSheet model={model} />
        </div>
      </>
    );
  }

  return (
    <section aria-labelledby="pdf-heading" className="print:hidden mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 id="pdf-heading" className="text-xl font-semibold tracking-tight">Get this week's edition as a PDF</h2>
      <p className="mt-2 mb-5 text-base text-muted-foreground">
        Optional. Leave your email and we'll send a one-click confirmation — then the PDF is yours.
        Everything above stays free to read here.
      </p>

      {status?.ok ? (
        <p role="status" className="flex items-start gap-3 rounded-2xl bg-background p-5 text-base">
          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
          {status.msg}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-label="Get The Edit as a PDF" className="w-full">
          <label htmlFor="edit-pdf-email" className="mb-2 block text-sm font-medium">Email address</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="edit-pdf-email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              disabled={loading}
              aria-invalid={status && !status.ok ? true : undefined}
              aria-describedby="edit-pdf-help"
              className="h-12 rounded-full bg-background px-5 text-base"
            />
            <Button type="submit" variant="outline" size="lg" disabled={loading} className="min-h-12 rounded-full px-6 text-base">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Sending" /> : <MailCheck className="mr-2 h-4 w-4" aria-hidden="true" />}
              Send confirmation link
            </Button>
          </div>
          <NewsletterConsent checked={optIn} onChange={setOptIn} className="mt-4" />
          <p
            id="edit-pdf-help"
            role={status && !status.ok ? "alert" : undefined}
            className={`mt-3 text-sm ${status && !status.ok ? "text-destructive" : "text-muted-foreground"}`}
          >
            {status && !status.ok ? status.msg : "We'll email you to confirm — the PDF unlocks after one click."}
          </p>
        </form>
      )}
    </section>
  );
};

export default SignalPdfDownload;
