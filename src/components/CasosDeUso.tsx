"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Botao } from "./Botao";
import { track } from "@/lib/analytics";
import { Icone, type NomeIcone } from "./Icone";

const iconeCaso: Record<string, NomeIcone> = { atendimento: "conversa", agendamento: "calendario", "follow-up": "retorno", disparos: "envio" };

type Fala = { de: "cliente" | "ia" | "equipe" | "campanha"; texto: string };

type Caso = {
  id: string;
  nome: string;
  fala: Fala[];
  resultado: { rotulo: string; titulo: string; detalhe: string };
};

/** Conversas de exemplo, escritas a partir do guia de funcionalidades. Não são casos reais. */
const casos: Caso[] = [
  {
    id: "atendimento",
    nome: "Atendimento",
    fala: [
      { de: "cliente", texto: "Oi! Vocês fazem limpeza de ar-condicionado split?" },
      { de: "ia", texto: "Fazemos, sim! Para indicar o serviço certo, me diz: são quantos BTUs e em qual bairro?" },
      { de: "cliente", texto: "12 mil, no Centro." },
      { de: "ia", texto: "Perfeito, atendemos o Centro. Já vou ver um horário para você." },
    ],
    resultado: { rotulo: "Funil", titulo: "Lead qualificado", detalhe: "Registrado no CRM, etapa Orçamento" },
  },
  {
    id: "agendamento",
    nome: "Agendamento",
    fala: [
      { de: "cliente", texto: "Oi! Quero marcar uma consulta essa semana." },
      { de: "ia", texto: "Claro! Na quinta tenho 10h30, 14h ou 16h30. Qual você prefere?" },
      { de: "cliente", texto: "14h fica ótimo pra mim!" },
    ],
    resultado: { rotulo: "Horário confirmado", titulo: "Quinta-feira, 14:00", detalhe: "Lembrete um dia antes" },
  },
  {
    id: "follow-up",
    nome: "Follow-up",
    fala: [
      { de: "ia", texto: "Oi, Paula! Ontem você pediu um orçamento de instalação. Conseguiu ver? Posso tirar alguma dúvida?" },
      { de: "cliente", texto: "Vi sim! Pode ser na sexta?" },
      { de: "ia", texto: "Pode! Tenho 9h ou 15h na sexta. Qual prefere?" },
    ],
    resultado: { rotulo: "Follow-up", titulo: "Retorno automático", detalhe: "Enviado um dia depois, no horário permitido" },
  },
  {
    id: "disparos",
    nome: "Disparos",
    fala: [
      { de: "campanha", texto: "Oi, Carlos! Faz um tempo que você não passa por aqui. Esta semana temos horários livres na quinta. Quer reservar o seu?" },
      { de: "cliente", texto: "Quero sim! Pode ser de manhã?" },
      { de: "ia", texto: "Claro! Quinta às 9h ou às 10h30. Qual fica melhor?" },
    ],
    resultado: { rotulo: "Campanha", titulo: "Resposta no chat", detalhe: "A IA continua a conversa" },
  },
];

const autor = { cliente: "Cliente", ia: "IA", equipe: "Equipe", campanha: "Campanha" } as const;

function Bolha({ fala, atraso }: { fala: Fala; atraso: number }) {
  const cliente = fala.de === "cliente";
  return (
    <div className={`entrada flex max-w-[88%] flex-col gap-0.5 ${cliente ? "self-start" : "items-end self-end"}`} style={{ animationDelay: `${atraso}ms` }}>
      <span className={`text-[0.8125rem] font-semibold ${cliente ? "text-mudo" : fala.de === "ia" ? "text-dado" : "text-acao"}`}>{autor[fala.de]}</span>
      <p
        className={`rounded-2xl px-4 py-2 ${
          cliente
            ? "rounded-tl-md bg-white/[0.06]"
            : fala.de === "ia"
              ? "rounded-tr-md border border-dado/25 bg-dado/10"
              : "rounded-tr-md border border-acao/40 bg-acao-cheia/25"
        }`}
      >
        {fala.texto}
      </p>
    </div>
  );
}

/** Três casos de uso em abas: cada aba troca a conversa de exemplo. */
export function CasosDeUso() {
  const [ativo, setAtivo] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const caso = casos[ativo];

  const escolher = (i: number, foco = false) => {
    setAtivo(i);
    track("caso_de_uso", { caso: casos[i].id });
    if (foco) abas.current[i]?.focus();
  };

  const aoTeclar = (e: KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      escolher((i + 1) % casos.length, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      escolher((i + casos.length - 1) % casos.length, true);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10">
      <div role="tablist" aria-label="Recursos do WS3 Atendy" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {casos.map((c, i) => {
          const sel = i === ativo;
          return (
            <button
              key={c.id}
              ref={(el) => {
                abas.current[i] = el;
              }}
              id={`aba-${c.id}`}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls="painel-caso"
              tabIndex={sel ? 0 : -1}
              onClick={() => escolher(i)}
              onKeyDown={(e) => aoTeclar(e, i)}
              className={`alvo prensa rounded-2xl border px-4 py-3 text-left transition-colors lg:px-5 lg:py-4 ${
                sel ? "border-acao-cheia/60 bg-acao-cheia/15" : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className={`flex items-center gap-2.5 text-base font-semibold lg:text-lg ${sel ? "text-tinta" : "text-mudo"}`}>
                <Icone nome={iconeCaso[c.id]} tamanho={20} className={`flex-shrink-0 ${sel ? "text-dado" : "text-mudo"}`} />
                {c.nome}
              </span>
            </button>
          );
        })}
      </div>

      <div id="painel-caso" role="tabpanel" aria-labelledby={`aba-${caso.id}`} className="painel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3 text-sm">
          <span className="font-semibold">
            {caso.nome} no WhatsApp
            <span className="ml-2 inline-flex items-center gap-1.5 font-normal text-mudo">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
              Online agora
            </span>
          </span>
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-mudo">Exemplo</span>
        </div>

        {/* A chave refaz a animação de entrada a cada troca de aba */}
        <div key={caso.id} className="flex min-h-[19rem] flex-col gap-2.5 px-5 py-4 sm:min-h-[21rem] lg:min-h-[22rem]">
          {caso.fala.map((f, i) => (
            <Bolha key={i} fala={f} atraso={i * 140} />
          ))}
          <div className="entrada flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5" style={{ animationDelay: `${caso.fala.length * 140}ms` }}>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-acao-cheia/25 text-dado">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
            <span>
              <span className="block font-semibold">
                <span className="mr-2 text-[0.8125rem] uppercase tracking-[0.14em] text-dado">{caso.resultado.rotulo}</span>
                {caso.resultado.titulo}
              </span>
              <span className="block text-sm text-mudo">{caso.resultado.detalhe}</span>
            </span>
          </div>
        </div>

        <div className="flex border-t border-white/[0.08] px-5 py-3 sm:justify-end">
          <Botao href="/diagnostico" posicao={`home_caso_${caso.id}`} seta className="w-full sm:w-auto">
            Fazer o diagnóstico gratuito
          </Botao>
        </div>
      </div>
    </div>
  );
}
