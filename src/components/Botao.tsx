"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
  /** Onde o botão está na página, para a análise de cliques. Exemplo: "home_hero". */
  posicao: string;
  variante?: "primario" | "secundario" | "contorno-claro" | "texto";
  tamanho?: "normal" | "grande";
  /** Mostra a seta no círculo. Só no botão primário. */
  seta?: boolean;
  className?: string;
};

const base =
  "alvo prensa inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-[0.9375rem] font-semibold transition-[background-color,border-color,box-shadow,filter]";

const variantes = {
  // Azul da marca cheio, com um brilho suave por baixo: é o botão da ação principal.
  primario: "bg-acao-cheia text-sobre-acao shadow-[0_8px_28px_-8px_rgb(var(--c-acao-cheia)/0.8)] hover:brightness-110",
  secundario: "border border-white/20 text-tinta hover:border-white/40 hover:bg-white/[0.06]",
  "contorno-claro": "border border-white/25 text-sobre-escuro hover:border-white/50 hover:bg-white/[0.07]",
  texto: "font-semibold underline underline-offset-2",
};

/** Seta dentro de um círculo branco, como detalhe do botão principal. */
function Seta() {
  return (
    <span aria-hidden="true" className="-mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-acao-cheia">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

export function Botao({ href, children, posicao, variante = "primario", tamanho = "normal", seta = false, className = "" }: Props) {
  const externo = /^(https?:|mailto:|tel:)/.test(href);
  const whatsapp = href.includes("wa.me");
  const classes = `${variante === "texto" ? "alvo inline-flex items-center" : base} ${variantes[variante]} ${tamanho === "grande" ? "px-7 py-3.5 !text-base" : ""} ${seta ? "pr-4" : ""} ${className}`;

  const aoClicar = () => {
    if (whatsapp) track("whatsapp_click", { posicao });
    else track("cta_click", { posicao, destino: href });
  };

  if (externo) {
    return (
      <a
        href={href}
        className={classes}
        onClick={aoClicar}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {seta && <Seta />}
        {href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={aoClicar}>
      {children}
      {seta && <Seta />}
    </Link>
  );
}
