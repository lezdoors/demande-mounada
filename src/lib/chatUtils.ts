export interface LeadQualification {
  type_client?: string;
  type_demande?: string;
  postal_code?: string;
}

/** Build form URL preserving UTMs + pre-fill from chat qualification */
export function buildFormUrl(prefill?: LeadQualification): string {
  const params = new URLSearchParams(window.location.search);
  const out = new URLSearchParams();

  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"]) {
    const v = params.get(key);
    if (v) out.set(key, v);
  }
  out.set("source", "chatbot");
  if (prefill?.type_client) out.set("type_client", prefill.type_client);
  if (prefill?.type_demande) out.set("type_demande", prefill.type_demande);

  const qs = out.toString();
  return `/form${qs ? "?" + qs : ""}`;
}

/** Detect user buying intent */
export function detectIntent(text: string): boolean {
  return /\b(démarrer|commencer|faire une demande|je veux|prêt|terrain|construction|maison|chantier|travaux|compteur|urgent|rapidement|délai|combien|prix|coût|tarif|frais|d'accord|ok|oui|allons-y|on y va|parfait|formulaire|demande|raccordement)\b/i.test(text);
}

/** Detect AI response containing CTA signal */
export function detectResponseSignal(text: string): boolean {
  return /\b(formulaire|dossier|démarrer votre|rappelle|constituer)\b/i.test(text);
}

/** Detect when AI can't answer and needs human */
export function detectHandoffSignal(text: string): boolean {
  return /\b(je ne suis pas en mesure|un de nos conseillers|pas en mesure de répondre|question complexe|équipe technique)\b/i.test(text);
}

/** Extract lead qualification from message text */
export function extractQualification(text: string): LeadQualification {
  const client = text.match(/\b(particulier|entreprise|société|collectivité|mairie|professionnel)\b/i);
  const demande = text.match(/\b(provisoire|définitif|augmentation|collectif)\b/i);
  const postal = text.match(/\b(\d{5})\b/);
  return {
    type_client: client?.[0]?.toLowerCase(),
    type_demande: demande?.[0]?.toLowerCase(),
    postal_code: postal?.[1],
  };
}

/** Merge qualification, keeping non-null values */
export function mergeQualification(existing: LeadQualification, incoming: LeadQualification): LeadQualification {
  return {
    type_client: incoming.type_client || existing.type_client,
    type_demande: incoming.type_demande || existing.type_demande,
    postal_code: incoming.postal_code || existing.postal_code,
  };
}
