import Link from "next/link";
import { notFound } from "next/navigation";
import { Acordeao } from "@/components/Acordeao";
import { ChamadaFinal, JsonLd, Lista, Secao, TopoPagina } from "@/components/Blocos";
import { faqLd, pageMeta } from "@/lib/seo";
import { SITE_URL, servicos, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = servicos.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({ titulo: s.nome, descricao: s.curto, caminho: `/servicos/${s.slug}` });
}

export default async function Servico({ params }: Props) {
  const { slug } = await params;
  const s = servicos.find((x) => x.slug === slug);
  if (!s) notFound();

  const outros = servicos.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        dados={[
          faqLd(s.faq),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.nome,
            description: s.curto,
            provider: { "@type": "Organization", name: site.nome, url: SITE_URL },
            areaServed: "BR",
          },
        ]}
      />
      <TopoPagina
        migalhas={[
          { nome: "Serviços", caminho: "/servicos" },
          { nome: s.nome, caminho: `/servicos/${s.slug}` },
        ]}
        titulo={s.nome}
        texto={s.curto}
      />

      <Secao id="dor" titulo="O que costuma acontecer">
        <p className="texto-leitura text-xl">{s.dor}</p>
        {s.condicao && (
          <p className="mt-6 max-w-leitura rounded-marca-lg bg-dado-fundo p-5">
            <strong>Condição para este serviço.</strong> {s.condicao}
          </p>
        )}
      </Secao>

      <Secao id="para-quem" fundo="suave" titulo="Quando este serviço faz sentido">
        <div className="max-w-leitura">
          <Lista itens={s.paraQuem} />
        </div>
      </Secao>

      <Secao id="entregamos" titulo="O trabalho em si">
        <div className="max-w-leitura">
          <Lista itens={s.entregamos} />
        </div>
      </Secao>

      <Secao id="etapas" fundo="suave" titulo="Como o trabalho acontece">
        <ol className="grid gap-4 md:grid-cols-5">
          {s.etapas.map((e, i) => (
            <li key={e} className="cartao">
              <p className="text-sm font-semibold text-dado">Etapa {i + 1}</p>
              <p className="mt-1">{e}</p>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao id="entregaveis" titulo="O que você recebe no final">
        <div className="max-w-leitura">
          <Lista itens={s.entregaveis} />
        </div>
      </Secao>

      <Secao id="limites" fundo="suave" titulo="O que este serviço não faz">
        <div className="max-w-leitura">
          <Lista itens={s.limites} marcador="x" />
        </div>
      </Secao>

      <Secao id="faq" titulo={`Dúvidas sobre ${s.nome.toLowerCase()}`}>
        <div className="max-w-3xl">
          <Acordeao itens={s.faq.map((f) => ({ p: f.p, r: <p>{f.r}</p> }))} origem={`servico_${s.slug}`} />
        </div>
        {s.slug === "ia-aplicada" && (
          <p className="mt-6">
            Quer algo pronto?{" "}
            <Link href="/produtos/ws3-atendy" className="font-semibold text-acao underline underline-offset-2">
              Conheça o WS3 Atendy
            </Link>
            .
          </p>
        )}
      </Secao>

      <Secao id="outros" fundo="suave" titulo="Outros serviços">
        <ul className="flex flex-wrap gap-3">
          {outros.map((o) => (
            <li key={o.slug}>
              <Link href={`/servicos/${o.slug}`} className="alvo inline-flex items-center rounded-marca border border-linha bg-superficie px-4 font-semibold hover:border-acao">
                {o.nome}
              </Link>
            </li>
          ))}
        </ul>
      </Secao>

      <ChamadaFinal
        titulo="Vamos conversar sobre o seu caso?"
        texto="Uma conversa de 30 minutos para entender o seu processo e dizer com franqueza se podemos ajudar."
        rotulo="Agendar conversa"
        href="/contato#agendar"
        posicao={`servico_${s.slug}_final`}
      />
    </>
  );
}
