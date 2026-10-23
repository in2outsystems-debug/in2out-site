"use client";

import { useEffect, useRef } from "react";

/** Barra fina sob o cabeçalho que mostra quanto do artigo já foi lido. Só transform, sem re-render. */
export function ProgressoLeitura({ alvo = "article" }: { alvo?: string }) {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.querySelector(alvo);
    const b = barra.current;
    if (!el || !b) return;
    let quadro = 0;

    const atualizar = () => {
      quadro = 0;
      const r = el.getBoundingClientRect();
      const cabecalho = 64;
      // 0 quando o artigo encosta no cabeçalho; 1 quando o fim do artigo chega à base da tela.
      const total = r.height - (window.innerHeight - cabecalho);
      const feito = Math.min(1, Math.max(0, (cabecalho - r.top) / Math.max(total, 1)));
      b.style.transform = `scaleX(${feito})`;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [alvo]);

  return (
    <div
      ref={barra}
      className="barra-leitura"
      aria-hidden="true"
    />
  );
}
