import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/content";
import { localePath, pageMetadata } from "@/lib/i18n";
import { resolveLocale, type LangParams } from "@/lib/locale-params";
import { channelCategoryImageSrc } from "@/lib/site-images";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import Icon from "@/components/site/Icon";
import { rich } from "@/components/site/Rich";

const PATH = "/channels";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const d = getDict(locale).channels;
  return pageMetadata({ locale, path: PATH, title: d.meta.title, description: d.meta.description });
}

export default async function ChannelsPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const dict = getDict(locale);
  const c = dict.channels;
  return (
    <>
      <SiteHeader locale={locale} dict={dict} path={PATH} active="channels" />
      <main>
        <PageHero
          locale={locale}
          homeLabel={dict.common.home}
          crumbs={[{ label: dict.nav.channels, path: PATH }]}
          kicker={c.kicker}
          title={c.title}
          lead={rich(c.lead, locale)}
        />
        <section className="hx-section">
          <div className="hx-container">
            <div className="hx-cats">
              {c.items.map((it) => (
                <article key={it.key} className="hx-cat">
                  <div className="hx-cat__img">
                    <Image src={channelCategoryImageSrc[it.key]} alt={it.alt} fill sizes="(max-width: 640px) 100vw, 380px" />
                  </div>
                  <div className="hx-cat__body">
                    <h2 style={{ fontSize: 22, marginBottom: 6 }}>{it.title}</h2>
                    <p>{rich(it.text, locale)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="hx-section hx-section--alt">
          <div className="hx-container hx-split">
            <div className="hx-head hx-head--left" style={{ marginBottom: 0 }}>
              <h2>{c.epgTitle}</h2>
            </div>
            <div className="hx-prose">
              {c.epgText.split("\n\n").map((p, i) => (
                <p key={i}>{rich(p, locale)}</p>
              ))}
            </div>
          </div>
        </section>
        <section className="hx-section">
          <div className="hx-container">
            <div className="hx-cta">
              <div>
                <h2>{c.ctaTitle}</h2>
                <p>{c.ctaText}</p>
              </div>
              <div className="hx-cta__btns">
                <a href={`${localePath(locale)}#pricing`} className="hx-btn hx-btn--bright">
                  {dict.common.seePlans} <Icon name="arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} path={PATH} />
    </>
  );
}
