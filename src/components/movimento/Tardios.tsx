import dynamic from "next/dynamic";
import { EsqueletoFormulario, EsqueletoLista, EsqueletoQuiz } from "./Esqueleto";

/**
 * Componentes pesados e interativos carregados sob demanda (code splitting).
 * Continuam renderizados no servidor para SEO; no cliente, o skeleton cobre o tempo do download do código.
 */
export const FormularioTardio = dynamic(() => import("../Formulario").then((m) => m.Formulario), {
  loading: () => <EsqueletoFormulario />,
});

export const QuizTardio = dynamic(() => import("../Quiz").then((m) => m.Quiz), {
  loading: () => <EsqueletoQuiz />,
});

export const ConteudoHubTardio = dynamic(() => import("../ConteudoHub").then((m) => m.ConteudoHub), {
  loading: () => <EsqueletoLista />,
});
