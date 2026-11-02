import type { CSSProperties } from "react";
import { Sequencia } from "./Composicoes";
import { IconeCaixa, type NomeIcone } from "./Icone";

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

const nos: { rotulo: string; icone: NomeIcone }[] = [
  { rotulo: "Anúncio", icone: "megafone" },
  { rotulo: "Contato no CRM", icone: "pessoa" },
  { rotulo: "IA responde", icone: "faisca" },
  { rotulo: "Agenda ou equipe", icone: "calendario" },
  { rotulo: "Relatório", icone: "grafico" },
];

/** O caminho do anúncio ao relatório, em cinco pontos ligados por uma linha onde a luz corre. Vertical no celular. */
export function FluxoTrafego() {
  return (
    <ol className="relative ml-6 border-l border-white/15 md:ml-0 md:grid md:grid-cols-5 md:gap-4 md:border-l-0">
      {nos.map((n, i) => (
        <li key={n.rotulo} className="relative pb-8 pl-10 pt-3 last:pb-0 md:pb-0 md:pl-0 md:pt-0">
          <div className="absolute -left-6 top-0 md:static md:mb-4">
            <IconeCaixa nome={n.icone} />
          </div>
          {i < nos.length - 1 && (
            <span aria-hidden="true" className="fluxo-corre absolute left-[4.5rem] right-3 top-6 hidden h-px md:block" style={{ "--atraso": `${i * 600}ms` } as CSSProperties} />
          )}
          <h3 className="text-lg font-semibold">{n.rotulo}</h3>
        </li>
      ))}
    </ol>
  );
}
