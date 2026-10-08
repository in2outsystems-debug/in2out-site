"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export type ItemAcordeao = { p: string; r: ReactNode };

/** Perguntas e respostas com <details>, acessível sem JavaScript. */
export function Acordeao({ itens, origem }: { itens: ItemAcordeao[]; origem: string }) {
  return (
    <div className="divide-y divide-linha rounded-marca-lg border border-linha bg-superficie">
      {itens.map((item) => (
        <details
          key={item.p}
          className="group"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) track("faq_open", { pergunta: item.p, origem });
          }}
        >
          <summary className="alvo flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
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
          <div className="px-5 pb-5 text-mudo">{item.r}</div>
        </details>
      ))}
    </div>
  );
}
