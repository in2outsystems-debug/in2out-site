"use client";

export const EVENTO_ABRIR_COOKIES = "ws3:abrir-cookies";

/** Botão para reabrir as preferências de cookies (usado no rodapé e na página de cookies). */
export function AbrirCookies({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`alvo inline-flex items-center underline-offset-2 ${className}`}
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_COOKIES))}
    >
      Preferências de cookies
    </button>
  );
}
