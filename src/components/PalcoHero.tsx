import Image from "next/image";
import type { CSSProperties } from "react";
import { ConversaExemplo } from "./ConversaExemplo";

/**
 * Palco do topo da home: o WhatsApp chama, o WS3 Atendy responde, e as etapas do atendimento acendem.
 * Tudo acontece uma vez, em cerca de 7 s, sincronizado com a conversa de exemplo (ver `roteiro` em ConversaExemplo).
 * Só CSS e SVG. Com movimento reduzido, a cena aparece pronta.
 */

const etapas = [
  { id: "ia", rotulo: "IA atendendo", cor: "bg-dado", chega: 1200 },
  { id: "equipe", rotulo: "Com a equipe", cor: "bg-acao", chega: 3100 },
  { id: "agendado", rotulo: "Agendado", cor: "bg-ok", chega: 6400 },
];

const chega = (ms: number) => ({ "--chega": `${ms}ms` }) as CSSProperties;

// Curva do ícone do WhatsApp até o ícone da WS3, no espaço 448 x 96 do SVG.
const CURVA = "M28 48 C 130 -8, 300 104, 400 48";

export function PalcoHero() {
  return (
    <div>
      {/* Decorativo: o que ele conta já está dito na conversa e nas etapas */}
      <div aria-hidden="true" className="relative h-24">
        <svg viewBox="0 0 448 96" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
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

        <span className="conversa-chega absolute left-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center" style={chega(100)}>
          <span className="palco-anel absolute inset-0 rounded-full border border-ok/60" style={{ ["--atraso" as string]: "700ms" } as CSSProperties} />
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ok/50 bg-escuro text-ok">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </span>

        <span className="conversa-chega absolute right-0 top-1/2 flex h-24 w-24 -translate-y-1/2 items-center justify-center" style={chega(300)}>
          <span className="palco-anel absolute inset-0 rounded-full border border-dado/40" style={{ ["--atraso" as string]: "500ms" } as CSSProperties} />
          <span className="palco-anel absolute inset-2.5 rounded-full border border-acao/50" style={{ ["--atraso" as string]: "1300ms" } as CSSProperties} />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-acao-cheia/60 bg-acao-cheia/20 shadow-[0_0_44px_-6px_rgb(var(--c-acao-cheia)/0.9)]">
            <Image src="/img/icone.png" alt="" width={36} height={34} className="h-7 w-auto" />
          </span>
        </span>
      </div>

      <ConversaExemplo compacta />

      <ol aria-label="Etapas do atendimento de exemplo" className="mt-4 flex flex-wrap items-center gap-2">
        {etapas.map((e, i) => (
          <li key={e.id} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="palco-fio hidden h-px w-5 bg-white/20 sm:block" style={chega(e.chega - 300)} />}
            <span className="conversa-chega inline-flex items-center gap-2 rounded-full border border-white/10 bg-escuro/80 px-3.5 py-2 text-sm font-semibold backdrop-blur-md" style={chega(e.chega)}>
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${e.cor}`} />
              {e.rotulo}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
