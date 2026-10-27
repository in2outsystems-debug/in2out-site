import { Migalhas } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { QuizTardio } from "@/components/movimento/Tardios";

export const metadata = pageMeta({
  titulo: "Diagnóstico gratuito: seu processo está pronto para automatizar?",
  descricao: "Cinco perguntas rápidas mostram se vale automatizar agora ou organizar antes, com uma recomendação para o seu caso.",
  caminho: "/diagnostico",
});

export default function Diagnostico() {
  return (
    <div className="pagina py-10 sm:py-14">
      <Migalhas itens={[{ nome: "Diagnóstico", caminho: "/diagnostico" }]} />
      <div className="mx-auto mt-8 max-w-3xl">
        <h1 className="titulo-1">Seu processo está pronto para automatizar?</h1>
        <p className="mb-10 mt-4 max-w-leitura text-xl text-mudo">
          Três perguntas do teste, mais duas sobre o seu negócio. No final você vê o seu nível e a recomendação.
        </p>
        <QuizTardio />
      </div>
    </div>
  );
}
