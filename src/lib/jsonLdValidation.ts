/**
 * Pure JSON-LD validation for Schema.org rich-result eligibility.
 *
 * Used by:
 *  - <JsonLdValidator /> (in-app dev tool, scans live DOM)
 *  - src/lib/jsonLdValidation.test.ts (automated CI test against fixtures)
 *
 * Covers BlogPosting, BreadcrumbList, FAQPage, Organization, WebSite, WebPage.
 */

export type Severity = "error" | "warning" | "ok";
export type Check = { severity: Severity; type: string; message: string };

export const REQUIRED_FIELDS: Record<string, string[]> = {
  Organization: ["name", "url", "logo"],
  WebSite: ["url", "name"],
  WebPage: ["url", "name"],
  BlogPosting: ["headline", "datePublished", "author", "image"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  ImageObject: ["url"],
};

export const RICH_RESULT_RECOMMENDED: Record<string, string[]> = {
  BlogPosting: ["dateModified", "publisher", "mainEntityOfPage", "description"],
  Organization: ["sameAs"],
  WebPage: ["description", "inLanguage"],
};

export const validateNode = (
  node: Record<string, unknown>,
  checks: Check[],
): void => {
  const type = (node["@type"] as string) || "Unknown";

  const required = REQUIRED_FIELDS[type];
  if (required) {
    for (const field of required) {
      const v = node[field];
      const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
      if (empty) {
        checks.push({ severity: "error", type, message: `Missing required field "${field}"` });
      }
    }
  }

  const recommended = RICH_RESULT_RECOMMENDED[type];
  if (recommended) {
    for (const field of recommended) {
      const v = node[field];
      if (v === undefined || v === null || v === "") {
        checks.push({
          severity: "warning",
          type,
          message: `Missing recommended field "${field}" (Google Rich Results)`,
        });
      }
    }
  }

  // BlogPosting headline length check (Google: <= 110 chars)
  if (type === "BlogPosting" && typeof node.headline === "string" && node.headline.length > 110) {
    checks.push({
      severity: "warning",
      type,
      message: `headline exceeds 110 characters (${node.headline.length})`,
    });
  }

  // BreadcrumbList items must have name + item + position
  if (type === "BreadcrumbList" && Array.isArray(node.itemListElement)) {
    node.itemListElement.forEach((item, i) => {
      const li = item as Record<string, unknown>;
      if (!li.name || !li.item || li.position === undefined) {
        checks.push({
          severity: "error",
          type,
          message: `BreadcrumbList item #${i + 1} missing name/item/position`,
        });
      }
    });
  }

  // FAQPage: every mainEntity must be a Question with a non-empty Answer
  if (type === "FAQPage" && Array.isArray(node.mainEntity)) {
    if (node.mainEntity.length === 0) {
      checks.push({ severity: "error", type, message: "FAQPage has empty mainEntity[]" });
    }
    node.mainEntity.forEach((q, i) => {
      const question = q as Record<string, unknown>;
      if (question["@type"] !== "Question") {
        checks.push({
          severity: "error",
          type,
          message: `FAQPage entry #${i + 1} is not @type=Question`,
        });
      }
      if (!question.name || typeof question.name !== "string") {
        checks.push({
          severity: "error",
          type,
          message: `FAQPage entry #${i + 1} missing question name`,
        });
      }
      const answer = question.acceptedAnswer as Record<string, unknown> | undefined;
      if (!answer || answer["@type"] !== "Answer" || !answer.text) {
        checks.push({
          severity: "error",
          type,
          message: `FAQPage entry #${i + 1} missing acceptedAnswer.text`,
        });
      }
    });
  }

  // Recurse into nested objects with @type
  for (const value of Object.values(node)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      (value as Record<string, unknown>)["@type"]
    ) {
      validateNode(value as Record<string, unknown>, checks);
    }
  }
};

export interface ValidationResult {
  checks: Check[];
  nodeCount: number;
  scriptCount: number;
  typesFound: Set<string>;
}

/**
 * Validate one or more JSON-LD strings (raw <script> contents).
 * Use this from tests or any non-DOM context.
 */
export const validateJsonLdStrings = (scripts: string[]): ValidationResult => {
  const checks: Check[] = [];
  const typesFound = new Set<string>();
  let nodeCount = 0;

  if (scripts.length === 0) {
    checks.push({ severity: "error", type: "Document", message: "No JSON-LD scripts provided" });
    return { checks, nodeCount: 0, scriptCount: 0, typesFound };
  }

  scripts.forEach((raw, idx) => {
    try {
      const parsed = JSON.parse(raw || "{}");
      if (!parsed["@context"]) {
        checks.push({
          severity: "warning",
          type: `Script #${idx + 1}`,
          message: "Missing @context (should be https://schema.org)",
        });
      }
      const nodes: Record<string, unknown>[] = Array.isArray(parsed["@graph"])
        ? parsed["@graph"]
        : [parsed];
      nodes.forEach((n) => {
        nodeCount += 1;
        if (typeof n["@type"] === "string") typesFound.add(n["@type"] as string);
        validateNode(n, checks);
      });
    } catch (e) {
      checks.push({
        severity: "error",
        type: `Script #${idx + 1}`,
        message: `Invalid JSON: ${(e as Error).message}`,
      });
    }
  });

  return { checks, nodeCount, scriptCount: scripts.length, typesFound };
};

/** Extract every <script type="application/ld+json"> block from an HTML string. */
export const extractJsonLdFromHtml = (html: string): string[] => {
  const out: string[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    out.push(m[1].trim());
  }
  return out;
};
