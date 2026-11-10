"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { CurrencyCode } from "../../lib/sellapp-config";
import { resolveOrderPrices } from "../../lib/order-pricing";
import {
  isSelectablePaymentMethod,
  PAYMENT_METHOD_LABELS,
  type SelectablePaymentMethod,
} from "../../lib/payment-method";

const EUROPE_COUNTRIES = [
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kazakhstan",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "Vatican City",
];

const AMERICAS_COUNTRIES = [
  "Antigua and Barbuda",
  "Argentina",
  "Bahamas",
  "Barbados",
  "Belize",
  "Bolivia",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Grenada",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
  "United States",
  "Uruguay",
  "Venezuela",
];

type Props = {
  /** Kept for parent compatibility; payment is handled by email follow-up. */
  currency: CurrencyCode;
};

type LeadState =
  | { open: false }
  | {
      open: true;
      tierIndex: number;
      tierName: string;
      /** From .plan-price (e.g. "€14.32 /mo") for the email line item */
      priceDisplay: string;
    };

export default function OrderLeadModal(_props: Props) {
  const titleId = useId();
  const [lead, setLead] = useState<LeadState>({ open: false });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"" | SelectablePaymentMethod>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    fullName: string;
    email: string;
    discountedPriceDisplay: string | null;
    paymentMethod: SelectablePaymentMethod;
    paymentMethodLabel: string;
  } | null>(null);

  const close = useCallback(() => {
    setLead({ open: false });
    setError(null);
    setSuccess(null);
    setFullName("");
    setEmail("");
    setCountry("");
    setPaymentMethod("");
  }, []);

  useEffect(() => {
    const selector =
      "#standard-plans .pricing-card .btn, #premium-plans .pricing-card .btn";

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.("a.btn") as HTMLAnchorElement | null;
      if (!btn) return;
      if (!btn.closest("#standard-plans") && !btn.closest("#premium-plans"))
        return;
      e.preventDefault();
      e.stopPropagation();

      const all = document.querySelectorAll<HTMLAnchorElement>(selector);
      const index = Array.from(all).indexOf(btn);
      if (index < 0) return;

      const card = btn.closest(".pricing-card");
      const nameEl = card?.querySelector(".plan-name");
      const tierName =
        nameEl?.textContent?.trim() ?? `Plan ${index + 1}`;
      const priceEl = card?.querySelector(".plan-price");
      const priceDisplay =
        priceEl?.textContent?.replace(/\s+/g, " ").trim() ?? "";

      setError(null);
      setSuccess(null);
      setPaymentMethod("");
      setLead({
        open: true,
        tierIndex: index,
        tierName,
        priceDisplay,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!lead.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lead.open, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.open) return;
    const countryValue = country.trim();
    if (!countryValue) {
      setError("Please enter your country.");
      return;
    }
    if (!isSelectablePaymentMethod(paymentMethod)) {
      setError("Please select a payment method.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/send-order-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          country: countryValue,
          tierName: lead.tierName,
          priceDisplay: lead.priceDisplay,
          paymentMethod,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        discountedPriceDisplay?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      const localPrices = resolveOrderPrices(lead.priceDisplay);
      setSuccess({
        fullName: fullName.trim(),
        email: email.trim(),
        discountedPriceDisplay:
          data.discountedPriceDisplay ??
          localPrices?.discountedDisplay ??
          null,
        paymentMethod,
        paymentMethodLabel: PAYMENT_METHOD_LABELS[paymentMethod],
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!lead.open) return null;

  return (
    <div
      className="order-lead-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="order-lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="order-lead-modal__close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        {success ? (
          <div className="order-lead-modal__success">
            <h2 id={titleId} className="order-lead-modal__title">
              Thank you
            </h2>
            <p>
              {success.paymentMethod === "bank_transfer" ? (
                <>
                  Thank you, {success.fullName}. We emailed {success.email} with
                  your bank transfer order confirmation
                  {success.discountedPriceDisplay
                    ? ` — your final price with 15% off is ${success.discountedPriceDisplay}`
                    : " and a 15% discount"}
                  . Please <strong>reply directly to that email</strong> to
                  confirm your order and receive your secure bank payment
                  details.
                </>
              ) : (
                <>
                  Thank you, {success.fullName}. We emailed {success.email} with
                  your {success.paymentMethodLabel.toLowerCase()} payment details
                  link
                  {success.discountedPriceDisplay
                    ? ` — your final price with 15% off is ${success.discountedPriceDisplay}`
                    : " and a 15% discount"}
                  . Open that email and use the button to complete payment.
                </>
              )}
            </p>
            <button
              type="button"
              className="btn btn-primary order-lead-modal__done"
              onClick={close}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id={titleId} className="order-lead-modal__title">
              Complete your order
            </h2>
            <p className="order-lead-modal__tier">
              Plan: <strong>{lead.tierName}</strong>
            </p>

            <form onSubmit={handleSubmit} className="order-lead-form">
              <label className="order-lead-form__label">
                Full Name
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="order-lead-form__input"
                />
              </label>
              <label className="order-lead-form__label">
                Correct Email Address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="order-lead-form__input"
                />
              </label>
              <label className="order-lead-form__label">
                Country
                <select
                  name="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="order-lead-form__input"
                >
                  <option value="">Select country (Europe + Americas)</option>
                  <optgroup label="Europe">
                    {EUROPE_COUNTRIES.map((c) => (
                      <option key={`eu-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Americas">
                    {AMERICAS_COUNTRIES.map((c) => (
                      <option key={`am-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
              <label className="order-lead-form__label">
                Payment Method
                <select
                  name="paymentMethod"
                  required
                  value={paymentMethod}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPaymentMethod(
                      isSelectablePaymentMethod(value) ? value : "",
                    );
                  }}
                  className="order-lead-form__input order-lead-form__input--payment"
                >
                  <option value="">Select payment method</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cryptocurrency">Cryptocurrency</option>
                  <option value="credit_card" disabled>
                    Credit Card — Coming Soon
                  </option>
                  <option value="paypal" disabled>
                    PayPal — Coming Soon
                  </option>
                </select>
              </label>
              {error && (
                <p className="order-lead-modal__error" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="btn btn-primary order-lead-form__submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Submit Order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
