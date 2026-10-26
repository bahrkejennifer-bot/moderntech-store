// The Edit's weekly PDF. Pure mapping only: every field is read from the live weekly edition
// module and the curated catalog rows already shown on the page — nothing is invented here.
import { weeklyEdition } from "./signalWeeklyEdition";
import type { CatalogProduct, Selection } from "./curatedSelections";

/**
 * Lead-magnet slug for the gated PDF download. Kept out of NEWSLETTER_ONLY_MAGNETS so the
 * shared signup helper records it and notifies the business inbox; newsletter enrollment
 * still happens only when the optional consent box is ticked.
 * Must stay in sync with the delivery maps in request-lead-confirmation, confirm-lead and
 * send-welcome-email.
 */
export const EDIT_PDF_MAGNET = "the-edit-weekly-pdf";

/** The confirmation link returns here; this query is what reveals the download. */
export const EDIT_PDF_DELIVERY_PATH = "/the-signal?pdf=1";
export const EDIT_PDF_DELIVERY_PARAM = "pdf";
export const EDIT_PDF_DELIVERY_VALUE = "1";

export const EDIT_PDF_DISCLOSURE =
  "As an Amazon Associate, Modern Tech LLC earns from qualifying purchases. Amazon links may earn us a commission at no additional cost to you.";

export interface WeeklyPick {
  selection: Selection;
  product: CatalogProduct;
}

export interface EditPdfPick {
  index: string;
  title: string;
  image_url: string;
  affiliate_link: string;
  audience: string;
  benefit: string;
  limitation: string;
}

export interface EditPdfModel {
  publication: string;
  brand: string;
  siteUrl: string;
  weekOf: string;
  weekOfLabel: string;
  title: string;
  intro: readonly string[];
  newsHeading: string;
  newsNotes: readonly { label: string; text: string; url: string }[];
  disclosure: string;
  picks: EditPdfPick[];
}

/** Maps the edition already on screen into the PDF layout. No claims are added here. */
export function buildEditPdfModel(picks: readonly WeeklyPick[]): EditPdfModel {
  const weekOfLabel = new Date(`${weeklyEdition.weekOf}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return {
    publication: "The Signal · Weekly Newsletter",
    brand: "Modern Tech LLC",
    siteUrl: "https://moderntech.store",
    weekOf: weeklyEdition.weekOf,
    weekOfLabel,
    title: weeklyEdition.title,
    intro: weeklyEdition.intro,
    newsHeading: "This week's signals",
    newsNotes: weeklyEdition.newsNotes,
    disclosure: EDIT_PDF_DISCLOSURE,
    picks: picks.map((p, i) => ({
      index: String(i + 1).padStart(2, "0"),
      title: p.product.title,
      image_url: p.product.image_url ?? "",
      affiliate_link: p.product.affiliate_link,
      audience: p.selection.audience,
      benefit: p.selection.benefit,
      limitation: p.selection.limitation,
    })),
  };
}
