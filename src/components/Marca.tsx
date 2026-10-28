/** Nome da marca como no logo: "WS" azul, "3" ciano, em negrito, e "Systems" branco leve. */
export function NomeMarca({ className = "" }: { className?: string }) {
  return (
    <span className={`font-marca ${className}`}>
      <span className="font-extrabold">
        <span className="text-marca-azul">WS</span>
        <span className="text-marca-ciano">3</span>
      </span> <span className="font-light text-sobre-escuro">Systems</span>
    </span>
  );
}
