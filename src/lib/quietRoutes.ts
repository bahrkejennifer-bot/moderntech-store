/** Canonical and legacy newsletter pages stay calm during redirects. */
export const isSignalRoute = (pathname: string) =>
  ["/the-signal", "/the-edit", "/blog", "/weekly-edit"].some(path => pathname === path || pathname.startsWith(`${path}/`));
