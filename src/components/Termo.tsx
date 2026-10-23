"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePresenca } from "./movimento/usePresenca";
import { glossario, type Termo as TermoNome } from "@/lib/site";

/** Termo técnico com explicação em tooltip. Funciona com mouse, toque e teclado. */
export function Termo({ nome, children }: { nome: TermoNome; children?: ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  const raiz = useRef<HTMLSpanElement>(null);
  const { montado, presenca } = usePresenca(aberto, 140);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: Event) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("pointerdown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <span
      ref={raiz}
      className="relative inline"
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      <button
        type="button"
        aria-describedby={aberto ? id : undefined}
        aria-expanded={aberto}
        onClick={() => setAberto((a) => !a)}
        onFocus={() => setAberto(true)}
        onBlur={() => setAberto(false)}
        className="cursor-help border-b-2 border-dotted border-current font-medium"
      >
        {children ?? nome}
      </button>
      {montado && (
        <span
          role="tooltip"
          id={id}
          data-presenca={presenca}
          data-anim="pop"
          className="origin-top-left absolute left-0 top-full z-20 mt-2 block w-64 rounded-marca border border-linha bg-escuro p-3 text-left text-sm font-normal normal-case leading-snug tracking-normal text-sobre-escuro shadow-lg"
        >
          <strong className="block">{nome}</strong>
          {glossario[nome]}
        </span>
      )}
    </span>
  );
}
