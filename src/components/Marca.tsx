/** Nome da marca como no logo: "WS3" em negrito azul e "Systems" leve. */
export function NomeMarca({ className = "" }: { className?: string }) {
  return (
    <span className={`font-titulo ${className}`}>
      <span className="font-extrabold text-acao">WS3</span> <span className="font-light text-sobre-escuro">Systems</span>
    </span>
  );
}
