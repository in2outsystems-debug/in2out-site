"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Icone, type NomeIcone } from "./Icone";

/**
 * Palco do topo da home: o fluxo do atendimento acontecendo, não uma tela de celular.
 * O cliente chama no WhatsApp, o WS3 Atendy responde e, em volta dele, o que o sistema faz vai acendendo:
 * qualifica, agenda, avisa a equipe, programa o retorno. Linhas de luz levam o dado de um ponto ao outro.
 * A cena leva cerca de 6 s, fica viva (o núcleo pulsa) e, a cada 11 s, dá lugar ao exemplo seguinte, de outro
 * nicho e outra situação (ver `cenarios`). Os pontos abaixo da cena deixam escolher o exemplo.
 * Pausa com a aba escondida; com movimento reduzido aparece pronta e parada, e só os pontos trocam de exemplo.
 * Decorativo: o `aria-label` resume a cena e o resto fica escondido da leitura de tela.
 */

const chega = (ms: number) => ({ "--chega": `${ms}ms` }) as CSSProperties;
const luz = (ms: number) => ({ "--luz": `${ms}ms` }) as CSSProperties;

// Caminhos no espaço 448 x 544 do SVG (esticado para a largura da cena).
const P_PERGUNTA = "M286 70 C 312 70, 322 60, 340 58";
const P_NUCLEO = "M392 114 L 392 282";
const P_LEAD = "M196 334 C 250 334, 252 310, 304 310";

type Selo = { rotulo: string; icone: NomeIcone };
type Cenario = {
  nicho: string;
  pergunta: string;
  resposta: string;
  selos: [Selo, Selo];
  destaque: Selo;
  cartao: { titulo: string; valor: string; detalhe: string; icone: NomeIcone };
};

/** Exemplos ilustrativos de situações de atendimento, de nichos diferentes. Não são casos reais nem promessa de resultado. */
const cenarios: Cenario[] = [
  {
    nicho: "Serviços e instalações",
    pergunta: "Oi! Vocês fazem orçamento para instalação?",
    resposta: "Fazemos, sim! Me diz o bairro e o que precisa instalar?",
    selos: [
      { rotulo: "Lead qualificado", icone: "pessoa" },
      { rotulo: "Equipe avisada", icone: "equipe" },
    ],
    destaque: { rotulo: "Horário agendado", icone: "calendario" },
    cartao: { titulo: "Follow-up programado", valor: "Amanhã, 9h", detalhe: "retorno automático", icone: "retorno" },
  },
  {
    nicho: "Clínica de estética, vindo de anúncio",
    pergunta: "Vi o anúncio de vocês. Ainda tem horário essa semana?",
    resposta: "Tem sim! Você prefere de manhã ou à tarde?",
    selos: [
      { rotulo: "Veio de anúncio", icone: "megafone" },
      { rotulo: "Lead qualificado", icone: "pessoa" },
    ],
    destaque: { rotulo: "Contato no CRM", icone: "funil" },
    cartao: { titulo: "Origem do contato", valor: "Instagram", detalhe: "anúncio registrado", icone: "megafone" },
  },
  {
    nicho: "Consultório e estúdio, agendamento",
    pergunta: "Quero marcar um horário essa semana.",
    resposta: "Claro! Quinta tenho 10h30, 14h ou 16h30. Qual prefere?",
    selos: [
      { rotulo: "Agenda consultada", icone: "calendario" },
      { rotulo: "Google Agenda atualizado", icone: "check" },
    ],
    destaque: { rotulo: "Horário confirmado", icone: "calendario" },
    cartao: { titulo: "Lembrete", valor: "1 dia antes", detalhe: "enviado automaticamente", icone: "espera" },
  },
  {
    nicho: "Orçamento sem resposta, follow-up",
    pergunta: "Vi a mensagem sobre o orçamento. Pode ser na sexta?",
    resposta: "Pode! Tenho 9h ou 15h na sexta. Qual prefere?",
    selos: [
      { rotulo: "Retorno automático", icone: "retorno" },
      { rotulo: "Cliente reativado", icone: "pessoa" },
    ],
    destaque: { rotulo: "Horário agendado", icone: "calendario" },
    cartao: { titulo: "Follow-up enviado", valor: "Ontem, 9h", detalhe: "no horário permitido", icone: "retorno" },
  },
  {
    nicho: "Assistência técnica",
    pergunta: "Minha impressora parou de imprimir. Podem ajudar?",
    resposta: "Posso sim! Aparece alguma luz vermelha no painel?",
    selos: [
      { rotulo: "Problema identificado", icone: "ferramenta" },
      { rotulo: "Histórico salvo", icone: "lista" },
    ],
    destaque: { rotulo: "Equipe avisada", icone: "equipe" },
    cartao: { titulo: "Atendimento", valor: "Com a equipe", detalhe: "conversa e histórico juntos", icone: "conversa" },
  },
  {
    nicho: "Loja e comércio, venda",
    pergunta: "Vocês têm o plano anual? Quanto custa?",
    resposta: "Temos! Posso te passar os valores e fechar por aqui. Pode ser?",
    selos: [
      { rotulo: "Interesse de compra", icone: "carrinho" },
      { rotulo: "Lead qualificado", icone: "pessoa" },
    ],
    destaque: { rotulo: "Proposta enviada", icone: "envio" },
    cartao: { titulo: "Funil", valor: "Negociação", detalhe: "etapa atualizada no CRM", icone: "funil" },
  },
];

const WHATSAPP =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const vidro = "border border-white/10 bg-escuro/80 backdrop-blur-md";

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
      aria-label={`Ilustração de um atendimento, ${c.nicho}. O cliente escreve: ${c.pergunta} A IA do WS3 Atendy responde: ${c.resposta} O sistema registra: ${selo1.rotulo}, ${selo2.rotulo}, ${c.destaque.rotulo}.`}
      className="relative h-[34rem] w-full"
    >
      <div aria-hidden="true" className="contents">
        {/* Linhas: um traço fraco por caminho e, por cima, a luz que leva o dado de um ponto ao outro */}
        <svg viewBox="0 0 448 544" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="fluxo-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="rgb(var(--c-acao-forte))" stopOpacity="0.95" />
              <stop offset="1" stopColor="rgb(var(--c-acao))" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {[
            { d: P_PERGUNTA, em: 1300 },
            { d: P_NUCLEO, em: 3400 },
            { d: P_LEAD, em: 4300 },
          ].map((l) => (
            <g key={l.d}>
              <path d={l.d} fill="none" stroke="rgb(255 255 255 / 0.16)" strokeWidth="1.5" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" className="fluxo-linha" style={chega(l.em - 400)} />
              <path d={l.d} pathLength={1} fill="none" stroke="url(#fluxo-grad)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="fluxo-luz" style={luz(l.em)} />
            </g>
          ))}
        </svg>

        {/* Núcleo: o sistema, sempre ativo */}
        <span className="conversa-chega absolute right-0 top-0 flex h-28 w-28 items-center justify-center" style={chega(100)}>
          <span className="fluxo-anel absolute inset-0 rounded-full border border-dado/40" />
          <span className="fluxo-anel absolute inset-2 rounded-full border border-acao/50" style={{ animationDelay: "1000ms" }} />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-acao-cheia/60 bg-acao-cheia/20 shadow-[0_0_56px_-6px_rgb(var(--c-acao-cheia)/0.95)]">
            <Image src="/img/icone.png" alt="" width={36} height={34} className="h-8 w-auto" />
          </span>
        </span>

        {/* Pergunta do cliente */}
        <span className="conversa-chega absolute left-0 top-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ok/50 bg-escuro text-ok" style={chega(300)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d={WHATSAPP} />
          </svg>
        </span>
        <p className={`conversa-chega absolute left-[8%] top-[34px] w-[58%] origin-top-left rounded-2xl rounded-tl-md px-4 py-3 ${vidro}`} style={chega(700)}>
          {c.pergunta}
        </p>

        {/* Resposta da IA: o "digitando…" ocupa o lugar do texto, que já tem o espaço reservado */}
        <div className="absolute left-[26%] top-[150px] w-[66%]">
          <div className="conversa-chega origin-top-right rounded-2xl rounded-tr-md border border-dado/25 bg-escuro/80 px-4 py-3 backdrop-blur-md" style={chega(3000)}>
            <span className="block text-[0.8125rem] font-semibold text-dado">WS3 Atendy</span>
            {c.resposta}
          </div>
          <span className="absolute left-3 top-8" style={{ "--digita": "1900ms", "--digita-dur": "1100ms" } as CSSProperties}>
            <Digitando />
          </span>
        </div>

        {/* O que o sistema fez */}
        {[
          { ...selo1, pos: "left-0 top-[316px]", ms: 3700 },
          { ...selo2, pos: "left-[8%] top-[372px]", ms: 4900 },
        ].map((x) => (
          <span key={x.rotulo} className={`conversa-chega absolute inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold ${vidro} ${x.pos}`} style={chega(x.ms)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-acao/25 bg-acao-cheia/20 text-dado">
              <Icone nome={x.icone} tamanho={18} />
            </span>
            {x.rotulo}
          </span>
        ))}

        <span
          className="conversa-chega absolute right-0 top-[280px] z-10 inline-flex items-center gap-3 rounded-full border border-acao/50 bg-escuro/90 py-2 pl-2 pr-5 font-semibold shadow-[0_0_40px_-10px_rgb(var(--c-acao-cheia)/0.9)] backdrop-blur-md"
          style={chega(4200)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-acao-cheia text-white">
            <Icone nome={c.destaque.icone} tamanho={19} />
          </span>
          {c.destaque.rotulo}
        </span>

        <div className={`conversa-chega absolute right-0 top-[424px] w-[56%] rounded-2xl p-4 ${vidro}`} style={chega(5600)}>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[0.8125rem] text-mudo">{c.cartao.titulo}</span>
            <Icone nome={c.cartao.icone} tamanho={18} className="text-dado" />
          </div>
          <span className="mt-1 block text-xl font-bold tracking-tight">{c.cartao.valor}</span>
          <span className="block text-[0.8125rem] text-mudo">{c.cartao.detalhe}</span>
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
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-sm text-mudo">
          <span className="font-semibold text-sobre-escuro/90">{cenarios[atual].nicho}</span>
          <span className="block">Exemplo ilustrativo do WS3 Atendy.</span>
        </p>
        <div role="group" aria-label="Exemplos de atendimento" className="flex flex-shrink-0">
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
