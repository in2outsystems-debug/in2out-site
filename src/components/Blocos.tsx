import Link from "next/link";
import type { ReactNode } from "react";
import type { Artigo } from "@/lib/content";
import { formatarData } from "@/lib/content";
import { breadcrumbLd } from "@/lib/seo";
import type { Produto } from "@/lib/site";
import { Botao } from "./Botao";

export function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo gerado por nós (sem entrada de usuário); "<" escapado por segurança.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}

export function Migalhas({ itens }: { itens: { nome: string; caminho: string }[] }) {
  const todos = [{ nome: "Início", caminho: "/" }, ...itens];
  return (
    <>
      <JsonLd dados={breadcrumbLd(todos)} />
      <nav aria-label="Você está em" className="text-sm text-mudo">
        <ol className="flex flex-wrap items-center gap-x-2">
          {todos.map((i, idx) => (
            <li key={i.caminho} className="flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {idx === todos.length - 1 ? (
                <span aria-current="page" className="text-tinta">
                  {i.nome}
                </span>
              ) : (
                <Link href={i.caminho} className="underline underline-offset-2 hover:text-acao">
                  {i.nome}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Abertura padrão das páginas internas. */
export function TopoPagina({
  migalhas,
  titulo,
  texto,
  children,
}: {
  migalhas: { nome: string; caminho: string }[];
  titulo: string;
  texto?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-linha bg-suave">
      <div className="pagina py-10 sm:py-14">
        <Migalhas itens={migalhas} />
        <h1 className="titulo-1 mt-6 max-w-4xl">{titulo}</h1>
        {texto && <p className="mt-4 max-w-leitura text-xl text-mudo">{texto}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function Secao({
  id,
  titulo,
  intro,
  children,
  fundo = "normal",
}: {
  id?: string;
  titulo?: string;
  intro?: ReactNode;
  children: ReactNode;
  fundo?: "normal" | "suave" | "escuro";
}) {
  const cls = fundo === "suave" ? "bg-suave" : fundo === "escuro" ? "escuro bg-escuro text-sobre-escuro" : "";
  return (
    <section id={id} className={`secao ${cls}`} aria-labelledby={titulo && id ? `${id}-t` : undefined}>
      <div className="pagina">
        {titulo && (
          <h2 id={id ? `${id}-t` : undefined} className={`titulo-2 max-w-3xl ${fundo === "escuro" ? "!text-sobre-escuro" : ""}`}>
            {titulo}
          </h2>
        )}
        {intro && <p className={`mt-3 max-w-leitura text-lg ${fundo === "escuro" ? "text-sobre-escuro/85" : "text-mudo"}`}>{intro}</p>}
        <div className={titulo || intro ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** Cartão reutilizável de produto. Basta incluir o produto em src/lib/site.ts. */
export function CartaoProduto({ produto, posicao }: { produto: Produto; posicao: string }) {
  return (
    <article className="eleva flex h-full flex-col rounded-marca-lg border border-linha bg-superficie p-6">
      <h3 className="titulo-3 text-2xl">{produto.nome}</h3>
      <p className="mt-2 font-medium">{produto.chamada}</p>
      <p className="mt-3 flex-1 text-mudo">{produto.descricao}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Botao href={produto.ctaHref} posicao={`${posicao}_${produto.slug}_teste`}>
          {produto.cta}
        </Botao>
        <Botao href={produto.href} variante="secundario" posicao={`${posicao}_${produto.slug}_saiba`}>
          Saiba mais
        </Botao>
      </div>
    </article>
  );
}

export function CartaoArtigo({ artigo }: { artigo: Artigo }) {
  return (
    <article className="eleva relative flex h-full flex-col rounded-marca-lg border border-linha bg-superficie p-6 focus-within:ring-2 focus-within:ring-acao">
      <p className="olho">{artigo.categoria}</p>
      <h3 className="mt-2 text-xl font-bold">
        <Link href={`/conteudo/${artigo.slug}`} className="after:absolute after:inset-0 focus:outline-none">
          {artigo.titulo}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-mudo">{artigo.resumo}</p>
      <p className="mt-4 text-sm text-mudo">
        {formatarData(artigo.publicado)} · {artigo.minutos} min de leitura
      </p>
    </article>
  );
}

/** Chamada final com uma ação principal. */
export function ChamadaFinal({
  titulo,
  texto,
  rotulo,
  href,
  posicao,
  extra,
  rodape,
}: {
  titulo: string;
  texto?: string;
  rotulo: string;
  href: string;
  posicao: string;
  extra?: ReactNode;
  /** Linha de texto abaixo dos botões, para uma alternativa de menor peso. */
  rodape?: ReactNode;
}) {
  return (
    <section className="escuro bg-escuro py-16 text-sobre-escuro">
      <div className="pagina text-center">
        <h2 className="titulo-2 mx-auto max-w-2xl !text-sobre-escuro">{titulo}</h2>
        {texto && <p className="mx-auto mt-3 max-w-xl text-lg text-sobre-escuro/85">{texto}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Botao href={href} variante="claro" tamanho="grande" posicao={posicao}>
            {rotulo}
          </Botao>
          {extra}
        </div>
        {rodape && <p className="mt-6 text-sobre-escuro/85">{rodape}</p>}
      </div>
    </section>
  );
}

export function Lista({ itens, marcador = "check" }: { itens: string[]; marcador?: "check" | "x" }) {
  return (
    <ul className="space-y-3">
      {itens.map((i) => (
        <li key={i} className="flex gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 flex-shrink-0 ${marcador === "check" ? "text-ok" : "text-erro"}`} stroke="currentColor" aria-hidden="true">
            {marcador === "check" ? <path d="M5 12l5 5 9-10" /> : <path d="M6 6l12 12M18 6L6 18" />}
          </svg>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
