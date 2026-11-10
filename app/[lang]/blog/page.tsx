import type { Metadata } from "next";
import { getDict, getPosts } from "@/content";
import { pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import PostCard from "@/components/site/PostCard";

const PATH = "/blog";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).blogIndex;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function BlogIndex({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  const b = dict.blogIndex;
  const posts = getPosts(locale);
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={PATH} active="blog" />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: dict.nav.blog, path: PATH }]}
          kicker={b.kicker}
          title={b.title}
          lead={b.lead}
        />
        <section className="hx-section hx-section--alt">
          <div className="hx-container hx-posts">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={PATH} />
    </>
  );
}
