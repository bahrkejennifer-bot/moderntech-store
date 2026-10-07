import { useRef, useState, type ReactNode } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FinderPick {
  slug: string;
  title: string;
  imageUrl: string | null;
  audience: string;
  benefit: string;
  limitation: string;
}

// Local keyword matching over the existing curated catalog only. No live search, prices or AI.
const interestMap: Record<string, { label: string; words: string[] }[]> = {
  "rocketbook-core": [{ label: "note-taking", words: ["note", "notes", "notebook", "write", "writing", "writer", "journal", "journaling", "planner", "planning", "student", "school", "college", "teacher", "organized", "organize", "pen", "meetings"] }],
  "soundcore-space-one": [{ label: "listening & focus", words: ["music", "headphones", "headphone", "audio", "podcast", "podcasts", "focus", "study", "studying", "commute", "commuter", "travel", "traveler", "flight", "flying", "noise", "quiet", "audiobook", "audiobooks"] }],
  "benq-screenbar-halo-2": [{ label: "desk setup", words: ["desk", "monitor", "computer", "office", "wfh", "remote", "gaming", "gamer", "games", "coder", "coding", "programmer", "developer", "work", "workspace", "setup"] }],
  "renpho-elis-1": [{ label: "fitness & wellness", words: ["fitness", "health", "healthy", "wellness", "gym", "workout", "workouts", "exercise", "weight", "running", "runner", "athlete", "diet", "scale"] }],
  "snap-circuits-jr-sc-100": [{ label: "kids & STEM", words: ["kid", "kids", "child", "children", "son", "daughter", "grandson", "granddaughter", "grandkid", "grandkids", "nephew", "niece", "stem", "science", "engineering", "engineer", "electronics", "build", "building", "curious", "tinkerer", "tinkering", "boy", "girl"] }],
  "jbl-flip-6": [{ label: "music outdoors", words: ["music", "speaker", "outdoor", "outdoors", "outside", "beach", "pool", "party", "parties", "camping", "garden", "gardening", "gardener", "backyard", "patio", "bbq", "grilling", "hiking", "shower", "picnic"] }],
  "anker-solix-c300-dc": [{ label: "portable power", words: ["camping", "camper", "outdoor", "outdoors", "rv", "van", "vanlife", "roadtrip", "road", "trip", "power", "outage", "emergency", "prepared", "solar", "hiking", "fishing", "tailgate", "tailgating", "garden", "gardening", "off-grid", "offgrid", "cabin"] }],
};

const chips = ["Music", "Outdoors", "Gardening", "Home office", "Fitness", "Kids & STEM", "Note-taking", "Travel", "Camping"];
const budgetRe = /\$\s?\d|\d+\s?(dollars|bucks|usd)\b|\bbudget\b|\bunder\s+\d|\baround\s+\d|\bcheap\b|\baffordable\b/i;

type Result = { pick: FinderPick; reasons: string[]; matched: string[] };
type State = { kind: "idle" } | { kind: "empty" } | { kind: "none"; query: string } | { kind: "results"; query: string; results: Result[]; budget: boolean };

export const matchGifts = (query: string, picks: FinderPick[]): Result[] => {
  const tokens = new Set(query.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(Boolean));
  if (tokens.has("home") && tokens.has("office")) tokens.add("office");
  return picks.flatMap((pick) => {
    const groups = interestMap[pick.slug] ?? [];
    const matched: string[] = []; const reasons: string[] = [];
    groups.forEach((g) => { const hits = g.words.filter((w) => tokens.has(w)); if (hits.length) { matched.push(...hits); reasons.push(g.label); } });
    return matched.length ? [{ pick, reasons, matched }] : [];
  }).sort((a, b) => b.matched.length - a.matched.length).slice(0, 3);
};

const GiftFinder = ({ picks, renderCta, disclosure }: { picks: FinderPick[]; renderCta: (slug: string) => ReactNode; disclosure: string }) => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (text: string) => {
    const q = text.trim().slice(0, 200);
    if (!q) { setState({ kind: "empty" }); inputRef.current?.focus(); return; }
    const results = matchGifts(q, picks);
    setState(results.length ? { kind: "results", query: q, results, budget: budgetRe.test(q) } : { kind: "none", query: q });
  };
  const addChip = (chip: string) => { const next = query.toLowerCase().includes(chip.toLowerCase()) ? query : `${query.trim()} ${chip}`.trim(); setQuery(next); run(next); };
  const reset = () => { setQuery(""); setState({ kind: "idle" }); inputRef.current?.focus(); };

  const announce = state.kind === "empty" ? "Tell us a little about who you're shopping for, such as their interests or hobbies."
    : state.kind === "none" ? "No curated pick matches that description yet."
    : state.kind === "results" ? `${state.results.length} gift idea${state.results.length > 1 ? "s" : ""} found.` : "";

  return (
    <div className="launch-reveal mb-14 rounded-3xl bg-card p-5 md:p-10">
      <h3 className="text-2xl font-semibold md:text-3xl">Gift finder</h3>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">Describe the person and their interests. We'll match them to our short curated list. No live Amazon search, and no email needed.</p>
      <form className="mt-6" onSubmit={(e) => { e.preventDefault(); run(query); }} noValidate>
        <label htmlFor="gift-query" className="mb-2 block text-base font-medium">Who are you shopping for?</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input id="gift-query" ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} maxLength={200}
            placeholder="e.g. A tech gift for Dad who enjoys gardening, around $50" aria-describedby="gift-status" className="h-12 rounded-full bg-background px-5 text-base" />
          <Button type="submit" size="lg" className="min-h-12 rounded-full px-6 text-base"><Search aria-hidden="true" className="mr-2 h-4 w-4" />Find Gift Ideas</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Add an interest">
          {chips.map((c) => <Button key={c} type="button" variant="outline" className="min-h-10 rounded-full px-4" onClick={() => addChip(c)}>{c}</Button>)}
          {state.kind !== "idle" && <Button type="button" variant="ghost" className="min-h-10 rounded-full px-4" onClick={reset}><RotateCcw aria-hidden="true" className="mr-2 h-4 w-4" />Reset</Button>}
        </div>
      </form>
      <p id="gift-status" role="status" aria-live="polite" className="mt-5 text-base font-medium">{announce}</p>

      {state.kind === "none" && <p className="mt-2 max-w-2xl text-base text-muted-foreground">We couldn't match "{state.query}" to our curated picks. Try adding a hobby such as music, gardening, camping, fitness, a home office or kids' science, or browse the full list below.</p>}
      {state.kind === "results" && <>
        {state.budget && <p className="mt-3 max-w-2xl rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed"><strong>About your budget:</strong> we don't have verified current prices, so we can't confirm these fit your budget. Check current price on Amazon before buying.</p>}
        <p className="mt-4 max-w-xl text-sm text-muted-foreground">{disclosure}</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {state.results.map(({ pick, reasons, matched }) => <li key={pick.slug} className="flex flex-col rounded-2xl bg-background p-5">
            {pick.imageUrl && <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-card p-4"><img src={pick.imageUrl} alt={pick.title} loading="lazy" className="h-full w-full object-contain" /></div>}
            <h4 className="mt-4 text-lg font-semibold leading-snug">{pick.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground"><strong className="text-foreground">Why it fits:</strong> you mentioned {matched.slice(0, 3).map((m) => `"${m}"`).join(", ")} ({reasons.join(", ")}). {pick.benefit}</p>
            <p className="mt-2 flex-1 text-sm text-muted-foreground"><strong className="text-foreground">Good to know:</strong> {pick.limitation}</p>
            {state.budget && <p className="mt-3 text-sm font-medium">Check current price on Amazon</p>}
            <div className="mt-4">{renderCta(pick.slug)}</div>
          </li>)}
        </ul>
      </>}
    </div>
  );
};

export default GiftFinder;
