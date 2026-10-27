import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { CartaoArtigo, CartaoProduto, ChamadaFinal, JsonLd, Secao } from "@/components/Blocos";
import { DadoComFonte } from "@/components/DadoComFonte";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { Termo } from "@/components/Termo";
import { getTodosArtigos } from "@/lib/content";
import { faqCurto } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { demonstracaoLink, produtos, servicos, whatsappLink } from "@/lib/site";

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
    slug: "mesmo-erro-todo-mes",
  },
  {
    titulo: "Cada pessoa resolve a tarefa do seu jeito",
    texto: "O resultado depende de quem atendeu. O cliente percebe e a equipe também.",
    slug: "cada-pessoa-faz-do-seu-jeito",
  },
];

const desculpas = [
  {
    p: "“É coisa de empresa grande”",
    r: (
      <p>
        Quanto menor a equipe, mais caro sai cada improviso. Em uma empresa de 5 pessoas, um erro repetido consome uma parte grande do dia de todo mundo.{" "}
        <Link href="/conteudo/processo-e-coisa-de-empresa-grande" className="text-acao underline underline-offset-2">
          Leia o artigo completo
        </Link>
        .
      </p>
    ),
  },
  {
    p: "“Preciso de um sistema caro”",
    r: <p>O processo começa com papel ou planilha. O sistema vem depois, quando já está claro o que ele precisa fazer. Comprar o sistema antes é o jeito mais comum de pagar por algo que ninguém usa.</p>,
  },
  {
    p: "“Não tenho tempo”",
    r: <p>Quem não organiza vive apagando incêndio. O tempo que falta hoje é, em boa parte, o tempo gasto refazendo o que deu errado.</p>,
  },
];

export default function Home() {
  const artigos = getTodosArtigos();
  const recentes = artigos.slice(0, 3);
  const produto = produtos[0];

  return (
    <>
      <JsonLd dados={faqLd(faqCurto)} />

      {/* 1. Hero */}
      <section className="escuro bg-escuro text-sobre-escuro">
        <div className="pagina py-16 sm:py-24">
          <h1 className="titulo-1 max-w-4xl !text-sobre-escuro">
            Primeiro o processo. Depois a IA no seu WhatsApp.
          </h1>
          <p className="mt-6 max-w-leitura text-xl text-sobre-escuro/85">
            Para empresas que atendem clientes pelo WhatsApp: mapeamos como o atendimento acontece hoje, padronizamos o jeito de responder e só então automatizamos o que se repete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Botao href="/diagnostico" variante="claro" tamanho="grande" posicao="home_hero">
              Fazer o diagnóstico gratuito
            </Botao>
            <Botao href="/produtos/ws3-atendy" variante="contorno-claro" tamanho="grande" posicao="home_hero_produto">
              Conhecer o WS3 Atendy
            </Botao>
          </div>
        </div>
      </section>

      {/* 2. Problema em números */}
      <Secao
        id="problema"
        olho="O problema em números"
        titulo="Quanto menos estruturado o negócio, maior o risco"
        intro="Esta é a parcela de empresas que deixam de existir em até 5 anos, por porte."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <DadoComFonte valor="29%" legenda={<>dos <strong>MEIs</strong> fecham em até 5 anos.</>} fonte="Sebrae, pesquisa Sobrevivência de Empresas" data="2020" />
          <DadoComFonte valor="21,6%" legenda={<>das <strong>microempresas</strong> fecham em até 5 anos.</>} fonte="Sebrae, pesquisa Sobrevivência de Empresas" data="2020" />
          <DadoComFonte valor="17%" legenda={<>das <strong>pequenas empresas</strong> fecham em até 5 anos.</>} fonte="Sebrae, pesquisa Sobrevivência de Empresas" data="2020" />
        </div>
      </Secao>

      {/* 3. Três sinais */}
      <Secao id="sinais" fundo="suave" olho="Três sinais" titulo="Como saber se o seu atendimento precisa de processo">
        <ul className="grid gap-4 md:grid-cols-3">
          {sinais.map((s) => (
            <li key={s.slug} className="eleva relative flex flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao hover:shadow-md">
              <h3 className="text-xl font-bold">{s.titulo}</h3>
              <p className="mt-2 flex-1 text-mudo">{s.texto}</p>
              <Link href={`/conteudo/${s.slug}`} className="alvo mt-4 inline-flex items-center gap-1 font-semibold text-acao after:absolute after:inset-0 focus:outline-none">
                Ler o artigo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      {/* 4. Método */}
      <Secao id="metodo" olho="O método" titulo="Cinco passos, sempre nesta ordem" intro="A ordem importa. Automatizar uma bagunça só faz o erro acontecer mais rápido.">
        <FluxoMetodo />
        <p className="mt-10">
          <Link href="/metodo" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
            Entender o método em detalhe
          </Link>
        </p>
      </Secao>

      {/* 5. Serviços */}
      <Secao id="servicos" fundo="suave" olho="Serviços" titulo="Quatro frentes de trabalho">
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

      {/* 6. Produto em destaque */}
      <Secao id="produto" olho="Produto" titulo="WS3 Atendy: atendimento com IA no WhatsApp" intro={<>Reúne IA, <Termo nome="CRM">CRM</Termo> e automações para atender pelo WhatsApp. Você configura o que a IA responde e a equipe assume o que precisa de uma pessoa.</>}>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <CartaoProduto produto={produto} posicao="home_produto" />
          <ConversaExemplo />
        </div>
      </Secao>

      {/* 7. Desculpas */}
      <Secao id="desculpas" fundo="suave" olho="Desculpas que mantêm o caos" titulo="Três frases que adiam a organização">
        <div className="max-w-3xl">
          <Acordeao itens={desculpas} origem="home_desculpas" />
        </div>
      </Secao>

      {/* 8. Artigos */}
      <Secao id="artigos" olho="Conteúdo" titulo="Artigos recentes">
        <ul className="grid gap-4 md:grid-cols-3">
          {recentes.map((a) => (
            <li key={a.slug}>
              <CartaoArtigo artigo={a} />
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/conteudo" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
            Ver todos os artigos
          </Link>
        </p>
      </Secao>

      {/* 9. Citação externa. O bloco da equipe volta quando houver apresentação e foto reais. */}
      <Secao id="citacao" fundo="suave">
        <figure className="max-w-3xl">
          <blockquote className="titulo-3 text-2xl leading-snug sm:text-3xl">
            “O sintoma mais comum do caos é quando a empresa depende 100% do dono para funcionar. Se ele sai, a empresa para.”
          </blockquote>
          <figcaption className="mt-4 text-mudo">
            Marcelo Germano, consultor de gestão, no RCN67 (21/05/2026). Citação de um especialista de fora da WS3.
          </figcaption>
        </figure>
      </Secao>

      {/* 10. FAQ e CTA final */}
      <Secao id="faq" olho="Perguntas frequentes" titulo="O que costumam perguntar">
        <div className="max-w-3xl">
          <Acordeao itens={faqCurto.map((f) => ({ p: f.p, r: <p>{f.r}</p> }))} origem="home_faq" />
          <p className="mt-6">
            <Link href="/perguntas-frequentes" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
              Ver todas as perguntas
            </Link>
          </p>
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Descubra se o seu atendimento está pronto para automatizar"
        texto="Comece pelo diagnóstico gratuito: 5 perguntas e o resultado na hora. Depois, veja o WS3 Atendy funcionando numa demonstração de 30 minutos."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="home_final"
        extra={
          <Botao href={demonstracaoLink()} variante="contorno-claro" tamanho="grande" posicao="home_final_demonstracao">
            Agendar demonstração (30 min)
          </Botao>
        }
        rodape={
          <>
            Prefere conversar antes?{" "}
            <Botao href={whatsappLink()} variante="texto" posicao="home_final_whatsapp">
              Chame no WhatsApp
            </Botao>
          </>
        }
      />
    </>
  );
}
