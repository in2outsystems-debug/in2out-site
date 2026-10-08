"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
  /** Onde o botão está na página, para a análise de cliques. Exemplo: "home_hero". */
  posicao: string;
  variante?: "primario" | "secundario" | "claro" | "contorno-claro";
  tamanho?: "normal" | "grande";
  className?: string;
};

const base =
  "alvo inline-flex items-center justify-center gap-2 rounded-marca px-5 py-3 text-center font-semibold transition-colors";

const variantes = {
  primario: "bg-acao text-sobre-acao hover:bg-acao-forte",
  secundario: "border-2 border-acao text-acao hover:bg-acao hover:text-sobre-acao",
  claro: "bg-sobre-escuro text-escuro hover:bg-white",
  "contorno-claro": "border-2 border-sobre-escuro text-sobre-escuro hover:bg-sobre-escuro hover:text-escuro",
};

export function Botao({ href, children, posicao, variante = "primario", tamanho = "normal", className = "" }: Props) {
  const externo = /^(https?:|mailto:|tel:)/.test(href);
  const whatsapp = href.includes("wa.me");
  const classes = `${base} ${variantes[variante]} ${tamanho === "grande" ? "px-7 py-4 text-lg" : ""} ${className}`;

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
        {href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={aoClicar}>
      {children}
    </Link>
  );
}
