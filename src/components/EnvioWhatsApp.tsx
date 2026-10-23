"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/site";

/** Passo final quando os formulários não têm webhook: a pessoa envia os dados pelo WhatsApp. */
export function EnvioWhatsApp() {
  const [link, setLink] = useState("");

  useEffect(() => {
    try {
      setLink(window.sessionStorage.getItem("ws3-wa") || whatsappLink());
    } catch {
      setLink(whatsappLink());
    }
  }, []);

  return (
    <div className="mt-6 rounded-marca-lg border border-dado bg-dado-fundo p-5">
      <p className="font-semibold">Falta um passo: envie os dados pelo WhatsApp.</p>
      <p className="mt-1 text-mudo">A mensagem já vai preenchida com o que você informou. Só precisa tocar em enviar.</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { posicao: "obrigado_envio" })}
          className="alvo mt-4 inline-flex items-center rounded-marca bg-acao px-6 py-3 text-lg font-semibold text-sobre-acao hover:bg-acao-forte"
        >
          Enviar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
        </a>
      )}
    </div>
  );
}
