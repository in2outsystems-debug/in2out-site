import { Botao } from "./Botao";

/** Prévia do teste de 3 perguntas no topo da home (só em telas largas). O cartão inteiro leva ao diagnóstico. */
const perguntas = ["Existe um processo definido?", "Ele está padronizado?", "Alguém mede o resultado?"];

export function PreviaDiagnostico() {
  return (
    <div className="relative hidden rounded-marca-lg border border-linha bg-superficie p-6 transition-colors focus-within:ring-2 focus-within:ring-acao hover:border-acao/60 lg:block">
      <p className="font-semibold">O teste de 3 perguntas</p>
      <p className="mt-1 text-sm text-mudo">As três primeiras das 5 perguntas do diagnóstico gratuito.</p>
      <ol className="mt-5 flex flex-col gap-4">
        {perguntas.map((p, i) => (
          <li key={p} className="border-t border-linha pt-4 first:border-t-0 first:pt-0">
            <p className="flex gap-3 font-medium">
              <span className="text-dado tabular-nums">{i + 1}.</span>
              {p}
            </p>
            <div aria-hidden="true" className="mt-2.5 flex gap-2 pl-6 text-sm text-mudo">
              {["Sim", "Em parte", "Não"].map((o) => (
                <span key={o} className="rounded-full border border-linha px-3 py-1">
                  {o}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 border-t border-linha pt-4">
        <Botao href="/diagnostico" variante="texto" posicao="home_hero_previa" className="text-acao after:absolute after:inset-0 after:rounded-marca-lg focus:outline-none">
          Responder no diagnóstico gratuito
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Botao>
      </div>
    </div>
  );
}
