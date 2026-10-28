"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export type ItemAcordeao = { p: string; r: ReactNode };

/** Perguntas e respostas com <details>, acessível sem JavaScript. */
export function Acordeao({ itens, origem, solto = false }: { itens: ItemAcordeao[]; origem: string; solto?: boolean }) {
  return (
    <div className={solto ? "divide-y divide-white/[0.12]" : "painel divide-y divide-white/[0.08]"}>
      {itens.map((item) => (
        <details
          key={item.p}
          className="group"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) track("faq_open", { pergunta: item.p, origem });
          }}
        >
          <summary className={`alvo flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold sm:text-lg [&::-webkit-details-marker]:hidden ${solto ? "" : "px-5"}`}>
            {item.p}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="flex-shrink-0 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              <path d="M5 8l5 5 5-5" />
            </svg>
          </summary>
          <div className={`pb-5 text-mudo ${solto ? "" : "px-5"}`}>{item.r}</div>
        </details>
      ))}
    </div>
  );
}
