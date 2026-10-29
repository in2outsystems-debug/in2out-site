import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { ChamadaFinal, JsonLd, Lista, Migalhas, CartaoArtigo } from "@/components/Blocos";
import { formatarData, getArtigo, getTodosArtigos, slugify } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";
import { ProgressoLeitura } from "@/components/movimento/ProgressoLeitura";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTodosArtigos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = getArtigo(slug);
  if (!a) return {};
  return pageMeta({
    titulo: a.titulo,
    descricao: a.resumo,
    caminho: `/conteudo/${a.slug}`,
    tipo: "article",
    publicado: a.publicado,
    atualizado: a.atualizado,
  });
}

function textoDe(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textoDe).join("");
  return "";
}

const componentes = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(textoDe(children))}>{children}</h2>,
  a: ({ href = "#", children }: { href?: string; children?: ReactNode }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
};

export default async function ArtigoPagina({ params }: Props) {
  const { slug } = await params;
  const a = getArtigo(slug);
  if (!a) notFound();

  const relacionados = a.relacionados
    .map((s) => getArtigo(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 3);

  const url = `${SITE_URL}/conteudo/${a.slug}`;

  return (
    <>
      <JsonLd
        dados={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titulo,
          description: a.resumo,
          datePublished: a.publicado,
          dateModified: a.atualizado,
          inLanguage: "pt-BR",
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: site.nome, url: SITE_URL },
          publisher: { "@type": "Organization", name: site.nome, logo: { "@type": "ImageObject", url: `${SITE_URL}/img/icone.png` } },
        }}
      />
      <ProgressoLeitura />
      <article className="pagina py-10 sm:py-14">
        <Migalhas
          itens={[
            { nome: "Conteúdo", caminho: "/conteudo" },
            { nome: a.titulo, caminho: `/conteudo/${a.slug}` },
          ]}
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <p className="olho">{a.categoria}</p>
          <h1 className="titulo-1 mt-2">{a.titulo}</h1>
          <p className="mt-4 text-mudo">
            Publicado em {formatarData(a.publicado)}
            {a.atualizado !== a.publicado && <>, atualizado em {formatarData(a.atualizado)}</>} · {a.minutos} min de leitura
          </p>

          <section aria-labelledby="resposta" className="painel brilho mt-8 p-6">
            <h2 id="resposta" className="text-lg font-semibold text-dado">
              Resposta direta
            </h2>
            <p className="mt-2 text-lg">{a.resposta}</p>
          </section>

          {a.toc.length > 0 && (
            <nav aria-label="Neste artigo" className="mt-8 rounded-marca-lg border border-linha bg-superficie p-6">
              <h2 className="text-lg font-bold">Neste artigo</h2>
              <ol className="mt-2 list-decimal space-y-1 pl-6">
                {a.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-acao underline underline-offset-2">
                      {t.texto}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prosa mt-8">
            <MDXRemote source={a.corpo} components={componentes} />
          </div>

          {a.checklist.length > 0 && (
            <section aria-labelledby="checklist" className="mt-10 rounded-marca-lg border border-linha bg-superficie p-6">
              <h2 id="checklist" className="text-2xl font-bold">
                Checklist
              </h2>
              <div className="mt-4">
                <Lista itens={a.checklist} />
              </div>
            </section>
          )}

          <section aria-labelledby="fontes" className="mt-10 text-base text-mudo">
            <h2 id="fontes" className="text-lg font-bold text-tinta">
              Fontes
            </h2>
            {a.fontes.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-6">
                {a.fontes.map((f) => (
                  <li key={f.nome}>
                    {f.url ? (
                      <a href={f.url} className="text-acao underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                        {f.nome}
                      </a>
                    ) : (
                      f.nome
                    )}
                    , {f.data}.
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">Este artigo não usa dados numéricos de fontes externas.</p>
            )}
          </section>
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="bg-suave py-14">
          <div className="pagina">
            <h2 className="titulo-2">Leia também</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <CartaoArtigo artigo={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ChamadaFinal
        titulo="Descubra se o seu processo está pronto para automatizar"
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao={`artigo_${a.slug}_final`}
      />
    </>
  );
}
