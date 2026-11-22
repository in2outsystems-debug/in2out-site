import { ChamadaFinal, JsonLd, Lista, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { faqLd, pageMeta } from "@/lib/seo";
import { atendy, combos, configuracaoTrafego, verbaMinima, planosTrafego, reais, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Planos e preços: tráfego pago e WS3 Atendy",
  descricao: `Gestão de tráfego a partir de ${reais(planosTrafego[0].preco)}/mês, WS3 Atendy por ${reais(atendy.preco)}/mês e combos a partir de ${reais(combos[0].preco)}/mês. Sem letras miúdas.`,
  caminho: "/planos",
});

const faq = [
  { p: "A verba dos anúncios está inclusa?", r: "Não. A verba é paga direto ao Meta ou ao Google, no cartão da conta de anúncios da sua empresa. O valor do plano é só o nosso trabalho." },
  { p: "Quanto preciso investir em anúncios?", r: `A partir de ${reais(verbaMinima)} por mês, pagos direto ao Meta. Com menos que isso, os anúncios aparecem para pouca gente e a plataforma não junta dados suficientes para encontrar quem compra. Quanto mais você investe, mais contatos tende a receber.` },
  { p: "Vocês fazem os criativos?", r: "Como cortesia, nos planos Crescimento (até 8 por mês) e Performance (até 12): você envia as fotos e vídeos do seu negócio e nós montamos as peças. Não vendemos criativos separadamente nem fazemos sessões de foto ou gravações." },
  { p: "E no plano Essencial?", r: "No Essencial, você envia as peças prontas. Nós escrevemos os textos dos anúncios e mostramos quais peças funcionam." },
  { p: "Tem fidelidade?", r: "O contrato mínimo é de 3 meses, o tempo que as campanhas precisam para aprender e gerar dados confiáveis. Depois disso, segue mês a mês." },
  { p: "O que é a taxa de configuração?", r: `É a montagem inicial: acessos, rastreamento, públicos e primeiras campanhas. Custa ${reais(configuracaoTrafego)}, uma vez, e é isenta nos combos ou no contrato de 6 meses.` },
  { p: "Quanto custa a IA do WS3 Atendy?", r: "O consumo de IA é pago direto na conta OpenAI da sua empresa, conforme o uso, sem intermediário. Mostramos uma estimativa antes de ativar." },
  { p: "As contas ficam no meu nome?", r: "Sim. Contas de anúncio, páginas e dados são da sua empresa. Se o contrato terminar, tudo continua com você." },
];

function Preco({ valor }: { valor: number }) {
  return (
    <p className="mt-4">
      <span className="text-4xl font-semibold tracking-tight">{reais(valor)}</span>
      <span className="text-mudo">/mês</span>
    </p>
  );
}

export default function Planos() {
  return (
    <>
      <JsonLd dados={faqLd(faq)} />
      <TopoPagina
        migalhas={[{ nome: "Planos", caminho: "/planos" }]}
        olho="Planos e preços"
        titulo="O anúncio traz o cliente. O Atendy não deixa ele esperando."
        texto="Contrate o tráfego, o atendimento com IA ou os dois juntos, com desconto. Os preços estão aqui, sem precisar pedir orçamento."
      >
        <Botao href="#combos" tamanho="grande" posicao="planos_topo" seta className="w-full sm:w-auto">
          Ver os combos
        </Botao>
      </TopoPagina>

      <Secao id="trafego" olho="Gestão de tráfego pago" titulo="Planos de tráfego" intro="Campanhas no Instagram e no Facebook (e no Google, no Performance), com textos, briefing de criativos e relatório.">
        <div className="grid gap-4 lg:grid-cols-3">
          {planosTrafego.map((p) => (
            <div key={p.nome} className={`painel flex flex-col p-6 sm:p-8 ${p.destaque ? "ring-2 ring-acao" : ""}`}>
              {p.destaque && <p className="olho">Mais escolhido</p>}
              <h3 className="titulo-3 mt-1">{p.nome}</h3>
              <p className="texto-cartao mt-2 text-mudo">{p.resumo}</p>
              <Preco valor={p.preco} />
              <div className="mt-6 flex-1">
                <Lista itens={p.itens} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-acao-forte/30 bg-acao-forte/[0.06] p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <p className="flex-shrink-0 text-lg">
            <strong>Investimento em anúncios:</strong> a partir de <strong className="text-acao-forte">{reais(verbaMinima)}/mês</strong>
          </p>
          <p className="text-sm text-mudo">
            Valor separado do plano, pago direto ao Meta (ou ao Google) no cartão da sua empresa. Cada plano indica o investimento recomendado. Com menos que isso, os anúncios alcançam pouca gente e não dá para ter bons resultados.
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-sm text-mudo">
          Configuração inicial de {reais(configuracaoTrafego)}, isenta nos combos ou no contrato de 6 meses. Contrato mínimo de 3 meses. Criativos de cortesia no Crescimento e no Performance, a partir das fotos e vídeos que a sua empresa envia.
        </p>
      </Secao>

      <Secao id="criativos" fundo="suave" olho="Cortesia" titulo="Criativos de cortesia a partir do Crescimento" intro="Nos planos Crescimento e Performance, e nos combos com eles, nós montamos as peças dos anúncios sem custo extra.">
        <div className="painel grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
          <Lista
            itens={[
              "Você envia fotos e vídeos do seu negócio, do celular mesmo",
              "Nós montamos as artes e os vídeos curtos para os anúncios",
              "Formatos para feed, stories e reels",
              "Até 8 criativos por mês no Crescimento e até 12 no Performance",
            ]}
          />
          <div className="text-mudo">
            <p>Não fazemos sessões de foto nem gravações: o material bruto vem da sua empresa.</p>
            <p className="mt-4">
              <strong className="text-tinta">No Essencial</strong>, você envia as peças prontas, e nós escrevemos os textos e mostramos quais funcionam.
            </p>
          </div>
        </div>
      </Secao>

      <Secao id="atendy" olho="WS3 Atendy" titulo="Atendimento com IA no WhatsApp">
        <div className="painel grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h3 className="titulo-3">WS3 Atendy</h3>
            <Preco valor={atendy.preco} />
            <p className="mt-2 text-mudo">Implantação de {reais(atendy.implantacao)}, isenta nos combos.</p>
            <p className="mt-2 text-mudo">{atendy.testeDias} dias de teste grátis.</p>
            <Botao href="/produtos/ws3-atendy" variante="secundario" posicao="planos_atendy" className="mt-6">
              Conhecer o WS3 Atendy
            </Botao>
          </div>
          <Lista
            itens={[
              "Todo o WhatsApp da empresa em uma caixa de entrada",
              "IA que responde na hora e passa para a equipe quando precisa",
              "CRM com funil de vendas e etiquetas",
              "Agendamentos com o Google Agenda",
              "Follow-up automático para quem não respondeu",
              "Implantação feita pela WS3: conexão, treinamento da IA e funil",
            ]}
          />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-mudo">
          O WhatsApp é conectado por QR Code, pelo seu próprio número. O consumo de IA é pago direto na conta OpenAI da sua empresa, conforme o uso.
        </p>
      </Secao>

      <Secao id="combos" fundo="suave" olho="Tráfego + Atendy" titulo="Combos: o caminho completo, com desconto" intro={`Implantação do Atendy e configuração do tráfego isentas. Criativos de cortesia nos combos Crescimento e Performance.`}>
        <div className="grid gap-4 lg:grid-cols-3">
          {combos.map((c) => (
            <div key={c.nome} className={`painel flex flex-col p-6 sm:p-8 ${c.destaque ? "ring-2 ring-acao" : ""}`}>
              {c.destaque && <p className="olho">Recomendado</p>}
              <h3 className="titulo-3 mt-1">{c.nome}</h3>
              <Preco valor={c.preco} />
              <p className="mt-2 flex-1 text-mudo">Economia de {reais(c.economia)}/mês, mais {reais(configuracaoTrafego + atendy.implantacao)} de taxas isentas.</p>
              <Botao
                href={whatsappLink(`Olá! Vim pelo site da WS3 Systems e quero saber mais sobre o combo ${c.nome}.`)}
                variante={c.destaque ? "primario" : "secundario"}
                posicao="planos_combo"
                className="mt-6 w-full"
              >
                Quero este combo
              </Botao>
            </div>
          ))}
        </div>
      </Secao>

      <Secao id="faq" olho="Antes de contratar" titulo="Dúvidas sobre os planos">
        <div className="grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2">
          {faq.map((f) => (
            <div key={f.p} className="border-t border-white/[0.12] pt-5">
              <h3 className="font-semibold">{f.p}</h3>
              <p className="mt-2 text-mudo">{f.r}</p>
            </div>
          ))}
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Não sabe qual plano escolher?"
        texto="Faça o diagnóstico gratuito ou chame no WhatsApp. Indicamos o plano certo para o momento da sua empresa."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="planos_final"
      />
    </>
  );
}
