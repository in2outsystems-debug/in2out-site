import Link from "next/link";
import { ChamadaFinal, Secao, TopoPagina } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { servicos } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Serviços: gestão de processos, automação, IA aplicada e tráfego pago",
  descricao: "Quatro serviços na ordem do método: organizar o processo, automatizar o que é repetitivo, aplicar IA com informações autorizadas e atrair novos clientes com anúncios no Google e no Meta.",
  caminho: "/servicos",
});

export default function Servicos() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Serviços", caminho: "/servicos" }]}
        titulo="Quatro serviços, na ordem do método"
        texto="Cada serviço depende do anterior. Por isso começamos pela gestão de processos e só avançamos quando o processo está pronto."
      />
      <Secao>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((s, i) => (
            <li key={s.slug} className="cartao flex flex-col">
              <p className="text-sm font-semibold text-dado">Serviço {i + 1}</p>
              <h2 className="titulo-3 mt-1 text-2xl">{s.nome}</h2>
              <p className="mt-2 text-mudo">{s.curto}</p>
              <p className="mt-3 flex-1 text-sm text-mudo">
                <strong className="text-tinta">A dor:</strong> {s.dor}
              </p>
              <Link href={`/servicos/${s.slug}`} className="alvo mt-4 inline-flex items-center font-semibold text-acao underline underline-offset-2">
                Ver detalhes<span className="sr-only">: {s.nome}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Secao>
      <ChamadaFinal
        titulo="Não sabe por onde começar?"
        texto="O diagnóstico gratuito indica o serviço certo para o momento da sua empresa."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="servicos_final"
      />
    </>
  );
}
