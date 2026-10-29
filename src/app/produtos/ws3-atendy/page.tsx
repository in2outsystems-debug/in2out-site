import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { ChamadaFinal, JsonLd, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
import { Passos } from "@/components/Composicoes";
import { ConversaExemplo } from "@/components/ConversaExemplo";
import { Termo } from "@/components/Termo";
import { faqLd, pageMeta } from "@/lib/seo";
import { SITE_URL, demonstracao, site } from "@/lib/site";
import { FormularioTardio } from "@/components/movimento/Tardios";

export const metadata = pageMeta({
  titulo: "WS3 Atendy: atendimento com IA, CRM e automações no WhatsApp",
  descricao:
    "Atenda novos interessados e clientes atuais pelo WhatsApp, organize as informações e dê continuidade às conversas. Agende uma demonstração de 30 minutos.",
  caminho: "/produtos/ws3-atendy",
});

const problemas = [
  "Conversas espalhadas entre celulares, números e aplicativos.",
  "Retornos que dependem da memória de quem atendeu.",
  "Solicitações esquecidas porque ninguém registrou.",
];

const passos = [
  "O cliente chama no WhatsApp.",
  "A IA identifica a necessidade.",
  "As informações ficam no CRM.",
  "O fluxo segue conforme a configuração.",
  "A equipe assume o que exige pessoa.",
];

const grupos = [
  {
    titulo: "Atender",
    frase: "A IA responde na hora e a equipe assume quando precisar.",
    itens: ["Agentes de IA", "WhatsApp integrado", "Caixa de entrada centralizada", "Identificação de intenções", "Transferência humana"],
  },
  {
    titulo: "Vender e agendar",
    frase: "Cada conversa vira um lead acompanhado até o próximo passo.",
    itens: ["CRM com funil", "Qualificação", "Agendamentos", "Follow-up automatizado"],
  },
  {
    titulo: "Conhecer e controlar",
    frase: "A IA fala com a sua voz e você enxerga o resultado.",
    itens: ["Base de conhecimento", "Relatórios"],
  },
];

const aplicacoes = [
  { nome: "Escolas", texto: "Atendimento a interessados em matrícula e dúvidas de alunos e responsáveis." },
  { nome: "Provedores de internet", texto: "Primeiro atendimento, dúvidas frequentes e encaminhamento de solicitações." },
  { nome: "Agências e consultorias", texto: "Qualificação de novos contatos e continuidade das conversas comerciais." },
  { nome: "Empresas de produtos e serviços", texto: "Pedidos de informação, orçamentos e retorno a clientes atuais." },
];

const faq = [
  { p: "O WS3 Atendy substitui funcionários?", r: "Não. Ele combina automação e atendimento humano. A equipe fica no controle do que precisa de atenção humana." },
  { p: "A IA responde qualquer pergunta?", r: "Não. As respostas dependem da configuração e das informações autorizadas pela empresa." },
  { p: "Tem CRM?", r: "Sim. O CRM registra contatos, conversas e o andamento de cada cliente." },
  { p: "Faz agendamento?", r: "Sim. Os agentes de IA consultam os horários livres, marcam, remarcam e cancelam pela conversa. A agenda pode ser sincronizada com o Google Agenda e gerar o link do Google Meet." },
];

export default function Ws3Atendy() {
  return (
    <>
      <JsonLd
        dados={[
          faqLd(faq),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "WS3 Atendy",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Atendimento com IA, CRM e automações no WhatsApp para atender interessados e clientes, organizar informações e dar continuidade às conversas.",
            url: `${SITE_URL}/produtos/ws3-atendy`,
            publisher: { "@type": "Organization", name: site.nome, url: SITE_URL },
          },
        ]}
      />
      <TopoPagina
        migalhas={[
          { nome: "Produtos", caminho: "/produtos" },
          { nome: "WS3 Atendy", caminho: "/produtos/ws3-atendy" },
        ]}
        olho="WS3 Atendy"
        titulo="Cada conversa do WhatsApp em movimento, sem perder ninguém."
        texto={
          <>
            O WS3 Atendy reúne IA, <Termo nome="CRM">CRM</Termo> e automações para atender novos interessados e clientes atuais pelo WhatsApp. A equipe fica no controle do que precisa de atenção humana.
          </>
        }
        lado={<ConversaExemplo />}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Botao href="#demonstracao" tamanho="grande" posicao="atendy_topo" seta className="w-full sm:w-auto">
            Agendar demonstração
          </Botao>
          <Botao href="/diagnostico" variante="texto" posicao="atendy_topo_diagnostico" className="text-sobre-escuro/90">
            Antes, fazer o diagnóstico
          </Botao>
        </div>
      </TopoPagina>

      <Secao id="problema" olho="O problema" titulo="Onde o atendimento se perde">
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-3">
          {problemas.map((p) => (
            <li key={p} className="border-t border-white/[0.12] pt-5 text-lg">
              {p}
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="como-funciona" fundo="suave" olho="Como funciona" titulo="Em cinco passos">
        <Passos itens={passos} />
        <p className="mt-8 max-w-leitura text-mudo">O que a IA faz em cada conversa depende da configuração e das informações autorizadas pela sua empresa.</p>
      </Secao>

      <Secao id="funcionalidades" olho="Funcionalidades" titulo="Tudo no mesmo lugar" intro="Onze recursos, em três frentes.">
        <div className="grid gap-4 lg:grid-cols-3">
          {grupos.map((g) => (
            <div key={g.titulo} className="painel p-6">
              <h3 className="titulo-3">{g.titulo}</h3>
              <p className="mt-2 text-mudo">{g.frase}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {g.itens.map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-dado">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Secao>

      <Secao id="aplicacoes" fundo="suave" olho="Aplicações" titulo="Onde costuma ajudar">
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {aplicacoes.map((a) => (
            <li key={a.nome} className="border-t border-white/[0.12] pt-5">
              <h3 className="titulo-3">{a.nome}</h3>
              <p className="mt-2 text-mudo">{a.texto}</p>
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="faq" olho="Perguntas frequentes" titulo="Dúvidas sobre o WS3 Atendy">
        <div className="max-w-3xl">
          <Acordeao itens={faq.map((f) => ({ p: f.p, r: <p>{f.r}</p> }))} origem="atendy" />
        </div>
      </Secao>

      <Secao
        id="demonstracao"
        fundo="suave"
        olho="Demonstração"
        titulo="Veja o WS3 Atendy funcionando em 30 minutos"
        intro="Mostramos o atendimento, o CRM e a passagem da conversa para a equipe. Sem compromisso."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Botao href={demonstracao().href} tamanho="grande" posicao="atendy_demonstracao" seta className="w-full sm:w-auto">
            {demonstracao().rotulo}
          </Botao>
          <p className="text-mudo">
            Ainda não fez o diagnóstico?{" "}
            <Link href="/diagnostico" className="font-semibold text-acao underline underline-offset-2">
              Comece por ele
            </Link>
            : 5 perguntas mostram se o seu atendimento está pronto para automatizar.
          </p>
        </div>
      </Secao>

      <Secao
        id="teste-gratuito"
        olho="Teste gratuito"
        titulo="Depois da demonstração, teste por 7 dias"
        intro="Deixe o essencial e entramos em contato pelo WhatsApp para combinar a ativação."
      >
        <div className="painel max-w-2xl p-6 sm:p-8">
          <FormularioTardio
            tipo="teste"
            origem="atendy_teste"
            paramsObrigado={{ produto: "ws3-atendy" }}
            aviso={
              <p>
                <strong>Antes de ativar:</strong> as condições do teste e eventuais custos de serviços externos (como a conexão com o WhatsApp) são informados a você antes da ativação. Nada é cobrado sem o seu aceite.
              </p>
            }
          />
        </div>
      </Secao>

      <ChamadaFinal
        titulo="Ainda não sabe se é hora de automatizar?"
        texto="Faça o diagnóstico gratuito: 5 perguntas mostram se o seu atendimento está pronto para a IA."
        rotulo="Fazer o diagnóstico gratuito"
        href="/diagnostico"
        posicao="atendy_final"
      />
    </>
  );
}
