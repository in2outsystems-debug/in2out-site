"use client";

import Link from "next/link";
import { useId, useMemo, useState, type ReactNode } from "react";
import { usePresenca } from "./movimento/usePresenca";
import { track } from "@/lib/analytics";
import { categorias } from "@/lib/site";

export type ItemHub = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  publicado: string;
  minutos: number;
};

function normalizar(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Item da lista: sai com animação ao deixar o filtro e entra com animação ao voltar. */
function ItemFiltrado({ visivel, children }: { visivel: boolean; children: ReactNode }) {
  const { montado, presenca } = usePresenca(visivel, 200);
  if (!montado) return null;
  return (
    <li
      data-presenca={presenca}
      data-anim="pop"
      className="eleva relative flex flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao"
    >
      {children}
    </li>
  );
}

export function ConteudoHub({ itens }: { itens: ItemHub[] }) {
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState<string>("Todos");
  const id = useId();

  const filtrados = useMemo(() => {
    const q = normalizar(busca.trim());
    return itens.filter(
      (i) =>
        (cat === "Todos" || i.categoria === cat) &&
        (!q || normalizar(`${i.titulo} ${i.resumo} ${i.categoria}`).includes(q)),
    );
  }, [itens, busca, cat]);
  const visiveis = useMemo(() => new Set(filtrados.map((i) => i.slug)), [filtrados]);

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div>
          <label htmlFor={`${id}-busca`} className="mb-1 block font-medium">
            Buscar artigo
          </label>
          <input
            id={`${id}-busca`}
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onBlur={() => busca && track("busca_conteudo", { termo: busca })}
            placeholder="Digite uma palavra, como indicador"
            className="campo max-w-md"
          />
        </div>
        <fieldset>
          <legend className="mb-2 font-medium">Categoria</legend>
          <div className="flex flex-wrap gap-2">
            {["Todos", ...categorias].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`alvo rounded-full border-2 px-4 font-medium ${
                  cat === c ? "border-acao bg-acao text-sobre-acao" : "border-linha bg-superficie hover:border-mudo"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p role="status" key={filtrados.length === 0 ? "vazio" : "cheio"} className="entrada mb-4 text-mudo">
        {filtrados.length === 0
          ? "Nenhum artigo encontrado. Tente outra palavra ou categoria."
          : `${filtrados.length} ${filtrados.length === 1 ? "artigo" : "artigos"}`}
      </p>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {itens.map((a) => (
          <ItemFiltrado key={a.slug} visivel={visiveis.has(a.slug)}>
            <p className="olho">{a.categoria}</p>
            <h2 className="mt-2 text-xl font-bold">
              <Link href={`/conteudo/${a.slug}`} className="after:absolute after:inset-0 focus:outline-none">
                {a.titulo}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-mudo">{a.resumo}</p>
            <p className="mt-4 text-sm text-mudo">
              {a.publicado.split("-").reverse().join("/")} · {a.minutos} min de leitura
            </p>
          </ItemFiltrado>
        ))}
      </ul>
    </div>
  );
}
