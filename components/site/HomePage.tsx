import Image from "next/image";
import Link from "next/link";
import { channelCategoryImageSrc } from "@/lib/site-images";
import { SITE_NAME, SITE_URL, absoluteUrl, localePath, type Locale } from "@/lib/i18n";
import { HIGHEST_PRICE, LOWEST_PRICE } from "@/lib/plans";
import type { Dict, Post } from "@/content/types";
import { topFaq } from "@/content";
import CatchonTVUIClient from "@/app/components/CatchonTVUIClient";
import Icon from "./Icon";
import JsonLd from "./JsonLd";
import FaqList from "./FaqList";
import PricingSection from "./PricingSection";
import PostCard from "./PostCard";
import { rich } from "./Rich";

const DEVICE_ICONS = [
  "smart-tv",
  "streaming-stick",
  "tv-box",
  "smartphone",
  "tablet",
  "laptop",
  "desktop",
  "game-console",
  "projector",
];

const WALL: { img: string; wide: boolean }[] = [
  { img: "genre-action.webp", wide: true },
  { img: "genre-scifi.webp", wide: true },
  { img: "genre-thriller.webp", wide: false },
  { img: "genre-family.webp", wide: false },
  { img: "genre-documentary.webp", wide: false },
  { img: "genre-adventure.webp", wide: false },
  { img: "genre-drama.webp", wide: true },
  { img: "genre-comedy.webp", wide: true },
];

const SPORT_TILES = ["football-night", "basketball", "tennis", "motorsport"];

export default function HomePage({ locale, dict, posts }: { locale: Locale; dict: Dict; posts: Post[] }) {
  const h = dict.home;
  const faq = topFaq(dict, 8);

  return (
    <>
      <CatchonTVUIClient currency={locale === "en" ? "usd" : "eur"} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${SITE_NAME} — ${h.hero.title} ${h.hero.titleAccent}`,
          description: h.meta.description,
          brand: { "@type": "Brand", name: SITE_NAME },
          image: `${SITE_URL}/img/og-image.jpg`,
          url: absoluteUrl(locale),
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: LOWEST_PRICE,
            highPrice: HIGHEST_PRICE,
            offerCount: 8,
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {/* Hero */}
      <section className="hx-hero" id="top">
        <div className="hx-container hx-hero__grid">
          <div>
            <span className="hx-hero__eyebrow">
              <span className="hx-hero__dot">
                <Icon name="check" />
              </span>
              {h.hero.eyebrow}
            </span>
            <h1>
              {h.hero.title} <span>{h.hero.titleAccent}</span>
            </h1>
            <p className="hx-hero__lead">{rich(h.hero.lead, locale)}</p>
            <div className="hx-hero__ctas">
              <a href="#pricing" className="hx-btn hx-btn--bright">
                {h.hero.ctaPrimary} <Icon name="arrow-right" />
              </a>
              <Link href={localePath(locale, "/guide")} className="hx-btn hx-btn--ghost-light">
                {h.hero.ctaSecondary}
              </Link>
            </div>
            <ul className="hx-chips">
              {h.hero.chips.map((c) => (
                <li key={c} className="hx-chip">
                  <Icon name="check-circle" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="hx-hero__media">
            <div className="hx-hero__frame">
              <Image
                src="/img/hero-watch.webp"
                alt={h.hero.imageAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </div>
            <span className="hx-float hx-float--a">
              <span className="hx-live" aria-hidden /> {h.hero.floatA}
            </span>
            <span className="hx-float hx-float--b">
              <Icon name="bolt" /> {h.hero.floatB}
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="hx-stats">
        <div className="hx-container">
          <dl className="hx-stats__grid">
            {h.stats.map((s) => (
              <div key={s.label} className="hx-stat">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* What is IPTV */}
      <section className="hx-section" id="about">
        <div className="hx-container hx-split">
          <div className="hx-head hx-head--left" style={{ marginBottom: 0 }}>
            <p className="hx-kicker">{h.intro.kicker}</p>
            <h2>{h.intro.title}</h2>
          </div>
          <div className="hx-prose">
            {h.intro.paragraphs.map((p, i) => (
              <p key={i}>{rich(p, locale)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="hx-section hx-section--alt" id="features">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.features.kicker}</p>
            <h2>{h.features.title}</h2>
            <p className="hx-lead">{rich(h.features.lead, locale)}</p>
          </div>
          <div className="hx-grid-3">
            {h.features.items.map((f) => (
              <article key={f.title} className="hx-card">
                <span className="hx-icon-bubble">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{rich(f.text, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="hx-section hx-section--dark" id="sports">
        <div className="hx-container hx-sports">
          <div className="hx-sports__media hx-sports__mosaic">
            {SPORT_TILES.map((s) => (
              <div key={s} className="hx-sports__tile">
                <Image src={`/img/sports/${s}.webp`} alt={h.sports.imageAlt} fill sizes="(max-width: 900px) 50vw, 300px" />
              </div>
            ))}
            <span className="hx-badge-live">
              <span className="hx-live" aria-hidden /> {h.sports.badge}
            </span>
          </div>
          <div>
            <p className="hx-kicker">{h.sports.kicker}</p>
            <h2 className="hx-h2">{h.sports.title}</h2>
            <p className="hx-lead">{rich(h.sports.lead, locale)}</p>
            <div className="hx-points">
              {h.sports.points.map((pt, i) => (
                <div key={pt.title} className="hx-point">
                  <span className="hx-icon-bubble">
                    <Icon name={(["trophy", "globe", "signal"] as const)[i % 3]} />
                  </span>
                  <div>
                    <h3>{pt.title}</h3>
                    <p>{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <ul className="hx-tags">
              {h.sports.chips.map((c) => (
                <li key={c} className="hx-tag">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="hx-section" id="channels">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.categories.kicker}</p>
            <h2>{h.categories.title}</h2>
            <p className="hx-lead">{rich(h.categories.lead, locale)}</p>
          </div>
          <div className="hx-cats">
            {h.categories.items.map((c) => (
              <article key={c.key} className="hx-cat">
                <div className="hx-cat__img">
                  <Image src={channelCategoryImageSrc[c.key]} alt="" fill sizes="(max-width: 640px) 100vw, 380px" />
                </div>
                <div className="hx-cat__body">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="hx-center">
            <Link href={localePath(locale, "/channels")} className="hx-btn hx-btn--ghost">
              {h.categories.cta} <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </section>

      {/* VOD */}
      <section className="hx-section hx-section--alt" id="movies">
        <div className="hx-container hx-vod">
          <div>
            <p className="hx-kicker">{h.vod.kicker}</p>
            <h2 className="hx-h2">{h.vod.title}</h2>
            <p className="hx-lead">{rich(h.vod.lead, locale)}</p>
            <ul className="hx-checks">
              {h.vod.points.map((p) => (
                <li key={p}>
                  <Icon name="check-circle" /> <span>{rich(p, locale)}</span>
                </li>
              ))}
            </ul>
            <a href="#pricing" className="hx-btn hx-btn--primary">
              {dict.common.seePlans} <Icon name="arrow-right" />
            </a>
          </div>
          <div className="hx-wall">
            <div className="hx-wall__bar">
              <span className="hx-wall__pill hx-wall__pill--on">
                <Icon name="film" /> {h.vod.pillA}
              </span>
              <span className="hx-wall__pill">
                <Icon name="clock" /> {h.vod.pillB}
              </span>
            </div>
            <div className="hx-wall__grid">
              {WALL.map((w) => (
                <div key={w.img} className={`hx-wall__item ${w.wide ? "hx-wall__item--wide" : "hx-wall__item--tall"}`}>
                  <Image
                    src={`/img/films/${w.img}`}
                    alt=""
                    fill
                    sizes={w.wide ? "(max-width: 640px) 100vw, 320px" : "(max-width: 640px) 50vw, 160px"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="hx-section" id="devices">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.devices.kicker}</p>
            <h2>{h.devices.title}</h2>
            <p className="hx-lead">{rich(h.devices.lead, locale)}</p>
          </div>
          <ul className="hx-devices">
            {DEVICE_ICONS.map((d, i) => (
              <li key={d} className="hx-device">
                <Image src={`/img/devices/${d}.png`} alt="" width={56} height={56} />
                <span>{h.devices.labels[i]}</span>
              </li>
            ))}
          </ul>
          <div className="hx-apps">
            <div>
              <h3>{h.devices.appsTitle}</h3>
              <p>{rich(h.devices.appsNote, locale)}</p>
            </div>
            <ul className="hx-apps__list">
              {h.devices.apps.map((a) => (
                <li key={a}>
                  <Icon name="play-circle" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="hx-section hx-section--tint" id="how-it-works">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.steps.kicker}</p>
            <h2>{h.steps.title}</h2>
          </div>
          <ol className="hx-steps">
            {h.steps.items.map((s) => (
              <li key={s.title} className="hx-step">
                <h3>{s.title}</h3>
                <p>{rich(s.text, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PricingSection locale={locale} dict={dict} />

      {/* Compare */}
      <section className="hx-section" id="compare">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.compare.kicker}</p>
            <h2>{h.compare.title}</h2>
            <p className="hx-lead">{rich(h.compare.lead, locale)}</p>
          </div>
          <div className="hx-table-wrap">
            <table className="hx-table">
              <thead>
                <tr>
                  {h.compare.cols.map((c, i) => (
                    <th key={i} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {h.compare.rows.map(([a, b, c]) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    <td>{b}</td>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hx-section hx-section--alt" id="faq">
        <div className="hx-container">
          <div className="hx-head">
            <p className="hx-kicker">{h.faq.kicker}</p>
            <h2>{h.faq.title}</h2>
            <p className="hx-lead">{rich(h.faq.lead, locale)}</p>
          </div>
          <FaqList items={faq} locale={locale} schema openFirst />
          <p className="hx-center">
            <Link href={localePath(locale, "/faq")} className="hx-btn hx-btn--ghost">
              {h.faq.more} <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="hx-section" id="guides">
          <div className="hx-container">
            <div className="hx-head">
              <p className="hx-kicker">{h.blog.kicker}</p>
              <h2>{h.blog.title}</h2>
              <p className="hx-lead">{h.blog.lead}</p>
            </div>
            <div className="hx-posts">
              {posts.slice(0, 3).map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} dict={dict} />
              ))}
            </div>
            <p className="hx-center">
              <Link href={localePath(locale, "/blog")} className="hx-btn hx-btn--ghost">
                {h.blog.all} <Icon name="arrow-right" />
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="hx-section" style={{ paddingTop: 0 }}>
        <div className="hx-container">
          <div className="hx-cta">
            <div>
              <h2>{h.cta.title}</h2>
              <p>{h.cta.text}</p>
            </div>
            <div className="hx-cta__btns">
              <a href="#pricing" className="hx-btn hx-btn--bright">
                {h.cta.primary}
              </a>
              <Link href={localePath(locale, "/contact")} className="hx-btn hx-btn--ghost-light">
                {h.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
