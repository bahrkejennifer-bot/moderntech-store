import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, X, Loader2 } from "lucide-react";

type Severity = "error" | "warning" | "ok";
type Check = { severity: Severity; type: string; message: string };

const REQUIRED_FIELDS: Record<string, string[]> = {
  Organization: ["name", "url", "logo"],
  WebSite: ["url", "name"],
  WebPage: ["url", "name"],
  BlogPosting: ["headline", "datePublished", "author", "image"],
  BreadcrumbList: ["itemListElement"],
  ImageObject: ["url"],
};

const RICH_RESULT_RECOMMENDED: Record<string, string[]> = {
  BlogPosting: ["dateModified", "publisher", "mainEntityOfPage", "description"],
  Organization: ["sameAs"],
  WebPage: ["description", "inLanguage"],
};

const validateNode = (node: Record<string, unknown>, checks: Check[]) => {
  const type = (node["@type"] as string) || "Unknown";

  const required = REQUIRED_FIELDS[type];
  if (required) {
    for (const field of required) {
      if (node[field] === undefined || node[field] === null || node[field] === "") {
        checks.push({
          severity: "error",
          type,
          message: `Missing required field "${field}"`,
        });
      }
    }
  }

  const recommended = RICH_RESULT_RECOMMENDED[type];
  if (recommended) {
    for (const field of recommended) {
      if (node[field] === undefined || node[field] === null || node[field] === "") {
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

  // Recurse into nested objects with @type
  for (const value of Object.values(node)) {
    if (value && typeof value === "object" && !Array.isArray(value) && (value as Record<string, unknown>)["@type"]) {
      validateNode(value as Record<string, unknown>, checks);
    }
  }
};

const runValidation = (): { checks: Check[]; nodeCount: number; scriptCount: number } => {
  const scripts = document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]');
  const checks: Check[] = [];
  let nodeCount = 0;

  if (scripts.length === 0) {
    checks.push({
      severity: "error",
      type: "Document",
      message: "No JSON-LD script tags found on this page",
    });
    return { checks, nodeCount: 0, scriptCount: 0 };
  }

  scripts.forEach((script, idx) => {
    try {
      const parsed = JSON.parse(script.textContent || "{}");
      if (!parsed["@context"]) {
        checks.push({
          severity: "warning",
          type: `Script #${idx + 1}`,
          message: "Missing @context (should be https://schema.org)",
        });
      }
      const nodes = Array.isArray(parsed["@graph"])
        ? parsed["@graph"]
        : [parsed];
      nodes.forEach((n: Record<string, unknown>) => {
        nodeCount += 1;
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

  if (checks.length === 0) {
    checks.push({
      severity: "ok",
      type: "All",
      message: "No errors or warnings detected",
    });
  }

  return { checks, nodeCount, scriptCount: scripts.length };
};

const JsonLdValidator = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ checks: Check[]; nodeCount: number; scriptCount: number } | null>(null);

  const handleRun = () => {
    setLoading(true);
    setOpen(true);
    // tiny delay so UI shows the loading state for instantaneous DOM scans
    setTimeout(() => {
      setResult(runValidation());
      setLoading(false);
    }, 200);
  };

  const errors = result?.checks.filter((c) => c.severity === "error").length ?? 0;
  const warnings = result?.checks.filter((c) => c.severity === "warning").length ?? 0;
  const passed = result && errors === 0;

  return (
    <>
      <button
        onClick={handleRun}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 h-10 px-4 font-mono text-[10px] tracking-[0.2em] uppercase shadow-lg transition-all hover:opacity-90"
        style={{ backgroundColor: "hsl(220 15% 14%)", color: "hsl(30 25% 95%)" }}
        aria-label="Run JSON-LD validation"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        Validate Schema
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: "hsl(220 15% 14% / 0.6)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col"
            style={{ backgroundColor: "hsl(40 18% 95%)", border: "0.5px solid hsl(220 15% 14% / 0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5" style={{ borderBottom: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
                  Structured Data
                </p>
                <h3 className="font-serif text-xl" style={{ fontWeight: 400 }}>
                  JSON-LD Validation
                </h3>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-4 h-4" style={{ color: "hsl(220 15% 14% / 0.6)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: "hsl(220 15% 14% / 0.6)" }} />
                </div>
              )}

              {!loading && result && (
                <>
                  <div
                    className="p-4 mb-4 flex items-center gap-3"
                    style={{
                      backgroundColor: passed ? "hsl(140 30% 92%)" : "hsl(0 50% 94%)",
                      border: `0.5px solid ${passed ? "hsl(140 30% 70%)" : "hsl(0 50% 70%)"}`,
                    }}
                  >
                    {passed ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(140 50% 30%)" }} />
                    ) : (
                      <XCircle className="w-5 h-5" style={{ color: "hsl(0 60% 40%)" }} />
                    )}
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.05em]" style={{ color: "hsl(220 15% 14%)" }}>
                        {passed ? "Pass — Rich Results eligible" : "Fail — Errors detected"}
                      </p>
                      <p className="font-mono text-[9px] tracking-[0.05em] mt-0.5" style={{ color: "hsl(220 15% 14% / 0.6)" }}>
                        {result.scriptCount} script{result.scriptCount !== 1 ? "s" : ""} · {result.nodeCount} node
                        {result.nodeCount !== 1 ? "s" : ""} · {errors} error{errors !== 1 ? "s" : ""} · {warnings} warning
                        {warnings !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {result.checks.map((check, i) => (
                      <li
                        key={i}
                        className="p-3 flex items-start gap-3"
                        style={{ backgroundColor: "hsl(0 0% 100%)", border: "0.5px solid hsl(220 15% 14% / 0.08)" }}
                      >
                        {check.severity === "error" && (
                          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(0 60% 40%)" }} />
                        )}
                        {check.severity === "warning" && (
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(35 80% 45%)" }} />
                        )}
                        {check.severity === "ok" && (
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(140 50% 30%)" }} />
                        )}
                        <div className="flex-1">
                          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
                            {check.type}
                          </p>
                          <p className="font-mono text-[11px] leading-relaxed" style={{ color: "hsl(220 15% 14%)" }}>
                            {check.message}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4" style={{ borderTop: "0.5px solid hsl(220 15% 14% / 0.1)" }}>
                    <p className="font-mono text-[9px] tracking-[0.05em] leading-relaxed" style={{ color: "hsl(220 15% 14% / 0.5)" }}>
                      Local heuristic validator covering Schema.org required fields and Google Rich Results recommendations.
                      For final verification, run the URL through{" "}
                      <a
                        href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Google Rich Results Test
                      </a>
                      .
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JsonLdValidator;
