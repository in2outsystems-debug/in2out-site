import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { ChamadaFinal, JsonLd, Secao } from "@/components/Blocos";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { Termo } from "@/components/Termo";
import { PreviaDiagnostico } from "@/components/PreviaDiagnostico";
import { perguntas, type Pergunta } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { demonstracao, produtos, servicos, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Atendimento com IA no WhatsApp, com o processo em ordem",
  descricao:
    "O WS3 Atendy junta atendimento, CRM, IA e automação no WhatsApp. Antes de ligar a IA, a WS3 organiza o seu atendimento. Faça o diagnóstico gratuito.",
  caminho: "/",
});

const sinais = [
  {
    titulo: "O cliente chama no WhatsApp e fica esperando",
    texto: "As conversas se espalham entre celulares, ninguém sabe quem já respondeu e o retorno depende da memória de quem atendeu.",
  },
  {
    titulo: "O mesmo erro se repete todo mês",
    texto: "Pedido esquecido, orçamento sem retorno, cliente sem resposta. A equipe corrige na hora e o erro volta no mês seguinte.",
  },
  {
    titulo: "Cada pessoa resolve a tarefa do seu jeito",
    texto: "O resultado depende de quem atendeu. O cliente percebe e a equipe também.",
  },
];

// O que o WS3 Atendy faz, conforme o guia de funcionalidades da plataforma.
const recursos = [
  { id: "caixa", texto: <>Todo o WhatsApp da empresa numa caixa de entrada só.</> },
  { id: "agentes", texto: <>Agentes de IA que atendem, qualificam e agendam, a qualquer hora.</> },
  { id: "limites", texto: <>Você define os limites. A IA sabe a hora de chamar uma pessoa.</> },
  { id: "crm", texto: <>Funil de vendas no <Termo nome="CRM">CRM</Termo>, com cada conversa ligada ao cliente.</> },
  { id: "agenda", texto: <>Agenda sincronizada com o Google e lembretes que reduzem faltas.</> },
  { id: "followup", texto: <>Follow-up automático: ninguém fica sem retorno.</> },
];

const jornada = [
  "O cliente chama no WhatsApp, a qualquer hora.",
  "O agente de IA responde em segundos, entende o pedido e anota os dados.",
  "Consulta a agenda, oferece horários e marca, com link do Google Meet se for online.",
  "Move o cliente no funil e programa a confirmação para o dia anterior.",
  "Quando o assunto pede uma pessoa, passa para a equipe com todo o histórico.",
];

const perguntaPorTexto = (texto: string) => perguntas.find((q) => q.p === texto)!;

// Objeções do método e dúvidas do produto que mais pesam na decisão.
const perguntasHome: Pergunta[] = [
  perguntaPorTexto("Por que organizar antes de automatizar?"),
  perguntaPorTexto("A IA vai substituir minha equipe?"),
  perguntaPorTexto("Como o WhatsApp é conectado?"),
  perguntaPorTexto("Quanto custa?"),
  {
    grupo: "Método",
    p: "E se eu não tiver tempo para organizar?",
    r: "Você não para a operação. O trabalho começa por um processo só, normalmente o atendimento, em conversas curtas junto da rotina. E boa parte do tempo que falta hoje vai embora refazendo o que deu errado.",
  },
];

export default function Home() {
  const produto = produtos[0];
  const demo = demonstracao();

  return (
    <>
      <JsonLd dados={faqLd(perguntasHome)} />

      {/* 1. Hero: a dor primeiro, o método como resposta */}
      <section className="escuro bg-escuro text-sobre-escuro">
        <div className="pagina grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
          <div>
            <h1 className="titulo-1 max-w-3xl !text-sobre-escuro">Seu cliente chama no WhatsApp e fica esperando?</h1>
            <p className="mt-6 max-w-leitura text-lg text-sobre-escuro/85 sm:text-xl">
              O WS3 Atendy junta atendimento, CRM, IA e automação numa operação só. E antes de ligar a IA, organizamos o seu atendimento, para ela repetir o jeito certo de responder, e não a bagunça.
            </p>
            <div className="mt-8">
              <Botao href="/diagnostico" tamanho="grande" posicao="home_hero" className="w-full sm:w-auto">
                Fazer o diagnóstico gratuito
              </Botao>
              <p className="mt-3 text-sm text-sobre-escuro/80">5 perguntas, resultado na hora, sem cadastro.</p>
            </div>
            <Botao href="#produto" variante="texto" posicao="home_hero_produto" className="mt-4 text-sobre-escuro">
              Ver o que o WS3 Atendy faz
            </Botao>
          </div>
          <ConversaExemplo compacta />
        </div>
      </section>

      {/* 2. Três sinais e o teste de 3 perguntas */}
      <Secao id="sinais" fundo="suave" olho="Três sinais" titulo="Como saber se o seu atendimento precisa de processo">
        <ul className="grid gap-4 md:grid-cols-3">
          {sinais.map((s) => (
            <li key={s.titulo} className="rounded-marca-lg border border-linha bg-superficie p-6">
              <h3 className="text-xl font-bold">{s.titulo}</h3>
              <p className="mt-2 text-mudo">{s.texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
          <div>
            <h3 className="titulo-3 text-2xl">Antes de automatizar, três perguntas</h3>
            <p className="mt-3 max-w-leitura text-lg text-mudo">
              Se o seu atendimento ainda não tem um jeito definido, seguido e medido, a IA só vai repetir o improviso mais rápido. O diagnóstico mostra em que ponto você está e o que fazer primeiro.
            </p>
          </div>
          <PreviaDiagnostico />
        </div>
      </Secao>

      {/* 3. Método */}
      <Secao id="metodo" olho="O método" titulo="Cinco passos, sempre nesta ordem" intro="A ordem importa. Automatizar uma bagunça só faz o erro acontecer mais rápido.">
        <FluxoMetodo />
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Botao href="/diagnostico" posicao="home_metodo_diagnostico">
            Fazer o diagnóstico gratuito
          </Botao>
          <Link href="/metodo" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
            Entender o método em detalhe
          </Link>
        </div>
      </Secao>

      {/* 4. Produto: o que faz e como funciona na prática */}
      <Secao id="produto" fundo="suave" olho="Produto em destaque" titulo="WS3 Atendy: atendimento, CRM, IA e automação numa operação só">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="max-w-leitura text-lg text-mudo">Feito para quem vende e atende pelo WhatsApp. A IA atende, e a sua equipe assume com um clique quando precisar.</p>
            <ul className="mt-6 flex flex-col gap-3">
              {recursos.map((item) => (
                <li key={item.id} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado" />
                  <span>{item.texto}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Botao href={demo.href} posicao="home_produto_demonstracao">
                {demo.rotulo}
              </Botao>
              <Botao href={produto.href} variante="texto" posicao="home_produto_saiba" className="text-acao">
                Conhecer o WS3 Atendy
              </Botao>
            </div>
            <p className="mt-6 flex items-baseline gap-3 rounded-marca border border-linha bg-superficie px-4 py-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado" />
              <span>
                <strong>Teste gratuito de 7 dias</strong> <span className="text-mudo">depois da demonstração, para ver funcionando no seu WhatsApp.</span>
              </span>
            </p>
          </div>
          <div className="rounded-marca-lg border border-linha bg-superficie p-6">
            <h3 className="titulo-3">Do primeiro “oi” ao horário marcado</h3>
            <ol className="mt-5 flex flex-col gap-4">
              {jornada.map((passo, i) => (
                <li key={passo} className="flex gap-4">
                  <span aria-hidden="true" className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-acao/25 text-sm font-semibold tabular-nums text-tinta">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{passo}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Secao>

      {/* 5. Serviços, em formato compacto */}
      <Secao id="servicos" olho="Serviços" titulo="Quatro frentes de trabalho">
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {servicos.map((s) => (
            <li key={s.slug} className="border-t border-linha pt-5">
              <Link href={`/servicos/${s.slug}`} className="alvo inline-flex items-center text-lg font-semibold text-acao underline-offset-2 hover:underline">
                {s.nome}
              </Link>
              <p className="mt-1 text-mudo">{s.curto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 6. Perguntas e chamada final */}
      <Secao id="faq" fundo="suave" olho="Perguntas frequentes" titulo="O que costumam perguntar">
        <div className="max-w-3xl">
          <Acordeao itens={perguntasHome.map((f) => ({ p: f.p, r: <p>{f.r}</p> }))} origem="home_faq" />
          <p className="mt-6">
            <Link href="/perguntas-frequentes" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
              Ver todas as perguntas
            </Link>
          </p>
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Descubra se o seu atendimento está pronto para automatizar"
        texto="Comece pelo diagnóstico gratuito: 5 perguntas e o resultado na hora. Depois, veja o WS3 Atendy funcionando numa demonstração de 30 minutos e teste por 7 dias."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="home_final"
        extra={
          <Botao href={demo.href} variante="contorno-claro" tamanho="grande" posicao="home_final_demonstracao" className="w-full sm:w-auto">
            {demo.rotulo}
          </Botao>
        }
        rodape={
          // Sem agenda, a demonstração já abre o WhatsApp: a linha seria uma segunda porta para o mesmo lugar.
          !demo.viaWhatsapp && (
            <>
              Prefere conversar antes?{" "}
              <Botao href={whatsappLink()} variante="texto" posicao="home_final_whatsapp">
                Chame no WhatsApp
              </Botao>
            </>
          )
        }
      />
    </>
  );
}
