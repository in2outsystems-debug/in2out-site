import type { ReactNode } from "react";
import { RevelarGlobal } from "@/components/movimento/RevelarGlobal";

/** Remonta a cada navegação: reativa a revelação ao rolar para a página nova. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RevelarGlobal escopo="#conteudo" />
    </>
  );
}
