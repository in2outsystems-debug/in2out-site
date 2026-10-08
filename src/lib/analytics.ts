// Rastreamento do lado do navegador. Nada é enviado antes do consentimento.

export const CONSENT_KEY = "in2out-consent";
export type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* sem armazenamento: o banner volta a aparecer */
  }
}

/** Envia um evento ao dataLayer do GTM. Ignora se não houver consentimento. */
export function track(evento: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (readConsent() !== "granted") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: evento, ...params });
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Guarda as UTMs da primeira visita da sessão, sempre em minúsculas. */
export function captureUtm() {
  try {
    const url = new URL(window.location.href);
    const atual: Record<string, string> = JSON.parse(window.sessionStorage.getItem("in2out-utm") || "{}");
    let mudou = false;
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v && !atual[k]) {
        atual[k] = v.trim().toLowerCase();
        mudou = true;
      }
    }
    if (mudou) window.sessionStorage.setItem("in2out-utm", JSON.stringify(atual));
  } catch {
    /* ignora */
  }
}

export function readUtm(): Record<string, string> {
  try {
    return JSON.parse(window.sessionStorage.getItem("in2out-utm") || "{}");
  } catch {
    return {};
  }
}

/** Monta um link com UTM padronizado (minúsculas, sem espaços). Use para links de campanhas. */
export function utmLink(base: string, source: string, medium: string, campaign: string) {
  const limpa = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const u = new URL(base);
  u.searchParams.set("utm_source", limpa(source));
  u.searchParams.set("utm_medium", limpa(medium));
  u.searchParams.set("utm_campaign", limpa(campaign));
  return u.toString();
}
