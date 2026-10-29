import Image from "next/image";
import Link from "next/link";
import { ChamadaFinal, Secao, TopoPagina } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { equipe, servicos, site } from "@/lib/site";

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
        titulo="Agência de processos, automação e IA para quem tem uma empresa pequena"
        texto={`A ${site.nome} nasceu para ajudar micro e pequenas empresas, MEIs e autônomos a organizar o trabalho antes de investir em tecnologia.`}
      />

      <Secao id="historia" titulo="Por que a WS3 existe">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="prosa max-w-leitura">
            <p>
              Em empresa pequena, o conhecimento costuma ficar na cabeça do dono. Quando ele sai, a operação para. Quando a equipe cresce, cada pessoa faz do seu jeito.
            </p>
            <p>
              A resposta que o mercado oferece quase sempre é comprar um sistema. Nós preferimos começar pelo processo, porque o sistema só funciona sobre algo que já está claro.
            </p>
            <p>
              Por isso a WS3 é uma agência e também produz sistemas próprios, como o WS3 Atendy: a tecnologia entra depois que o atendimento está em ordem.
            </p>
          </div>

          <div className="painel brilho p-6 sm:p-8">
            <h3 className="titulo-3">O que a WS3 faz hoje</h3>
            <ul className="mt-5 divide-y divide-white/[0.08]">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className="alvo flex items-center justify-between gap-4 py-3 font-semibold hover:text-acao">
                    {s.nome}
                    <span aria-hidden="true" className="text-mudo">→</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/produtos/ws3-atendy" className="alvo flex items-center justify-between gap-4 py-3 font-semibold hover:text-acao">
                  <span>
                    WS3 Atendy <span className="font-normal text-mudo">· nosso sistema de atendimento</span>
                  </span>
                  <span aria-hidden="true" className="text-mudo">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Secao>

      <Secao id="principios" fundo="suave" olho="Como trabalhamos" titulo="Quatro princípios">
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {principios.map((p, i) => (
            <li key={p.t} className="border-t border-white/[0.12] pt-5">
              <p className="text-sm font-semibold tabular-nums text-acao">0{i + 1}</p>
              <h3 className="titulo-3 mt-1">{p.t}</h3>
              <p className="mt-2 text-mudo">{p.d}</p>
            </li>
          ))}
        </ul>
      </Secao>

      {/* A equipe só aparece quando houver gente cadastrada em `equipe` (src/lib/site.ts). */}
      {equipe.length > 0 && (
        <Secao id="equipe" olho="Equipe" titulo="Quem está por trás">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipe.map((p) => (
              <li key={p.nome}>
                {p.foto && <Image src={p.foto} alt={`Foto de ${p.nome}`} width={480} height={480} className="aspect-square w-full rounded-2xl object-cover" />}
                <h3 className="titulo-3 mt-3">{p.nome}</h3>
                <p className="text-mudo">{p.cargo}</p>
              </li>
            ))}
          </ul>
        </Secao>
      )}

      <ChamadaFinal titulo="Quer conversar?" rotulo="Falar com a WS3" href="/contato" posicao="sobre_final" />
    </>
  );
}
