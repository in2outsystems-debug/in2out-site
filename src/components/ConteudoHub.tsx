"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
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

      <p role="status" className="mb-4 text-mudo">
        {filtrados.length === 0
          ? "Nenhum artigo encontrado. Tente outra palavra ou categoria."
          : `${filtrados.length} ${filtrados.length === 1 ? "artigo" : "artigos"}`}
      </p>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((a) => (
          <li key={a.slug} className="relative flex flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao hover:shadow-md">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
