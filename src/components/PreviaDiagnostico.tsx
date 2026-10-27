import { Botao } from "./Botao";

/** Prévia do teste de 3 perguntas no topo da home. O cartão inteiro leva ao diagnóstico. */
const perguntas = ["Existe um processo definido?", "Ele está padronizado?", "Alguém mede o resultado?"];

export function PreviaDiagnostico() {
  return (
    <div className="relative rounded-marca-lg border border-linha bg-superficie p-5 transition-colors focus-within:ring-2 focus-within:ring-acao hover:border-acao/60 sm:p-6">
      <p className="font-semibold">O teste de 3 perguntas</p>
      <p className="mt-1 text-sm text-mudo">As três primeiras das 5 perguntas do diagnóstico. Você responde sim, em parte ou não.</p>
      <ol className="mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-4">
        {perguntas.map((p, i) => (
          <li key={p} className="border-t border-linha pt-3 first:border-t-0 first:pt-0 sm:pt-4">
            <p className="flex gap-3 font-medium">
              <span className="text-dado tabular-nums">{i + 1}.</span>
              {p}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-6 border-t border-linha pt-4">
        <Botao href="/diagnostico" variante="texto" posicao="home_hero_previa" className="text-acao after:absolute after:inset-0 after:rounded-marca-lg focus:outline-none">
          Fazer o diagnóstico gratuito
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Botao>
      </div>
    </div>
  );
}
