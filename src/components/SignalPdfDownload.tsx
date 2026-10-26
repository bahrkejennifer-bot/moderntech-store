import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Check, Download, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterConsent } from "@/components/NewsletterConsent";
import { requestLeadConfirmation } from "@/lib/leadConfirmation";
import { buildEditPdf, downloadBlob, type EditPdf } from "@/lib/editPdf";
import {
  buildEditPdfModel,
  EDIT_PDF_DELIVERY_PATH,
  EDIT_PDF_DELIVERY_PARAM,
  EDIT_PDF_DELIVERY_VALUE,
  EDIT_PDF_MAGNET,
  type WeeklyPick,
} from "@/lib/signalPdf";

const schema = z.object({ email: z.string().trim().email("Enter a valid email address.").max(255) });

/**
 * The Edit's PDF download, gated behind the existing double opt-in: a visitor leaves an
 * email, confirms it, and the confirmation returns them here with the download revealed.
 * The edition itself stays readable without signing up for anything.
 */
const SignalPdfDownload = ({ picks }: { picks: readonly WeeklyPick[] }) => {
  const [params] = useSearchParams();
  const model = useMemo(() => buildEditPdfModel(picks), [picks]);

  const [ready, setReady] = useState(params.get(EDIT_PDF_DELIVERY_PARAM) === EDIT_PDF_DELIVERY_VALUE);
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [file, setFile] = useState<EditPdf | null>(null);
  const [building, setBuilding] = useState(true);
  const [pdfError, setPdfError] = useState("");

  // The file is composed as soon as the download is revealed, so the button hands over a
  // finished file in the click itself instead of losing the browser's download permission.
  useEffect(() => {
    if (!ready) return;
    let alive = true;
    setBuilding(true);
    setPdfError("");
    buildEditPdf(model)
      .then((pdf) => {
        if (!alive) return;
        setFile(pdf);
        setBuilding(false);
      })
      .catch((err) => {
        console.error("The Signal PDF generation error:", err);
        if (!alive) return;
        setBuilding(false);
        setPdfError("The PDF couldn't be built in this browser. Your Print dialog can save the same page as a PDF.");
      });
    return () => {
      alive = false;
    };
  }, [ready, model]);

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

  if (ready) {
    return (
      <section aria-labelledby="pdf-ready-heading" className="print:hidden mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
        <h2 id="pdf-ready-heading" className="text-xl font-semibold tracking-tight">
          Your PDF is ready
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          A clean copy of this week's edition — the same picks, notes and links you're reading now.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={() => file && downloadBlob(file.blob, file.filename)}
            disabled={building || !file}
            className="min-h-12 rounded-full px-6 text-base"
          >
            {building ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-label="Preparing your PDF" />
            ) : (
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Download the PDF
          </Button>
          <p className="text-sm text-muted-foreground">
            {building ? "Preparing your file…" : "Prices and availability are set by Amazon and can change."}
          </p>
        </div>
        {pdfError && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {pdfError}
          </p>
        )}
        {status?.ok && (
          <p role="status" className="mt-4 text-sm text-muted-foreground">
            {status.msg}
          </p>
        )}
      </section>
    );
  }

  return (
    <section aria-labelledby="pdf-heading" className="print:hidden mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 id="pdf-heading" className="text-xl font-semibold tracking-tight">
        Get this week's edition as a PDF
      </h2>
      <p className="mt-2 mb-5 text-base text-muted-foreground">
        Optional. Leave your email and we'll send a one-click confirmation — then the PDF is yours. Everything above stays
        free to read here.
      </p>

      {status?.ok ? (
        <p role="status" className="flex items-start gap-3 rounded-2xl bg-background p-5 text-base">
          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
          {status.msg}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-label="Get The Signal as a PDF" className="w-full">
          <label htmlFor="edit-pdf-email" className="mb-2 block text-sm font-medium">
            Email address
          </label>
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
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-label="Sending" />
              ) : (
                <MailCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
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
