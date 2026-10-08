import { CartaoProduto, Secao, TopoPagina } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { produtos } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Produtos",
  descricao: "Produtos da In2Out Systems para atendimento e operação de pequenas empresas.",
  caminho: "/produtos",
});

export default function Produtos() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Produtos", caminho: "/produtos" }]}
        olho="Produtos"
        titulo="Ferramentas prontas, no mesmo método"
        texto="Cada produto nasce de um problema que vimos se repetir nos clientes. Novos produtos entram aqui."
      />
      <Secao>
        <ul className="grid gap-6 md:grid-cols-2">
          {produtos.map((p) => (
            <li key={p.slug}>
              <CartaoProduto produto={p} posicao="produtos_lista" />
            </li>
          ))}
        </ul>
      </Secao>
    </>
  );
}
