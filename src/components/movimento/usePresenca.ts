"use client";

import { useEffect, useState } from "react";

/**
 * Mantém o elemento no DOM durante a animação de saída.
 * Use `montado` para decidir se renderiza e `presenca` no atributo data-presenca
 * (as animações vivem em globals.css, escolhidas por data-anim="topo" | "base" | "pop").
 */
export function usePresenca(visivel: boolean, saidaMs = 200) {
  const [montado, setMontado] = useState(visivel);

  useEffect(() => {
    if (visivel) {
      setMontado(true);
      return;
    }
    const t = window.setTimeout(() => setMontado(false), saidaMs);
    return () => window.clearTimeout(t);
  }, [visivel, saidaMs]);

  return { montado: visivel || montado, presenca: visivel ? ("dentro" as const) : ("fora" as const) };
}
