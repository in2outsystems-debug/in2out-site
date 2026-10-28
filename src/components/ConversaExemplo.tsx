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
];

const autor = { cliente: "Cliente", ia: "IA", equipe: "Equipe" } as const;

/** Versão curta para o topo da home: pergunta, resposta da IA, passagem para a equipe. */
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
    <figure className="rounded-marca-lg border border-linha bg-suave p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-linha pb-3 text-sm">
        <span className="font-semibold">Atendimento no WhatsApp</span>
        <span className="rounded-full border border-linha px-2.5 py-0.5 text-mudo">Exemplo</span>
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
                className={`text-xs font-semibold ${item.tipo === "cliente" ? "text-mudo" : item.tipo === "ia" ? "text-dado" : "text-acao"} ${passo ? "conversa-chega" : ""}`}
                style={{ "--chega": tempo(digita ?? passo?.chega) } as CSSProperties}
              >
                {autor[item.tipo]}
              </span>
              {/* O "digitando…" ocupa o lugar da mensagem, que já tem o espaço reservado: nada pula. */}
              <div className="grid justify-items-end">
                <p
                  className={`col-start-1 row-start-1 rounded-marca-lg px-4 py-2.5 ${
                    item.tipo === "cliente"
                      ? "rounded-tl-sm bg-superficie"
                      : item.tipo === "ia"
                        ? "rounded-tr-sm bg-dado-fundo"
                        : "rounded-tr-sm border border-acao/50 bg-acao/15"
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
      <figcaption className="mt-4 border-t border-linha pt-3 text-sm text-mudo">
        Ilustração de uma conversa. O que a IA responde depende da configuração e das informações autorizadas pela sua empresa.
      </figcaption>
    </figure>
  );
}
