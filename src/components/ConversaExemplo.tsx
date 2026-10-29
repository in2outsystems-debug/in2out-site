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

export function ConversaExemplo() {
  return (
    <figure className="painel bg-superficie/80 p-4 backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3 text-sm">
        <span className="font-semibold">Atendimento no WhatsApp</span>
        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-mudo">Exemplo</span>
      </div>
      <ol className="mt-4 flex flex-col gap-3">
        {conversa.map((item, i) => {
          if (item.tipo === "evento") {
            return (
              <li key={i} className="flex items-baseline gap-2 self-center text-sm text-mudo">
                <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 -translate-y-0.5 rounded-full bg-dado" />
                {item.texto}
              </li>
            );
          }

          return (
            <li key={i} className={`flex max-w-[85%] flex-col gap-1 ${item.tipo === "cliente" ? "self-start" : "items-end self-end"}`}>
              <span className={`text-[0.8125rem] font-semibold ${item.tipo === "cliente" ? "text-mudo" : item.tipo === "ia" ? "text-dado" : "text-acao"}`}>{autor[item.tipo]}</span>
              <p
                className={`rounded-2xl px-4 py-2.5 ${
                  item.tipo === "cliente"
                    ? "rounded-tl-md bg-white/[0.06]"
                    : item.tipo === "ia"
                      ? "rounded-tr-md border border-dado/25 bg-dado/10"
                      : "rounded-tr-md border border-acao/40 bg-acao-cheia/25"
                }`}
              >
                {item.texto}
              </p>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 border-t border-white/[0.08] pt-3 text-sm text-mudo">
        Ilustração de uma conversa. O que a IA responde depende da configuração e das informações autorizadas pela sua empresa.
      </figcaption>
    </figure>
  );
}
