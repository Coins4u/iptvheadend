import Link from "next/link";
import { getDict } from "@/content";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function NotFound() {
  const dict = getDict("en");
  return (
    <>
      <SiteHeader locale="en" dict={dict} path="" />
      <main className="hx-section" style={{ textAlign: "center" }}>
        <div className="hx-container">
          <p className="hx-kicker">404</p>
          <h1 className="hx-h2">{dict.notFound.title}</h1>
          <p className="hx-lead">{dict.notFound.text}</p>
          <p className="hx-center">
            <Link href="/" className="hx-btn hx-btn--primary">
              {dict.notFound.cta}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter locale="en" dict={dict} path="" />
    </>
  );
}
