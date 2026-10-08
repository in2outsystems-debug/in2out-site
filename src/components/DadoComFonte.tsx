import type { ReactNode } from "react";

/**
 * Bloco reutilizável para qualquer número do site. Exige fonte e data.
 * Se o dado ainda não tem fonte, passe fonte="[inserir fonte]" e ele aparece marcado como pendente.
 */
export function DadoComFonte({
  valor,
  legenda,
  fonte,
  data,
  url,
  nota,
}: {
  valor: string;
  legenda: ReactNode;
  fonte: string;
  data: string;
  url?: string;
  nota?: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-marca-lg border border-linha bg-superficie p-6">
      <p className="text-5xl font-bold text-dado" aria-label={valor}>
        {valor}
      </p>
      <figcaption className="mt-3 flex-1 text-lg">{legenda}</figcaption>
      <p className="mt-4 border-t border-linha pt-3 text-sm text-mudo">
        Fonte:{" "}
        {url ? (
          <a href={url} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            {fonte}
          </a>
        ) : (
          fonte
        )}
        , {data}.{nota ? ` ${nota}` : ""}
      </p>
    </figure>
  );
}
