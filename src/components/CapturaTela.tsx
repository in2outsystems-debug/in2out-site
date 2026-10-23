import { ImagemSuave } from "./movimento/ImagemSuave";

/** Captura de tela real do produto, com borda e carregamento sob demanda. */
export function CapturaTela({ src, alt, largura, altura, prioridade = false }: { src: string; alt: string; largura: number; altura: number; prioridade?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-marca-lg border border-linha bg-superficie">
      <ImagemSuave
        src={src}
        alt={alt}
        width={largura}
        height={altura}
        sizes="(min-width: 1024px) 560px, 100vw"
        priority={prioridade}
        className="h-auto w-full"
      />
    </figure>
  );
}
