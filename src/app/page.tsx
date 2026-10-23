import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { Botao } from "@/components/Botao";
import { CartaoArtigo, CartaoProduto, ChamadaFinal, JsonLd, Secao } from "@/components/Blocos";
import { DadoComFonte } from "@/components/DadoComFonte";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { CapturaTela } from "@/components/CapturaTela";
import { Placeholder } from "@/components/Placeholder";
import { Termo } from "@/components/Termo";
import { getTodosArtigos } from "@/lib/content";
import { faqCurto } from "@/lib/faq";
import { pageMeta, faqLd } from "@/lib/seo";
import { produtos, servicos, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Organize o processo. Automatize o que faz sentido. Use IA onde ela ajuda de verdade.",
  descricao:
    "A WS3 Systems ajuda micro e pequenas empresas a mapear, padronizar, medir e só então automatizar. Faça o diagnóstico gratuito.",
  caminho: "/",
});

const sinais = [
  {
    titulo: "A margem some sem explicação",
    texto: "Vende, entra dinheiro, e no fim do mês sobra menos do que deveria. Ninguém sabe dizer onde foi parar.",
    slug: "margem-some-sem-explicacao",
  },
  {
    titulo: "O mesmo erro se repete todo mês",
    texto: "Cobrança duplicada, pedido esquecido, cliente sem resposta. Corrige-se na hora e o erro volta no mês seguinte.",
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
          <p className="olho">Para empresas que querem escalar</p>
          <h1 className="titulo-1 mt-3 max-w-4xl !text-sobre-escuro">
            Organize o processo. Automatize o que faz sentido. Use IA onde ela ajuda de verdade.
          </h1>
          <p className="mt-6 max-w-leitura text-xl text-sobre-escuro/85">
            Crescer com a casa em ordem: primeiro entender como o trabalho acontece, depois passar para a máquina o que se repete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Botao href="/diagnostico" variante="claro" tamanho="grande" posicao="home_hero">
              Fazer o diagnóstico gratuito
            </Botao>
            <Botao href="/produtos/raiptor-atende" variante="contorno-claro" tamanho="grande" posicao="home_hero_produto">
              Conhecer o rAIptor Atende
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
      <Secao id="sinais" fundo="suave" olho="Três sinais" titulo="Como saber se o seu processo precisa de atenção">
        <ul className="grid gap-4 md:grid-cols-3">
          {sinais.map((s) => (
            <li key={s.slug} className="relative flex flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao hover:shadow-md">
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
      <Secao id="servicos" fundo="suave" olho="Serviços" titulo="Três frentes de trabalho">
        <ul className="grid gap-4 md:grid-cols-3">
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
      <Secao id="produto" olho="Produto em destaque" titulo="rAIptor Atende" intro={<>Reúne IA, <Termo nome="CRM">CRM</Termo> e automações para atender pelo WhatsApp. Você configura o que a IA responde e a equipe assume o que precisa de uma pessoa.</>}>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <CartaoProduto produto={produto} posicao="home_produto" />
          <CapturaTela src="/img/raiptor-painel.png" alt="Painel do rAIptor Atende com faturamento, conversão, novos leads, gráfico de desempenho e funil de conversão." largura={1917} altura={771} />
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

      {/* 9. Autoridade */}
      <Secao id="autoridade" fundo="suave" olho="Quem está por trás">
        <div className="grid gap-8 lg:grid-cols-2">
          <figure className="rounded-marca-lg border-l-4 border-dado bg-superficie p-6">
            <blockquote className="text-2xl font-semibold leading-snug">
              “O sintoma mais comum do caos é quando a empresa depende 100% do dono para funcionar. Se ele sai, a empresa para.”
            </blockquote>
            <figcaption className="mt-4 text-mudo">
              Marcelo Germano, consultor de gestão. RCN67, 21/05/2026.
            </figcaption>
          </figure>
          <div className="flex gap-5">
            <div className="w-32 flex-shrink-0">
              <Placeholder rotulo="Foto da equipe [inserir]" proporcao="aspect-square" />
            </div>
            <div>
              <h3 className="text-xl font-bold">A equipe da WS3</h3>
              <p className="mt-2 text-mudo">[inserir apresentação: quem são as pessoas, experiência e por que criaram a WS3]</p>
              <Link href="/sobre" className="alvo mt-2 inline-flex items-center font-semibold text-acao underline underline-offset-2">
                Conhecer a WS3
              </Link>
            </div>
          </div>
        </div>
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
        titulo="Descubra se o seu processo está pronto para automatizar"
        texto="O diagnóstico é gratuito e leva poucas perguntas. Se preferir conversar, chame no WhatsApp."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="home_final"
        extra={
          <Botao href={whatsappLink()} variante="contorno-claro" tamanho="grande" posicao="home_final_whatsapp">
            Falar no WhatsApp
          </Botao>
        }
      />
    </>
  );
}
