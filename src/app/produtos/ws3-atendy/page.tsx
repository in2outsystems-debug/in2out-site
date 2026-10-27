import Link from "next/link";
import { Acordeao } from "@/components/Acordeao";
import { ChamadaFinal, JsonLd, Lista, Secao, TopoPagina } from "@/components/Blocos";
import { Botao } from "@/components/Botao";
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

const funcionalidades = [
  "Agentes de IA",
  "WhatsApp integrado",
  "Caixa de entrada centralizada",
  "CRM com funil",
  "Identificação de intenções",
  "Qualificação",
  "Transferência humana",
  "Agendamentos",
  "Follow-up automatizado",
  "Base de conhecimento",
  "Relatórios",
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
  { p: "Faz agendamento?", r: "Depende da conexão autorizada com a agenda e da validação do fluxo." },
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
        titulo="Automatize o atendimento. Organize sua operação. Mantenha cada conversa em movimento."
        texto={
          <>
            O WS3 Atendy reúne IA, <Termo nome="CRM">CRM</Termo> e automações para atender novos interessados e clientes atuais pelo WhatsApp, entender necessidades, organizar informações e dar continuidade às conversas. Automatize o que faz sentido. A equipe fica no controle do que precisa de atenção humana.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Botao href="#demonstracao" tamanho="grande" posicao="atendy_topo">
            Agendar demonstração
          </Botao>
          <Botao href="/diagnostico" variante="secundario" tamanho="grande" posicao="atendy_topo_diagnostico">
            Fazer o diagnóstico antes
          </Botao>
        </div>
      </TopoPagina>

      <Secao id="problema" olho="O problema" titulo="Onde o atendimento se perde">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Lista itens={problemas} marcador="x" />
          <ConversaExemplo />
        </div>
      </Secao>

      <Secao id="como-funciona" fundo="suave" olho="Como funciona" titulo="Em cinco passos">
        <ol className="grid gap-4 md:grid-cols-5">
          {passos.map((p, i) => (
            <li key={p} className="cartao">
              <p className="text-sm font-semibold text-dado">Passo {i + 1}</p>
              <p className="mt-1 font-medium">{p}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-leitura text-mudo">O que a IA faz em cada conversa depende da configuração e das informações autorizadas pela sua empresa.</p>
      </Secao>

      <Secao id="funcionalidades" olho="Funcionalidades" titulo="11 recursos no mesmo lugar">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {funcionalidades.map((f) => (
            <li key={f} className="cartao !p-4 font-medium">
              {f}
            </li>
          ))}
        </ul>
      </Secao>

      <Secao id="aplicacoes" fundo="suave" olho="Aplicações" titulo="Onde costuma ajudar">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {aplicacoes.map((a) => (
            <li key={a.nome} className="cartao">
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
          <Botao href={demonstracao().href} tamanho="grande" posicao="atendy_demonstracao">
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
        intro="Preencha o formulário e entramos em contato pelo WhatsApp para combinar a ativação."
      >
        <div className="max-w-2xl rounded-marca-lg border border-linha bg-superficie p-6 sm:p-8">
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
