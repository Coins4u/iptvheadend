/**
 * Buyer order follow-up email: bank transfer + cryptocurrency (15% off).
 * Includes a conditional payment-details button based on the method chosen
 * in the order form (placeholder URLs until those pages are live).
 * Table layout + inline styles for broad client support.
 * Colors align with app/globals.css :root (IPTV Headend brand).
 */

import type { SelectablePaymentMethod } from "./payment-method";

/** Mirrors :root in globals.css — keep in sync when rebranding */
const C = {
  primary: "#0d5c45",
  primaryDark: "#083d2e",
  bgPage: "#f5f5f7",
  bgCard: "#ffffff",
  text: "#111111",
  textGray: "#4b5563",
  border: "#e5e7eb",
  alertBg: "#eef8f3",
  alertBorder: "#aee0c9",
  headerSub: "rgba(255,255,255,0.92)",
  headerInvoice: "rgba(255,255,255,0.85)",
  linkOnWhite: "#0d5c45",
} as const;

/**
 * Dark mode for clients that honor `prefers-color-scheme` + embedded `<style>`.
 * Scoped so we do **not** blanket-paint every `td`.
 */
const EMAIL_DARK_MODE_STYLE = `
:root { color-scheme: light dark; }
@media (prefers-color-scheme: dark) {
  body.gf-email-root,
  table.gf-email-outer {
    background-color: #0e0e14 !important;
  }
  table.gf-email-card {
    background-color: #16161e !important;
    border: 1px solid #3d3d4f !important;
  }
  table.gf-email-card td.gf-email-main,
  table.gf-email-card td.gf-email-footer {
    background-color: #16161e !important;
  }
  table.gf-email-card td.gf-email-footer {
    border-top: 1px solid #3d3d4f !important;
  }
  table.gf-email-card td.gf-email-header p {
    color: rgba(255, 255, 255, 0.94) !important;
  }
  table.gf-email-card td.gf-email-header strong {
    color: #ffffff !important;
  }
  table.gf-email-card td.gf-email-main > p:not(.gf-email-muted) {
    color: #e2e2e8 !important;
  }
  table.gf-email-card td.gf-email-main > p:not(.gf-email-muted) strong {
    color: #ffffff !important;
  }
  table.gf-email-card .gf-email-muted {
    color: #9b9ba8 !important;
  }
  table.gf-email-card a {
    color: #c4b5fd !important;
  }
  table.gf-email-card .gf-email-heading {
    color: #ede9fe !important;
  }
  table.gf-email-card .gf-email-price {
    color: #e9d5ff !important;
  }
  table.gf-email-card .gf-email-surface {
    background-color: #1f1f28 !important;
    border-color: #4b4b5e !important;
  }
  table.gf-email-card .gf-email-surface td {
    border-color: #4b4b5e !important;
    color: #e4e4ea !important;
  }
  table.gf-email-card .gf-email-surface td.gf-email-muted {
    color: #9b9ba8 !important;
  }
  table.gf-email-card .gf-email-surface p {
    color: #e4e4ea !important;
  }
  table.gf-email-card .gf-email-surface strong {
    color: #ffffff !important;
  }
  table.gf-email-card .gf-email-alert {
    background-color: #252036 !important;
    border-color: #6d5bd0 !important;
  }
  table.gf-email-card .gf-email-alert p {
    color: #eceaf5 !important;
  }
  table.gf-email-card .gf-email-alert strong {
    color: #ddd6fe !important;
  }
  table.gf-email-card .gf-email-callout-cyan {
    background-color: #0c1f2e !important;
    border-color: #0e7490 !important;
  }
  table.gf-email-card .gf-email-callout-cyan p {
    color: #cffafe !important;
  }
  table.gf-email-card .gf-email-callout-cyan strong {
    color: #5eead4 !important;
  }
  table.gf-email-card .gf-email-callout-green {
    background-color: #0f1f14 !important;
    border-color: #166534 !important;
  }
  table.gf-email-card .gf-email-callout-green p {
    color: #dcfce7 !important;
  }
  table.gf-email-card .gf-email-callout-green strong {
    color: #86efac !important;
  }

  /* CTA pill */
  table.gf-email-card td.gf-email-cta-wrap {
    box-shadow: 0 6px 28px rgba(99, 102, 241, 0.45) !important;
  }
  table.gf-email-card td.gf-email-cta-wrap a {
    color: #ffffff !important;
  }

  table.gf-email-card .gf-email-sep {
    color: #5c5c70 !important;
  }
}
`;

export type BuyerLocale = "en" | "fr" | "nl" | "de" | "it" | "pt" | "no" | "es";

type BuyerEmailCopy = {
  subjectPrefix: string;
  htmlTitle: string;
  headerEyebrow: string;
  orderReference: string;
  greeting: string;
  thanksLine: string;
  billTo: string;
  paymentOptionsTitle: string;
  paymentOptionsText: string;
  discountTitle: string;
  discountText: string;
  listedPriceLabel: string;
  finalPriceLabel: string;
  replyTitle: string;
  replyText: string;
  nextStepsTitle: string;
  nextStep1: string;
  nextStep2: string;
  nextStep3: string;
  selectedMethodLabel: string;
  methodBank: string;
  methodCrypto: string;
  ctaBankLabel: string;
  ctaCryptoLabel: string;
  fallbackLinkHelp: string;
  deliveryTitle: string;
  deliveryText: string;
  supportTitle: string;
  supportText: string;
  lineItem: string;
  spamReminder: string;
  ignoreNotice: string;
  refundPolicy: string;
  termsOfService: string;
  plainHello: string;
  plainThanks: string;
  plainPaymentOptions: string;
  plainDiscount: string;
  plainListedPrice: string;
  plainFinalPrice: string;
  plainReply: string;
  plainOpenPayment: string;
  plainDelivery: string;
  plainOrderReference: string;
  plainPlan: string;
  plainSpamCheck: string;
  plainIgnoreNotice: string;
};

const COPY: Record<BuyerLocale, BuyerEmailCopy> = {
  en: {
    subjectPrefix: "Thank you for your order",
    htmlTitle: "Thank you for your order",
    headerEyebrow: "Order received",
    orderReference: "Order reference",
    greeting: "Hello",
    thanksLine:
      "Thank you for submitting your order for {plan}. We have received your request and will help you complete payment shortly.",
    billTo: "Customer",
    paymentOptionsTitle: "Your payment method",
    paymentOptionsText:
      "You selected {method}. Use the button below to open your payment details and complete your order.",
    discountTitle: "15% discount",
    discountText:
      "Paying by bank transfer or cryptocurrency includes a 15% discount on the listed price. Your totals are shown below.",
    listedPriceLabel: "Listed price",
    finalPriceLabel: "Final price (15% off)",
    replyTitle: "Payment details",
    replyText:
      "Click the button below to view your {method} payment details. Pay the final discounted amount shown above.",
    nextStepsTitle: "Next steps",
    nextStep1: "Open your payment details using the button below.",
    nextStep2: "Complete payment for the final discounted amount.",
    nextStep3:
      "As soon as payment is received, we provide your account immediately.",
    selectedMethodLabel: "Selected payment method",
    methodBank: "Bank Transfer",
    methodCrypto: "Cryptocurrency",
    ctaBankLabel: "View Bank Transfer Details",
    ctaCryptoLabel: "View Cryptocurrency Details",
    fallbackLinkHelp:
      "If the button does not open, copy and paste this URL into your browser:",
    deliveryTitle: "Instant activation:",
    deliveryText:
      "As soon as your payment is confirmed, your account credentials are sent to this email right away.",
    supportTitle: "Need help?",
    supportText:
      "Reply directly to this email for any questions. Our team is happy to assist.",
    lineItem: "Plan",
    spamReminder:
      "If you do not see this message in your inbox, please check your Spam or Promotions folder.",
    ignoreNotice: "If you did not request this email, you can safely ignore it.",
    refundPolicy: "Refund Policy",
    termsOfService: "Terms of Service",
    plainHello: "Hello",
    plainThanks:
      "Thank you for submitting your order for {plan}. We have received your request and will help you complete payment shortly.",
    plainPaymentOptions: "Selected payment method: {method}",
    plainDiscount:
      "Pay by bank transfer or cryptocurrency and receive 15% off the listed price.",
    plainListedPrice: "Listed price",
    plainFinalPrice: "Final price (15% off)",
    plainReply:
      "Open your {method} payment details using the link below, then pay the final discounted amount.",
    plainOpenPayment: "Open payment details",
    plainDelivery:
      "As soon as payment is received, we provide your account immediately.",
    plainOrderReference: "Order reference",
    plainPlan: "Plan",
    plainSpamCheck:
      "If you do not see our message, check your Spam or Promotions folder.",
    plainIgnoreNotice: "If you did not request this email, you can ignore it.",
  },
  fr: {
    subjectPrefix: "Merci pour votre commande",
    htmlTitle: "Merci pour votre commande",
    headerEyebrow: "Commande recue",
    orderReference: "Reference de commande",
    greeting: "Bonjour",
    thanksLine:
      "Merci d avoir soumis votre commande pour {plan}. Nous avons bien recu votre demande et vous aiderons a finaliser le paiement sous peu.",
    billTo: "Client",
    paymentOptionsTitle: "Votre moyen de paiement",
    paymentOptionsText:
      "Vous avez choisi {method}. Utilisez le bouton ci-dessous pour ouvrir vos details de paiement et finaliser votre commande.",
    discountTitle: "Remise de 15 %",
    discountText:
      "Le paiement par virement bancaire ou cryptomonnaie inclut une remise de 15 % sur le prix affiche. Vos montants sont indiques ci-dessous.",
    listedPriceLabel: "Prix affiche",
    finalPriceLabel: "Prix final (−15 %)",
    replyTitle: "Details de paiement",
    replyText:
      "Cliquez sur le bouton ci-dessous pour voir vos details de paiement {method}. Reglez le montant final remisé indique ci-dessus.",
    nextStepsTitle: "Prochaines etapes",
    nextStep1:
      "Ouvrez vos details de paiement via le bouton ci-dessous.",
    nextStep2:
      "Finalisez le paiement du montant final remisé.",
    nextStep3:
      "Des que le paiement est recu, nous fournissons votre compte immediatement.",
    selectedMethodLabel: "Moyen de paiement choisi",
    methodBank: "Virement bancaire",
    methodCrypto: "Cryptomonnaie",
    ctaBankLabel: "Voir les details du virement bancaire",
    ctaCryptoLabel: "Voir les details crypto",
    fallbackLinkHelp:
      "Si le bouton ne s ouvre pas, copiez-collez cette URL dans votre navigateur :",
    deliveryTitle: "Activation immediate :",
    deliveryText:
      "Des que votre paiement est confirme, vos identifiants de compte sont envoyes immediatement a cet email.",
    supportTitle: "Besoin d aide ?",
    supportText:
      "Repondez directement a cet email pour toute question. Notre equipe est a votre disposition.",
    lineItem: "Forfait",
    spamReminder:
      "Si vous ne voyez pas ce message dans votre boite de reception, verifiez vos dossiers Spam ou Promotions.",
    ignoreNotice:
      "Si vous n avez pas demande cet email, vous pouvez l ignorer en toute securite.",
    refundPolicy: "Politique de remboursement",
    termsOfService: "Conditions d utilisation",
    plainHello: "Bonjour",
    plainThanks:
      "Merci d avoir soumis votre commande pour {plan}. Nous avons bien recu votre demande et vous aiderons a finaliser le paiement sous peu.",
    plainPaymentOptions: "Moyen de paiement choisi : {method}",
    plainDiscount:
      "Payez par virement bancaire ou cryptomonnaie et beneficiez de 15 % de reduction sur le prix affiche.",
    plainListedPrice: "Prix affiche",
    plainFinalPrice: "Prix final (−15 %)",
    plainReply:
      "Ouvrez vos details de paiement {method} via le lien ci-dessous, puis reglez le montant final remisé.",
    plainOpenPayment: "Ouvrir les details de paiement",
    plainDelivery:
      "Des que le paiement est recu, nous fournissons votre compte immediatement.",
    plainOrderReference: "Reference de commande",
    plainPlan: "Forfait",
    plainSpamCheck:
      "Si vous ne voyez pas notre message, verifiez vos dossiers Spam ou Promotions.",
    plainIgnoreNotice:
      "Si vous n avez pas demande cet email, vous pouvez l ignorer.",
  },
  nl: {
    subjectPrefix: "Bedankt voor je bestelling",
    htmlTitle: "Bedankt voor je bestelling",
    headerEyebrow: "Bestelling ontvangen",
    orderReference: "Bestelreferentie",
    greeting: "Hallo",
    thanksLine:
      "Bedankt voor het indienen van je bestelling voor {plan}. We hebben je aanvraag ontvangen en helpen je binnenkort met de betaling.",
    billTo: "Klant",
    paymentOptionsTitle: "Je betaalmethode",
    paymentOptionsText:
      "Je hebt {method} gekozen. Gebruik de knop hieronder om je betalingsgegevens te openen en je bestelling af te ronden.",
    discountTitle: "15% korting",
    discountText:
      "Betalen via bankoverschrijving of crypto geeft 15% korting op de vermelde prijs. Je bedragen staan hieronder.",
    listedPriceLabel: "Vermelde prijs",
    finalPriceLabel: "Eindprijs (15% korting)",
    replyTitle: "Betalingsgegevens",
    replyText:
      "Klik op de knop hieronder om je {method}-betalingsgegevens te bekijken. Betaal het eindbedrag met korting hierboven.",
    nextStepsTitle: "Volgende stappen",
    nextStep1:
      "Open je betalingsgegevens via de knop hieronder.",
    nextStep2:
      "Rond de betaling af voor het eindbedrag met korting.",
    nextStep3:
      "Zodra de betaling is ontvangen, leveren we je account onmiddellijk.",
    selectedMethodLabel: "Gekozen betaalmethode",
    methodBank: "Bankoverschrijving",
    methodCrypto: "Cryptovaluta",
    ctaBankLabel: "Bekijk bankoverschrijvinggegevens",
    ctaCryptoLabel: "Bekijk cryptogegevens",
    fallbackLinkHelp:
      "Als de knop niet opent, kopieer en plak deze URL in je browser:",
    deliveryTitle: "Directe activering:",
    deliveryText:
      "Zodra je betaling is bevestigd, worden je accountgegevens meteen naar dit e-mailadres gestuurd.",
    supportTitle: "Hulp nodig?",
    supportText:
      "Beantwoord deze e-mail rechtstreeks bij vragen. Ons team helpt je graag.",
    lineItem: "Plan",
    spamReminder:
      "Als je dit bericht niet in je inbox ziet, controleer dan je Spam- of Promoties-map.",
    ignoreNotice:
      "Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.",
    refundPolicy: "Terugbetalingsbeleid",
    termsOfService: "Servicevoorwaarden",
    plainHello: "Hallo",
    plainThanks:
      "Bedankt voor het indienen van je bestelling voor {plan}. We hebben je aanvraag ontvangen en helpen je binnenkort met de betaling.",
    plainPaymentOptions: "Gekozen betaalmethode: {method}",
    plainDiscount:
      "Betaal via bankoverschrijving of crypto en ontvang 15% korting op de vermelde prijs.",
    plainListedPrice: "Vermelde prijs",
    plainFinalPrice: "Eindprijs (15% korting)",
    plainReply:
      "Open je {method}-betalingsgegevens via de link hieronder en betaal het eindbedrag met korting.",
    plainOpenPayment: "Open betalingsgegevens",
    plainDelivery:
      "Zodra de betaling is ontvangen, leveren we je account onmiddellijk.",
    plainOrderReference: "Bestelreferentie",
    plainPlan: "Plan",
    plainSpamCheck:
      "Als je ons bericht niet ziet, controleer je Spam- of Promoties-map.",
    plainIgnoreNotice:
      "Als je deze e-mail niet hebt aangevraagd, kun je deze negeren.",
  },
  de: {
    subjectPrefix: "Vielen Dank fuer Ihre Bestellung",
    htmlTitle: "Vielen Dank fuer Ihre Bestellung",
    headerEyebrow: "Bestellung eingegangen",
    orderReference: "Bestellreferenz",
    greeting: "Hallo",
    thanksLine:
      "Vielen Dank fuer Ihre Bestellung fuer {plan}. Wir haben Ihre Anfrage erhalten und helfen Ihnen in Kuerze bei der Zahlung.",
    billTo: "Kunde",
    paymentOptionsTitle: "Ihre Zahlungsmethode",
    paymentOptionsText:
      "Sie haben {method} gewaehlt. Nutzen Sie den Button unten, um Ihre Zahlungsdetails zu oeffnen und Ihre Bestellung abzuschliessen.",
    discountTitle: "15 % Rabatt",
    discountText:
      "Bei Zahlung per Bankueberweisung oder Krypto erhalten Sie 15 % Rabatt auf den Listenpreis. Ihre Betraege sehen Sie unten.",
    listedPriceLabel: "Listenpreis",
    finalPriceLabel: "Endpreis (15 % Rabatt)",
    replyTitle: "Zahlungsdetails",
    replyText:
      "Klicken Sie auf den Button unten, um Ihre {method}-Zahlungsdetails anzuzeigen. Zahlen Sie den oben gezeigten Endpreis mit Rabatt.",
    nextStepsTitle: "Naechste Schritte",
    nextStep1:
      "Oeffnen Sie Ihre Zahlungsdetails ueber den Button unten.",
    nextStep2:
      "Schliessen Sie die Zahlung fuer den Endpreis mit Rabatt ab.",
    nextStep3:
      "Sobald die Zahlung eingegangen ist, stellen wir Ihr Konto sofort bereit.",
    selectedMethodLabel: "Gewaehlte Zahlungsmethode",
    methodBank: "Bankueberweisung",
    methodCrypto: "Kryptowaehrung",
    ctaBankLabel: "Bankueberweisungsdetails anzeigen",
    ctaCryptoLabel: "Krypto-Details anzeigen",
    fallbackLinkHelp:
      "Wenn der Button nicht geoeffnet wird, kopieren Sie diese URL in Ihren Browser:",
    deliveryTitle: "Sofortige Aktivierung:",
    deliveryText:
      "Sobald Ihre Zahlung bestaetigt ist, werden Ihre Zugangsdaten sofort an diese E-Mail gesendet.",
    supportTitle: "Hilfe benoetigt?",
    supportText:
      "Antworten Sie bei Fragen direkt auf diese E-Mail. Unser Team hilft Ihnen gerne.",
    lineItem: "Tarif",
    spamReminder:
      "Wenn Sie diese Nachricht nicht in Ihrem Posteingang sehen, pruefen Sie bitte den Spam- oder Werbeordner.",
    ignoreNotice:
      "Wenn Sie diese E-Mail nicht angefordert haben, koennen Sie sie sicher ignorieren.",
    refundPolicy: "Rueckerstattungsrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    plainHello: "Hallo",
    plainThanks:
      "Vielen Dank fuer Ihre Bestellung fuer {plan}. Wir haben Ihre Anfrage erhalten und helfen Ihnen in Kuerze bei der Zahlung.",
    plainPaymentOptions: "Gewaehlte Zahlungsmethode: {method}",
    plainDiscount:
      "Zahlen Sie per Bankueberweisung oder Krypto und erhalten Sie 15 % Rabatt auf den Listenpreis.",
    plainListedPrice: "Listenpreis",
    plainFinalPrice: "Endpreis (15 % Rabatt)",
    plainReply:
      "Oeffnen Sie Ihre {method}-Zahlungsdetails ueber den Link unten und zahlen Sie den Endpreis mit Rabatt.",
    plainOpenPayment: "Zahlungsdetails oeffnen",
    plainDelivery:
      "Sobald die Zahlung eingegangen ist, stellen wir Ihr Konto sofort bereit.",
    plainOrderReference: "Bestellreferenz",
    plainPlan: "Tarif",
    plainSpamCheck:
      "Wenn Sie unsere Nachricht nicht sehen, pruefen Sie den Spam- oder Werbeordner.",
    plainIgnoreNotice:
      "Wenn Sie diese E-Mail nicht angefordert haben, koennen Sie sie ignorieren.",
  },
  it: {
    subjectPrefix: "Grazie per il tuo ordine",
    htmlTitle: "Grazie per il tuo ordine",
    headerEyebrow: "Ordine ricevuto",
    orderReference: "Riferimento ordine",
    greeting: "Ciao",
    thanksLine:
      "Grazie per aver inviato l ordine per {plan}. Abbiamo ricevuto la tua richiesta e ti aiuteremo a completare il pagamento a breve.",
    billTo: "Cliente",
    paymentOptionsTitle: "Il tuo metodo di pagamento",
    paymentOptionsText:
      "Hai scelto {method}. Usa il pulsante qui sotto per aprire i dettagli di pagamento e completare l ordine.",
    discountTitle: "Sconto del 15%",
    discountText:
      "Pagando con bonifico bancario o criptovaluta ricevi uno sconto del 15% sul prezzo elencato. I totali sono mostrati di seguito.",
    listedPriceLabel: "Prezzo elencato",
    finalPriceLabel: "Prezzo finale (15% di sconto)",
    replyTitle: "Dettagli di pagamento",
    replyText:
      "Clicca sul pulsante qui sotto per vedere i dettagli di pagamento {method}. Paga l importo finale scontato mostrato sopra.",
    nextStepsTitle: "Prossimi passi",
    nextStep1:
      "Apri i dettagli di pagamento usando il pulsante qui sotto.",
    nextStep2:
      "Completa il pagamento dell importo finale scontato.",
    nextStep3:
      "Non appena il pagamento e ricevuto, forniamo subito il tuo account.",
    selectedMethodLabel: "Metodo di pagamento selezionato",
    methodBank: "Bonifico bancario",
    methodCrypto: "Criptovaluta",
    ctaBankLabel: "Vedi dettagli bonifico bancario",
    ctaCryptoLabel: "Vedi dettagli criptovaluta",
    fallbackLinkHelp:
      "Se il pulsante non si apre, copia e incolla questo URL nel browser:",
    deliveryTitle: "Attivazione immediata:",
    deliveryText:
      "Non appena il pagamento e confermato, le credenziali del tuo account vengono inviate subito a questa email.",
    supportTitle: "Serve aiuto?",
    supportText:
      "Rispondi direttamente a questa email per qualsiasi domanda. Il nostro team e a tua disposizione.",
    lineItem: "Piano",
    spamReminder:
      "Se non vedi questo messaggio nella posta in arrivo, controlla le cartelle Spam o Promozioni.",
    ignoreNotice:
      "Se non hai richiesto questa email, puoi ignorarla in sicurezza.",
    refundPolicy: "Politica di rimborso",
    termsOfService: "Termini di servizio",
    plainHello: "Ciao",
    plainThanks:
      "Grazie per aver inviato l ordine per {plan}. Abbiamo ricevuto la tua richiesta e ti aiuteremo a completare il pagamento a breve.",
    plainPaymentOptions: "Metodo di pagamento selezionato: {method}",
    plainDiscount:
      "Paga con bonifico bancario o criptovaluta e ottieni il 15% di sconto sul prezzo elencato.",
    plainListedPrice: "Prezzo elencato",
    plainFinalPrice: "Prezzo finale (15% di sconto)",
    plainReply:
      "Apri i dettagli di pagamento {method} con il link qui sotto, poi paga l importo finale scontato.",
    plainOpenPayment: "Apri dettagli di pagamento",
    plainDelivery:
      "Non appena il pagamento e ricevuto, forniamo subito il tuo account.",
    plainOrderReference: "Riferimento ordine",
    plainPlan: "Piano",
    plainSpamCheck:
      "Se non vedi il nostro messaggio, controlla le cartelle Spam o Promozioni.",
    plainIgnoreNotice:
      "Se non hai richiesto questa email, puoi ignorarla.",
  },
  pt: {
    subjectPrefix: "Obrigado pelo seu pedido",
    htmlTitle: "Obrigado pelo seu pedido",
    headerEyebrow: "Pedido recebido",
    orderReference: "Referencia do pedido",
    greeting: "Ola",
    thanksLine:
      "Obrigado por enviar o pedido do plano {plan}. Recebemos sua solicitacao e ajudaremos voce a concluir o pagamento em breve.",
    billTo: "Cliente",
    paymentOptionsTitle: "Seu metodo de pagamento",
    paymentOptionsText:
      "Voce selecionou {method}. Use o botao abaixo para abrir os detalhes de pagamento e concluir seu pedido.",
    discountTitle: "Desconto de 15%",
    discountText:
      "Pagar por transferencia bancaria ou criptomoeda inclui 15% de desconto sobre o preco listado. Os totais estao abaixo.",
    listedPriceLabel: "Preco listado",
    finalPriceLabel: "Preco final (15% de desconto)",
    replyTitle: "Detalhes de pagamento",
    replyText:
      "Clique no botao abaixo para ver os detalhes de pagamento {method}. Pague o valor final com desconto mostrado acima.",
    nextStepsTitle: "Proximos passos",
    nextStep1:
      "Abra os detalhes de pagamento usando o botao abaixo.",
    nextStep2:
      "Conclua o pagamento do valor final com desconto.",
    nextStep3:
      "Assim que o pagamento for recebido, fornecemos sua conta imediatamente.",
    selectedMethodLabel: "Metodo de pagamento selecionado",
    methodBank: "Transferencia bancaria",
    methodCrypto: "Criptomoeda",
    ctaBankLabel: "Ver detalhes da transferencia bancaria",
    ctaCryptoLabel: "Ver detalhes de criptomoeda",
    fallbackLinkHelp:
      "Se o botao nao abrir, copie e cole esta URL no seu navegador:",
    deliveryTitle: "Ativacao imediata:",
    deliveryText:
      "Assim que o pagamento for confirmado, as credenciais da sua conta sao enviadas imediatamente para este email.",
    supportTitle: "Precisa de ajuda?",
    supportText:
      "Responda diretamente a este email com qualquer duvida. Nossa equipe tera prazer em ajudar.",
    lineItem: "Plano",
    spamReminder:
      "Se nao encontrar esta mensagem na caixa de entrada, verifique as pastas de Spam ou Promocoes.",
    ignoreNotice:
      "Se voce nao solicitou este email, pode ignora-lo com seguranca.",
    refundPolicy: "Politica de reembolso",
    termsOfService: "Termos de servico",
    plainHello: "Ola",
    plainThanks:
      "Obrigado por enviar o pedido do plano {plan}. Recebemos sua solicitacao e ajudaremos voce a concluir o pagamento em breve.",
    plainPaymentOptions: "Metodo de pagamento selecionado: {method}",
    plainDiscount:
      "Pague por transferencia bancaria ou criptomoeda e receba 15% de desconto sobre o preco listado.",
    plainListedPrice: "Preco listado",
    plainFinalPrice: "Preco final (15% de desconto)",
    plainReply:
      "Abra os detalhes de pagamento {method} pelo link abaixo e pague o valor final com desconto.",
    plainOpenPayment: "Abrir detalhes de pagamento",
    plainDelivery:
      "Assim que o pagamento for recebido, fornecemos sua conta imediatamente.",
    plainOrderReference: "Referencia do pedido",
    plainPlan: "Plano",
    plainSpamCheck:
      "Se nao encontrar nossa mensagem, verifique as pastas de Spam ou Promocoes.",
    plainIgnoreNotice:
      "Se voce nao solicitou este email, pode ignora-lo.",
  },
  no: {
    subjectPrefix: "Takk for bestillingen din",
    htmlTitle: "Takk for bestillingen din",
    headerEyebrow: "Bestilling mottatt",
    orderReference: "Bestillingsreferanse",
    greeting: "Hei",
    thanksLine:
      "Takk for at du sendte inn bestillingen for {plan}. Vi har mottatt foresporselen din og hjelper deg snart med betalingen.",
    billTo: "Kunde",
    paymentOptionsTitle: "Din betalingsmetode",
    paymentOptionsText:
      "Du valgte {method}. Bruk knappen nedenfor for a apne betalingsdetaljene og fullfore bestillingen.",
    discountTitle: "15 % rabatt",
    discountText:
      "Betaling med bankoverforing eller krypto gir 15 % rabatt pa listeprisen. Totalene dine vises nedenfor.",
    listedPriceLabel: "Listepris",
    finalPriceLabel: "Endelig pris (15 % rabatt)",
    replyTitle: "Betalingsdetaljer",
    replyText:
      "Klikk pa knappen nedenfor for a se betalingsdetaljene for {method}. Betal det endelige belopet med rabatt vist ovenfor.",
    nextStepsTitle: "Neste steg",
    nextStep1:
      "Apne betalingsdetaljene ved a bruke knappen nedenfor.",
    nextStep2:
      "Fullfor betalingen for det endelige belopet med rabatt.",
    nextStep3:
      "Sa snart betalingen er mottatt, gir vi deg kontoen umiddelbart.",
    selectedMethodLabel: "Valgt betalingsmetode",
    methodBank: "Bankoverforing",
    methodCrypto: "Kryptovaluta",
    ctaBankLabel: "Se bankoverforingsdetaljer",
    ctaCryptoLabel: "Se kryptodetaljer",
    fallbackLinkHelp:
      "Hvis knappen ikke apner, kopier og lim inn denne URL-en i nettleseren:",
    deliveryTitle: "Umiddelbar aktivering:",
    deliveryText:
      "Sa snart betalingen er bekreftet, sendes kontodetaljene dine med en gang til denne e-postadressen.",
    supportTitle: "Trenger du hjelp?",
    supportText:
      "Svar direkte pa denne e-posten ved sporsmal. Teamet vart hjelper deg gjerne.",
    lineItem: "Plan",
    spamReminder:
      "Hvis du ikke ser denne meldingen i innboksen, sjekk Spam- eller Markedsforingsmappen.",
    ignoreNotice:
      "Hvis du ikke ba om denne e-posten, kan du trygt ignorere den.",
    refundPolicy: "Refusjonspolicy",
    termsOfService: "Vilkar for bruk",
    plainHello: "Hei",
    plainThanks:
      "Takk for at du sendte inn bestillingen for {plan}. Vi har mottatt foresporselen din og hjelper deg snart med betalingen.",
    plainPaymentOptions: "Valgt betalingsmetode: {method}",
    plainDiscount:
      "Betal med bankoverforing eller krypto og fa 15 % rabatt pa listeprisen.",
    plainListedPrice: "Listepris",
    plainFinalPrice: "Endelig pris (15 % rabatt)",
    plainReply:
      "Apne betalingsdetaljene for {method} via lenken nedenfor, og betal det endelige belopet med rabatt.",
    plainOpenPayment: "Apne betalingsdetaljer",
    plainDelivery:
      "Sa snart betalingen er mottatt, gir vi deg kontoen umiddelbart.",
    plainOrderReference: "Bestillingsreferanse",
    plainPlan: "Plan",
    plainSpamCheck:
      "Hvis du ikke ser meldingen var, sjekk Spam- eller Markedsforingsmappen.",
    plainIgnoreNotice:
      "Hvis du ikke ba om denne e-posten, kan du ignorere den.",
  },
  es: {
    subjectPrefix: "Gracias por tu pedido",
    htmlTitle: "Gracias por tu pedido",
    headerEyebrow: "Pedido recibido",
    orderReference: "Referencia del pedido",
    greeting: "Hola",
    thanksLine:
      "Gracias por enviar tu pedido de {plan}. Hemos recibido tu solicitud y te ayudaremos a completar el pago en breve.",
    billTo: "Cliente",
    paymentOptionsTitle: "Tu metodo de pago",
    paymentOptionsText:
      "Has seleccionado {method}. Usa el boton de abajo para abrir los detalles de pago y completar tu pedido.",
    discountTitle: "Descuento del 15%",
    discountText:
      "Pagar por transferencia bancaria o criptomoneda incluye un 15% de descuento sobre el precio listado. Tus totales se muestran a continuacion.",
    listedPriceLabel: "Precio listado",
    finalPriceLabel: "Precio final (15% de descuento)",
    replyTitle: "Detalles de pago",
    replyText:
      "Haz clic en el boton de abajo para ver los detalles de pago de {method}. Paga el importe final con descuento mostrado arriba.",
    nextStepsTitle: "Proximos pasos",
    nextStep1:
      "Abre tus detalles de pago con el boton de abajo.",
    nextStep2:
      "Completa el pago del importe final con descuento.",
    nextStep3:
      "En cuanto se reciba el pago, proporcionamos tu cuenta de inmediato.",
    selectedMethodLabel: "Metodo de pago seleccionado",
    methodBank: "Transferencia bancaria",
    methodCrypto: "Criptomoneda",
    ctaBankLabel: "Ver detalles de transferencia bancaria",
    ctaCryptoLabel: "Ver detalles de criptomoneda",
    fallbackLinkHelp:
      "Si el boton no se abre, copia y pega esta URL en tu navegador:",
    deliveryTitle: "Activacion inmediata:",
    deliveryText:
      "En cuanto se confirme el pago, las credenciales de tu cuenta se envian de inmediato a este correo.",
    supportTitle: "Necesitas ayuda?",
    supportText:
      "Responde directamente a este correo con cualquier pregunta. Nuestro equipo estara encantado de ayudarte.",
    lineItem: "Plan",
    spamReminder:
      "Si no ves este mensaje en tu bandeja de entrada, revisa las carpetas de Spam o Promociones.",
    ignoreNotice:
      "Si no solicitaste este correo, puedes ignorarlo de forma segura.",
    refundPolicy: "Politica de reembolso",
    termsOfService: "Terminos del servicio",
    plainHello: "Hola",
    plainThanks:
      "Gracias por enviar tu pedido de {plan}. Hemos recibido tu solicitud y te ayudaremos a completar el pago en breve.",
    plainPaymentOptions: "Metodo de pago seleccionado: {method}",
    plainDiscount:
      "Paga por transferencia bancaria o criptomoneda y recibe un 15% de descuento sobre el precio listado.",
    plainListedPrice: "Precio listado",
    plainFinalPrice: "Precio final (15% de descuento)",
    plainReply:
      "Abre los detalles de pago de {method} con el enlace de abajo y paga el importe final con descuento.",
    plainOpenPayment: "Abrir detalles de pago",
    plainDelivery:
      "En cuanto se reciba el pago, proporcionamos tu cuenta de inmediato.",
    plainOrderReference: "Referencia del pedido",
    plainPlan: "Plan",
    plainSpamCheck:
      "Si no ves nuestro mensaje, revisa las carpetas de Spam o Promociones.",
    plainIgnoreNotice:
      "Si no solicitaste este correo, puedes ignorarlo.",
  },
};

function withPlan(template: string, plan: string): string {
  return template.replace(/\{plan\}/g, plan);
}

function withMethod(template: string, method: string): string {
  return template.replace(/\{method\}/g, method);
}

/** Bank-transfer emails: ask the customer to reply — never include IBAN/account details. */
function bankTransferReplyInstruction(
  locale: BuyerLocale,
  fullName: string,
): string {
  const name = fullName.trim() || "there";
  switch (locale) {
    case "fr":
      return `Bonjour ${name}, merci pour votre commande ! Pour finaliser le paiement de votre abonnement IPTV Headend par virement bancaire, répondez directement à cet e-mail afin de confirmer votre commande et recevoir vos coordonnées bancaires sécurisées.`;
    case "de":
      return `Hallo ${name}, vielen Dank für Ihre Bestellung! Um die Zahlung für Ihr IPTV-Headend-Abo per Banküberweisung abzuschließen, antworten Sie bitte direkt auf diese E-Mail, um Ihre Bestellung zu bestätigen und Ihre sicheren Bankdaten zu erhalten.`;
    case "it":
      return `Ciao ${name}, grazie per l'ordine! Per completare il pagamento del tuo abbonamento IPTV Headend tramite bonifico, rispondi direttamente a questa email per confermare l'ordine e ricevere i dettagli bancari in modo sicuro.`;
    case "nl":
      return `Hallo ${name}, bedankt voor je bestelling! Om je IPTV Headend-abonnement via bankoverschrijving te betalen, beantwoord deze e-mail rechtstreeks om je bestelling te bevestigen en je veilige bankgegevens te ontvangen.`;
    case "pt":
      return `Olá ${name}, obrigado pelo seu pedido! Para concluir o pagamento da sua assinatura IPTV Headend por transferência bancária, responda diretamente a este e-mail para confirmar o pedido e receber os dados bancários de forma segura.`;
    case "es":
      return `Hola ${name}, ¡gracias por tu pedido! Para completar el pago de tu suscripción IPTV Headend por transferencia bancaria, responde directamente a este correo para confirmar el pedido y recibir tus datos bancarios de forma segura.`;
    case "no":
      return `Hei ${name}, takk for bestillingen! For å fullføre betalingen for IPTV Headend-abonnementet ditt via bankoverføring, svar direkte på denne e-posten for å bekrefte bestillingen og motta sikre bankdetaljer.`;
    case "en":
    default:
      return `Hi ${name}, thank you for your order! To complete your payment for your IPTV Headend subscription via bank transfer, please reply directly to this email to confirm your order and receive your secure bank payment details.`;
  }
}

function bankTransferNextSteps(locale: BuyerLocale): [string, string, string] {
  switch (locale) {
    case "fr":
      return [
        "Répondez à cet e-mail pour confirmer votre commande.",
        "Nous vous enverrons les coordonnées bancaires en réponse privée.",
        "Effectuez le virement du montant final remisé, puis renvoyez un reçu dans le même fil.",
      ];
    case "de":
      return [
        "Antworten Sie auf diese E-Mail, um Ihre Bestellung zu bestätigen.",
        "Wir senden Ihnen die Bankdaten in einer privaten Antwort.",
        "Überweisen Sie den finalen Rabattbetrag und antworten Sie mit einem Beleg im selben Thread.",
      ];
    case "it":
      return [
        "Rispondi a questa email per confermare l'ordine.",
        "Ti invieremo i dettagli bancari in una risposta privata.",
        "Effettua il bonifico dell'importo scontato finale, poi rispondi con la ricevuta nello stesso thread.",
      ];
    case "nl":
      return [
        "Beantwoord deze e-mail om je bestelling te bevestigen.",
        "Wij sturen je bankgegevens via een privéantwoord.",
        "Maak het eindbedrag (met 15% korting) over en stuur daarna een bewijs in dezelfde e-mailthread.",
      ];
    case "pt":
      return [
        "Responda a este e-mail para confirmar o seu pedido.",
        "Enviaremos os dados bancários numa resposta privada.",
        "Faça a transferência do valor final com desconto e responda com o comprovativo no mesmo fio.",
      ];
    case "es":
      return [
        "Responde a este correo para confirmar tu pedido.",
        "Te enviaremos los datos bancarios en una respuesta privada.",
        "Realiza la transferencia del importe final con descuento y responde con el recibo en el mismo hilo.",
      ];
    case "no":
      return [
        "Svar på denne e-posten for å bekrefte bestillingen.",
        "Vi sender bankdetaljene i et privat svar.",
        "Overfør det endelige rabatterte beløpet, og svar med kvittering i samme tråd.",
      ];
    case "en":
    default:
      return [
        "Reply to this email to confirm your order.",
        "We will send your secure bank payment details in a private reply.",
        "Pay the final discounted amount, then reply again with your receipt in the same thread.",
      ];
  }
}

function normalizeCountry(value: string): string {
  return value.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
}

const LOCALE_BY_COUNTRY: Record<string, BuyerLocale> = {
  france: "fr",
  belgium: "fr",
  switzerland: "fr",
  luxembourg: "fr",
  monaco: "fr",
  haiti: "fr",
  netherlands: "nl",
  germany: "de",
  austria: "de",
  liechtenstein: "de",
  italy: "it",
  "san marino": "it",
  "vatican city": "it",
  portugal: "pt",
  brazil: "pt",
  norway: "no",
  spain: "es",
  andorra: "es",
  argentina: "es",
  bolivia: "es",
  chile: "es",
  colombia: "es",
  "costa rica": "es",
  cuba: "es",
  "dominican republic": "es",
  ecuador: "es",
  "el salvador": "es",
  guatemala: "es",
  honduras: "es",
  mexico: "es",
  nicaragua: "es",
  panama: "es",
  paraguay: "es",
  peru: "es",
  uruguay: "es",
  venezuela: "es",
};

export function resolveBuyerLocaleFromCountry(country: string): BuyerLocale {
  return LOCALE_BY_COUNTRY[normalizeCountry(country)] ?? "en";
}

export function getBuyerEmailSubject(
  tierName: string,
  invoiceRef: string,
  locale: BuyerLocale,
): string {
  const t = COPY[locale];
  return `${t.subjectPrefix} — ${tierName} (${invoiceRef})`;
}

export type BuyerOrderEmailParams = {
  fullName: string;
  email: string;
  country: string;
  tierName: string;
  /** Listed price display, e.g. "€67.48" */
  listedPriceDisplay: string;
  /** Final discounted price display, e.g. "€57.36" */
  discountedPriceDisplay: string;
  invoiceRef: string;
  siteOrigin: string;
  locale: BuyerLocale;
  paymentMethod: SelectablePaymentMethod;
  /** Placeholder or real URL for bank / crypto details page */
  paymentDetailsUrl: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBuyerOrderEmailHtml(p: BuyerOrderEmailParams): string {
  const t = COPY[p.locale];
  const isBank = p.paymentMethod === "bank_transfer";
  const name = escapeHtml(p.fullName);
  const mail = escapeHtml(p.email);
  const country = escapeHtml(p.country);
  const tier = escapeHtml(p.tierName);
  const listed = escapeHtml(p.listedPriceDisplay || "—");
  const discounted = escapeHtml(p.discountedPriceDisplay || "—");
  const inv = escapeHtml(p.invoiceRef);
  const methodLabel =
    isBank ? t.methodBank : t.methodCrypto;
  const ctaLabel = t.ctaCryptoLabel;
  const detailsUrl = escapeHtml(p.paymentDetailsUrl);
  const bankInstruction = escapeHtml(
    bankTransferReplyInstruction(p.locale, p.fullName),
  );
  const [bankStep1, bankStep2, bankStep3] = bankTransferNextSteps(p.locale).map(
    escapeHtml,
  );
  const thanks = escapeHtml(withPlan(t.thanksLine, p.tierName));
  const paymentOptionsText = escapeHtml(
    withMethod(t.paymentOptionsText, methodLabel),
  );
  const replyText = escapeHtml(withMethod(t.replyText, methodLabel));
  const origin = p.siteOrigin.replace(/\/$/, "");
  const localePrefix =
    p.locale === "fr" ||
    p.locale === "de" ||
    p.locale === "it" ||
    p.locale === "nl" ||
    p.locale === "pt"
      ? `/${p.locale}`
      : "";
  const refundUrl = `${origin}${localePrefix}/RefundPolicy`;
  const termsUrl = `${origin}${localePrefix}/TermsConditions`;

  const introBlock = isBank
    ? `<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${C.text};">${bankInstruction}</p>`
    : `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${C.text};">${escapeHtml(t.greeting)} <strong>${name}</strong>,</p>
            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${C.text};">${thanks}</p>`;

  const paymentOptionsBlock = isBank
    ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;">
              <tr>
                <td style="padding:0 0 10px 0;">
                  <p class="gf-email-heading" style="margin:0;font-size:20px;font-weight:800;color:${C.primaryDark};line-height:1.2;">${escapeHtml(t.paymentOptionsTitle)}</p>
                </td>
              </tr>
              <tr>
                <td class="gf-email-alert" style="background-color:${C.alertBg};border:1px solid ${C.alertBorder};border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:${C.text};"><strong>${escapeHtml(t.selectedMethodLabel)}:</strong> ${escapeHtml(methodLabel)}</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.discountTitle)}:</strong> ${escapeHtml(t.discountText)}</p>
                </td>
              </tr>
            </table>`
    : `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;">
              <tr>
                <td style="padding:0 0 10px 0;">
                  <p class="gf-email-heading" style="margin:0;font-size:20px;font-weight:800;color:${C.primaryDark};line-height:1.2;">${escapeHtml(t.paymentOptionsTitle)}</p>
                </td>
              </tr>
              <tr>
                <td class="gf-email-alert" style="background-color:${C.alertBg};border:1px solid ${C.alertBorder};border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:${C.text};">${paymentOptionsText}</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.discountTitle)}:</strong> ${escapeHtml(t.discountText)}</p>
                </td>
              </tr>
            </table>`;

  const ctaBlock = isBank
    ? `<table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin:0 0 22px 0;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0;font-size:14px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.replyTitle)}:</strong> ${bankInstruction}</p>
                </td>
              </tr>
            </table>`
    : `<!-- Conditional payment details CTA -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 12px auto;">
              <tr>
                <td class="gf-email-cta-wrap" style="border-radius:50px;background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);background-color:${C.primaryDark};">
                  <a href="${detailsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:15px 30px;font-size:15px;font-weight:800;color:#ffffff;text-decoration:none;">${escapeHtml(ctaLabel)}</a>
                </td>
              </tr>
            </table>
            <p class="gf-email-muted" style="margin:0 0 22px 0;font-size:13px;color:${C.textGray};text-align:center;">${escapeHtml(t.fallbackLinkHelp)}<br/><a href="${detailsUrl}" style="color:${C.linkOnWhite};text-decoration:underline;word-break:break-all;">${detailsUrl}</a></p>`;

  const nextStepsBlock = isBank
    ? `<table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid ${C.border};">
                  <p class="gf-email-heading" style="margin:0;font-size:14px;font-weight:700;color:${C.primaryDark};">${escapeHtml(t.nextStepsTitle)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${bankStep1}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${bankStep2}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${bankStep3}</p>
                </td>
              </tr>
            </table>`
    : `<table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid ${C.border};">
                  <p class="gf-email-heading" style="margin:0;font-size:14px;font-weight:700;color:${C.primaryDark};">${escapeHtml(t.nextStepsTitle)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.nextStep1)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid ${C.border};">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.nextStep2)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;">
                  <p style="margin:0;font-size:14px;line-height:1.55;color:${C.text};">${escapeHtml(t.nextStep3)}</p>
                </td>
              </tr>
            </table>`;

  const calloutsBlock = isBank
    ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td class="gf-email-callout-green" style="background-color:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#166534;">${escapeHtml(t.deliveryTitle)}</strong> ${escapeHtml(t.deliveryText)}</p>
                </td>
              </tr>
              <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>
              <tr>
                <td class="gf-email-alert" style="background-color:${C.alertBg};border:1px solid ${C.alertBorder};border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.supportTitle)}</strong> ${escapeHtml(t.supportText)}</p>
                </td>
              </tr>
            </table>`
    : `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
              <tr>
                <td class="gf-email-callout-cyan" style="background-color:#ecfeff;border:1px solid #67e8f9;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#0e7490;">${escapeHtml(t.replyTitle)}:</strong> ${replyText}</p>
                </td>
              </tr>
              <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>
              <tr>
                <td class="gf-email-callout-green" style="background-color:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:#166534;">${escapeHtml(t.deliveryTitle)}</strong> ${escapeHtml(t.deliveryText)}</p>
                </td>
              </tr>
              <tr><td style="height:10px;line-height:10px;font-size:10px;">&nbsp;</td></tr>
              <tr>
                <td class="gf-email-alert" style="background-color:${C.alertBg};border:1px solid ${C.alertBorder};border-radius:10px;padding:13px 14px 12px 14px;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:${C.text};"><strong style="color:${C.primaryDark};">${escapeHtml(t.supportTitle)}</strong> ${escapeHtml(t.supportText)}</p>
                </td>
              </tr>
            </table>`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${escapeHtml(t.htmlTitle)}</title>
<style type="text/css">
${EMAIL_DARK_MODE_STYLE}
</style>
</head>
<body class="gf-email-root" style="margin:0;padding:0;background-color:${C.bgPage};font-family:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" class="gf-email-outer" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};padding:24px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" class="gf-email-card" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:${C.bgCard};border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
        <tr>
          <td class="gf-email-header" style="background:linear-gradient(135deg,${C.primary} 0%,${C.primaryDark} 100%);background-color:${C.primaryDark};padding:28px 32px;text-align:center;">
            <p style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.12em;color:${C.headerSub};text-transform:uppercase;">${escapeHtml(t.headerEyebrow)}</p>
            <p style="margin:0 0 10px 0;font-size:28px;font-weight:700;color:#ffffff;font-family:Georgia,'Times New Roman',Times,serif;line-height:1.2;">IPTV Headend</p>
            <p style="margin:0;font-size:13px;color:${C.headerInvoice};">${escapeHtml(t.orderReference)}: <strong style="color:#ffffff;">${inv}</strong></p>
          </td>
        </tr>
        <tr>
          <td class="gf-email-main" style="padding:28px 32px 8px 32px;">
            ${introBlock}
            <table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p class="gf-email-muted" style="margin:0 0 8px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.billTo)}</p>
                  <p style="margin:0 0 4px 0;font-size:16px;font-weight:700;color:${C.text};">${name}</p>
                  <p style="margin:0 0 4px 0;font-size:14px;"><a href="mailto:${mail}" style="color:${C.linkOnWhite};text-decoration:underline;">${mail}</a></p>
                  <p class="gf-email-muted" style="margin:0 0 8px 0;font-size:14px;color:${C.textGray};">${country}</p>
                  <p style="margin:0;font-size:14px;color:${C.text};"><strong>${escapeHtml(t.selectedMethodLabel)}:</strong> ${escapeHtml(methodLabel)}</p>
                </td>
              </tr>
            </table>

            ${paymentOptionsBlock}

            <table role="presentation" class="gf-email-surface" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${C.bgPage};border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
              <tr>
                <td colspan="2" style="padding:12px 18px;border-bottom:1px solid ${C.border};">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td class="gf-email-muted" style="font-size:11px;font-weight:600;letter-spacing:0.06em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.lineItem)}</td>
                      <td class="gf-email-muted" align="right" style="font-size:11px;font-weight:600;letter-spacing:0.06em;color:${C.textGray};text-transform:uppercase;">${escapeHtml(t.listedPriceLabel)} / ${escapeHtml(t.finalPriceLabel)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 18px;font-size:15px;font-weight:700;color:${C.text};vertical-align:top;">${tier}</td>
                <td align="right" style="padding:16px 18px;vertical-align:top;">
                  <p class="gf-email-muted" style="margin:0 0 4px 0;font-size:13px;color:${C.textGray};text-decoration:line-through;">${listed}</p>
                  <p class="gf-email-price" style="margin:0;font-size:18px;font-weight:800;color:${C.primaryDark};white-space:nowrap;">${discounted}</p>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:0 18px 16px 18px;">
                  <p class="gf-email-muted" style="margin:0;font-size:13px;color:${C.textGray};">${escapeHtml(t.listedPriceLabel)}: ${listed} · ${escapeHtml(t.finalPriceLabel)}: <strong style="color:${C.text};">${discounted}</strong></p>
                </td>
              </tr>
            </table>

            ${ctaBlock}

            ${nextStepsBlock}

            ${calloutsBlock}

            <p class="gf-email-muted" style="margin:0 0 0 0;font-size:13px;line-height:1.5;color:${C.textGray};">${escapeHtml(t.spamReminder)}</p>
          </td>
        </tr>
        <tr>
          <td class="gf-email-footer" style="padding:8px 32px 28px 32px;border-top:1px solid ${C.border};">
            <p class="gf-email-muted" style="margin:0 0 16px 0;font-size:12px;color:${C.textGray};line-height:1.5;">${escapeHtml(t.ignoreNotice)}</p>
            <p style="margin:0;font-size:13px;">
              <a href="${refundUrl}" style="color:${C.linkOnWhite};text-decoration:none;font-weight:600;">${escapeHtml(t.refundPolicy)}</a>
              <span class="gf-email-sep" style="color:${C.border};"> · </span>
              <a href="${termsUrl}" style="color:${C.linkOnWhite};text-decoration:none;font-weight:600;">${escapeHtml(t.termsOfService)}</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function buildBuyerOrderEmailText(
  p: Pick<
    BuyerOrderEmailParams,
    | "fullName"
    | "tierName"
    | "listedPriceDisplay"
    | "discountedPriceDisplay"
    | "invoiceRef"
    | "locale"
    | "paymentMethod"
    | "paymentDetailsUrl"
  >,
): string {
  const t = COPY[p.locale];
  const isBank = p.paymentMethod === "bank_transfer";
  const methodLabel = isBank ? t.methodBank : t.methodCrypto;

  if (isBank) {
    const [s1, s2, s3] = bankTransferNextSteps(p.locale);
    return `${bankTransferReplyInstruction(p.locale, p.fullName)}

${withMethod(t.plainPaymentOptions, methodLabel)}

${t.plainDiscount}

${t.plainPlan}: ${p.tierName}
${t.plainListedPrice}: ${p.listedPriceDisplay || "—"}
${t.plainFinalPrice}: ${p.discountedPriceDisplay || "—"}

${t.nextStepsTitle}:
1. ${s1}
2. ${s2}
3. ${s3}

${t.plainDelivery}

${t.plainOrderReference}: ${p.invoiceRef}

${t.plainSpamCheck}

${t.plainIgnoreNotice}

— IPTV Headend`;
  }

  return `${t.plainHello} ${p.fullName},

${withPlan(t.plainThanks, p.tierName)}

${withMethod(t.plainPaymentOptions, methodLabel)}

${t.plainDiscount}

${t.plainPlan}: ${p.tierName}
${t.plainListedPrice}: ${p.listedPriceDisplay || "—"}
${t.plainFinalPrice}: ${p.discountedPriceDisplay || "—"}

${withMethod(t.plainReply, methodLabel)}

${t.plainOpenPayment}: ${p.paymentDetailsUrl}

${t.plainDelivery}

${t.plainOrderReference}: ${p.invoiceRef}

${t.plainSpamCheck}

${t.plainIgnoreNotice}

— IPTV Headend`;
}

export function generateInvoiceRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return `INV-${s}`;
}
