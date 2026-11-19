import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { z } from "zod";
import { runInNewContext } from "node:vm";
import { emailTextFromHtml, emailHtmlWithoutAmazonLinks, newsletterEmailHtml } from "../../supabase/functions/_shared/email-content";
import { buildAdminNotification } from "../../supabase/functions/_shared/digital-signup";

const schemaSource = readFileSync("supabase/functions/_shared/schemas.ts", "utf8").replace(/^import .*$/m, "");
const schemaExports: Record<string, any> = {};
runInNewContext(ts.transpileModule(schemaSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { exports: schemaExports, z });
const schema = schemaExports.EmailPayloadSchema;

const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith(".ts") ? [join(dir, entry.name)] : []);

describe("queued email content", () => {
  it("every queue producer supplies both HTML and text, including auth", () => {
    const producers: string[] = [];
    for (const file of walk("supabase/functions")) {
      const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
      const visit = (node: ts.Node) => {
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "rpc"
          && node.arguments[0] && ts.isStringLiteral(node.arguments[0]) && node.arguments[0].text === "enqueue_email") {
          producers.push(file);
          const args = node.arguments[1];
          if (!args || !ts.isObjectLiteralExpression(args)) throw new Error(`Missing queue arguments: ${file}`);
          const payload = args.properties.find((p) => p.name?.getText(source) === "payload");
          if (!payload || !ts.isPropertyAssignment(payload) || !ts.isObjectLiteralExpression(payload.initializer)) throw new Error(`Missing payload: ${file}`);
          const names = payload.initializer.properties.map((p) => p.name?.getText(source));
          expect(names, file).toContain("html");
          expect(names, file).toContain("text");
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
    expect(producers).toHaveLength(11);
  });

  it.each(["request-lead-confirmation", "resend-lead-confirmation", "send-welcome-email"])("%s text keeps the actual confirmation or guide destination and passes queue validation", (name) => {
    const source = readFileSync(`supabase/functions/${name}/index.ts`, "utf8").replace(/^import .*$/gm, "");
    const html = runInNewContext(ts.transpileModule(`${source}\nbuild${name === "send-welcome-email" ? 'WelcomeHtml("the-edit-weekly-pdf")' : 'ConfirmHtml("Jen", "Free Guide", "https://moderntech.store/confirm-email?token=test-token")'};`,
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { Deno: { serve: () => {} } });
    const text = emailTextFromHtml(html);
    expect(text).toContain(name === "send-welcome-email" ? "https://moderntech.store/the-edit?pdf=1" : "https://moderntech.store/confirm-email?token=test-token");
    expect(text.length).toBeGreaterThan(100);
    expect(text).not.toMatch(/\u2014|https?:\/\/[^\s]*amazon\./);
    expect(schema.safeParse({ to: "buyer@example.com", from: "Modern Tech LLC <info@moderntech.store>", subject: "Confirmation", html, text }).success).toBe(true);
  });

  it("admin notification text includes signup details and schema-valid content", () => {
    const notice = buildAdminNotification({ kind: "free", email: "buyer@example.com", productLabel: "Free Guide", newsletterOptIn: false });
    expect(notice.text).toContain("Free download signup");
    expect(notice.text).toContain("buyer@example.com");
    expect(notice.text).toContain("Free Guide");
    expect(notice.text).not.toContain("\u2014");
    expect(schema.safeParse({ ...notice, to: "info@moderntech.store", from: "Modern Tech LLC <info@moderntech.store>" }).success).toBe(true);
  });

  it("removes Amazon destinations from HTML and text without changing unrelated links", () => {
    const html = '<p>Product</p><a href="https://www.amazon.com/dp/B0D62PMB3R?tag=moderntech02-20">Product details</a><a href="https://moderntech.store/guide">Guide</a><p>https://amzn.to/example</p>';
    expect(emailHtmlWithoutAmazonLinks(html)).not.toMatch(/amazon\.com|amzn\.to/);
    expect(emailTextFromHtml(html)).toContain("Guide (https://moderntech.store/guide)");
    expect(emailTextFromHtml(html)).not.toMatch(/amazon\.com|amzn\.to/);
  });

  it("broadcast HTML and text contain the same working reply-based unsubscribe link", () => {
    const html = newsletterEmailHtml("<html><body><p>Weekly update</p></body></html>");
    expect(html).toContain('href="mailto:info@moderntech.store?subject=Unsubscribe"');
    expect(emailTextFromHtml(html)).toContain("Unsubscribe (mailto:info@moderntech.store?subject=Unsubscribe)");
  });

  it("rejects empty or style-only text instead of providing a placeholder", () => {
    expect(() => emailTextFromHtml("<style>p { color: red }</style><p> </p>")).toThrow("meaningful text");
    expect(schema.safeParse({ to: "buyer@example.com", from: "Modern Tech", subject: "Confirmation", html: "<p>Confirm</p>" }).success).toBe(false);
  });
});