import { Secao, TopoPagina } from "@/components/Blocos";
import { getTodosArtigos } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { FormularioTardio, ConteudoHubTardio } from "@/components/movimento/Tardios";

export const metadata = pageMeta({
  titulo: "Conteúdo: artigos sobre processos, automação e IA para pequenas empresas",
  descricao: "Artigos práticos, em linguagem simples, sobre diagnóstico, mitos, passo a passo, erros comuns, automação e indicadores.",
  caminho: "/conteudo",
});

export default function Conteudo() {
  const itens = getTodosArtigos().map((a) => ({
    slug: a.slug,
    titulo: a.titulo,
    resumo: a.resumo,
    categoria: a.categoria,
    publicado: a.publicado,
    minutos: a.minutos,
  }));

  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Conteúdo", caminho: "/conteudo" }]}
        olho="Conteúdo"
        titulo="Aprenda a organizar o seu negócio"
        texto="Artigos curtos, com a resposta logo no começo e um checklist no final."
      />
      <Secao>
        <ConteudoHubTardio itens={itens} />
      </Secao>
      <Secao fundo="suave" id="newsletter" olho="Newsletter" titulo="Receba os novos artigos por e-mail" intro="Um e-mail quando houver artigo novo. Você sai quando quiser.">
        <div className="max-w-xl rounded-marca-lg border border-linha bg-superficie p-6">
          <FormularioTardio tipo="newsletter" origem="conteudo_newsletter" />
        </div>
      </Secao>
    </>
  );
}
