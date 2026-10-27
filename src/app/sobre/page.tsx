import { ChamadaFinal, Secao, TopoPagina } from "@/components/Blocos";
import { Placeholder } from "@/components/Placeholder";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Sobre a WS3 Systems",
  descricao: "Quem somos, no que acreditamos e como trabalhamos com micro e pequenas empresas, MEIs e autônomos.",
  caminho: "/sobre",
});

const principios = [
  { t: "Primeiro entender", d: "Antes de propor qualquer ferramenta, olhamos como o trabalho acontece de verdade na sua empresa." },
  { t: "Ordem importa", d: "Mapear, padronizar, medir, automatizar e só então usar IA. Pular etapas custa mais caro." },
  { t: "Linguagem simples", d: "Explicamos tudo em português direto, sem jargão. Se usamos um termo técnico, explicamos o que ele quer dizer." },
  { t: "Franqueza", d: "Se o seu caso não precisa de automação agora, dizemos. Sem prometer resultados que dependem de muita coisa fora do nosso controle." },
];

export default function Sobre() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Sobre", caminho: "/sobre" }]}
        olho="Sobre"
        titulo="Gestão de processos, automação e IA para quem tem uma empresa pequena"
        texto={`A ${site.nome} nasceu para ajudar micro e pequenas empresas, MEIs e autônomos a organizar o trabalho antes de investir em tecnologia.`}
      />

      <Secao id="historia" titulo="Por que a WS3 existe">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="prosa max-w-leitura">
            <p>
              Em empresa pequena, o conhecimento costuma ficar na cabeça do dono. Quando ele sai, a operação para. Quando a equipe cresce, cada pessoa faz do seu jeito.
            </p>
            <p>
              A resposta que o mercado oferece quase sempre é comprar um sistema. Nós preferimos começar pelo processo, porque o sistema só funciona sobre algo que já está claro.
            </p>
            <p>[inserir história da WS3: quando começou, o que motivou, primeiros aprendizados]</p>
          </div>
          <Placeholder rotulo="Foto da equipe ou do escritório [inserir]" />
        </div>
      </Secao>

      <Secao id="principios" fundo="suave" olho="Como trabalhamos" titulo="Quatro princípios">
        <ul className="grid gap-4 md:grid-cols-2">
          {principios.map((p) => (
            <li key={p.t} className="cartao">
              <h3 className="titulo-3">{p.t}</h3>
              <p className="mt-2 text-mudo">{p.d}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="equipe" olho="Equipe" titulo="Quem está por trás">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <Placeholder rotulo={`Foto da pessoa ${n} [inserir]`} proporcao="aspect-square" />
              <h3 className="titulo-3 mt-3">[inserir nome]</h3>
              <p className="text-mudo">[inserir cargo e experiência]</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-mudo">
          {site.razaoSocial}, CNPJ {site.cnpj}. {site.endereco}.
        </p>
      </Secao>

      <ChamadaFinal titulo="Quer conversar?" rotulo="Falar com a WS3" href="/contato" posicao="sobre_final" />
    </>
  );
}
