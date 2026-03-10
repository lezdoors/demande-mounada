// Google Ads conversion IDs for demande account
const GOOGLE_ADS_ID = "AW-16683623620";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }
}

// Deduplicate by session
const firedEvents = new Set<string>();

function fireOnce(key: string, fn: () => void) {
  if (firedEvents.has(key)) return;
  firedEvents.add(key);
  fn();
}

export function trackFormStart() {
  fireOnce("form_start", () => {
    pushDataLayer({ event: "form_start" });
  });
}

export function trackFormStep(step: number) {
  pushDataLayer({ event: "form_step", step_number: step });
}

export function trackFormSubmit(leadId: string, demandeId: string, typeDemande: string) {
  fireOnce("form_submit", () => {
    pushDataLayer({
      event: "form_submit",
      lead_id: leadId,
      demande_id: demandeId,
      form_type: typeDemande,
      value: 129.80,
      currency: "EUR",
    });
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/form_submit`,
      value: 129.80,
      currency: "EUR",
    });
  });
}

export function trackPurchase(paymentIntentId: string, amount: number) {
  fireOnce("purchase", () => {
    pushDataLayer({
      event: "purchase",
      transaction_id: paymentIntentId,
      value: amount,
      currency: "EUR",
    });
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/purchase`,
      value: amount,
      currency: "EUR",
      transaction_id: paymentIntentId,
    });
  });
}
