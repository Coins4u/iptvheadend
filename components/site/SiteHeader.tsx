import Image from "next/image";
import Link from "next/link";
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content/types";
import Icon from "./Icon";

export type NavKey = "home" | "channels" | "guide" | "blog" | "faq" | "contact";

const NAV: { key: NavKey; path: string }[] = [
  { key: "home", path: "" },
  { key: "channels", path: "/channels" },
  { key: "guide", path: "/guide" },
  { key: "blog", path: "/blog" },
  { key: "faq", path: "/faq" },
  { key: "contact", path: "/contact" },
];

type Props = {
  locale: Locale;
  dict: Dict;
  /** current page path without locale prefix, used by the language switcher */
  path: string;
  active?: NavKey;
};

function NavLinks({ locale, dict, active }: Omit<Props, "path">) {
  return (
    <>
      {NAV.map((item) => (
        <Link
          key={item.key}
          href={localePath(locale, item.path)}
          aria-current={active === item.key ? "page" : undefined}
        >
          {dict.nav[item.key]}
        </Link>
      ))}
    </>
  );
}

function LangLinks({ locale, path, withLabel }: { locale: Locale; path: string; withLabel?: boolean }) {
  return (
    <>
      {LOCALES.map((l) => (
        <a
          key={l}
          href={localePath(l, path)}
          hrefLang={LOCALE_META[l].htmlLang}
          lang={LOCALE_META[l].htmlLang}
          aria-current={l === locale ? "true" : undefined}
        >
          {withLabel ? (
            <>
              {LOCALE_META[l].label} <small>{LOCALE_META[l].short}</small>
            </>
          ) : (
            LOCALE_META[l].short
          )}
        </a>
      ))}
    </>
  );
}

export default function SiteHeader({ locale, dict, path, active }: Props) {
  return (
    <header className="hx-header">
      <div className="hx-container hx-header__bar">
        <Link href={localePath(locale)} className="hx-logo" aria-label="IPTV Headend">
          <Image src="/img/logo-mark.png" alt="IPTV Headend" width={64} height={52} priority />
        </Link>

        <nav className="hx-nav" aria-label="Main">
          <NavLinks locale={locale} dict={dict} active={active} />
        </nav>

        <div className="hx-header__actions">
          <details className="hx-lang">
            <summary aria-label={dict.nav.language}>
              <Icon name="globe" />
              {LOCALE_META[locale].short}
              <Icon name="chevron-down" />
            </summary>
            <div className="hx-lang__menu">
              <LangLinks locale={locale} path={path} withLabel />
            </div>
          </details>
          <a href={`${localePath(locale)}#pricing`} className="hx-btn hx-btn--primary hx-btn--sm">
            {dict.nav.cta}
          </a>
          <details className="hx-mnav">
            <summary aria-label={dict.nav.menu}>
              <Icon name="bars" />
            </summary>
            <div className="hx-mnav__panel">
              <nav aria-label="Mobile">
                <NavLinks locale={locale} dict={dict} active={active} />
              </nav>
              <div className="hx-mnav__langs">
                <LangLinks locale={locale} path={path} />
              </div>
              <a href={`${localePath(locale)}#pricing`} className="hx-btn hx-btn--primary hx-btn--block">
                {dict.nav.cta}
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
