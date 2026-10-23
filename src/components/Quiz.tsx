"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { segmentos } from "@/lib/forms";
import { Botao } from "./Botao";
import { Formulario } from "./Formulario";

type Pergunta = {
  id: string;
  titulo: string;
  ajuda: string;
  opcoes: { rotulo: string; pontos: number }[];
  teste: boolean;
};

const simNao = [
  { rotulo: "Sim", pontos: 2 },
  { rotulo: "Em parte", pontos: 1 },
  { rotulo: "Não", pontos: 0 },
];

const perguntas: Pergunta[] = [
  {
    id: "definido",
    teste: true,
    titulo: "Existe um processo definido?",
    ajuda: "Pense no processo que você mais quer automatizar, como atender um cliente novo. Alguém sabe dizer, em ordem, o que acontece do começo ao fim?",
    opcoes: simNao,
  },
  {
    id: "padronizado",
    teste: true,
    titulo: "Ele está padronizado?",
    ajuda: "Pessoas diferentes da equipe fazem do mesmo jeito e chegam ao mesmo resultado?",
    opcoes: simNao,
  },
  {
    id: "medido",
    teste: true,
    titulo: "Alguém mede o resultado?",
    ajuda: "Existe um número simples, como tempo de resposta ou pedidos com erro, que alguém olha com regularidade?",
    opcoes: simNao,
  },
  {
    id: "segmento",
    teste: false,
    titulo: "Qual é o segmento da sua empresa?",
    ajuda: "Usamos para adaptar a recomendação.",
    opcoes: segmentos.map((s) => ({ rotulo: s, pontos: 0 })),
  },
  {
    id: "porte",
    teste: false,
    titulo: "Quantas pessoas trabalham na empresa, contando com você?",
    ajuda: "Pode ser um número aproximado.",
    opcoes: ["Só eu", "2 a 5", "6 a 10", "11 a 30", "Mais de 30"].map((s) => ({ rotulo: s, pontos: 0 })),
  },
];

type Nivel = "pronto" | "quase" | "organizar";

const resultados: Record<Nivel, { titulo: string; texto: string; href: string; cta: string }> = {
  pronto: {
    titulo: "Pronto para automatizar",
    texto:
      "Seu processo passa no teste de 3 perguntas. Já existe um jeito definido, ele é seguido e alguém acompanha o resultado. O próximo passo é escolher o que automatizar primeiro, começando pelo que mais consome tempo da equipe.",
    href: "/servicos/automacao",
    cta: "Ver o serviço de automação",
  },
  quase: {
    titulo: "Quase pronto",
    texto:
      "Seu processo está perto, mas ainda tem pontos soltos. Ajuste o que ficou como “em parte” ou “não” antes de automatizar, para a máquina não repetir um jeito que ainda varia de pessoa para pessoa.",
    href: "/servicos/gestao-de-processos",
    cta: "Ver o serviço de gestão de processos",
  },
  organizar: {
    titulo: "Organizar antes de automatizar",
    texto:
      "Hoje, automatizar faria o erro acontecer mais rápido. O melhor investimento agora é mapear um processo, escolher um padrão e passar a medir. Isso já traz resultado e prepara o terreno para a automação.",
    href: "/materiais",
    cta: "Baixar o guia para mapear seu primeiro processo",
  },
};

function calcular(respostas: Record<string, string>): Nivel {
  let soma = 0;
  for (const p of perguntas.filter((x) => x.teste)) {
    soma += p.opcoes.find((o) => o.rotulo === respostas[p.id])?.pontos ?? 0;
  }
  return soma >= 5 ? "pronto" : soma >= 3 ? "quase" : "organizar";
}

export function Quiz() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [erro, setErro] = useState("");
  const titulo = useRef<HTMLHeadingElement>(null);
  const iniciou = useRef(false);
  const total = perguntas.length;
  const concluido = etapa >= total;

  useEffect(() => {
    titulo.current?.focus();
  }, [etapa]);

  const escolher = (id: string, valor: string) => {
    if (!iniciou.current) {
      iniciou.current = true;
      track("quiz_start");
    }
    setErro("");
    setRespostas((r) => ({ ...r, [id]: valor }));
  };

  const avancar = () => {
    const p = perguntas[etapa];
    if (!respostas[p.id]) {
      setErro("Escolha uma opção para continuar.");
      return;
    }
    if (etapa + 1 >= total) track("quiz_complete", { nivel: calcular(respostas) });
    setEtapa(etapa + 1);
  };

  if (concluido) {
    const nivel = calcular(respostas);
    const r = resultados[nivel];
    return (
      <div className="space-y-8">
        <div>
          <p className="olho">Seu resultado</p>
          <h2 ref={titulo} tabIndex={-1} className="titulo-2 mt-2 outline-none">
            {r.titulo}
          </h2>
          <p className="mt-3 max-w-leitura text-lg">{r.texto}</p>
          <ul className="mt-4 space-y-1 text-mudo">
            {perguntas
              .filter((p) => p.teste)
              .map((p) => (
                <li key={p.id}>
                  {p.titulo} <strong className="text-tinta">{respostas[p.id]}</strong>
                </li>
              ))}
          </ul>
          <div className="mt-6">
            <Botao href={r.href} posicao={`diagnostico_resultado_${nivel}`}>
              {r.cta}
            </Botao>
          </div>
        </div>

        <div className="entrada max-w-xl rounded-marca-lg border border-linha bg-superficie p-6">
          <h3 className="titulo-3">Receba a recomendação por e-mail</h3>
          <p className="mb-5 mt-1 text-mudo">Enviamos o resultado e os próximos passos para o seu e-mail.</p>
          <Formulario
            tipo="diagnostico"
            origem="diagnostico"
            valores={{
              nivel,
              respostas: JSON.stringify(
                Object.fromEntries(perguntas.filter((p) => p.teste).map((p) => [p.id, respostas[p.id]])),
              ),
              segmento: respostas.segmento ?? "",
              porte: respostas.porte ?? "",
            }}
            aoSucesso={() => track("quiz_lead", { nivel })}
          />
        </div>
        <p>
          <button type="button" className="alvo underline underline-offset-2" onClick={() => { setEtapa(0); setRespostas({}); iniciou.current = false; }}>
            Refazer o diagnóstico
          </button>
        </p>
      </div>
    );
  }

  const p = perguntas[etapa];
  const pct = Math.round((etapa / total) * 100);

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm font-medium text-mudo">
          <span>
            Pergunta {etapa + 1} de {total}
          </span>
          <span>{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Progresso do diagnóstico"
          className="h-3 overflow-hidden rounded-full bg-linha"
        >
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-acao to-acao-forte transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
      </div>

      <fieldset key={etapa} aria-describedby={erro ? "quiz-erro" : undefined} className="entrada">
        <legend className="mb-1">
          <span ref={titulo} tabIndex={-1} className="titulo-2 block outline-none">
            {p.titulo}
          </span>
        </legend>
        <p className="mb-5 max-w-leitura text-mudo">{p.ajuda}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {p.opcoes.map((o, i) => {
            const marcado = respostas[p.id] === o.rotulo;
            return (
              <label
                key={o.rotulo}
                style={{ "--i": i + 1 } as React.CSSProperties}
                className={`entrada alvo prensa flex cursor-pointer items-center gap-3 rounded-marca border-2 px-4 py-3 font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acao ${
                  marcado ? "border-acao bg-suave" : "border-linha bg-superficie hover:border-mudo"
                }`}
              >
                <input type="radio" name={p.id} value={o.rotulo} checked={marcado} onChange={() => escolher(p.id, o.rotulo)} className="h-5 w-5 accent-[rgb(var(--c-acao))]" />
                {o.rotulo}
              </label>
            );
          })}
        </div>
        {erro && (
          <p id="quiz-erro" role="alert" className="entrada mt-3 font-medium text-erro">
            {erro}
          </p>
        )}
      </fieldset>

      <div className="mt-8 flex gap-3">
        {etapa > 0 && (
          <button type="button" onClick={() => { setErro(""); setEtapa(etapa - 1); }} className="alvo prensa rounded-marca border-2 border-acao px-5 py-3 font-semibold text-acao hover:bg-suave">
            Voltar
          </button>
        )}
        <button type="button" onClick={avancar} className="alvo prensa rounded-marca bg-acao px-6 py-3 font-semibold text-sobre-acao hover:bg-acao-forte">
          {etapa + 1 === total ? "Ver resultado" : "Próxima"}
        </button>
      </div>
      <p className="mt-6 text-sm text-mudo">
        Suas respostas só são guardadas se você pedir a recomendação por e-mail. Veja a{" "}
        <Link href="/privacidade" className="underline underline-offset-2">
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
