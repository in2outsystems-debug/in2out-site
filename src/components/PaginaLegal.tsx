import type { ReactNode } from "react";
import { dadoPreenchido } from "@/lib/site";
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
      <TopoPagina migalhas={[{ nome: titulo, caminho }]} titulo={titulo} texto={dadoPreenchido(atualizado) ? `Última atualização: ${atualizado}.` : undefined} />
      <div className="pagina py-12">
        <div className="prosa max-w-leitura">
          {/* Nota interna: aparece só no ambiente de desenvolvimento, nunca para o público */}
          {rascunho && process.env.NODE_ENV !== "production" && (
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
