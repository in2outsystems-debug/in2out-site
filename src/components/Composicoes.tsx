import type { ReactNode } from "react";
import { Lista } from "./Blocos";

/**
 * Sequência numerada em linhas, para etapas e ordem de trabalho.
 * O número grande e a linha vertical dão o ritmo; cada passo ocupa a largura toda.
 */
export function Sequencia({ itens, longo = false }: { itens: { titulo: string; texto?: ReactNode; extra?: ReactNode }[]; longo?: boolean }) {
  return (
    <ol className="relative">
      {itens.map((p, i) => (
        <li key={p.titulo} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-6">
          {i < itens.length - 1 && <span aria-hidden="true" className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-white/15 sm:left-8" />}
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-acao-cheia/50 bg-acao-cheia/15 text-lg font-semibold tabular-nums text-tinta sm:h-16 sm:w-16 sm:text-xl">
            {i + 1}
          </span>
          <div className="pt-1.5 sm:pt-3">
            <h3 className={longo ? "max-w-leitura text-lg font-medium" : "text-xl font-semibold"}>{p.titulo}</h3>
            {p.texto && <p className="mt-1 max-w-leitura text-mudo">{p.texto}</p>}
            {p.extra && <div className="mt-3">{p.extra}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Passos curtos em linha (a partir de md) com número e conector; vertical no celular. */
export function Passos({ itens }: { itens: string[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-5 md:gap-4">
      {itens.map((p, i) => (
        <li key={p} className="relative flex gap-4 md:block">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-acao-cheia text-lg font-semibold tabular-nums text-sobre-acao">{i + 1}</span>
          {i < itens.length - 1 && <span aria-hidden="true" className="absolute left-14 top-5 hidden h-px w-[calc(100%-3.5rem)] bg-white/15 md:block" />}
          <p className="pt-2 md:mt-4 md:pt-0">{p}</p>
        </li>
      ))}
    </ol>
  );
}

/** Dois blocos lado a lado num painel só, separados por uma linha. */
export function DuasColunas({
  esquerda,
  direita,
}: {
  esquerda: { titulo: string; itens: string[]; marcador?: "check" | "x" };
  direita: { titulo: string; itens: string[]; marcador?: "check" | "x" };
}) {
  return (
    <div className="painel grid divide-y divide-white/[0.08] md:grid-cols-2 md:divide-x md:divide-y-0">
      {[esquerda, direita].map((c) => (
        <div key={c.titulo} className="p-6 sm:p-8">
          <h3 className="titulo-3 mb-5">{c.titulo}</h3>
          <Lista itens={c.itens} marcador={c.marcador} />
        </div>
      ))}
    </div>
  );
}
