/** The Edit (weekly newsletter) pages stay calm: no popups, promo banners or floating widgets. */
export const isSignalRoute = (pathname: string) =>
  pathname === "/the-edit" || pathname.startsWith("/the-edit/");
