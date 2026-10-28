import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { ChamadaFinal, JsonLd, Secao } from "@/components/Blocos";
import { CasosDeUso } from "@/components/CasosDeUso";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { HubIntegracoes } from "@/components/HubIntegracoes";
import { Termo } from "@/components/Termo";
import { perguntas, type Pergunta } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { demonstracao, servicos, whatsappLink } from "@/lib/site";

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
    titulo: "Cada pessoa resolve do seu jeito",
    texto: "O resultado depende de quem atendeu. O cliente percebe e a equipe também.",
  },
];

const testeDe3 = ["Existe um processo definido?", "Ele está padronizado?", "Alguém mede o resultado?"];

// O que o WS3 Atendy faz, conforme o guia de funcionalidades da plataforma.
const recursos = [
  { id: "caixa", titulo: "Uma caixa de entrada só", texto: <>Todo o WhatsApp da empresa num lugar, com o histórico do cliente ao lado de cada conversa.</> },
  { id: "agentes", titulo: "Agentes de IA que executam", texto: <>Atendem, qualificam e agendam, a qualquer hora, treinados com os seus PDFs, o seu tom de voz e as suas regras.</> },
  { id: "limites", titulo: "Você define os limites", texto: <>A IA sabe a hora de chamar uma pessoa. A equipe assume com um clique e devolve para a IA depois.</> },
  { id: "crm", titulo: "Funil de vendas", texto: <>Cada conversa ligada a um lead no <Termo nome="CRM">CRM</Termo>, com tarefas e mensagens agendadas.</> },
  { id: "agenda", titulo: "Agenda e lembretes", texto: <>Sincronizada com o Google Agenda, com confirmação e lembrete automáticos para reduzir faltas.</> },
  { id: "followup", titulo: "Follow-up que não esquece ninguém", texto: <>Sequências por etapa do funil e campanhas segmentadas, no horário certo.</> },
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

const pilula =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-escuro/80 px-3.5 py-2 text-sm font-semibold shadow-lg backdrop-blur-md";

export default function Home() {
  const demo = demonstracao();

  return (
    <>
      <JsonLd dados={faqLd(perguntasHome)} />

      {/* 1. Hero: a dor primeiro, a conversa como prova */}
      <section className="escuro relative overflow-hidden bg-escuro text-sobre-escuro">
        <div aria-hidden="true" className="brilho pointer-events-none absolute inset-0" />
        <div className="pagina relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16 lg:py-28">
          <div>
            <h1 className="titulo-1 max-w-3xl !text-sobre-escuro">
              Seu cliente chama no WhatsApp e fica <span className="destaque">esperando?</span>
            </h1>
            <p className="mt-6 max-w-leitura text-lg text-sobre-escuro/80 sm:text-xl">
              O WS3 Atendy junta atendimento, CRM, IA e automação numa operação só. E antes de ligar a IA, organizamos o seu atendimento, para ela repetir o jeito certo de responder, e não a bagunça.
            </p>
            <div className="mt-9">
              <Botao href="/diagnostico" tamanho="grande" posicao="home_hero" seta className="w-full sm:w-auto">
                Fazer o diagnóstico gratuito
              </Botao>
              <p className="mt-3 text-sm text-sobre-escuro/70">5 perguntas, resultado na hora, sem cadastro.</p>
            </div>
            <Botao href="#produto" variante="texto" posicao="home_hero_produto" className="mt-4 text-sobre-escuro/90">
              Ver o que o WS3 Atendy faz
            </Botao>
          </div>

          <div className="relative">
            <ConversaExemplo compacta />
            {/* Etiquetas de status: flutuam sobre a conversa no desktop e vão para baixo no celular */}
            <div className="mt-4 flex flex-wrap gap-2 lg:mt-0">
              <span className={`${pilula} lg:absolute lg:-left-8 lg:-top-5`}>
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-dado" />
                IA atendendo
              </span>
              <span className={`${pilula} lg:absolute lg:-right-4 lg:bottom-32`}>
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-acao" />
                Com a equipe
              </span>
              <span className={`${pilula} lg:absolute lg:-left-6 lg:-bottom-5`}>
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ok" />
                Agendado
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sinais e o teste de 3 perguntas */}
      <Secao id="sinais" olho="Três sinais" titulo="Como saber se o seu atendimento precisa de processo">
        <div className="painel brilho overflow-hidden">
          <ul className="grid divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
            {sinais.map((s) => (
              <li key={s.titulo} className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold">{s.titulo}</h3>
                <p className="mt-3 text-mudo">{s.texto}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5 border-t border-white/[0.08] px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-semibold">Antes de automatizar, três perguntas</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {testeDe3.map((p) => (
                  <li key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-sobre-escuro/90">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <Botao href="/diagnostico" posicao="home_sinais_diagnostico" seta className="w-full lg:w-auto">
              Fazer o diagnóstico gratuito
            </Botao>
          </div>
        </div>
      </Secao>

      {/* 3. Método */}
      <Secao id="metodo" fundo="suave" olho="O método" titulo="Cinco passos, sempre nesta ordem" intro="A ordem importa. Automatizar uma bagunça só faz o erro acontecer mais rápido.">
        <FluxoMetodo />
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/metodo" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
            Entender o método em detalhe
          </Link>
        </div>
      </Secao>

      {/* 4. Produto: três casos de uso e o que ele faz */}
      <Secao id="produto" olho="Produto em destaque" titulo="WS3 Atendy: atendimento, CRM, IA e automação numa operação só" intro="Feito para quem vende e atende pelo WhatsApp. A IA atende, e a sua equipe assume com um clique quando precisar.">
        <CasosDeUso />

        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {recursos.map((r) => (
            <li key={r.id} className="border-t border-white/[0.12] pt-5">
              <h3 className="text-lg font-semibold">{r.titulo}</h3>
              <p className="mt-2 text-mudo">{r.texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <p className="max-w-2xl text-lg">
            <strong>Teste gratuito de 7 dias</strong>{" "}
            <span className="text-mudo">depois da demonstração de 30 minutos, para ver funcionando no seu WhatsApp.</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Botao href={demo.href} variante="secundario" posicao="home_produto_demonstracao">
              {demo.rotulo}
            </Botao>
            <Botao href="/produtos/ws3-atendy" variante="texto" posicao="home_produto_saiba" className="text-acao">
              Conhecer o WS3 Atendy
            </Botao>
          </div>
        </div>
      </Secao>

      {/* 5. Integrações */}
      <Secao id="integracoes" fundo="suave" olho="Integrações" titulo="Seu WhatsApp, sua agenda e sua equipe no mesmo lugar" intro="O Atendy liga o que você já usa: o cliente chama, a agenda marca, a equipe é avisada.">
        <HubIntegracoes />
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-mudo">
          <li>Conecte o WhatsApp lendo um QR Code.</li>
          <li>Receba leads de formulários e anúncios.</li>
          <li>Importe a sua planilha de contatos.</li>
        </ul>
      </Secao>

      {/* 6. Serviços, em formato compacto */}
      <Secao id="servicos" olho="Serviços" titulo="Quatro frentes de trabalho">
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {servicos.map((s) => (
            <li key={s.slug} className="border-t border-white/[0.12] pt-5">
              <Link href={`/servicos/${s.slug}`} className="alvo inline-flex items-center text-lg font-semibold text-acao underline-offset-2 hover:underline">
                {s.nome}
              </Link>
              <p className="mt-1 text-mudo">{s.curto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 7. Perguntas: título à esquerda, painel azul à direita */}
      <section id="faq" aria-labelledby="faq-t" className="secao bg-suave">
        <div className="pagina grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="olho">Perguntas frequentes</p>
            <h2 id="faq-t" className="titulo-2 mt-2">
              O que costumam perguntar
            </h2>
            <p className="mt-4 text-mudo">
              Não achou a sua dúvida?{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-tinta underline underline-offset-2">
                Fale com a gente<span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
            <Link href="/perguntas-frequentes" className="alvo mt-2 inline-flex items-center font-semibold text-acao underline underline-offset-2">
              Ver todas as perguntas
            </Link>
          </div>
          <div className="brilho overflow-hidden rounded-[2rem] border border-white/10 bg-profundo px-6 py-2 sm:px-9">
            <Acordeao solto itens={perguntasHome.map((f) => ({ p: f.p, r: <p>{f.r}</p> }))} origem="home_faq" />
          </div>
        </div>
      </section>

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
