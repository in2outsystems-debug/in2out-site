import { Botao } from "@/components/Botao";

export default function NaoEncontrada() {
  return (
    <div className="pagina py-20 text-center">
      <h1 className="titulo-1">Não achamos essa página</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-mudo">O endereço pode ter mudado ou ter sido digitado errado.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Botao href="/" posicao="404_inicio">
          Voltar ao início
        </Botao>
        <Botao href="/conteudo" variante="secundario" posicao="404_conteudo">
          Ver artigos
        </Botao>
      </div>
    </div>
  );
}
