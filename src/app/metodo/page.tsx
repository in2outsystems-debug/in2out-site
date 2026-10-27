import { Botao } from "@/components/Botao";
import { ChamadaFinal, Lista, Secao, TopoPagina } from "@/components/Blocos";
import { FluxoMetodo } from "@/components/FluxoMetodo";
import { Termo } from "@/components/Termo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  titulo: "O método: mapear, padronizar, medir, automatizar e só então usar IA",
  descricao:
    "Conheça os cinco passos do método WS3 e o teste de 3 perguntas para saber se o seu processo está pronto para automatizar.",
  caminho: "/metodo",
});

const indicadores = [
  { nome: "Tempo", texto: "Quanto demora do pedido até a entrega. Exemplo: minutos para responder um cliente novo." },
  { nome: "Erro", texto: "Quantas vezes o trabalho precisa ser refeito. Exemplo: pedidos com informação errada por semana." },
  { nome: "Dinheiro", texto: "Quanto custa fazer ou deixar de fazer. Exemplo: orçamentos enviados que não viraram venda por falta de retorno." },
];

const erros = [
  { nome: "Documentar e esquecer", texto: "O processo é desenhado, vira um arquivo e ninguém abre de novo. Um padrão só vale se estiver na rotina e for revisado." },
  { nome: "Copiar de empresa grande", texto: "O que funciona com 500 pessoas costuma pesar demais para 5. O padrão certo é o menor que resolve o problema." },
  { nome: "Montar sozinho", texto: "Quem faz a tarefa conhece os atalhos e as exceções que o dono não vê. Mapear sem ouvir a equipe gera um processo que existe só no papel." },
];

const teste = [
  { p: "Existe processo definido?", d: "Alguém sabe dizer, em ordem, o que acontece do começo ao fim." },
  { p: "Ele está padronizado?", d: "Pessoas diferentes fazem do mesmo jeito e chegam ao mesmo resultado." },
  { p: "Alguém mede o resultado?", d: "Há um número simples, olhado com regularidade, que diz se melhorou ou piorou." },
];

export default function Metodo() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Método", caminho: "/metodo" }]}
        titulo="Primeiro o processo, depois a máquina"
        texto="Cinco passos, sempre na mesma ordem. Pular etapas é o que faz projetos de automação e de IA darem errado."
      />

      <Secao id="passos" titulo="Os cinco passos">
        <FluxoMetodo detalhado />
      </Secao>

      <Secao
        id="indicadores"
        fundo="suave"
        titulo="Três indicadores simples"
        intro={<>Um <Termo nome="indicador">indicador</Termo> é um número que mostra se o <Termo nome="processo">processo</Termo> está indo bem. Comece com três.</>}
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {indicadores.map((i) => (
            <li key={i.nome} className="cartao">
              <h3 className="titulo-3 text-dado">{i.nome}</h3>
              <p className="mt-2 text-mudo">{i.texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="erros" titulo="Três jeitos de desperdiçar o esforço">
        <ul className="grid gap-4 md:grid-cols-3">
          {erros.map((e) => (
            <li key={e.nome} className="cartao">
              <h3 className="titulo-3">{e.nome}</h3>
              <p className="mt-2 text-mudo">{e.texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="teste" fundo="suave" titulo="O teste de 3 perguntas" intro="Responda sobre o processo que você pensa em automatizar. Se alguma resposta for não, volte ao passo correspondente antes de gastar com automação.">
        <ol className="grid gap-4 md:grid-cols-3">
          {teste.map((t, i) => (
            <li key={t.p} className="cartao">
              <p className="text-sm font-semibold text-dado">Pergunta {i + 1}</p>
              <h3 className="titulo-3 mt-1">{t.p}</h3>
              <p className="mt-2 text-mudo">{t.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 max-w-leitura">
          <Lista itens={["Três respostas sim: o processo está pronto para automatizar.", "Uma ou duas respostas não: organize esse ponto primeiro."]} />
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Descubra onde o seu processo está"
        texto="O diagnóstico faz o teste de 3 perguntas com você e mostra o próximo passo."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="metodo_final"
      />
    </>
  );
}
