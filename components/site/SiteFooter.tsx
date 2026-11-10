import Image from "next/image";
import Link from "next/link";
import { LOCALES, LOCALE_META, SUPPORT_EMAIL, WHATSAPP_URL, localePath, type Locale } from "@/lib/i18n";
import type { Dict } from "@/content/types";
import Icon from "./Icon";

export default function SiteFooter({ locale, dict, path }: { locale: Locale; dict: Dict; path: string }) {
  const f = dict.footer;
  const n = dict.nav;
  return (
    <>
      <footer className="hx-footer">
        <div className="hx-container">
          <div className="hx-footer__grid">
            <div className="hx-footer__brand">
              <Link href={localePath(locale)} className="hx-footer__logo" aria-label="IPTV Headend">
                <Image src="/img/logo-mark.png" alt="IPTV Headend" width={54} height={44} />
              </Link>
              <p>{f.tagline}</p>
            </div>
            <div>
              <h2>{f.explore}</h2>
              <ul>
                <li>
                  <Link href={localePath(locale)}>{n.home}</Link>
                </li>
                <li>
                  <a href={`${localePath(locale)}#pricing`}>{n.cta}</a>
                </li>
                <li>
                  <Link href={localePath(locale, "/channels")}>{n.channels}</Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/blog")}>{n.blog}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>{f.help}</h2>
              <ul>
                <li>
                  <Link href={localePath(locale, "/guide")}>{n.guide}</Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/faq")}>{n.faq}</Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/contact")}>{n.contact}</Link>
                </li>
                <li>
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </li>
              </ul>
            </div>
            <div>
              <h2>{f.legal}</h2>
              <ul>
                <li>
                  <Link href={localePath(locale, "/TermsConditions")}>{f.terms}</Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/privacy")}>{f.privacy}</Link>
                </li>
                <li>
                  <Link href={localePath(locale, "/RefundPolicy")}>{f.refund}</Link>
                </li>
              </ul>
            </div>
          </div>

          <nav className="hx-footer__langs" aria-label={n.language}>
            {LOCALES.map((l) => (
              <a
                key={l}
                href={localePath(l, path)}
                hrefLang={LOCALE_META[l].htmlLang}
                lang={LOCALE_META[l].htmlLang}
                aria-current={l === locale ? "true" : undefined}
              >
                {LOCALE_META[l].label}
              </a>
            ))}
          </nav>

          <div className="hx-footer__bottom">
            <p>
              © 2026 IPTV Headend. {f.rights}
            </p>
            <p>{f.disclaimer}</p>
          </div>
        </div>
      </footer>
      <a href={WHATSAPP_URL} className="hx-wa" target="_blank" rel="noopener noreferrer" aria-label={dict.common.whatsapp}>
        <Icon name="whatsapp" />
      </a>
    </>
  );
}
