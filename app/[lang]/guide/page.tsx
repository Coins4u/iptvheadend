import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import { absoluteUrl, localePath, pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import Icon from "@/components/site/Icon";
import JsonLd from "@/components/site/JsonLd";
import { plain, rich } from "@/components/site/Rich";

const PATH = "/guide";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).guide;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function GuidePage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  const g = dict.guide;
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={PATH} active="guide" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: g.title,
          description: g.meta.description,
          url: absoluteUrl(locale, PATH),
          step: g.devices[0].steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text: plain(s),
            url: `${absoluteUrl(locale, PATH)}#${g.devices[0].id}`,
          })),
        }}
      />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: dict.nav.guide, path: PATH }]}
          kicker={g.kicker}
          title={g.title}
          lead={rich(g.lead, locale)}
        >
          <nav className="hx-jump" aria-label={g.jump}>
            {g.devices.map((d) => (
              <a key={d.id} href={`#${d.id}`}>
                {d.title}
              </a>
            ))}
          </nav>
        </PageHero>

        <section className="hx-section hx-section--alt">
          <div className="hx-container">
            <div className="hx-head hx-head--left">
              <h2>{g.beforeTitle}</h2>
            </div>
            <ul className="hx-before">
              {g.before.map((b) => (
                <li key={b}>
                  <Icon name="check-circle" />
                  <span>{rich(b, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="hx-section">
          <div className="hx-container">
            {g.devices.map((d) => (
              <article key={d.id} id={d.id} className="hx-guide-dev">
                <div>
                  <h2>{d.title}</h2>
                  <p>{rich(d.intro, locale)}</p>
                </div>
                <ol className="hx-guide-steps">
                  {d.steps.map((s, i) => (
                    <li key={i}>{rich(s, locale)}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="hx-section hx-section--alt">
          <div className="hx-container">
            <div className="hx-head">
              <h2>{g.playersTitle}</h2>
              <p className="hx-lead">{rich(g.playersLead, locale)}</p>
            </div>
            <div className="hx-players">
              {g.players.map((p) => (
                <article key={p.name} className="hx-card">
                  <span className="hx-icon-bubble">
                    <Icon name="play-circle" />
                  </span>
                  <h3>{p.name}</h3>
                  <p>{rich(p.text, locale)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hx-section">
          <div className="hx-container hx-split">
            <div className="hx-head hx-head--left" style={{ marginBottom: 0 }}>
              <h2>{g.tipsTitle}</h2>
            </div>
            <div className="hx-prose">
              <ul>
                {g.tips.map((t) => (
                  <li key={t}>{rich(t, locale)}</li>
                ))}
              </ul>
              <div className="hx-tip">
                <strong>{g.helpTitle}</strong> {rich(g.helpText, locale)}
              </div>
              <p>
                <Link href={localePath(locale, "/contact")} className="hx-btn hx-btn--primary">
                  {dict.common.contactUs} <Icon name="arrow-right" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={PATH} />
    </>
  );
}
