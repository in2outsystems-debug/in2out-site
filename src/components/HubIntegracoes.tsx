import Image from "next/image";

/**
 * O WS3 Atendy no centro e o que ele liga, a partir do guia de funcionalidades.
 * Cada cartão mostra um evento de exemplo. O que não é comprovado fica fora: nada de "API oficial".
 */
const esquerda = [
  { nome: "WhatsApp", evento: "“Oi, vocês atendem sábado?”", icone: "wa" },
  { nome: "Formulário ou anúncio", evento: "Lead recebido por webhook (beta)", icone: "web" },
  { nome: "Planilha de contatos", evento: "Importada em CSV ou Excel", icone: "plan" },
] as const;

const direita = [
  { nome: "Google Agenda", evento: "Reunião marcada", icone: "ag" },
  { nome: "Google Meet", evento: "Link gerado na marcação", icone: "meet" },
  { nome: "Telegram", evento: "Equipe avisada", icone: "tg" },
] as const;

const icones: Record<string, string> = {
  wa: "M3 21l1.65-4.85A9 9 0 1 1 8.2 19.4L3 21z",
  web: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  plan: "M4 4h16v16H4zM4 10h16M10 4v16",
  ag: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  meet: "M3 7h12v10H3zM15 11l6-3v8l-6-3",
  tg: "M21 4L3 11l6 2 2 6 3-4 5 4z",
};

function No({ nome, evento, icone, lado }: { nome: string; evento: string; icone: string; lado: "e" | "d" }) {
  return (
    <li
      className={`painel relative flex items-center gap-3 px-4 py-3 lg:before:absolute lg:before:top-1/2 lg:before:h-px lg:before:w-8 lg:before:bg-gradient-to-r ${
        lado === "e"
          ? "lg:before:-right-8 lg:before:from-white/20 lg:before:to-dado/60"
          : "lg:before:-left-8 lg:before:from-dado/60 lg:before:to-white/20"
      }`}
    >
      <span aria-hidden="true" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-acao">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={icones[icone]} />
        </svg>
      </span>
      <span>
        <span className="block font-semibold leading-tight">{nome}</span>
        <span className="block text-sm text-mudo">{evento}</span>
      </span>
    </li>
  );
}

export function HubIntegracoes() {
  return (
    <div className="relative grid items-center gap-4 lg:grid-cols-[1fr_9rem_1fr] lg:gap-10">
      <ul className="flex flex-col gap-3 lg:gap-4">
        {esquerda.map((n) => (
          <No key={n.nome} {...n} lado="e" />
        ))}
      </ul>

      <div className="order-first flex flex-col items-center gap-3 lg:order-none">
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-acao-cheia/50 bg-acao-cheia/15 shadow-[0_0_60px_-4px_rgb(var(--c-acao-cheia)/0.7)]">
          <span aria-hidden="true" className="absolute inset-[-14px] rounded-full border border-dashed border-white/15" />
          <Image src="/img/icone.png" alt="" width={48} height={46} className="h-11 w-auto" />
        </span>
        <span className="text-sm font-semibold text-mudo">WS3 Atendy</span>
      </div>

      <ul className="flex flex-col gap-3 lg:gap-4">
        {direita.map((n) => (
          <No key={n.nome} {...n} lado="d" />
        ))}
      </ul>
    </div>
  );
}
