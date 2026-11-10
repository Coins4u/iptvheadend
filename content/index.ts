import type { Locale } from "@/lib/i18n";
import type { Dict, FaqItem, Post } from "./types";
import en from "./en";
import fr from "./fr";
import de from "./de";
import it from "./it";
import nl from "./nl";
import pt from "./pt";
import enPosts from "./blog/en";
import frPosts from "./blog/fr";
import dePosts from "./blog/de";
import itPosts from "./blog/it";
import nlPosts from "./blog/nl";
import ptPosts from "./blog/pt";

const DICTS: Record<Locale, Dict> = { en, fr, de, it, nl, pt };
const POSTS: Record<Locale, Post[]> = {
  en: enPosts,
  fr: frPosts,
  de: dePosts,
  it: itPosts,
  nl: nlPosts,
  pt: ptPosts,
};

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}

/** Newest first. */
export function getPosts(locale: Locale): Post[] {
  return [...POSTS[locale]].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return POSTS[locale].find((p) => p.slug === slug);
}

/** First N questions across all FAQ groups (homepage teaser). */
export function topFaq(dict: Dict, n: number): FaqItem[] {
  return dict.faqPage.groups.flatMap((g) => g.items).slice(0, n);
}
