import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { ChamadaFinal, JsonLd, Lista, Secao } from "@/components/Blocos";
import { FluxoAnuncioAtendimento, TextoTrafegoPago } from "@/components/AnuncioAtendimento";
import { CasosDeUso } from "@/components/CasosDeUso";
import { PalcoHero } from "@/components/PalcoHero";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { HubIntegracoes } from "@/components/HubIntegracoes";
import { perguntas, type Pergunta } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { demonstracao, servicos, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Processos, automação e IA para quem atende pelo WhatsApp",
  descricao:
    "A WS3 Systems organiza o atendimento, cuida dos anúncios e entrega a tecnologia certa, como o sistema WS3 Atendy, para pequenas empresas e profissionais autônomos. Faça o diagnóstico gratuito.",
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

// Quem lê precisa se reconhecer em poucos segundos: os dois perfis do público da WS3.
const publicos = [
  {
    id: "pme",
    titulo: "Pequenas e médias empresas",
    quem: "Donos e gestores com uma equipe que atende clientes pelo WhatsApp.",
    sinais: [
      "Várias pessoas atendem, cada uma do seu jeito.",
      "Os contatos ficam espalhados em celulares e planilhas.",
      "Os anúncios trazem mensagens, mas ninguém sabe quantas viraram venda.",
    ],
    ajuda: "Organizamos o processo, automatizamos o atendimento e acompanhamos os anúncios.",
    link: { href: "/servicos", rotulo: "Ver os serviços" },
  },
  {
    id: "autonomos",
    titulo: "Profissionais autônomos",
    quem: "MEIs e profissionais que atendem sozinhos, como consultórios, estúdios e prestadores de serviço.",
    sinais: [
      "Você responde tudo sozinho, inclusive à noite e no fim de semana.",
      "Cliente que demora a ser respondido pode procurar outro profissional.",
      "A agenda mora na memória ou num caderno.",
    ],
    ajuda: "Uma IA atende e agenda por você, e o follow-up lembra de quem ficou sem resposta.",
    link: { href: "/produtos/ws3-atendy", rotulo: "Conhecer o WS3 Atendy" },
  },
];

const perguntaPorTexto = (texto: string) => perguntas.find((q) => q.p === texto)!;

// Objeções do método e dúvidas do produto que mais pesam na decisão.
const perguntasHome: Pergunta[] = [
  perguntaPorTexto("O que a WS3 Systems faz?"),
  perguntaPorTexto("Por que organizar antes de automatizar?"),
  perguntaPorTexto("A IA vai substituir minha equipe?"),
  perguntaPorTexto("Vocês gerenciam anúncios?"),
  perguntaPorTexto("Como o WhatsApp é conectado?"),
  perguntaPorTexto("Posso enviar mensagens em massa pelo WhatsApp?"),
  perguntaPorTexto("Quanto custa?"),
  {
    grupo: "Método",
    p: "E se eu não tiver tempo para organizar?",
    r: "Você não para a operação. O trabalho começa por um processo só, normalmente o atendimento, em conversas curtas junto da rotina. E boa parte do tempo que falta hoje vai embora refazendo o que deu errado.",
  },
];

export default function Home() {
  const demo = demonstracao();

  return (
    <>
      <JsonLd dados={faqLd(perguntasHome)} />

      {/* 1. Hero: a dor primeiro, a conversa como prova */}
      <section className="escuro relative overflow-hidden bg-escuro text-sobre-escuro">
        <div aria-hidden="true" className="brilho pointer-events-none absolute inset-0" />
        <div className="pagina relative grid items-start gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16 lg:py-14">
          <div>
            <h1 className="titulo-1 max-w-3xl !text-sobre-escuro">
              Seu cliente chama no WhatsApp e fica <span className="destaque">esperando?</span>
            </h1>
            <p className="mt-6 max-w-leitura text-lg text-sobre-escuro/80 sm:text-xl">
              A WS3 Systems é uma agência de processos, automação, IA e tráfego pago para pequenas e médias empresas e profissionais autônomos. Primeiro organizamos o seu atendimento; depois entregamos a tecnologia certa, como o WS3 Atendy, o nosso sistema de atendimento com IA no WhatsApp.
            </p>
            <div className="mt-9">
              <Botao href="/diagnostico" tamanho="grande" posicao="home_hero" seta className="w-full sm:w-auto">
                Fazer o diagnóstico gratuito
              </Botao>
              <p className="mt-3 text-sm text-sobre-escuro/70">5 perguntas, resultado na hora, sem cadastro.</p>
            </div>
            <Botao href="#servicos" variante="texto" posicao="home_hero_servicos" className="mt-4 text-sobre-escuro/90">
              Ver o que fazemos
            </Botao>
          </div>

          <PalcoHero />
        </div>
      </section>

      {/* 2. Para quem é: o visitante se reconhece */}
      <Secao id="publico" fundo="suave" olho="Para quem é" titulo="Feito para quem atende pelo WhatsApp" intro="Se você atende clientes pelo WhatsApp, uma destas descrições provavelmente é a sua.">
        <div className="grid gap-4 md:grid-cols-2">
          {publicos.map((pb) => (
            <div key={pb.id} className="painel vivo flex flex-col p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight">{pb.titulo}</h3>
              <p className="texto-cartao mt-2 text-mudo">{pb.quem}</p>
              <p className="olho mt-6">Você se reconhece se</p>
              <div className="mt-3">
                <Lista itens={pb.sinais} />
              </div>
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <p>
                  <strong>Como ajudamos:</strong> <span className="text-mudo">{pb.ajuda}</span>
                </p>
                <Link href={pb.link.href} className="vivo-seta alvo mt-2 inline-flex items-center gap-2 font-semibold text-acao after:absolute after:inset-0 after:rounded-[1.5rem] focus:outline-none">
                  {pb.link.rotulo}
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Secao>

      {/* 3. Sinais e o teste de 3 perguntas */}
      <Secao id="sinais" olho="Três sinais" titulo="Como saber se o seu atendimento precisa de processo">
        <div className="painel brilho overflow-hidden">
          <ul className="grid divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
            {sinais.map((s) => (
              <li key={s.titulo} className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold">{s.titulo}</h3>
                <p className="texto-cartao mt-3 text-mudo">{s.texto}</p>
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

      {/* 4. Serviços: o que a agência faz */}
      <Secao id="servicos" olho="O que fazemos" titulo="Do processo à tecnologia, em quatro frentes" intro="Começamos pelo processo que mais pesa no seu atendimento e só depois automatizamos. Cada frente tem página própria, com o que entregamos e o que não fazemos.">
        <ul className="grid gap-4 md:grid-cols-2">
          {servicos.map((s) => (
            <li key={s.slug} className="painel vivo flex flex-col p-6 sm:p-7">
              <h3 className="text-xl font-semibold">{s.nome}</h3>
              <p className="texto-cartao mt-2 flex-1 text-mudo">{s.curto}</p>
              <Link
                href={`/servicos/${s.slug}`}
                className="vivo-seta alvo mt-5 inline-flex items-center gap-2 font-semibold text-acao after:absolute after:inset-0 after:rounded-[1.5rem] focus:outline-none"
              >
                Ver como funciona<span className="sr-only">: {s.nome}</span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 4b. Tráfego pago junto do atendimento */}
      <Secao id="trafego" fundo="suave">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <TextoTrafegoPago posicao="home" />
          <FluxoAnuncioAtendimento />
        </div>
      </Secao>

      {/* 5. Produto: um dos sistemas da WS3, nos quatro recursos que mais atraem */}
      <Secao id="produto" olho="Nosso sistema" titulo="WS3 Atendy: atendimento, agendamento, follow-up e disparos" intro="Um dos sistemas da WS3 Systems, feito para quem vende e atende pelo WhatsApp. A IA atende, e a sua equipe assume com um clique quando precisar.">
        <CasosDeUso />

        <p className="mt-10 max-w-3xl text-mudo">
          E ainda: <strong className="text-tinta">CRM com funil</strong>, base de conhecimento com os seus PDFs, relatórios e automações visuais, tudo no mesmo lugar.
        </p>

        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
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

      {/* 6. Integrações do WS3 Atendy */}
      <Secao id="integracoes" fundo="suave" olho="Integrações" titulo="O WS3 Atendy liga o que você já usa" intro="O cliente chama no WhatsApp, a agenda marca e a equipe é avisada, tudo no mesmo lugar.">
        <HubIntegracoes />
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-mudo">
          <li>Conecte o WhatsApp lendo um QR Code.</li>
          <li>Receba leads de formulários e anúncios.</li>
          <li>Importe a sua planilha de contatos.</li>
        </ul>
      </Secao>

      {/* 7. Perguntas: título à esquerda, painel azul à direita */}
      <section id="faq" aria-labelledby="faq-t" className="secao">
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
        texto="Comece pelo diagnóstico gratuito: 5 perguntas e o resultado na hora. Depois, converse com a gente numa demonstração de 30 minutos e veja o WS3 Atendy funcionando, com teste de 7 dias."
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
