import { Link, useLocation } from "react-router-dom";

/** Slim, familiar header for The Signal pages: logo home, Shop, The Signal. Nothing else. */
const SignalHeader = () => {
  const { pathname } = useLocation();
  const onIndex = pathname === "/the-signal";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-5">
        <Link to="/" className="text-base font-semibold tracking-tight text-foreground">Modern Tech</Link>
        <div className="flex items-center gap-5 text-sm">
          <Link to="/the-signal" aria-current={onIndex ? "page" : undefined}
            className={onIndex ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}>
            The Signal
          </Link>
          <Link to="/#selections" className="text-muted-foreground hover:text-foreground">Shop</Link>
        </div>
      </nav>
    </header>
  );
};

export default SignalHeader;
