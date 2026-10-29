import { Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { pageMeta } from "@/lib/seo";
import { produtos } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Produtos",
  descricao: "Sistemas da WS3 Systems para atendimento e operação de pequenas empresas.",
  caminho: "/produtos",
});

export default function Produtos() {
  const [destaque, ...outros] = produtos;

  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Produtos", caminho: "/produtos" }]}
        olho="Produtos"
        titulo="Sistemas da WS3, no mesmo método"
        texto="Cada sistema nasce de um problema que vimos se repetir nos clientes. Novos sistemas entram aqui."
      />

      <Secao id="destaque" titulo={destaque.nome}>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xl font-medium">{destaque.chamada}</p>
            <p className="mt-3 max-w-leitura text-lg text-mudo">{destaque.descricao}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Botao href={destaque.href} tamanho="grande" posicao="produtos_atendy" seta className="w-full sm:w-auto">
                Conhecer o {destaque.nome}
              </Botao>
              <Botao href="/diagnostico" variante="texto" posicao="produtos_diagnostico" className="text-acao">
                Antes, fazer o diagnóstico
              </Botao>
            </div>
          </div>
          <ConversaExemplo />
        </div>
      </Secao>

      {outros.length > 0 && (
        <Secao titulo="Mais sistemas">
          <ul className="grid gap-6 md:grid-cols-2">
            {outros.map((p) => (
              <li key={p.slug} className="painel p-6">
                <h3 className="titulo-3">{p.nome}</h3>
                <p className="mt-2 text-mudo">{p.chamada}</p>
              </li>
            ))}
          </ul>
        </Secao>
      )}
    </>
  );
}
