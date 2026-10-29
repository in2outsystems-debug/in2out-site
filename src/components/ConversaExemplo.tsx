import type { CSSProperties } from "react";

/**
 * Ilustração de uma conversa no WS3 Atendy: cliente, IA, registro no CRM e passagem para a equipe.
 * Não é captura de tela. Troque por telas reais quando existirem.
 */

type Item =
  | { tipo: "cliente" | "ia" | "equipe"; texto: string }
  | { tipo: "evento"; texto: string };

const conversa: Item[] = [
  { tipo: "cliente", texto: "Oi! Vocês fazem orçamento para instalação?" },
  { tipo: "ia", texto: "Olá! Fazemos, sim. Para passar o orçamento certo, me diz o bairro e o que precisa instalar?" },
  { tipo: "cliente", texto: "Centro. É um ar‑condicionado." },
  { tipo: "evento", texto: "Contato registrado no CRM, etapa Orçamento" },
  { tipo: "evento", texto: "Passado para a equipe: precisa de visita técnica" },
  { tipo: "equipe", texto: "Oi, aqui é da equipe! Posso marcar a visita para amanhã às 10h?" },
  { tipo: "cliente", texto: "Pode ser! Combinado." },
];

const autor = { cliente: "Cliente", ia: "IA", equipe: "Equipe" } as const;

/** Versão curta para o topo da home: três mensagens (cliente, IA, equipe) e o aviso de passagem. */
const curta = [0, 1, 4, 5];

/**
 * Roteiro da versão animada, em ms desde o carregamento.
 * O cartão entra com a primeira dobra (cerca de 0,6 s); depois a conversa acontece uma vez.
 * `digita` é quando aparece o "digitando…"; `chega` é quando a mensagem aparece.
 */
const roteiro: { digita?: number; chega: number }[] = [
  { chega: 700 },
  { digita: 1200, chega: 2400 },
  { chega: 3100 },
  { digita: 3600, chega: 4700 },
];

const tempo = (ms?: number) => (ms === undefined ? undefined : `${ms}ms`);

function Digitando() {
  return (
    <span aria-hidden="true" className="conversa-digitando">
      <span />
      <span />
      <span />
    </span>
  );
}

export function ConversaExemplo({ compacta = false }: { compacta?: boolean }) {
  const itens = compacta ? curta.map((i) => conversa[i]) : conversa;
  // Só a versão do topo é animada: nas outras seções ela entra junto com o resto da página.
  const animada = compacta;

  return (
    <figure className="painel bg-superficie/80 p-4 backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3 text-sm">
        <span className="font-semibold">Atendimento no WhatsApp</span>
        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-mudo">Exemplo</span>
      </div>
      <ol className="mt-4 flex flex-col gap-3">
        {itens.map((item, i) => {
          const passo = animada ? roteiro[i] : undefined;
          const chega = { "--chega": tempo(passo?.chega) } as CSSProperties;

          if (item.tipo === "evento") {
            return (
              <li key={i} className={`flex items-baseline gap-2 self-center text-sm text-mudo ${passo ? "conversa-chega" : ""}`} style={chega}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado ${passo ? "conversa-pulso" : ""}`} />
                {item.texto}
              </li>
            );
          }

          const digita = passo?.digita;
          return (
            <li key={i} className={`flex max-w-[85%] flex-col gap-1 ${item.tipo === "cliente" ? "self-start" : "items-end self-end"}`}>
              <span
                className={`text-[0.8125rem] font-semibold ${item.tipo === "cliente" ? "text-mudo" : item.tipo === "ia" ? "text-dado" : "text-acao"} ${passo ? "conversa-chega" : ""}`}
                style={{ "--chega": tempo(digita ?? passo?.chega) } as CSSProperties}
              >
                {autor[item.tipo]}
              </span>
              {/* O "digitando…" ocupa o lugar da mensagem, que já tem o espaço reservado: nada pula. */}
              <div className="grid justify-items-end">
                <p
                  className={`col-start-1 row-start-1 rounded-2xl px-4 py-2.5 ${
                    item.tipo === "cliente"
                      ? "rounded-tl-md bg-white/[0.06]"
                      : item.tipo === "ia"
                        ? "rounded-tr-md border border-dado/25 bg-dado/10"
                        : "rounded-tr-md border border-acao/40 bg-acao-cheia/25"
                  } ${passo ? `conversa-chega ${item.tipo === "cliente" ? "origin-top-left" : "origin-top-right"}` : ""}`}
                  style={chega}
                >
                  {item.texto}
                </p>
                {passo && digita !== undefined && (
                  <span
                    className="col-start-1 row-start-1 self-start"
                    style={{ "--digita": tempo(digita), "--digita-dur": tempo(passo.chega - digita) } as CSSProperties}
                  >
                    <Digitando />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 border-t border-white/[0.08] pt-3 text-sm text-mudo">
        {compacta
          ? "Exemplo com o WS3 Atendy, um dos sistemas da WS3 Systems. A IA responde conforme as informações autorizadas pela empresa."
          : "Ilustração de uma conversa. O que a IA responde depende da configuração e das informações autorizadas pela sua empresa."}
      </figcaption>
    </figure>
  );
}
