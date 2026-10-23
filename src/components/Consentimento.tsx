"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EVENTO_ABRIR_COOKIES as EVENTO_ABRIR } from "./AbrirCookies";
import { usePresenca } from "./movimento/usePresenca";
import { captureUtm, readConsent, track, writeConsent, type Consent } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
/**
 * Banner de cookies, carregamento do GTM só após aceite, visualização de página e rolagem.
 * Recusar e aceitar têm o mesmo peso visual e o mesmo número de cliques.
 */
export function Consentimento() {
  const [consent, setConsent] = useState<Consent>(null);
  const [pronto, setPronto] = useState(false);
  const [reaberto, setReaberto] = useState(false);
  const caminho = usePathname();
  const marcos = useRef<Set<number>>(new Set());
  const titulo = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setConsent(readConsent());
    setPronto(true);
    captureUtm();
    const abrir = () => setReaberto(true);
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  useEffect(() => {
    if (reaberto) titulo.current?.focus();
  }, [reaberto]);

  // Visualização de página a cada troca de rota
  useEffect(() => {
    marcos.current = new Set();
    if (consent === "granted") track("page_view_spa", { caminho });
  }, [caminho, consent]);

  // Profundidade de rolagem: 25, 50, 75 e 90%
  useEffect(() => {
    if (consent !== "granted") return;
    const aoRolar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      for (const marco of [25, 50, 75, 90]) {
        if (pct >= marco && !marcos.current.has(marco)) {
          marcos.current.add(marco);
          track("scroll_depth", { percentual: marco, caminho });
        }
      }
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [consent, caminho]);

  const escolher = (v: "granted" | "denied") => {
    writeConsent(v);
    setConsent(v);
    setReaberto(false);
  };

  const mostrar = pronto && (consent === null || reaberto);
  const { montado, presenca } = usePresenca(mostrar, 300);

  return (
    <>
      {consent === "granted" && GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=document.getElementsByTagName('script')[0],j=document.createElement('script');j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';f.parentNode.insertBefore(j,f);`}
        </Script>
      )}
      {montado && (
        <div
          role="dialog"
          data-presenca={presenca}
          data-anim="base"
          aria-labelledby="cookies-titulo"
          aria-describedby="cookies-texto"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-linha bg-superficie p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
        >
          <div className="pagina flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 id="cookies-titulo" ref={titulo} tabIndex={-1} className="text-lg font-semibold">
                Sua privacidade
              </h2>
              <p id="cookies-texto" className="text-base text-mudo">
                Usamos cookies de medição (Google Analytics) para entender quais páginas ajudam mais. Eles só são ativados se você aceitar.
                Veja os detalhes na{" "}
                <Link href="/cookies" className="text-acao underline underline-offset-2">
                  política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <button
                type="button"
                onClick={() => escolher("denied")}
                className="alvo prensa rounded-marca border-2 border-acao px-5 py-2.5 font-semibold text-acao hover:bg-suave"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => escolher("granted")}
                className="alvo prensa rounded-marca border-2 border-acao px-5 py-2.5 font-semibold text-acao hover:bg-suave"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
