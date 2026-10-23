"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Esqueleto } from "./Esqueleto";

/**
 * Imagem com carregamento sob demanda: skeleton enquanto baixa, depois aparece com fade e desfoque saindo.
 * Se a imagem já veio pronta (cache ou SSR), não pisca: o skeleton só entra quando ainda falta carregar.
 */
export function ImagemSuave({ className = "", onLoad, ...props }: ImageProps) {
  const img = useRef<HTMLImageElement>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (img.current && !img.current.complete) setCarregando(true);
  }, []);

  return (
    <span className="relative block">
      {carregando && <Esqueleto className="absolute inset-0 !rounded-none" />}
      <Image
        {...props}
        ref={img}
        className={`img-suave ${className}`}
        data-carregando={carregando}
        onLoad={(e) => {
          setCarregando(false);
          onLoad?.(e);
        }}
        onError={() => setCarregando(false)}
      />
    </span>
  );
}
