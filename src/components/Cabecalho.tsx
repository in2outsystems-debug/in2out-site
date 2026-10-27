"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { menu, site } from "@/lib/site";
import { Botao } from "./Botao";
import { usePresenca } from "./movimento/usePresenca";
import { NomeMarca } from "./Marca";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const botao = useRef<HTMLButtonElement>(null);
  const { montado, presenca } = usePresenca(aberto, 170);

  useEffect(() => setAberto(false), [caminho]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const ativo = (href: string) => caminho === href || caminho.startsWith(href + "/");

  return (
    <header className="escuro sticky top-0 z-40 border-b border-white/10 bg-escuro text-sobre-escuro">
      <div className="pagina flex h-16 items-center justify-between gap-4">
        <Link href="/" className="alvo flex items-center gap-2 font-bold" aria-label={`${site.nome}, página inicial`}>
          <Image src="/img/icone.png" alt="" width={40} height={38} priority className="h-9 w-auto" />
          <NomeMarca className="hidden whitespace-nowrap text-lg min-[420px]:inline" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              aria-current={ativo(m.href) ? "page" : undefined}
              className={`alvo inline-flex items-center rounded-marca px-3 font-medium hover:bg-white/10 ${
                ativo(m.href) ? "underline decoration-2 underline-offset-8" : ""
              }`}
            >
              {m.rotulo}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Botao href="/diagnostico" variante="claro" posicao="cabecalho" className="!px-4 !py-2">
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Fazer diagnóstico</span>
          </Botao>
          <button
            ref={botao}
            type="button"
            className="alvo prensa inline-flex items-center justify-center rounded-marca border border-white/30 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            onClick={() => setAberto((a) => !a)}
          >
            <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
            <span className="relative block h-6 w-6" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`absolute inset-0 transition-[opacity,scale,filter] duration-200 ${aberto ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100"}`}
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={`absolute inset-0 transition-[opacity,scale,filter] duration-200 ${aberto ? "scale-100 opacity-100" : "scale-50 opacity-0 blur-[2px]"}`}
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {montado && (
        <nav
          id="menu-movel"
          aria-label="Principal"
          data-presenca={presenca}
          data-anim="topo"
          className="border-t border-white/10 bg-escuro lg:hidden"
        >
          <ul className="pagina flex flex-col py-3">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  aria-current={ativo(m.href) ? "page" : undefined}
                  className="alvo flex items-center rounded-marca px-2 py-2 text-lg font-medium hover:bg-white/10"
                >
                  {m.rotulo}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Botao href="/diagnostico" variante="claro" posicao="menu_movel" className="w-full">
                Fazer diagnóstico
              </Botao>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
