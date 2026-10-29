"use client";

import dynamic from "next/dynamic";

/**
 * Peças que não importam para a primeira pintura: carregam depois da hidratação.
 * Ficam só no cliente porque dependem de localStorage e do navegador.
 */
export const ConsentimentoTardio = dynamic(() => import("../Consentimento").then((m) => m.Consentimento), { ssr: false });
