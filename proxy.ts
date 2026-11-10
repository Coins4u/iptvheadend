import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PREFIXED = new Set(["fr", "de", "it", "nl", "pt"]);

/**
 * - English is served at the root: "/channels" is rewritten internally to "/en/channels".
 * - "/en/..." is permanently redirected to the unprefixed URL (one canonical URL per page).
 * - HTML documents revalidate on every navigation so a fresh deploy never serves HTML that
 *   points at old /_next/static chunks (static assets keep their immutable caching).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === "en") {
    const rest = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(`${rest}${search}`, request.url), 308);
  }

  let res: NextResponse;
  if (PREFIXED.has(first) || first === "pay") {
    res = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    res = NextResponse.rewrite(url);
  }

  const dest = request.headers.get("sec-fetch-dest");
  const accept = request.headers.get("accept") ?? "";
  if (dest === "document" || (dest === null && accept.includes("text/html"))) {
    res.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/|img/|guide/img/|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
