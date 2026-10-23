import { Acordeao } from "@/components/Acordeao";
import { ChamadaFinal, JsonLd, Secao, TopoPagina } from "@/components/Blocos";
import { perguntas } from "@/lib/faq";
import { faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  titulo: "Perguntas frequentes",
  descricao: "Respostas diretas sobre o método, os serviços, o rAIptor Atende e o uso dos seus dados.",
  caminho: "/perguntas-frequentes",
});

export default function Faq() {
  const grupos = [...new Set(perguntas.map((p) => p.grupo))];
  return (
    <>
      <JsonLd dados={faqLd(perguntas)} />
      <TopoPagina
        migalhas={[{ nome: "Perguntas frequentes", caminho: "/perguntas-frequentes" }]}
        olho="Perguntas frequentes"
        titulo="Respostas diretas para as dúvidas mais comuns"
      />
      <Secao>
        <div className="max-w-3xl space-y-10">
          {grupos.map((g) => (
            <section key={g} aria-labelledby={`g-${g}`}>
              <h2 id={`g-${g}`} className="titulo-3 mb-4">
                {g}
              </h2>
              <Acordeao itens={perguntas.filter((p) => p.grupo === g).map((p) => ({ p: p.p, r: <p>{p.r}</p> }))} origem={`faq_${g}`} />
            </section>
          ))}
        </div>
      </Secao>
      <ChamadaFinal titulo="Não encontrou a sua dúvida?" rotulo="Falar com a WS3" href="/contato" posicao="faq_final" />
    </>
  );
}
