"use client";

import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFlutuante() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { posicao: "botao_flutuante" })}
      className="fixed bottom-4 right-4 z-30 inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-ok px-4 font-semibold text-sobre-acao shadow-lg hover:brightness-110"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a14 14 0 0 1-4.9-3.3 8.4 8.4 0 0 1-1.8-2.8c-.2-.9.4-1.7.7-2 .3-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.5.8 1.2 1.5 2 2 .3.2.5.2.7 0l.7-.8c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.4 0 .4-.1.8-.2 1Z" />
      </svg>
      <span className="hidden sm:inline">Chamar no WhatsApp</span>
      <span className="sr-only sm:hidden">Chamar no WhatsApp (abre em nova aba)</span>
    </a>
  );
}
