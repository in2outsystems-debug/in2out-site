"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Icone, type NomeIcone } from "./Icone";

/**
 * Palco do topo da home: o WhatsApp chama, o WS3 Atendy responde, e dois selos mostram o que ele fez.
 * Pouco texto de propósito: uma pergunta, uma resposta, dois selos. A cena leva cerca de 5 s, fica parada para ser lida
 * e recomeça, com uma saída suave. Pausa com a aba escondida e não repete com movimento reduzido.
 * Só CSS e SVG. Com movimento reduzido, a cena aparece pronta.
 */

const selos: { rotulo: string; icone: NomeIcone; chega: number; lado: string }[] = [
  { rotulo: "Lead qualificado", icone: "pessoa", chega: 3200, lado: "self-start pl-4" },
  { rotulo: "Horário agendado", icone: "calendario", chega: 4300, lado: "self-end pr-2" },
];

function Digitando() {
  return (
    <span className="conversa-digitando">
      <span />
      <span />
      <span />
    </span>
  );
}

const chega = (ms: number) => ({ "--chega": `${ms}ms` }) as CSSProperties;

// Curva do ícone do WhatsApp até o ícone da WS3, no espaço 448 x 64 do SVG.
const CURVA = "M24 32 C 120 0, 300 64, 416 32";

function Cena() {
  return (
    <div>
      {/* Decorativo: o que ele conta já está dito na conversa e nas etapas */}
      <div aria-hidden="true" className="relative mb-2 h-16">
        <svg viewBox="0 0 448 64" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="palco-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="rgb(var(--c-ok))" stopOpacity="0.6" />
              <stop offset="1" stopColor="rgb(var(--c-acao-forte))" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d={CURVA} pathLength={1} fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" className="palco-linha" />
          {/* Luz que vai com a pergunta e volta com a resposta */}
          <path d={CURVA} pathLength={1} fill="none" stroke="url(#palco-grad)" strokeWidth="2.5" strokeLinecap="round" className="palco-luz palco-luz-ida" />
          <path d={CURVA} pathLength={1} fill="none" stroke="url(#palco-grad)" strokeWidth="2.5" strokeLinecap="round" className="palco-luz palco-luz-volta" />
        </svg>

        <span className="conversa-chega absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center" style={chega(100)}>
          <span className="palco-anel absolute inset-0 rounded-full border border-ok/60" style={{ ["--atraso" as string]: "700ms" } as CSSProperties} />
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ok/50 bg-escuro text-ok">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </span>

        <span className="conversa-chega absolute right-0 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center" style={chega(300)}>
          <span className="palco-anel absolute inset-0 rounded-full border border-dado/40" style={{ ["--atraso" as string]: "500ms" } as CSSProperties} />
          <span className="palco-anel absolute -inset-2 rounded-full border border-acao/50" style={{ ["--atraso" as string]: "1300ms" } as CSSProperties} />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-acao-cheia/60 bg-acao-cheia/20 shadow-[0_0_44px_-6px_rgb(var(--c-acao-cheia)/0.9)]">
            <Image src="/img/icone.png" alt="" width={36} height={34} className="h-6 w-auto" />
          </span>
        </span>
      </div>

      {/* Cena solta, sem moldura: uma pergunta, uma resposta e dois selos do que o sistema fez */}
      <div className="flex flex-col gap-3">
        <p className="conversa-chega max-w-[80%] origin-top-left self-start rounded-2xl rounded-tl-md border border-white/10 bg-escuro/80 px-4 py-2.5 backdrop-blur-md" style={chega(700)}>
          Oi! Vocês fazem orçamento para instalação?
        </p>

        {/* O "digitando…" ocupa o lugar da resposta, que já tem o espaço reservado: nada pula. */}
        <div className="grid max-w-[84%] justify-items-end self-end">
          <p
            className="conversa-chega col-start-1 row-start-1 origin-top-right rounded-2xl rounded-tr-md border border-dado/25 bg-dado/10 px-4 py-2.5 backdrop-blur-md"
            style={chega(2400)}
          >
            Fazemos, sim! Me diz o bairro e o que precisa instalar?
          </p>
          <span aria-hidden="true" className="col-start-1 row-start-1 self-start" style={{ "--digita": "1200ms", "--digita-dur": "1200ms" } as CSSProperties}>
            <Digitando />
          </span>
        </div>

        <ul aria-label="O que o sistema fez" className="mt-1 flex flex-col gap-3">
          {selos.map((e) => (
            <li key={e.rotulo} className={`conversa-chega ${e.lado}`} style={chega(e.chega)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-escuro/80 py-1.5 pl-1.5 pr-4 text-sm font-semibold backdrop-blur-md">
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-acao/25 bg-acao-cheia/20 text-dado">
                  <Icone nome={e.icone} tamanho={18} />
                </span>
                {e.rotulo}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-sm text-mudo">Exemplo com o WS3 Atendy. A IA responde conforme as informações autorizadas pela empresa.</p>
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
    <div key={volta} className="transition-opacity ease-out" style={{ opacity: saindo ? 0 : 1, transitionDuration: `${SAIDA}ms` }}>
      <Cena />
    </div>
  );
}
