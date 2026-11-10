const SITE_ORIGIN = "https://iptvheadend.net";

/**
 * Hero: public/img/{HERO_FILENAME}. When you replace the file in place, raise
 * HERO_IMAGE_CACHE_BUST so the URL changes and caches refresh.
 */
const HERO_FILENAME = "hero_sports_center_clean_1769521080817.png";
export const HERO_IMAGE_CACHE_BUST = "10";
export const heroImageSrc = `/img/${HERO_FILENAME}?v=${HERO_IMAGE_CACHE_BUST}`;

/**
 * `sizes` for homepage hero next/image: mobile = full width; tablet = half; desktop cap 600 (intrinsic).
 * Tuned for mobile LCP (smaller downloaded width on phones).
 */
export const HERO_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px";

/**
 * Site logo: public/img/{LOGO_FILENAME}. After swapping logo.png, raise LOGO_IMAGE_CACHE_BUST
 * (same idea as the hero). If you change the logo, bump LOGO_IMAGE_CACHE_BUST and set the
 * same `?v=` in public/guide/index.html (two places).
 */
const LOGO_FILENAME = "logo.png";
export const LOGO_IMAGE_CACHE_BUST = "8";
export const logoImageSrc = `/img/${LOGO_FILENAME}?v=${LOGO_IMAGE_CACHE_BUST}`;

/** Sports section image: public/img/sports/football.png — bump when you replace the file in place. */
export const SPORTS_FOOTBALL_CACHE_BUST = "4";
export const sportsFootballImageSrc = `/img/sports/football.png?v=${SPORTS_FOOTBALL_CACHE_BUST}`;

/** Payment methods strip: public/img/payments.png */
export const PAYMENTS_IMAGE_CACHE_BUST = "1";
export const paymentsImageSrc = `/img/payments.png?v=${PAYMENTS_IMAGE_CACHE_BUST}`;

/**
 * Channel categories page: `public/img/channels/{sport,Movie,News,Kids,Entertainment,Music}.png`.
 * After replacing any file in place, raise CHANNEL_CATEGORY_IMAGES_CACHE_BUST.
 */
export const CHANNEL_CATEGORY_IMAGES_CACHE_BUST = "1";
const ch = (f: string) => `/img/channels/${f}?v=${CHANNEL_CATEGORY_IMAGES_CACHE_BUST}`;

export const channelCategoryImageSrc = {
  sport: ch("sport.png"),
  movie: ch("Movie.png"),
  news: ch("News.png"),
  kids: ch("Kids.png"),
  entertainment: ch("Entertainment.png"),
  music: ch("Music.png"),
} as const;

/** `next/image` `sizes` for channel category row illustrations. */
export const CHANNEL_CATEGORY_IMAGE_SIZES =
  "(max-width: 900px) 90vw, (max-width: 1200px) 40vw, 400px";

/** Full URL for Open Graph, Twitter, JSON-LD (includes cache-bust query). */
export const siteLogoAbsoluteUrl = `${SITE_ORIGIN}${logoImageSrc}`;
