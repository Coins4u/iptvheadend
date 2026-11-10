import type { Metadata } from "next";
import PaymentOrderSummary from "../../components/PaymentOrderSummary";
import PaymentPageShell from "../../components/PaymentPageShell";
import { parsePaymentPageParams } from "../../../lib/payment-method";

export const metadata: Metadata = {
  title: "Bank Transfer Payment | IPTV Headend",
  description:
    "Complete your IPTV Headend bank transfer order by replying to your confirmation email for secure payment details.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ plan?: string; amount?: string; ref?: string }>;
};

export default async function BankPaymentPage({ searchParams }: PageProps) {
  const params = parsePaymentPageParams(await searchParams);

  return (
    <PaymentPageShell
      title="Bank transfer"
      subtitle="Bank account details are sent privately after you reply to your order confirmation email."
    >
      <PaymentOrderSummary
        plan={params.plan}
        amountDisplay={params.amountDisplay}
        invoiceRef={params.invoiceRef}
      />

      <section className="pay-panel">
        <h2 className="pay-panel__heading">How to complete payment</h2>
        <ol className="pay-steps">
          <li>
            Open the order confirmation email we sent you for this order (
            reference <strong>{params.invoiceRef}</strong>).
          </li>
          <li>
            <strong>Reply directly to that email</strong> to confirm your order.
            We will then send your secure bank payment details in a private reply.
          </li>
          <li>
            Transfer exactly <strong>{params.amountDisplay}</strong> (final price
            with 15% off) using the details we provide by email.
          </li>
          <li>
            After you pay, reply again to the same email thread with a receipt or
            screenshot so we can activate your account.
          </li>
        </ol>
        <p className="pay-panel__note">
          For security, IBAN and account details are never shown on this website.
          Always use the details we send you by private email reply.
        </p>
      </section>

      <section className="pay-warnings" aria-label="Important">
        <div className="pay-warnings__box pay-warnings__box--action">
          <h2>Reply to your order email</h2>
          <p>
            Do not open a new support thread for the same order — reply to the
            order confirmation so we can match your request quickly and send
            payment details securely.
          </p>
        </div>
      </section>
    </PaymentPageShell>
  );
}
