"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const SAIDA_MS = 140;

type Estado = "parado" | "carregando" | "completo";

/**
 * Navegação com transição: a página atual sai (140ms) e uma barra de progresso corre no topo
 * até a próxima página montar. Intercepta só cliques comuns em links internos de página;
 * novas abas, downloads, âncoras e links externos seguem o comportamento normal.
 * Voltar/avançar do navegador não passa por aqui, e a barra não aparece.
 * Se a navegação suave não completar em 4 s, cai para a navegação comum do navegador.
 */
export function TransicaoRota() {
  const router = useRouter();
  const caminho = usePathname();
  const [estado, setEstado] = useState<Estado>("parado");
  const timers = useRef<number[]>([]);
  const atual = useRef(caminho);

  const principal = () => document.getElementById("conteudo");

  const limpar = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  // A nova página montou: some a marca de saída e a barra completa.
  useEffect(() => {
    atual.current = caminho;
    limpar();
    principal()?.removeAttribute("data-saindo");
    setEstado((e) => (e === "carregando" ? "completo" : e));
    const t = window.setTimeout(() => setEstado((e) => (e === "completo" ? "parado" : e)), 480);
    return () => window.clearTimeout(t);
  }, [caminho, limpar]);

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");

    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const alvo = e.target instanceof Element ? e.target.closest("a") : null;
      if (!alvo || (alvo.target && alvo.target !== "_self") || alvo.hasAttribute("download")) return;
      if (alvo.hasAttribute("data-sem-transicao")) return;

      let url: URL;
      try {
        url = new URL(alvo.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (/\.(xml|txt|pdf|zip)$/i.test(url.pathname)) return;

      // Não chama stopPropagation: os eventos de análise dos botões continuam disparando.
      e.preventDefault();
      const caminhoAntes = atual.current;
      limpar();
      setEstado("carregando");
      if (!reduzir.matches) principal()?.setAttribute("data-saindo", "");

      const destino = url.pathname + url.search + url.hash;
      timers.current.push(
        window.setTimeout(() => router.push(destino), reduzir.matches ? 0 : SAIDA_MS),
        // A página não fica apagada esperando: se a próxima demorar, ela reaparece e a barra segue correndo.
        window.setTimeout(() => principal()?.removeAttribute("data-saindo"), 700),
        // Se a navegação suave não completar (rede lenta, primeira abertura no servidor de desenvolvimento),
        // o navegador vai à página de verdade. O clique nunca termina sem levar ao destino.
        window.setTimeout(() => {
          if (atual.current === caminhoAntes) window.location.assign(destino);
        }, 4000),
        window.setTimeout(() => setEstado("parado"), 15000),
      );
    };

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, [router, limpar]);

  return <div className="barra-rota" data-estado={estado} aria-hidden="true" />;
}
