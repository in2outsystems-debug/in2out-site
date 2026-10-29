import Link from "next/link";
import { ChamadaFinal, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { Sequencia } from "@/components/Composicoes";
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
        olho="Serviços"
        titulo="Do processo à tecnologia, em quatro serviços"
        texto="Cada serviço depende do anterior. Por isso começamos pela gestão de processos e só avançamos quando o processo está pronto."
      >
        <Botao href="/diagnostico" tamanho="grande" posicao="servicos_topo" seta className="w-full sm:w-auto">
          Fazer o diagnóstico gratuito
        </Botao>
      </TopoPagina>

      <Secao id="ordem" olho="Na ordem do método" titulo="Por onde começar e o que vem depois">
        <Sequencia
          itens={servicos.map((s) => ({
            titulo: s.nome,
            texto: s.curto,
            extra: (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <p className="max-w-leitura text-sm text-mudo">
                  <strong className="text-tinta">A dor:</strong> {s.dor}
                </p>
                <Link href={`/servicos/${s.slug}`} className="alvo inline-flex flex-shrink-0 items-center font-semibold text-acao underline underline-offset-2">
                  Ver como funciona<span className="sr-only">: {s.nome}</span>
                </Link>
              </div>
            ),
          }))}
        />
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
