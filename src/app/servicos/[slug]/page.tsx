import Link from "next/link";
import { notFound } from "next/navigation";
import { Acordeao } from "@/components/Acordeao";
import { ChamadaFinal, JsonLd, Lista, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { DuasColunas, Sequencia } from "@/components/Composicoes";
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
        olho="Serviço"
        titulo={s.nome}
        texto={s.curto}
        lado={
          <div className="painel brilho p-6 sm:p-8">
            <h2 className="titulo-3">Quando faz sentido</h2>
            <div className="mt-5">
              <Lista itens={s.paraQuem} />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Botao href="/diagnostico" tamanho="grande" posicao={`servico_${s.slug}_topo`} seta className="w-full sm:w-auto">
            Fazer o diagnóstico gratuito
          </Botao>
          <Botao href="#etapas" variante="texto" posicao={`servico_${s.slug}_etapas`} className="text-sobre-escuro/90">
            Ver como o trabalho acontece
          </Botao>
        </div>
      </TopoPagina>

      <Secao id="dor" olho="A dor" titulo="O que costuma acontecer">
        <p className="max-w-3xl text-2xl font-light leading-snug text-tinta/90 sm:text-3xl">{s.dor}</p>
        {s.condicao && (
          <p className="painel mt-8 max-w-3xl p-5 sm:p-6">
            <strong>Condição para este serviço.</strong> {s.condicao}
          </p>
        )}
      </Secao>

      <Secao id="etapas" fundo="suave" olho="Etapas" titulo="Como o trabalho acontece">
        <Sequencia longo itens={s.etapas.map((e) => ({ titulo: e }))} />
      </Secao>

      <Secao id="entregas" olho="O que você recebe" titulo="O trabalho e as entregas">
        <DuasColunas esquerda={{ titulo: "O que fazemos", itens: s.entregamos }} direita={{ titulo: "O que você recebe no final", itens: s.entregaveis }} />
      </Secao>

      <Secao id="limites" fundo="suave" olho="Limites" titulo="O que este serviço não faz">
        <div className="painel max-w-3xl p-6 sm:p-8">
          <Lista itens={s.limites} marcador="x" />
        </div>
      </Secao>

      <Secao id="faq" olho="Perguntas frequentes" titulo={`Dúvidas sobre ${s.nome.toLowerCase()}`}>
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
        <div className="mt-12">
          <h3 className="titulo-3">Outros serviços</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={`/servicos/${o.slug}`} className="alvo inline-flex items-center rounded-full border border-white/15 px-5 font-semibold transition-colors hover:border-white/40 hover:bg-white/[0.05]">
                  {o.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Vamos conversar sobre o seu caso?"
        texto="Comece pelo diagnóstico gratuito. Se preferir, marque uma conversa de 30 minutos para entendermos o seu processo e dizermos, com franqueza, se podemos ajudar."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao={`servico_${s.slug}_final`}
        extra={
          <Botao href="/contato#agendar" variante="contorno-claro" tamanho="grande" posicao={`servico_${s.slug}_conversa`} className="w-full sm:w-auto">
            Agendar conversa
          </Botao>
        }
      />
    </>
  );
}
