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

export function ConversaExemplo() {
  return (
    <figure className="rounded-marca-lg border border-linha bg-suave p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-linha pb-3 text-sm">
        <span className="font-semibold">Atendimento no WhatsApp</span>
        <span className="rounded-full border border-linha px-2.5 py-0.5 text-mudo">Exemplo</span>
      </div>
      <ol className="mt-4 flex flex-col gap-3">
        {conversa.map((item, i) =>
          item.tipo === "evento" ? (
            <li key={i} className="flex items-baseline gap-2 self-center text-sm text-mudo">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado" />
              {item.texto}
            </li>
          ) : (
            <li key={i} className={`flex max-w-[85%] flex-col gap-1 ${item.tipo === "cliente" ? "self-start" : "self-end items-end"}`}>
              <span className={`text-xs font-semibold ${item.tipo === "cliente" ? "text-mudo" : "text-dado"}`}>{autor[item.tipo]}</span>
              <p
                className={`rounded-marca-lg px-4 py-2.5 ${
                  item.tipo === "cliente"
                    ? "rounded-tl-sm bg-superficie"
                    : item.tipo === "ia"
                      ? "rounded-tr-sm bg-dado-fundo"
                      : "rounded-tr-sm border border-dado/40 bg-dado-fundo"
                }`}
              >
                {item.texto}
              </p>
            </li>
          ),
        )}
      </ol>
      <figcaption className="mt-4 border-t border-linha pt-3 text-sm text-mudo">
        Ilustração de uma conversa. O que a IA responde depende da configuração e das informações autorizadas pela sua empresa.
      </figcaption>
    </figure>
  );
}
