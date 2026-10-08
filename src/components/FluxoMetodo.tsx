import { metodo } from "@/lib/site";

/** Os cinco passos: horizontal a partir de md, vertical no celular. Linhas e marcadores são SVG. */
export function FluxoMetodo({ detalhado = false }: { detalhado?: boolean }) {
  return (
    <ol className="relative ml-5 border-l-2 border-linha md:ml-0 md:grid md:grid-cols-5 md:gap-4 md:border-l-0">
      {metodo.map((p, i) => (
        <li key={p.slug} className="relative pb-10 pl-8 last:pb-0 md:pb-0 md:pl-0">
          <div className="absolute -left-[1.4rem] top-0 md:static md:mb-4 md:flex md:items-center">
            <svg width="44" height="44" viewBox="0 0 44 44" role="img" aria-label={`Passo ${p.numero}`} className="flex-shrink-0 bg-fundo">
              <circle cx="22" cy="22" r="20" fill="rgb(var(--c-acao))" />
              <text x="22" y="29" textAnchor="middle" fontSize="20" fontWeight="700" fill="rgb(var(--c-sobre-acao))">
                {p.numero}
              </text>
            </svg>
            {i < metodo.length - 1 && (
              <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" className="ml-2 hidden h-3 flex-1 md:block" aria-hidden="true">
                <line x1="0" y1="6" x2="92" y2="6" stroke="rgb(var(--c-acao))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <path d="M86 1l8 5-8 5" fill="none" stroke="rgb(var(--c-acao))" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-bold">{p.nome}</h3>
          <p className="mt-1 text-mudo">{detalhado ? p.detalhe : p.resumo}</p>
        </li>
      ))}
    </ol>
  );
}
