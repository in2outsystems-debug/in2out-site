import Link from "next/link";
import { ChamadaFinal, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { Sequencia } from "@/components/Composicoes";
import { pageMeta } from "@/lib/seo";
import { servicos } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Serviços: tráfego pago, gestão de processos e WS3 Atendy",
  descricao: "Comece por tráfego pago e gestão de processos: os anúncios trazem o cliente e o atendimento é organizado desde o início. Depois, o WS3 Atendy, software de gestão comercial com IA no WhatsApp. Automação e IA aplicada, sob medida.",
  caminho: "/servicos",
});

export default function Servicos() {
  const etapa1 = servicos.filter((s) => !s.sobMedida);
  const sobMedida = servicos.filter((s) => s.sobMedida);

  const item = (nome: string, texto: string, dor: string, href: string) => ({
    titulo: nome,
    texto,
    extra: (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <p className="max-w-leitura text-sm text-mudo">
          <strong className="text-tinta">A dor:</strong> {dor}
        </p>
        <Link href={href} className="alvo inline-flex flex-shrink-0 items-center font-semibold text-acao underline underline-offset-2">
          Ver como funciona<span className="sr-only">: {nome}</span>
        </Link>
      </div>
    ),
  });

  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Serviços", caminho: "/servicos" }]}
        olho="Serviços"
        titulo="Comece por tráfego e processos. Depois, o WS3 Atendy."
        texto="Primeiro degrau: os anúncios trazem o cliente e o atendimento é organizado desde o início. Segundo degrau: o WS3 Atendy, o software de gestão comercial com IA no WhatsApp."
      >
        <Botao href="/diagnostico" tamanho="grande" posicao="servicos_topo" seta className="w-full sm:w-auto">
          Fazer o diagnóstico gratuito
        </Botao>
      </TopoPagina>

      <Secao id="ordem" olho="Em dois degraus" titulo="Por onde começar e o que vem depois">
        <Sequencia
          itens={[
            ...etapa1.map((s) => item(s.nome, s.curto, s.dor, `/servicos/${s.slug}`)),
            item(
              "WS3 Atendy",
              "O software de gestão comercial da WS3: IA que atende no WhatsApp, CRM, agendamento e follow-up. R$ 397 por mês, com 7 dias de teste.",
              "Conversas espalhadas, retornos que dependem da memória de quem atendeu e solicitações esquecidas.",
              "/produtos/ws3-atendy",
            ),
          ]}
        />
      </Secao>

      <Secao id="sob-medida" fundo="suave" olho="Sob medida" titulo="Depois do WS3 Atendy, o que a sua empresa precisar" intro="Quando o Atendy já está rodando e o seu caso pede algo a mais, montamos sob medida.">
        <ul className="grid gap-4 md:grid-cols-2">
          {sobMedida.map((s) => (
            <li key={s.slug} className="painel vivo flex flex-col p-6 sm:p-7">
              <h3 className="text-xl font-semibold">{s.nome}</h3>
              <p className="texto-cartao mt-2 flex-1 text-mudo">{s.curto}</p>
              <Link href={`/servicos/${s.slug}`} className="vivo-seta alvo mt-5 inline-flex items-center gap-2 font-semibold text-acao after:absolute after:inset-0 after:rounded-[1.5rem] focus:outline-none">
                Ver como funciona<span className="sr-only">: {s.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
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
