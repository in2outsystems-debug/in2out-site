import Link from "next/link";
import { Botao } from "./Botao";
import { Lista } from "./Blocos";
import { Sequencia } from "./Composicoes";

/**
 * Tráfego pago e atendimento juntos: o anúncio traz o contato, o WS3 Atendy responde e registra a origem.
 * Baseado no guia de funcionalidades (jornada "do anúncio à venda"); sem números nem promessa de resultado.
 */
const passos = [
  { titulo: "O anúncio traz o contato", texto: "Pelo Google ou pelo Meta, o cliente cai no WhatsApp ou num formulário." },
  { titulo: "O WS3 Atendy registra a origem", texto: "O contato entra no CRM já com a campanha de onde veio." },
  { titulo: "A IA responde em segundos", texto: "Conversa, entende o pedido e qualifica o interesse." },
  { titulo: "Agenda ou passa para a equipe", texto: "O horário é marcado ou a conversa segue com uma pessoa, com o histórico." },
  { titulo: "O relatório mostra o que funciona", texto: "Contatos por origem, para você saber onde vale colocar mais verba." },
];

export function FluxoAnuncioAtendimento() {
  return (
    <div className="painel brilho p-6 sm:p-8">
      <h3 className="titulo-3">Do anúncio ao cliente</h3>
      <p className="mt-1 text-sm text-mudo">Como o tráfego pago e o WS3 Atendy trabalham juntos.</p>
      <div className="mt-6">
        <Sequencia itens={passos} compacta />
      </div>
    </div>
  );
}

export function TextoTrafegoPago({ posicao }: { posicao: string }) {
  return (
    <div>
      <h2 className="titulo-2">Anúncio traz o contato. O atendimento transforma em cliente.</h2>
      <p className="mt-4 max-w-leitura text-lg text-mudo">
        Criamos e acompanhamos os seus anúncios no Google e no Meta. E olhamos primeiro se o seu atendimento aguenta o volume, porque anúncio sem resposta rápida desperdiça verba.
      </p>
      <div className="mt-6">
        <Lista
          itens={[
            "Campanhas no Google Ads e no Meta Ads (Instagram e Facebook)",
            "As contas ficam no nome da sua empresa",
            "Relatório mensal com os contatos gerados e o custo de cada um",
          ]}
        />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Botao href="/servicos/trafego-pago" tamanho="grande" posicao={`${posicao}_trafego`} seta className="w-full sm:w-auto">
          Ver a gestão de tráfego pago
        </Botao>
        <Link href="/diagnostico" className="alvo inline-flex items-center font-semibold text-acao underline underline-offset-2">
          Antes, fazer o diagnóstico
        </Link>
      </div>
    </div>
  );
}
