/** The Signal (weekly newsletter) pages stay calm: no popups, promo banners or floating widgets. */
export const isSignalRoute = (pathname: string) =>
  pathname === "/the-signal" || pathname.startsWith("/the-signal/");
