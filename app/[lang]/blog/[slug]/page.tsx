import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDict, getPost, getPosts } from "@/content";
import type { Block } from "@/content/types";
import { LOCALES, LOCALE_META, SITE_NAME, SITE_URL, absoluteUrl, isLocale, localePath, pageMetadata, type Locale } from "@/lib/i18n";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import PostCard, { formatDate } from "@/components/site/PostCard";
import FaqList from "@/components/site/FaqList";
import JsonLd from "@/components/site/JsonLd";
import Icon from "@/components/site/Icon";
import { rich } from "@/components/site/Rich";

type Params = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

async function load(params: Params["params"]) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();
  return { locale: lang as Locale, post };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, post } = await load(params);
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    translated: false,
    type: "article",
  });
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function renderBlock(b: Block, i: number, locale: Locale) {
  if ("h2" in b) return <h2 key={i} id={slugify(b.h2)}>{b.h2}</h2>;
  if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
  if ("p" in b) return <p key={i}>{rich(b.p, locale)}</p>;
  if ("ul" in b)
    return (
      <ul key={i}>
        {b.ul.map((x, j) => (
          <li key={j}>{rich(x, locale)}</li>
        ))}
      </ul>
    );
  if ("ol" in b)
    return (
      <ol key={i}>
        {b.ol.map((x, j) => (
          <li key={j}>{rich(x, locale)}</li>
        ))}
      </ol>
    );
  return (
    <div key={i} className="hx-tip">
      {rich(b.tip, locale)}
    </div>
  );
}

export default async function PostPage({ params }: Params) {
  const { locale, post } = await load(params);
  const dict = getDict(locale);
  const url = absoluteUrl(locale, `/blog/${post.slug}`);
  const toc = post.blocks.filter((b): b is { h2: string } => "h2" in b);
  const related = getPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} path="/blog" active="blog" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: `${SITE_URL}${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: LOCALE_META[locale].htmlLang,
          mainEntityOfPage: url,
          url,
          author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[
            { label: dict.nav.blog, path: "/blog" },
            { label: post.title, path: `/blog/${post.slug}` },
          ]}
          title={post.title}
          lead={post.description}
        >
          <div className="hx-post-meta">
            <span>
              {dict.common.updated} {formatDate(post.date, locale)}
            </span>
            <span>
              {post.minutes} {dict.common.minRead}
            </span>
          </div>
        </PageHero>

        <section className="hx-section">
          <div className="hx-container hx-article">
            <article>
              <div className="hx-article__cover">
                <Image src={post.image} alt="" fill priority sizes="(max-width: 1100px) 100vw, 820px" />
              </div>
              <div className="hx-prose">{post.blocks.map((b, i) => renderBlock(b, i, locale))}</div>
              {post.faq && post.faq.length > 0 && (
                <div style={{ marginTop: 48 }}>
                  <h2 className="hx-h2" style={{ fontSize: 28, marginBottom: 18 }}>
                    {dict.common.faqShort}
                  </h2>
                  <FaqList items={post.faq} locale={locale} schema />
                </div>
              )}
            </article>
            <aside className="hx-aside">
              {toc.length > 1 && (
                <nav className="hx-aside__box" aria-label={dict.common.tocTitle}>
                  <h2>{dict.common.tocTitle}</h2>
                  <ol className="hx-toc">
                    {toc.map((b) => (
                      <li key={b.h2}>
                        <a href={`#${slugify(b.h2)}`}>{b.h2}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="hx-aside__cta">
                <strong>{dict.home.cta.title}</strong>
                <p>{dict.home.cta.text}</p>
                <a href={`${localePath(locale)}#pricing`} className="hx-btn hx-btn--bright hx-btn--block">
                  {dict.common.seePlans} <Icon name="arrow-right" />
                </a>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="hx-section hx-section--alt">
            <div className="hx-container">
              <div className="hx-head">
                <h2>{dict.common.relatedTitle}</h2>
              </div>
              <div className="hx-posts">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} locale={locale} dict={dict} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter locale={locale} dict={dict} path="/blog" />
    </>
  );
}
