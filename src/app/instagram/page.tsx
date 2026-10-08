import Image from "next/image";
import { Botao } from "@/components/Botao";
import { getTodosArtigos } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Links do Instagram",
  descricao: "Tudo o que citamos no Instagram da In2Out Systems, em um lugar só.",
  caminho: "/instagram",
});

export default function Instagram() {
  const recente = getTodosArtigos()[0];
  return (
    <div className="pagina py-12">
      <div className="mx-auto max-w-md text-center">
        <Image src="/img/icone.png" alt="" width={80} height={70} className="mx-auto h-16 w-auto" />
        <h1 className="titulo-2 mt-4">{site.nome}</h1>
        <p className="mt-2 text-mudo">@{site.instagram.usuario}. Processo, automação e IA para quem tem empresa pequena.</p>
        <ul className="mt-8 space-y-3">
          <li>
            <Botao href="/diagnostico" posicao="bio_diagnostico" className="w-full" tamanho="grande">
              Fazer o diagnóstico gratuito
            </Botao>
          </li>
          <li>
            <Botao href="/materiais" variante="secundario" posicao="bio_materiais" className="w-full">
              Baixar materiais gratuitos
            </Botao>
          </li>
          <li>
            <Botao href="/produtos/raiptor-atende#teste-gratuito" variante="secundario" posicao="bio_teste" className="w-full">
              Testar o rAIptor Atende
            </Botao>
          </li>
          {recente && (
            <li>
              <Botao href={`/conteudo/${recente.slug}`} variante="secundario" posicao="bio_artigo" className="w-full">
                Último artigo: {recente.titulo}
              </Botao>
            </li>
          )}
          <li>
            <Botao href={whatsappLink("Olá! Vim pelo Instagram da In2Out Systems.")} variante="secundario" posicao="bio_whatsapp" className="w-full">
              Falar no WhatsApp
            </Botao>
          </li>
        </ul>
      </div>
    </div>
  );
}
