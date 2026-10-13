import type { ReactNode } from "react";
import { TopoPagina } from "./Blocos";

export function PaginaLegal({
  titulo,
  caminho,
  atualizado,
  rascunho = true,
  children,
}: {
  titulo: string;
  caminho: string;
  atualizado: string;
  rascunho?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <TopoPagina migalhas={[{ nome: titulo, caminho }]} titulo={titulo} texto={`Última atualização: ${atualizado}.`} />
      <div className="pagina py-12">
        <div className="prosa max-w-leitura">
          {rascunho && (
            <p className="rounded-marca bg-dado-fundo p-4">
              <strong>Texto-base para revisão jurídica.</strong> Preencha os campos entre colchetes e peça a um advogado que revise antes de publicar.
            </p>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
