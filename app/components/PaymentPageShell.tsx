import { getDict } from "@/content";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import CatchonTVUIClient from "./CatchonTVUIClient";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function PaymentPageShell({ title, subtitle, children }: Props) {
  const dict = getDict("en");
  return (
    <>
      <CatchonTVUIClient currency="eur" />
      <SiteHeader locale="en" dict={dict} path="" />
      <main className="pay-page">
        <div className="hx-container pay-page__inner">
          <p className="pay-page__eyebrow">Secure checkout</p>
          <h1 className="pay-page__title">{title}</h1>
          <p className="pay-page__subtitle">{subtitle}</p>
          {children}
        </div>
      </main>
      <SiteFooter locale="en" dict={dict} path="" />
    </>
  );
}
