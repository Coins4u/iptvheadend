import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/content/types";
import { PREMIUM_PLANS, STANDARD_PLANS, perMonth, type Plan } from "@/lib/plans";
import Icon from "./Icon";
import { rich } from "./Rich";

/**
 * Payment contract (do not change without updating OrderLeadModal / useCatchonTVUI):
 *  - #standard-plans / #premium-plans containers with .pricing-container(.active)
 *  - each .pricing-card has .plan-name, .plan-price (price text first) and one a.btn
 *  - DOM order: standard 1/3/6/12 then premium 1/3/6/12
 *  - toggle: .toggle-switch + .toggle-label[data-plan]
 */
export default function PricingSection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const p = dict.home.pricing;
  const idx = { 1: 0, 3: 1, 6: 2, 12: 3 } as const;

  const planName = (plan: Plan, premium: boolean) => {
    const base = plan.months === 1 ? p.monthLabel : p.monthsLabel.replace("{n}", String(plan.months));
    return premium ? `${base} ${p.premiumSuffix}` : base;
  };

  const renderCards = (plans: Plan[], premium: boolean) =>
    plans.map((plan) => (
      <article key={`${premium}-${plan.months}`} className={`pricing-card${plan.popular ? " is-popular" : ""}`}>
        {plan.popular && <span className="pricing-card__badge">{p.popular}</span>}
        <h3 className="plan-name">{planName(plan, premium)}</h3>
        <p className="plan-price">
          {plan.price}
          <span>{p.periods[idx[plan.months]]}</span>
        </p>
        {plan.months > 1 && <p className="pricing-card__pm">{p.perMonth.replace("{price}", perMonth(plan))}</p>}
        <ul className="pricing-card__features">
          {(premium ? p.premiumFeatures : p.standardFeatures).map((f) => (
            <li key={f}>
              <Icon name="check" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a href="#pricing" className={`btn ${plan.popular ? "btn-primary" : "btn-outline"}`}>
          {p.order}
        </a>
      </article>
    ));

  return (
    <section id="pricing" className="hx-section hx-pricing">
      <div className="hx-container">
        <div className="hx-head">
          <p className="hx-kicker">{p.kicker}</p>
          <h2>{p.title}</h2>
          <p className="hx-lead">{rich(p.lead, locale)}</p>
        </div>

        <div className="pricing-toggle-container">
          <span className="toggle-label active" data-plan="standard">
            {p.standard}
          </span>
          <div className="toggle-switch" role="button" tabIndex={0} aria-label={`${p.standard} / ${p.premium}`} />
          <span className="toggle-label" data-plan="premium">
            {p.premium}
          </span>
        </div>

        <div id="standard-plans" className="pricing-container active">
          {renderCards(STANDARD_PLANS, false)}
        </div>
        <div id="premium-plans" className="pricing-container">
          {renderCards(PREMIUM_PLANS, true)}
        </div>

        <div className="hx-paybox">
          <div>
            <h3>{p.payTitle}</h3>
            <p>{rich(p.payText, locale)}</p>
            <p style={{ marginTop: 8 }}>{rich(p.delivery, locale)}</p>
          </div>
          <div className="hx-paybox__methods">
            <span>
              <Icon name="bank" /> {p.payMethods[0]}
            </span>
            <span>
              <Icon name="bitcoin" /> {p.payMethods[1]}
            </span>
            <span>
              <Icon name="shield-alt" /> {p.payMethods[2]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
