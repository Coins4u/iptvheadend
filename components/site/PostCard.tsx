import Image from "next/image";
import Link from "next/link";
import { LOCALE_META, localePath, type Locale } from "@/lib/i18n";
import type { Dict, Post } from "@/content/types";

export function formatDate(iso: string, locale: Locale) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(LOCALE_META[locale].dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostCard({ post, locale, dict }: { post: Post; locale: Locale; dict: Dict }) {
  return (
    <Link href={localePath(locale, `/blog/${post.slug}`)} className="hx-post-card">
      <div className="hx-post-card__img">
        <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 380px" />
      </div>
      <div className="hx-post-card__body">
        <span className="hx-post-card__meta">
          {formatDate(post.date, locale)} · {post.minutes} {dict.common.minRead}
        </span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="hx-post-card__more">{dict.common.readMore} →</span>
      </div>
    </Link>
  );
}
