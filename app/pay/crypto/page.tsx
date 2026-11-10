import type { Metadata } from "next";
import CopyableField from "../../components/CopyableField";
import PaymentOrderSummary from "../../components/PaymentOrderSummary";
import PaymentPageShell from "../../components/PaymentPageShell";
import PaymentWarnings from "../../components/PaymentWarnings";
import {
  CRYPTO_PAYMENT_DETAILS,
  paymentReferenceHint,
} from "../../../lib/payment-details";
import { parsePaymentPageParams } from "../../../lib/payment-method";
import { fetchEurUsdtRate, formatUsdt } from "../../../lib/usdt-rate";

export const metadata: Metadata = {
  title: "Cryptocurrency Payment | IPTV Headend",
  description:
    "Complete your IPTV Headend order by sending USDT (BEP20) for the discounted euro total. Reply with your receipt after payment.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ plan?: string; amount?: string; ref?: string }>;
};

export default async function CryptoPaymentPage({ searchParams }: PageProps) {
  const params = parsePaymentPageParams(await searchParams);
  const c = CRYPTO_PAYMENT_DETAILS;
  const referenceHint = paymentReferenceHint(params.invoiceRef);
  const euroAmount = params.amount ?? 0;
  const rate =
    euroAmount > 0
      ? await fetchEurUsdtRate(euroAmount)
      : {
          eurPerUsdt: 0,
          usdtAmount: 0,
          source: "fallback" as const,
          fetchedAt: new Date().toISOString(),
        };
  const usdtDisplay =
    euroAmount > 0 ? formatUsdt(rate.usdtAmount) : "—";

  return (
    <PaymentPageShell
      title="Cryptocurrency (USDT BEP20)"
      subtitle="Send the USDT amount below on BNB Smart Chain for your discounted plan total, then reply to your order email with a receipt."
    >
      <PaymentOrderSummary
        plan={params.plan}
        amountDisplay={params.amountDisplay}
        invoiceRef={params.invoiceRef}
        secondaryLabel="USDT to send"
        secondaryAmount={usdtDisplay}
      />

      <section className="pay-panel">
        <h2 className="pay-panel__heading">EUR → USDT conversion</h2>
        {euroAmount > 0 ? (
          <>
            <p className="pay-panel__lead">
              Your final euro price is <strong>{params.amountDisplay}</strong>.
              At the current rate (
              <strong>€{rate.eurPerUsdt.toFixed(4)}</strong> per 1 USDT
              {rate.source === "fallback" ? ", estimated fallback" : ""}), send
              exactly:
            </p>
            <p className="pay-crypto-amount">{usdtDisplay}</p>
            <p className="pay-panel__note">
              Rate source:{" "}
              {rate.source === "live"
                ? "live market (CoinGecko), refreshed periodically"
                : "fallback estimate — refresh this page or contact support if unsure"}
              . Send the USDT amount shown; small network fees are paid
              separately by your wallet.
            </p>
          </>
        ) : (
          <p className="pay-panel__note">
            Missing amount in this link. Open the button from your order email,
            or contact support with your order reference.
          </p>
        )}
      </section>

      <section className="pay-panel">
        <h2 className="pay-panel__heading">Wallet details</h2>
        <div className="pay-fields">
          <CopyableField
            label="Asset / network"
            value={c.networkShort}
            mono={false}
          />
          <CopyableField label="Wallet address" value={c.walletAddress} />
          <CopyableField label="USDT amount to send" value={usdtDisplay} />
          <CopyableField
            label="Optional memo / note"
            value={referenceHint}
            mono={false}
          />
        </div>
        <p className="pay-panel__note">{c.note}</p>
      </section>

      <section className="pay-panel">
        <h2 className="pay-panel__heading">How to pay</h2>
        <ol className="pay-steps">
          <li>
            Open your crypto wallet that supports {c.asset} on {c.network}.
          </li>
          <li>Paste the wallet address above carefully.</li>
          <li>
            Send exactly <strong>{usdtDisplay}</strong> (converted from{" "}
            {params.amountDisplay}).
          </li>
          <li>
            If a memo/note field exists, use{" "}
            <strong>{params.invoiceRef} + your full name</strong>. Do not
            include words like &quot;TV&quot; or &quot;IPTV&quot;.
          </li>
          <li>
            After sending, reply to your order confirmation email with a
            transaction screenshot or receipt so we can activate your account.
          </li>
        </ol>
      </section>

      <PaymentWarnings invoiceRef={params.invoiceRef} />
    </PaymentPageShell>
  );
}
