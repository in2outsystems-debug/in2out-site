"use client";

import { useEffect, useLayoutEffect } from "react";

const useLayoutSeguro = typeof window === "undefined" ? useEffect : useLayoutEffect;

const IGNORAR = "script, style, template, noscript, [hidden], [data-sem-revelar], [role='dialog']";

/** Contêiner de uma só criança que não tem aparência própria: revela o conteúdo dentro dele. */
function semAparencia(el: HTMLElement) {
  return el.tagName === "DIV" && !/(\bbg-|\bborder|\brounded|\bshadow)/.test(el.className);
}

/** Grade ou flex com vários filhos: cada filho entra em sequência, em vez da grade inteira. */
function eLinha(el: HTMLElement) {
  const d = getComputedStyle(el).display;
  return (d === "grid" || d === "flex") && el.children.length > 1;
}

function expandir(el: HTMLElement, fundo = 0): HTMLElement[] {
  if (fundo > 3 || el.matches(IGNORAR)) return [];
  if (eLinha(el)) {
    return Array.from(el.children).flatMap((f) => expandir(f as HTMLElement, fundo + 1));
  }
  if (semAparencia(el) && el.children.length === 1) {
    return expandir(el.children[0] as HTMLElement, fundo + 1);
  }
  return [el];
}

function coletar(raiz: Element): HTMLElement[] {
  const base = raiz.querySelectorAll<HTMLElement>(
    ".pagina > *, article.pagina > *, .prosa > *",
  );
  const primeira = raiz.matches("main") ? raiz.querySelector(":scope > :is(section, article):first-of-type") : null;
  const todos = new Set<HTMLElement>();
  base.forEach((el) => {
    if (primeira && primeira.contains(el)) return; // a primeira dobra anima só com CSS
    expandir(el).forEach((alvo) => todos.add(alvo));
  });
  // Sem alvos aninhados: se o pai já anima, o filho acompanha.
  return Array.from(todos).filter((el) => {
    let p = el.parentElement;
    while (p && p !== raiz) {
      if (todos.has(p)) return false;
      p = p.parentElement;
    }
    return true;
  });
}

/**
 * Revela os blocos da página quando entram na tela: opacidade + 10px + desfoque leve, em sequência.
 * Só esconde o que está abaixo da dobra, então não há "piscada" no que já está visível.
 * Com prefers-reduced-motion, não faz nada: tudo aparece de uma vez.
 */
export function RevelarGlobal({ escopo }: { escopo: string }) {
  useLayoutSeguro(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const raiz = document.querySelector(escopo);
    if (!raiz) return;

    const limite = window.innerHeight * 0.92;
    const alvos = coletar(raiz).filter((el) => el.getBoundingClientRect().top > limite);
    const timers: number[] = [];

    const concluir = (el: HTMLElement) => {
      el.removeAttribute("data-r");
      el.style.removeProperty("--atraso");
    };

    const io = new IntersectionObserver(
      (entradas) => {
        const aparecendo = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        aparecendo.forEach((e, i) => {
          const el = e.target as HTMLElement;
          const atraso = Math.min(i, 5) * 70;
          el.style.setProperty("--atraso", `${atraso}ms`);
          el.dataset.r = "1";
          io.unobserve(el);
          timers.push(window.setTimeout(() => concluir(el), 480 + atraso + 120));
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    alvos.forEach((el) => {
      el.dataset.r = "0";
      io.observe(el);
    });

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      alvos.forEach(concluir);
    };
  }, [escopo]);

  return null;
}
