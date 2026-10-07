import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Swipeable rail that advances slowly; pauses on button, hover, focus, and never moves under reduced motion. */
const GiftRail = ({ children, label }: { children: ReactNode; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-card]");
    const amount = (card?.offsetWidth ?? 300) + 16;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
    else el.scrollBy({ left: dir * amount, behavior: reduced ? "auto" : "smooth" });
  };

  const moving = !paused && !hovering && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => step(1), 4500);
    return () => window.clearInterval(t);
  }, [moving]);

  return (
    <div>
      <div ref={ref} role="region" aria-label={label} aria-roledescription="carousel" data-moving={moving}
        className="launch-rail -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0"
        onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)} onBlur={() => setHovering(false)} onTouchStart={() => setPaused(true)}>
        {children}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Previous gift pick" onClick={() => step(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" aria-label="Next gift pick" onClick={() => step(1)}><ArrowRight className="h-5 w-5" /></Button>
        {!reduced && <Button variant="outline" size="lg" className="min-h-12 rounded-full px-5" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? <><Play aria-hidden="true" className="mr-2 h-4 w-4" />Play</> : <><Pause aria-hidden="true" className="mr-2 h-4 w-4" />Pause</>}
        </Button>}
      </div>
    </div>
  );
};

export default GiftRail;
