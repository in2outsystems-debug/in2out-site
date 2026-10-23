/** Blocos de skeleton. Sem "use client": podem ser usados em loading.tsx e em páginas de servidor. */

export function Esqueleto({ className = "" }: { className?: string }) {
  return <div className={`esqueleto ${className}`} aria-hidden="true" />;
}

export function EsqueletoTexto({ linhas = 3, className = "" }: { linhas?: number; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: linhas }, (_, i) => (
        <Esqueleto key={i} className={`h-4 ${i === linhas - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function EsqueletoCartao({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-marca-lg border border-linha bg-superficie p-6 ${className}`} aria-hidden="true">
      <Esqueleto className="h-3 w-20" />
      <Esqueleto className="mt-4 h-6 w-3/4" />
      <EsqueletoTexto linhas={3} className="mt-4" />
    </div>
  );
}

/** Abertura padrão das páginas internas enquanto carregam. */
export function EsqueletoPagina() {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando a página</span>
      <section className="border-b border-linha bg-suave">
        <div className="pagina py-10 sm:py-14" aria-hidden="true">
          <Esqueleto className="h-4 w-40" />
          <Esqueleto className="mt-8 h-10 w-full max-w-3xl sm:h-12" />
          <Esqueleto className="mt-3 h-10 w-2/3 max-w-xl sm:h-12" />
          <EsqueletoTexto linhas={2} className="mt-6 max-w-leitura" />
        </div>
      </section>
      <section className="secao">
        <div className="pagina grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          <EsqueletoCartao />
          <EsqueletoCartao />
          <EsqueletoCartao />
        </div>
      </section>
    </div>
  );
}

export function EsqueletoFormulario() {
  return (
    <div role="status" aria-busy="true" className="space-y-5">
      <span className="sr-only">Carregando o formulário</span>
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden="true">
          <Esqueleto className="h-4 w-28" />
          <Esqueleto className="mt-2 h-11 w-full" />
        </div>
      ))}
      <Esqueleto className="h-12 w-40" />
    </div>
  );
}

export function EsqueletoQuiz() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Carregando o diagnóstico</span>
      <div aria-hidden="true">
        <div className="mb-2 flex justify-between">
          <Esqueleto className="h-4 w-32" />
          <Esqueleto className="h-4 w-10" />
        </div>
        <Esqueleto className="h-3 w-full rounded-full" />
        <Esqueleto className="mt-8 h-8 w-3/4" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Esqueleto key={i} className="h-14" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EsqueletoLista() {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Carregando os artigos</span>
      <div aria-hidden="true">
        <Esqueleto className="h-11 w-full max-w-md" />
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <EsqueletoCartao />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
