"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { Icone, type NomeIcone } from "./Icone";

/**
 * Janela do WS3 Atendy: o menu lateral troca a tela, como na plataforma.
 * As telas são recriações em código (não capturas) e os dados são exemplos, nunca clientes reais.
 * Se a plataforma mudar, é aqui que se atualiza.
 */

type Item = { id: string; menu: string; icone: NomeIcone };

const itens: Item[] = [
  { id: "atendimento", menu: "Conversas", icone: "conversa" },
  { id: "agendamento", menu: "Agendamentos", icone: "calendario" },
  { id: "follow-up", menu: "Follow-up automático", icone: "retorno" },
  { id: "disparos", menu: "Disparos", icone: "envio" },
];

const cartao = "rounded-xl border border-white/[0.08] bg-white/[0.04]";
const entrada = (ms: number) => ({ animationDelay: `${ms}ms` });

function Pilula({ children, cor = "dado" }: { children: ReactNode; cor?: "dado" | "ok" }) {
  const c = cor === "ok" ? "border-ok/30 bg-ok/10 text-ok" : "border-dado/30 bg-dado/10 text-dado";
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${c}`}>{children}</span>;
}

function Cabeca({ olho, titulo, texto, direita }: { olho?: string; titulo: string; texto?: string; direita?: ReactNode }) {
  return (
    <div className={`${cartao} flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3`}>
      <div className="min-w-0">
        {olho && <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mudo">{olho}</p>}
        <p className="text-base font-semibold leading-tight">{titulo}</p>
        {texto && <p className="mt-0.5 text-[0.8125rem] text-mudo">{texto}</p>}
      </div>
      {direita}
    </div>
  );
}

/* ------------------------------------------------------------------ Conversas */

const contatos = [
  { nome: "Lead 1", previa: "Oi! Vocês fazem limpeza de ar-condicionado split?", etapa: "Novo Lead", ativo: true },
  { nome: "Paula", previa: "Vi sim! Pode ser na sexta?", etapa: "Em contato", ativo: false },
];

const conversa = [
  { de: "cliente", texto: "Oi! Vocês fazem limpeza de ar-condicionado split?" },
  { de: "ia", texto: "Fazemos, sim! Para indicar o serviço certo, me diz: são quantos BTUs e em qual bairro?" },
  { de: "cliente", texto: "12 mil, no Centro." },
] as const;

function Bolha({ de, texto, atraso }: { de: "cliente" | "ia"; texto: string; atraso: number }) {
  const cliente = de === "cliente";
  return (
    <div className={`entrada flex max-w-[86%] flex-col gap-0.5 ${cliente ? "self-start" : "items-end self-end"}`} style={entrada(atraso)}>
      <span className={`text-xs font-semibold ${cliente ? "text-mudo" : "text-dado"}`}>{cliente ? "Cliente" : "IA"}</span>
      <p className={`rounded-2xl px-3.5 py-2 text-[0.9375rem] leading-snug ${cliente ? "rounded-tl-md bg-white/[0.07]" : "rounded-tr-md border border-dado/25 bg-dado/10"}`}>{texto}</p>
    </div>
  );
}

function TelaConversas() {
  return (
    <div className="grid h-full gap-3 md:grid-cols-[13.5rem_minmax(0,1fr)]">
      <div className={`${cartao} hidden flex-col gap-2.5 p-3 md:flex`}>
        <div>
          <p className="text-base font-semibold leading-tight">Conversas</p>
          <p className="flex items-center gap-1.5 text-xs text-mudo">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
            Conectado
          </p>
        </div>
        <div className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[0.8125rem] text-mudo">Buscar contato…</div>
        <div className="grid grid-cols-2 rounded-lg border border-white/[0.08] p-0.5 text-center text-xs">
          <span className="rounded-md bg-white py-1 font-semibold text-escuro">Todas</span>
          <span className="py-1 text-mudo">Não lidas</span>
        </div>
        {contatos.map((c) => (
          <div key={c.nome} className={`rounded-lg border p-2.5 ${c.ativo ? "border-ok/40 bg-ok/10" : "border-white/[0.08] bg-white/[0.03]"}`}>
            <p className="text-sm font-semibold leading-tight">{c.nome}</p>
            <p className="mt-0.5 truncate text-xs text-mudo">{c.previa}</p>
            <span className="mt-1.5 block">
              <Pilula>{c.etapa}</Pilula>
            </span>
          </div>
        ))}
      </div>

      <div className={`${cartao} flex min-w-0 flex-col`}>
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-2.5">
          <span aria-hidden="true" className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-acao-cheia/30 text-sm font-semibold">
            L
          </span>
          <span className="min-w-0 flex-1 text-sm">
            <span className="block font-semibold leading-tight">Lead 1</span>
            <span className="text-xs text-mudo">Atendimento pela IA</span>
          </span>
          <Pilula>Novo Lead</Pilula>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 py-3">
          {conversa.map((m, i) => (
            <Bolha key={i} de={m.de} texto={m.texto} atraso={i * 140} />
          ))}
          <div className="entrada mt-auto flex items-center gap-2.5 self-start rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2" style={entrada(conversa.length * 140)}>
            <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-acao-cheia/25 text-dado">
              <Icone nome="funil" tamanho={15} />
            </span>
            <span className="text-[0.8125rem]">
              <span className="font-semibold">Lead qualificado.</span> <span className="text-mudo">Registrado no CRM, etapa Orçamento</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Agendamentos */

const dias = ["Seg 02", "Ter 03", "Qua 04", "Qui 05", "Sex 06", "Sáb 07"];
const horas = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];
// Eventos de exemplo: [linha, coluna, texto, destaque]
const eventos: [number, number, string, boolean][] = [
  [1, 1, "Lead 2", false],
  [2, 2, "Paula", false],
  [4, 3, "Lead 2, confirmado", true],
  [0, 4, "Carlos", false],
];

function TelaAgenda() {
  return (
    <div className="flex h-full flex-col gap-3">
      <Cabeca
        olho="Operacional"
        titulo="Agenda"
        texto="Horários livres e ocupados, ligados ao Google Agenda."
        direita={
          <span className="rounded-lg border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[0.8125rem]">
            <span className="text-mudo">Período </span>
            02 - 07/11/2026
          </span>
        }
      />
      <div className={`${cartao} flex-1 overflow-hidden`}>
        <div className="grid grid-cols-[3.25rem_repeat(6,minmax(0,1fr))] text-center text-[0.6875rem] font-semibold uppercase tracking-wide text-mudo">
          <span />
          {dias.map((d) => (
            <span key={d} className="border-l border-white/[0.08] py-2">
              {d}
            </span>
          ))}
        </div>
        {horas.map((h, r) => (
          <div key={h} className="grid h-[2.6rem] grid-cols-[3.25rem_repeat(6,minmax(0,1fr))] border-t border-white/[0.08] text-xs">
            <span className="pl-2 pt-1 text-mudo">{h}</span>
            {dias.map((d, c) => {
              const ev = eventos.find((e) => e[0] === r && e[1] === c);
              const bloqueado = c === 5;
              return (
                <span key={d} className={`border-l border-white/[0.08] p-0.5 ${bloqueado ? "bg-[repeating-linear-gradient(135deg,transparent_0_5px,rgb(255_255_255/0.04)_5px_10px)]" : ""}`}>
                  {ev && (
                    <span className={`entrada block truncate rounded-md px-1.5 py-1 text-[0.6875rem] font-semibold sm:text-xs ${ev[3] ? "bg-acao-cheia text-white" : "bg-dado/15 text-dado"}`} style={entrada(300 + r * 120)}>
                      {ev[2]}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="entrada flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.8125rem]" style={entrada(700)}>
        <Pilula cor="ok">Horário confirmado</Pilula>
        <span className="font-semibold">Quinta-feira, 14:00</span>
        <span className="text-mudo">Lembrete um dia antes</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Follow-up */

const etapas = [
  { nome: "Novo Lead", cor: "bg-blue-500", sub: "2 passos", ativa: true },
  { nome: "Aguardando contato", cor: "bg-yellow-300", sub: "Sem sequência", ativa: false },
  { nome: "Em contato", cor: "bg-fuchsia-500", sub: "Sem sequência", ativa: false },
  { nome: "Trial iniciada", cor: "bg-lime-300", sub: "Sem sequência", ativa: false },
  { nome: "Ganhou", cor: "bg-emerald-400", sub: "Sem sequência", ativa: false },
];

const passos = [
  { quando: "1 dia depois", texto: "Oi, Paula! Ontem você pediu um orçamento de instalação. Conseguiu ver? Posso tirar alguma dúvida?" },
  { quando: "3 dias depois", texto: "Passando para saber se ficou alguma dúvida. Quer que eu reserve um horário para você?" },
];

function TelaFollowUp() {
  return (
    <div className="flex h-full flex-col gap-3">
      <Cabeca
        titulo="Follow-up Novo Lead"
        texto="Mensagens automáticas e intervalos para acompanhar os leads nesta etapa."
        direita={
          <span className="flex gap-1 rounded-lg border border-white/[0.08] bg-black/20 p-0.5 text-[0.8125rem]">
            <span className="rounded-md bg-white px-3 py-1 font-semibold text-escuro">Mensagens</span>
            <span className="px-3 py-1 text-mudo">Horários</span>
          </span>
        }
      />
      <div className="grid flex-1 gap-3 md:grid-cols-[13rem_minmax(0,1fr)]">
        <div className={`${cartao} hidden flex-col gap-1.5 p-3 md:flex`}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mudo">Etapas do pipeline</p>
          {etapas.map((e) => (
            <div key={e.nome} className={`rounded-lg border px-2.5 py-1.5 ${e.ativa ? "border-white/30 bg-white/[0.12]" : "border-white/[0.08]"}`}>
              <p className="flex items-center gap-2 text-sm font-medium leading-tight">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${e.cor}`} />
                {e.nome}
              </p>
              <p className="pl-[1.125rem] text-xs text-mudo">{e.sub}</p>
            </div>
          ))}
        </div>
        <div className={`${cartao} flex flex-col gap-3 p-4`}>
          <div>
            <p className="text-base font-semibold leading-tight">Visão geral da sequência</p>
            <p className="text-[0.8125rem] text-mudo">Disparada quando o lead entrar em Novo Lead.</p>
          </div>
          <ol className="flex flex-col gap-2.5">
            {passos.map((p, i) => (
              <li key={p.quando} className="entrada flex gap-3" style={entrada(i * 160)}>
                <span aria-hidden="true" className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-acao-cheia/25 text-xs font-bold text-dado">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="text-xs font-semibold text-dado">{p.quando}</span>
                  <span className="mt-1 block rounded-xl rounded-tl-md border border-dado/25 bg-dado/10 px-3 py-2 text-[0.9375rem] leading-snug">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="entrada mt-auto flex flex-wrap items-center gap-2 text-[0.8125rem]" style={entrada(400)}>
            <Pilula cor="ok">Retorno automático</Pilula>
            <span className="text-mudo">Enviado no horário permitido</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- Disparos */

const numeros = [
  { rotulo: "Total de campanhas", valor: "1" },
  { rotulo: "Contatos na fila", valor: "120" },
  { rotulo: "Mensagens enviadas", valor: "82" },
  { rotulo: "Falhas", valor: "0" },
];

function TelaDisparos() {
  return (
    <div className="flex h-full flex-col gap-3">
      <Cabeca
        titulo="Campanhas de WhatsApp"
        direita={<span className="rounded-lg bg-acao-cheia px-3 py-1.5 text-[0.8125rem] font-semibold text-white">+ Nova campanha</span>}
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {numeros.map((n) => (
          <div key={n.rotulo} className={`${cartao} px-3.5 py-2`}>
            <p className="text-xs text-mudo">{n.rotulo}</p>
            <p className="text-2xl font-bold leading-tight tracking-tight">{n.valor}</p>
          </div>
        ))}
      </div>
      <div className="grid flex-1 gap-3 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div className={`${cartao} flex flex-col gap-2 p-3`}>
          <p className="text-sm font-semibold">
            Reativação de clientes <span className="font-normal text-mudo">· campanha em andamento</span>
          </p>
          <div className="entrada flex max-w-[92%] flex-col gap-0.5 self-end" style={entrada(0)}>
            <span className="text-right text-xs font-semibold text-acao">Campanha</span>
            <p className="rounded-2xl rounded-tr-md border border-acao/40 bg-acao-cheia/25 px-3.5 py-2 text-[0.9375rem] leading-snug">Oi, Carlos! Faz um tempo que você não vem. Temos horários livres na quinta. Quer reservar?</p>
          </div>
          <Bolha de="cliente" texto="Quero sim! Pode ser de manhã?" atraso={160} />
          <Bolha de="ia" texto="Claro! Quinta às 9h ou às 10h30. Qual fica melhor?" atraso={320} />
        </div>
        <div className={`${cartao} hidden flex-col gap-2 p-3 md:flex`}>
          <p className="text-sm font-semibold">Fila operacional</p>
          <div>
            <p className="flex justify-between text-xs">
              <span className="text-mudo">Processamento geral</span>
              <span className="font-semibold">68%</span>
            </p>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-[68%] rounded-full bg-dado" />
            </span>
          </div>
          {[
            ["Em andamento", "1", "bg-ok"],
            ["Pausadas", "0", "bg-yellow-300"],
            ["Concluídas", "0", "bg-dado"],
          ].map(([nome, n, cor]) => (
            <p key={nome} className="flex items-center justify-between rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[0.8125rem]">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${cor}`} />
                {nome}
              </span>
              <span className="font-semibold">{n}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const telas = [TelaConversas, TelaAgenda, TelaFollowUp, TelaDisparos];

/** Janela do sistema com quatro telas: cada item do menu troca a tela. */
export function CasosDeUso() {
  const [ativo, setAtivo] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const item = itens[ativo];
  const Tela = telas[ativo];

  const escolher = (i: number, foco = false) => {
    setAtivo(i);
    track("caso_de_uso", { caso: itens[i].id });
    if (foco) abas.current[i]?.focus();
  };

  const aoTeclar = (e: KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      escolher((i + 1) % itens.length, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      escolher((i + itens.length - 1) % itens.length, true);
    }
  };

  return (
    <div className="lg:[zoom:0.85]">
      <div className="painel overflow-hidden bg-[rgb(var(--c-acao-cheia)/0.07)] lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)]">
        {/* Menu da plataforma: no celular vira uma grade de abas; no computador, a barra lateral */}
        <div className="border-b border-white/[0.08] bg-black/25 lg:border-b-0 lg:border-r">
          <div aria-hidden="true" className="hidden items-center gap-2 px-4 pb-2 pt-4 lg:flex">
            <Image src="/img/icone.png" alt="" width={36} height={34} className="h-6 w-auto" />
            <span className="font-semibold tracking-tight">WS3 Systems</span>
          </div>
          <div aria-hidden="true" className="hidden px-4 py-1 text-sm text-mudo lg:block">
            <span className="block py-1.5">Visão Geral</span>
            <span className="block py-1.5">Funil e Contatos</span>
          </div>
          <div role="tablist" aria-label="Telas do WS3 Atendy" aria-orientation="vertical" className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-4 lg:grid-cols-1">
            {itens.map((c, i) => {
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
                  className={`alvo rounded-xl px-3 py-2 text-left transition-colors ${sel ? "bg-white/[0.1]" : "hover:bg-white/[0.05]"}`}
                >
                  <span className={`flex items-center gap-2.5 text-sm font-semibold ${sel ? "text-tinta" : "text-mudo"}`}>
                    <Icone nome={c.icone} tamanho={18} className={`flex-shrink-0 ${sel ? "text-dado" : "text-mudo"}`} />
                    {c.menu}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* A chave refaz a animação de entrada a cada troca de tela */}
        <div id="painel-caso" role="tabpanel" aria-labelledby={`aba-${item.id}`} className="min-w-0 p-3 lg:h-[26rem]">
          <div key={item.id} className="h-full">
            <Tela />
          </div>
        </div>
      </div>
      <p className="mt-1.5 text-sm text-mudo">Telas ilustrativas do WS3 Atendy. Conversas e números são exemplos, não clientes reais.</p>
    </div>
  );
}
