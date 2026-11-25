"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Icone, type NomeIcone } from "./Icone";

/**
 * Palco do topo da home: o tráfego pago e o WS3 Atendy trabalhando juntos, em duas cores (branco e ciano).
 * O anúncio aparece, alguém toca nele e chama no WhatsApp, e o WS3 Atendy responde na hora e registra o contato.
 * Uma luz desce pelo trilho ligando as três etapas. A cena leva cerca de 6 s e, a cada 11 s, dá lugar ao exemplo
 * seguinte, de outro nicho e outra plataforma de anúncio (ver `cenarios`). Os pontos abaixo escolhem o exemplo.
 * Pausa com a aba escondida; com movimento reduzido aparece pronta e parada, e só os pontos trocam de exemplo.
 * Decorativo: o `aria-label` resume a cena e o resto fica escondido da leitura de tela.
 */

const chega = (ms: number) => ({ "--chega": `${ms}ms` }) as CSSProperties;

type Selo = { rotulo: string; icone: NomeIcone };
type Cenario = {
  nicho: string;
  plataforma: string;
  anuncio: string;
  pergunta: string;
  resposta: string;
  selos: [Selo, Selo];
  destaque: Selo;
};

/** Exemplos ilustrativos de anúncio seguido de atendimento, de nichos diferentes. Não são casos reais nem promessa de resultado. */
const cenarios: Cenario[] = [
  {
    nicho: "Clínica de estética, anúncio no Instagram",
    plataforma: "Instagram",
    anuncio: "Limpeza de pele: horários abertos esta semana",
    pergunta: "Vi o anúncio de vocês. Ainda tem horário essa semana?",
    resposta: "Tem sim! Você prefere de manhã ou à tarde?",
    selos: [
      { rotulo: "Veio do Instagram", icone: "megafone" },
      { rotulo: "Lead qualificado", icone: "pessoa" },
    ],
    destaque: { rotulo: "Horário agendado", icone: "calendario" },
  },
  {
    nicho: "Serviços e instalações, anúncio no Google",
    plataforma: "Google",
    anuncio: "Instalação com orçamento rápido na sua região",
    pergunta: "Oi! Vocês fazem orçamento para instalação?",
    resposta: "Fazemos, sim! Me diz o bairro e o que precisa instalar?",
    selos: [
      { rotulo: "Veio do Google", icone: "megafone" },
      { rotulo: "Equipe avisada", icone: "equipe" },
    ],
    destaque: { rotulo: "Visita agendada", icone: "calendario" },
  },
  {
    nicho: "Loja e comércio, anúncio no Facebook",
    plataforma: "Facebook",
    anuncio: "Plano anual com condição especial neste mês",
    pergunta: "Vocês têm o plano anual? Quanto custa?",
    resposta: "Temos! Posso te passar os valores e fechar por aqui. Pode ser?",
    selos: [
      { rotulo: "Veio do Facebook", icone: "megafone" },
      { rotulo: "Interesse de compra", icone: "carrinho" },
    ],
    destaque: { rotulo: "Proposta enviada", icone: "envio" },
  },
  {
    nicho: "Consultório e estúdio, anúncio no Instagram",
    plataforma: "Instagram",
    anuncio: "Agende sua consulta pelo WhatsApp",
    pergunta: "Quero marcar um horário essa semana.",
    resposta: "Claro! Quinta tenho 10h30, 14h ou 16h30. Qual prefere?",
    selos: [
      { rotulo: "Veio do Instagram", icone: "megafone" },
      { rotulo: "Agenda consultada", icone: "calendario" },
    ],
    destaque: { rotulo: "Horário confirmado", icone: "calendario" },
  },
];

const WHATSAPP =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const vidro = "border border-white/10 bg-escuro/80 backdrop-blur-md";
const no = "conversa-chega absolute -left-14 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-escuro";

function Digitando() {
  return (
    <span className="conversa-digitando">
      <span />
      <span />
      <span />
    </span>
  );
}

function Cena({ c }: { c: Cenario }) {
  const [selo1, selo2] = c.selos;
  return (
    <div
      role="img"
      aria-label={`Ilustração de tráfego pago e atendimento, ${c.nicho}. O anúncio no ${c.plataforma} diz: ${c.anuncio}. O cliente chama no WhatsApp: ${c.pergunta} A IA do WS3 Atendy responde: ${c.resposta} O sistema registra: ${selo1.rotulo}, ${selo2.rotulo}, ${c.destaque.rotulo}.`}
      className="w-full"
    >
      <div aria-hidden="true" className="relative ml-14 min-h-[30rem]">
        {/* Trilho: um traço fraco ligando as três etapas e, por cima, a luz que leva o cliente do anúncio à resposta */}
        <span className="fluxo-trilho absolute -left-[2.0625rem] bottom-6 top-6 w-0.5 rounded-full" style={{ "--luz": "1300ms", "--luz-dur": "3200ms" } as CSSProperties} />

        {/* 1. O anúncio (tráfego pago) */}
        <div className="relative">
          <span className={`${no} border-dado/50 text-dado`} style={chega(100)}>
            <Icone nome="megafone" tamanho={20} />
          </span>
          <p className="conversa-chega mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-dado" style={chega(150)}>
            Tráfego pago · {c.plataforma}
          </p>
          <div className={`conversa-chega rounded-2xl p-3.5 ${vidro}`} style={chega(250)}>
            <div className="flex items-start gap-3">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-dado/25 bg-dado/10 text-dado">
                <Icone nome="grafico" tamanho={24} />
              </span>
              <div className="min-w-0">
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-mudo">Patrocinado</span>
                <span className="block font-semibold leading-snug">{c.anuncio}</span>
              </div>
            </div>
            <span className="relative mt-3 inline-flex">
              <span className="fluxo-anel absolute inset-0 rounded-full border border-dado/60" style={{ animationDelay: "900ms" }} />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-dado/40 bg-dado/10 px-4 py-1.5 text-sm font-semibold text-dado">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={WHATSAPP} />
                </svg>
                Enviar mensagem
              </span>
            </span>
          </div>
        </div>

        {/* 2. O cliente chama no WhatsApp */}
        <div className="relative mt-7">
          <span className={`${no} border-white/30 text-sobre-escuro`} style={chega(1800)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d={WHATSAPP} />
            </svg>
          </span>
          <p className={`conversa-chega w-[88%] rounded-2xl rounded-tl-md px-4 py-3 ${vidro}`} style={chega(1900)}>
            {c.pergunta}
          </p>
        </div>

        {/* 3. O WS3 Atendy responde: o "digitando…" ocupa o lugar do texto, que já tem o espaço reservado */}
        <div className="relative mt-5">
          <span className={`${no} border-dado/60 bg-dado/15 shadow-[0_0_44px_-6px_rgb(var(--c-dado)/0.8)]`} style={chega(2900)}>
            <Image src="/img/icone.png" alt="" width={36} height={34} className="h-6 w-auto" />
          </span>
          <div className="relative ml-auto w-[92%]">
            <div className="conversa-chega rounded-2xl rounded-tr-md border border-dado/30 bg-escuro/80 px-4 py-3 backdrop-blur-md" style={chega(4100)}>
              <span className="block text-[0.8125rem] font-semibold text-dado">WS3 Atendy</span>
              {c.resposta}
            </div>
            <span className="absolute left-3 top-8" style={{ "--digita": "2900ms", "--digita-dur": "1100ms" } as CSSProperties}>
              <Digitando />
            </span>
          </div>
        </div>

        {/* O que o sistema registrou */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { ...selo1, ms: 4800 },
            { ...selo2, ms: 5300 },
          ].map((x) => (
            <span key={x.rotulo} className={`conversa-chega inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3.5 text-sm font-semibold ${vidro}`} style={chega(x.ms)}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-dado/25 bg-dado/15 text-dado">
                <Icone nome={x.icone} tamanho={16} />
              </span>
              {x.rotulo}
            </span>
          ))}
          <span
            className="conversa-chega inline-flex items-center gap-2 rounded-full bg-dado py-1 pl-1 pr-4 text-sm font-bold text-escuro shadow-[0_0_36px_-8px_rgb(var(--c-dado)/0.9)]"
            style={chega(5900)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-escuro/15">
              <Icone nome={c.destaque.icone} tamanho={16} />
            </span>
            {c.destaque.rotulo}
          </span>
        </div>
      </div>
    </div>
  );
}

const CICLO = 11000;
const SAIDA = 450;

export function PalcoHero() {
  const [atual, setAtual] = useState(0);
  const [saindo, setSaindo] = useState(false);

  // Troca de exemplo sozinha. Escolher um ponto muda `atual` e o relógio recomeça.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let sair: ReturnType<typeof setTimeout>;
    let trocar: ReturnType<typeof setTimeout>;
    const agendar = () => {
      sair = setTimeout(() => {
        if (document.hidden) return agendar();
        setSaindo(true);
        trocar = setTimeout(() => {
          setAtual((v) => (v + 1) % cenarios.length);
          setSaindo(false);
        }, SAIDA);
      }, CICLO - SAIDA);
    };
    agendar();
    return () => {
      clearTimeout(sair);
      clearTimeout(trocar);
    };
  }, [atual]);

  return (
    <div>
      <div key={atual} className="transition-opacity ease-out" style={{ opacity: saindo ? 0 : 1, transitionDuration: `${SAIDA}ms` }}>
        <Cena c={cenarios[atual]} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-mudo">
          <span className="font-semibold text-sobre-escuro/90">{cenarios[atual].nicho}</span>
          <span className="block">Exemplo ilustrativo de tráfego pago com o WS3 Atendy.</span>
        </p>
        <div role="group" aria-label="Exemplos de anúncio e atendimento" className="flex flex-shrink-0">
          {cenarios.map((c, i) => (
            <button
              key={c.nicho}
              type="button"
              aria-label={`Ver o exemplo: ${c.nicho}`}
              aria-current={i === atual ? "true" : undefined}
              onClick={() => {
                setSaindo(false);
                setAtual(i);
              }}
              className="group flex h-11 w-6 items-center justify-center"
            >
              <span className={`h-2 rounded-full transition-all duration-300 ${i === atual ? "w-5 bg-dado" : "w-2 bg-white/25 group-hover:bg-white/50"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
