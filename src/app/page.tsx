import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { ChamadaFinal, JsonLd, Secao } from "@/components/Blocos";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { Termo } from "@/components/Termo";
import { PreviaDiagnostico } from "@/components/PreviaDiagnostico";
import { faqCurto, type Pergunta } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { demonstracao, produtos, servicos, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Processo antes da IA no atendimento pelo WhatsApp",
  descricao:
    "A WS3 Systems ajuda pequenas e médias empresas que atendem pelo WhatsApp a organizar o atendimento antes de automatizar. Faça o diagnóstico gratuito.",
  caminho: "/",
});

const sinais = [
  {
    titulo: "O cliente chama no WhatsApp e fica esperando",
    texto: "As conversas se espalham entre celulares, ninguém sabe quem já respondeu e o retorno depende da memória de quem atendeu.",
    href: "/diagnostico",
    rotulo: "Fazer o diagnóstico",
  },
  {
    titulo: "O mesmo erro se repete todo mês",
    texto: "Cobrança duplicada, pedido esquecido, cliente sem resposta. Corrige-se na hora e o erro volta no mês seguinte.",
    href: "/conteudo/mesmo-erro-todo-mes",
    rotulo: "Ler o artigo",
  },
  {
    titulo: "Cada pessoa resolve a tarefa do seu jeito",
    texto: "O resultado depende de quem atendeu. O cliente percebe e a equipe também.",
    href: "/conteudo/cada-pessoa-faz-do-seu-jeito",
    rotulo: "Ler o artigo",
  },
];

const comoAtende = [
  { id: "ia", texto: <>A IA responde o que a sua empresa autorizou.</> },
  { id: "crm", texto: <>Contatos e conversas ficam registrados no <Termo nome="CRM">CRM</Termo>.</> },
  { id: "equipe", texto: <>A equipe assume o que precisa de uma pessoa.</> },
];

// As objeções mais comuns entram como perguntas, junto das frequentes.
const perguntasHome: Pergunta[] = [
  ...faqCurto,
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

      {/* 1. Hero */}
      <section className="escuro bg-escuro text-sobre-escuro">
        <div className="pagina grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <h1 className="titulo-1 max-w-4xl !text-sobre-escuro">
              Primeiro o processo. Depois a IA no seu WhatsApp.
            </h1>
            <p className="mt-6 max-w-leitura text-xl text-sobre-escuro/85">
              Para empresas que atendem clientes pelo WhatsApp: mapeamos como o atendimento acontece hoje, padronizamos o jeito de responder e só então automatizamos o que se repete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Botao href="/diagnostico" tamanho="grande" posicao="home_hero">
                Fazer o diagnóstico gratuito
              </Botao>
              <Botao href="#produto" variante="texto" posicao="home_hero_exemplo" className="text-sobre-escuro">
                Ver um exemplo de atendimento
              </Botao>
            </div>
            <p className="mt-4 text-sm text-sobre-escuro/80">5 perguntas, resultado na hora, sem cadastro.</p>
          </div>
          <PreviaDiagnostico />
        </div>
      </section>

      {/* 2. Três sinais */}
      <Secao id="sinais" fundo="suave" titulo="Como saber se o seu atendimento precisa de processo">
        <ul className="grid gap-4 md:grid-cols-3">
          {sinais.map((s) => (
            <li key={s.titulo} className="eleva relative flex flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao hover:shadow-md">
              <h3 className="text-xl font-bold">{s.titulo}</h3>
              <p className="mt-2 flex-1 text-mudo">{s.texto}</p>
              <Link href={s.href} className="alvo mt-4 inline-flex items-center gap-1 font-semibold text-acao after:absolute after:inset-0 focus:outline-none">
                {s.rotulo}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 3. Método, com o diagnóstico como primeiro passo */}
      <Secao id="metodo" titulo="Cinco passos, sempre nesta ordem" intro="A ordem importa. Automatizar uma bagunça só faz o erro acontecer mais rápido.">
        <FluxoMetodo />
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Botao href="/diagnostico" posicao="home_metodo_diagnostico">
            Descobrir em que passo você está
          </Botao>
          <Link href="/metodo" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
            Entender o método em detalhe
          </Link>
        </div>
      </Secao>

      {/* 4. Produto */}
      <Secao id="produto" fundo="suave" titulo="WS3 Atendy: atendimento com IA no WhatsApp">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="max-w-leitura text-lg text-mudo">{produto.descricao}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {comoAtende.map((item) => (
                <li key={item.id} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado" />
                  <span>{item.texto}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Botao href={demo.href} posicao="home_produto_demonstracao">
                {demo.rotulo}
              </Botao>
              <Botao href={produto.href} variante="secundario" posicao="home_produto_saiba">
                Conhecer o WS3 Atendy
              </Botao>
            </div>
            <p className="mt-4 text-sm text-mudo">Depois da demonstração, você pode testar o WS3 Atendy por 7 dias, gratuitamente.</p>
          </div>
          <ConversaExemplo />
        </div>
      </Secao>

      {/* 5. Serviços */}
      <Secao id="servicos" titulo="Quatro frentes de trabalho">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((s) => (
            <li key={s.slug} className="flex flex-col rounded-marca-lg border border-linha bg-superficie p-6">
              <h3 className="text-xl font-bold">{s.nome}</h3>
              <p className="mt-2 flex-1 text-mudo">{s.curto}</p>
              <Link href={`/servicos/${s.slug}`} className="alvo mt-4 inline-flex items-center font-semibold text-acao underline underline-offset-2">
                Ver como funciona<span className="sr-only">: {s.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 6. Perguntas e chamada final */}
      <Secao id="faq" fundo="suave" titulo="O que costumam perguntar">
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
          <Botao href={demo.href} variante="contorno-claro" tamanho="grande" posicao="home_final_demonstracao">
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
