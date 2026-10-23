import { Botao } from "@/components/Botao";
import { Secao, TopoPagina } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import { FormularioTardio } from "@/components/movimento/Tardios";

export const metadata = pageMeta({
  titulo: "Contato",
  descricao: "Fale com a WS3 Systems pelo formulário, WhatsApp ou agende uma conversa de 30 minutos.",
  caminho: "/contato",
});

export default function Contato() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Contato", caminho: "/contato" }]}
        olho="Contato"
        titulo="Vamos conversar sobre o seu processo"
        texto="Escolha o canal que for mais fácil para você. Respondemos em horário comercial."
      />

      <Secao>
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="titulo-2">Envie uma mensagem</h2>
            <div className="mt-6 rounded-marca-lg border border-linha bg-superficie p-6 sm:p-8">
              <FormularioTardio tipo="contato" origem="contato" />
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="titulo-3">WhatsApp</h2>
              <p className="mb-3 mt-1 text-mudo">A forma mais rápida de falar com a gente.</p>
              <Botao href={whatsappLink()} variante="secundario" posicao="contato_whatsapp">
                Chamar no WhatsApp
              </Botao>
            </div>
            <div>
              <h2 className="titulo-3">E-mail</h2>
              <p className="mt-1">
                <a href={`mailto:${site.email}`} className="text-acao underline underline-offset-2">
                  {site.email}
                </a>
              </p>
            </div>
            <div id="agendar" className="scroll-mt-24 rounded-marca-lg border border-linha bg-superficie p-6">
              <h2 className="titulo-3">Conversa de 30 minutos</h2>
              <p className="mt-1 text-mudo">Escolha um horário para falarmos sobre o seu caso, sem compromisso.</p>
              {site.agendaUrl ? (
                <div className="mt-4">
                  <Botao href={site.agendaUrl} posicao="contato_agenda">
                    Agendar conversa
                  </Botao>
                </div>
              ) : (
                <p className="mt-4 rounded-marca border-2 border-dashed border-mudo/50 bg-suave p-4 text-center text-mudo">
                  <strong className="block text-tinta">[Placeholder]</strong>
                  Agenda online [inserir link em NEXT_PUBLIC_AGENDA_URL]. Enquanto isso, combine o horário pelo WhatsApp.
                </p>
              )}
            </div>
          </aside>
        </div>
      </Secao>
    </>
  );
}
