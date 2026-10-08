/** Espaço reservado para captura de tela, foto ou outro material que ainda não existe. */
export function Placeholder({ rotulo, proporcao = "aspect-[16/10]" }: { rotulo: string; proporcao?: string }) {
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${rotulo}`}
      className={`${proporcao} flex w-full items-center justify-center rounded-marca-lg border-2 border-dashed border-mudo/50 bg-suave p-6 text-center text-mudo`}
    >
      <span>
        <strong className="block text-tinta">[Placeholder]</strong>
        {rotulo}
      </span>
    </div>
  );
}
