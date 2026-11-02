"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Icone, type NomeIcone } from "./Icone";

/**
 * Palco do topo da home: o fluxo do atendimento acontecendo, não uma tela de celular.
 * O cliente chama no WhatsApp, o WS3 Atendy responde e, em volta dele, o que o sistema faz vai acendendo:
 * qualifica, agenda, avisa a equipe, programa o retorno. Linhas de luz levam o dado de um ponto ao outro.
 * A cena leva cerca de 6 s, fica viva (o núcleo pulsa) e recomeça a cada 12 s, com saída suave.
 * Pausa com a aba escondida; com movimento reduzido aparece pronta e parada.
 * Decorativo: o `aria-label` resume a cena e o resto fica escondido da leitura de tela.
 */

const chega = (ms: number) => ({ "--chega": `${ms}ms` }) as CSSProperties;
const luz = (ms: number) => ({ "--luz": `${ms}ms` }) as CSSProperties;

// Caminhos no espaço 448 x 512 do SVG (esticado para a largura da cena).
const P_PERGUNTA = "M286 70 C 312 70, 322 60, 340 58";
const P_NUCLEO = "M392 114 L 392 282";
const P_LEAD = "M196 334 C 250 334, 252 310, 304 310";

const selos: { rotulo: string; icone: NomeIcone; pos: string; chega: number }[] = [
  { rotulo: "Lead qualificado", icone: "pessoa", pos: "left-0 top-[316px]", chega: 3700 },
  { rotulo: "Equipe avisada", icone: "equipe", pos: "left-[8%] top-[372px]", chega: 4900 },
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

function Cena() {
  return (
    <div
      role="img"
      aria-label="Ilustração do fluxo: o cliente pergunta no WhatsApp, a IA do WS3 Atendy responde, qualifica o contato, agenda o horário, avisa a equipe e programa o retorno."
      className="relative h-[32rem] w-full"
    >
      <div aria-hidden="true" className="contents">
        {/* Linhas: um traço fraco por caminho e, por cima, a luz que leva o dado de um ponto ao outro */}
        <svg viewBox="0 0 448 512" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
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
          Oi! Vocês fazem orçamento para instalação?
        </p>

        {/* Resposta da IA: o "digitando…" ocupa o lugar do texto, que já tem o espaço reservado */}
        <div className="absolute left-[26%] top-[150px] w-[66%]">
          <div className="conversa-chega origin-top-right rounded-2xl rounded-tr-md border border-dado/25 bg-escuro/80 px-4 py-3 backdrop-blur-md" style={chega(3000)}>
            <span className="block text-[0.8125rem] font-semibold text-dado">WS3 Atendy</span>
            Fazemos, sim! Me diz o bairro e o que precisa instalar?
          </div>
          <span className="absolute left-3 top-8" style={{ "--digita": "1900ms", "--digita-dur": "1100ms" } as CSSProperties}>
            <Digitando />
          </span>
        </div>

        {/* O que o sistema fez */}
        {selos.map((s) => (
          <span key={s.rotulo} className={`conversa-chega absolute inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold ${vidro} ${s.pos}`} style={chega(s.chega)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-acao/25 bg-acao-cheia/20 text-dado">
              <Icone nome={s.icone} tamanho={18} />
            </span>
            {s.rotulo}
          </span>
        ))}

        <span
          className="conversa-chega absolute right-0 top-[280px] z-10 inline-flex items-center gap-3 rounded-full border border-acao/50 bg-escuro/90 py-2 pl-2 pr-5 font-semibold shadow-[0_0_40px_-10px_rgb(var(--c-acao-cheia)/0.9)] backdrop-blur-md"
          style={chega(4200)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-acao-cheia text-white">
            <Icone nome="calendario" tamanho={19} />
          </span>
          Horário agendado
        </span>

        <div className={`conversa-chega absolute right-0 top-[396px] w-[56%] rounded-2xl p-4 ${vidro}`} style={chega(5600)}>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[0.8125rem] text-mudo">Follow-up programado</span>
            <Icone nome="retorno" tamanho={18} className="text-dado" />
          </div>
          <span className="mt-1 block text-2xl font-bold tracking-tight">Amanhã, 9h</span>
          <span className="block text-[0.8125rem] text-mudo">retorno automático</span>
        </div>
      </div>
    </div>
  );
}

const CICLO = 12000;
const SAIDA = 450;

export function PalcoHero() {
  const [volta, setVolta] = useState(0);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let sair: ReturnType<typeof setTimeout>;
    let trocar: ReturnType<typeof setTimeout>;
    const agendar = () => {
      sair = setTimeout(() => {
        if (document.hidden) return agendar();
        setSaindo(true);
        trocar = setTimeout(() => {
          setVolta((v) => v + 1);
          setSaindo(false);
          agendar();
        }, SAIDA);
      }, CICLO - SAIDA);
    };
    agendar();
    return () => {
      clearTimeout(sair);
      clearTimeout(trocar);
    };
  }, []);

  return (
    <div>
      <div key={volta} className="transition-opacity ease-out" style={{ opacity: saindo ? 0 : 1, transitionDuration: `${SAIDA}ms` }}>
        <Cena />
      </div>
      <p className="mt-2 text-sm text-mudo">Exemplo ilustrativo do WS3 Atendy. A IA responde conforme as informações autorizadas pela empresa.</p>
    </div>
  );
}
