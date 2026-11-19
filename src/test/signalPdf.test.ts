import { describe, it, expect } from "vitest";
import {
  buildEditPdfModel,
  EDIT_PDF_DELIVERY_PARAM,
  EDIT_PDF_DELIVERY_PATH,
  EDIT_PDF_DELIVERY_VALUE,
  EDIT_PDF_DISCLOSURE,
  EDIT_PDF_MAGNET,
  type WeeklyPick,
} from "../lib/signalPdf";
import { weeklyEdition } from "../lib/signalWeeklyEdition";
import { selections } from "../lib/curatedSelections";

const pick = (slug: string, dp: string): WeeklyPick => {
  const selection = selections.find((s) => s.slug === slug)!;
  return {
    selection,
    product: {
      id: selection.id,
      title: `${selection.slug} — exact model`,
      image_url: `https://m.media-amazon.com/images/I/${dp}.jpg`,
      affiliate_link: `https://www.amazon.com/dp/${dp}?tag=moderntech02-20`,
      is_active: true,
    },
  };
};

const picks = [pick("renpho-elis-1", "B01N1UX8RW"), pick("snap-circuits-jr-sc-100", "B00008BFZH"), pick("anker-solix-c300-dc", "B0D62PMB3R")];

describe("The Signal PDF model", () => {
  it("maps the live edition without inventing anything", () => {
    const model = buildEditPdfModel(picks);
    expect(model.publication).toBe("The Signal · Weekly Newsletter");
    expect(model.weekOf).toBe(weeklyEdition.weekOf);
    expect(model.weekOfLabel).toBe("October 11, 2026");
    expect(model.title).toBe(weeklyEdition.title);
    expect(model.intro).toEqual(weeklyEdition.intro);
    expect(model.newsNotes).toEqual(weeklyEdition.newsNotes);
    expect(model.picks.map((p) => p.index)).toEqual(["01", "02", "03"]);
    expect(model.picks[0].title).toBe("renpho-elis-1 — exact model");
    expect(model.picks[0].audience).toBe("For tracking wellness trends at home");
    expect(model.picks[0].image_url).toBe("https://m.media-amazon.com/images/I/B01N1UX8RW.jpg");
    expect(model.picks[2].affiliate_link).toBe("https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20");
  });

  it("keeps the required disclosure in the PDF and every link tagged and direct", () => {
    const model = buildEditPdfModel(picks);
    expect(model.disclosure).toBe(EDIT_PDF_DISCLOSURE);
    expect(model.disclosure).toContain("As an Amazon Associate");
    for (const p of model.picks) {
      const url = new URL(p.affiliate_link);
      expect(url.hostname).toBe("www.amazon.com");
      expect(url.pathname).toMatch(/^\/dp\/[A-Z0-9]{10}$/);
      expect(url.searchParams.get("tag")).toBe("moderntech02-20");
    }
  });

  it("carries no prices, ratings or stock claims", () => {
    const json = JSON.stringify(buildEditPdfModel(picks)).toLowerCase();
    expect(json).not.toContain("$");
    expect(json).not.toMatch(/\bstar\b|\bstars\b|rating|in stock|discount|% off/);
  });

  it("invents no products when the edition has no eligible picks", () => {
    expect(buildEditPdfModel([]).picks).toEqual([]);
  });

  it("wires the download to the route the confirmation link returns to", () => {
    expect(EDIT_PDF_DELIVERY_PATH).toBe(`/the-signal?${EDIT_PDF_DELIVERY_PARAM}=${EDIT_PDF_DELIVERY_VALUE}`);
    // The edge function only accepts a magnet that is a short lowercase slug.
    expect(EDIT_PDF_MAGNET).toMatch(/^[a-z0-9-]{1,100}$/);
  });
});
