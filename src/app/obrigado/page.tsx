import Link from "next/link";
import { Botao } from "@/components/Botao";
import { EnvioWhatsApp } from "@/components/EnvioWhatsApp";
import { pageMeta } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Obrigado",
  descricao: "Recebemos o seu envio.",
  caminho: "/obrigado",
  semIndexar: true,
});

type Props = { searchParams: Promise<{ origem?: string; material?: string; produto?: string; via?: string }> };

const textos: Record<string, { titulo: string; passos: string[]; cta: { href: string; rotulo: string } }> = {
  contato: {
    titulo: "Recebemos a sua mensagem",
    passos: ["Lemos o que você escreveu.", "Respondemos pelo WhatsApp ou e-mail em horário comercial.", "Se fizer sentido, combinamos uma conversa de 30 minutos."],
    cta: { href: "/conteudo", rotulo: "Ler artigos enquanto espera" },
  },
  teste: {
    titulo: "Recebemos o seu pedido de teste do rAIptor Atende",
    passos: [
      "Entramos em contato pelo WhatsApp para entender como você atende hoje.",
      "Informamos as condições do teste, a duração e eventuais custos de serviços externos antes de ativar.",
      "Com o seu aceite, configuramos o teste junto com você.",
    ],
    cta: { href: "/produtos/raiptor-atende", rotulo: "Voltar ao rAIptor Atende" },
  },
  material: {
    titulo: "O material está a caminho",
    passos: ["Enviamos para o e-mail que você informou.", "Se não chegar em alguns minutos, confira a caixa de spam.", "Depois de usar, conte para a gente o que achou."],
    cta: { href: "/diagnostico", rotulo: "Fazer o diagnóstico gratuito" },
  },
  newsletter: {
    titulo: "Inscrição feita",
    passos: ["Você receberá um e-mail quando houver artigo novo.", "Para sair, use o link no final de cada e-mail."],
    cta: { href: "/conteudo", rotulo: "Ver os artigos" },
  },
  diagnostico: {
    titulo: "Recomendação a caminho",
    passos: ["Enviamos o seu resultado e os próximos passos para o seu e-mail.", "Se quiser conversar sobre ele, chame no WhatsApp."],
    cta: { href: "/servicos", rotulo: "Ver os serviços" },
  },
};

export default async function Obrigado({ searchParams }: Props) {
  const { origem = "contato", material, via } = await searchParams;
  const porWhatsapp = via === "wa";
  const t = textos[origem] ?? textos.contato;

  return (
    <div className="pagina py-16">
      <div className="mx-auto max-w-2xl">
        <p className="olho">Obrigado</p>
        <h1 className="titulo-1 mt-2">{porWhatsapp ? "Quase lá" : t.titulo}</h1>
        {material && <p className="mt-3 text-lg text-mudo">Material: {material}</p>}
        {porWhatsapp && <EnvioWhatsApp />}
        <h2 className="titulo-3 mt-8">{porWhatsapp ? "O que acontece depois" : "Próximos passos"}</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6">
          {(porWhatsapp ? ["Recebemos a sua mensagem no WhatsApp.", "Respondemos em horário comercial com o que você pediu."] : t.passos).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Botao href={t.cta.href} posicao={`obrigado_${origem}`}>
            {t.cta.rotulo}
          </Botao>
          <Botao href={whatsappLink()} variante="secundario" posicao={`obrigado_${origem}_whatsapp`}>
            Falar no WhatsApp
          </Botao>
        </div>
        <p className="mt-8 text-sm text-mudo">
          Algo errado com o seu envio? Escreva para{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>{" "}
          ou volte ao{" "}
          <Link href="/" className="underline underline-offset-2">
            início
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
