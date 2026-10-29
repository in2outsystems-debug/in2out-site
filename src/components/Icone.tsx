import type { ReactNode } from "react";

/** Traçados de 24x24, no estilo de linha (stroke 1.75), um por assunto. */
const tracos = {
  empresa: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M2 21h20M8 8h2M8 12h2M8 16h2" />
    </>
  ),
  pessoa: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  espera: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  repeticao: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </>
  ),
  equipe: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a7 7 0 0 1 4 6" />
    </>
  ),
  mapa: (
    <>
      <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </>
  ),
  lista: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8l1.5 1.5L13 7M9 14l1.5 1.5L13 13M15 8h0M15 14h0" />
    </>
  ),
  grafico: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  engrenagem: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  faisca: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  megafone: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l8 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M19 9a4 4 0 0 1 0 6" />
    </>
  ),
  conversa: (
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  ),
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 15l2 2 4-4" />
    </>
  ),
  retorno: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  envio: (
    <>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type NomeIcone = keyof typeof tracos;

export function Icone({ nome, tamanho = 22, className }: { nome: NomeIcone; tamanho?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {tracos[nome]}
    </svg>
  );
}

/** Ícone dentro de um quadrado arredondado, como nos cartões da referência. */
export function IconeCaixa({ nome, className = "" }: { nome: NomeIcone; className?: string }) {
  return (
    <span aria-hidden="true" className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-acao/25 bg-acao-cheia/15 text-dado ${className}`}>
      <Icone nome={nome} />
    </span>
  );
}
