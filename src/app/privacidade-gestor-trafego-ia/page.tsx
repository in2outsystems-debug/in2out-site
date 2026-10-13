import { PaginaLegal } from "@/components/PaginaLegal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  titulo: "Política de privacidade do Gestor Tráfego IA",
  descricao: "Como a In2Out Systems trata os dados do Google Ads no aplicativo Gestor Tráfego IA.",
  caminho: "/privacidade-gestor-trafego-ia",
});

export default function PrivacidadeGestorTrafegoIA() {
  return (
    <PaginaLegal
      titulo="Política de privacidade do Gestor Tráfego IA"
      caminho="/privacidade-gestor-trafego-ia"
      atualizado="13 de outubro de 2026"
      rascunho={false}
    >
      <p>
        Esta política descreve como a <strong>In2Out Systems</strong> (&quot;nós&quot;) trata informações no aplicativo <strong>Gestor Tráfego IA</strong>, uma ferramenta interna de gestão de tráfego pago usada para analisar e gerenciar campanhas de publicidade.
      </p>
      <h2>1. Quem somos</h2>
      <p>
        A In2Out Systems é a responsável pelo tratamento dos dados descritos aqui. Contato: <a href="mailto:in2out.systems@gmail.com">in2out.systems@gmail.com</a>.
      </p>
      <h2>2. Quais dados acessamos</h2>
      <p>
        O aplicativo é usado apenas pela nossa equipe. Com a autorização do titular de cada conta (por meio do OAuth do Google), ele acessa dados de contas do Google Ads vinculadas à nossa conta de administrador: configurações de campanhas, orçamentos, anúncios, palavras-chave e métricas de desempenho, como impressões, cliques, custo e conversões.
      </p>
      <p>
        Não coletamos dados pessoais de visitantes, não usamos cookies de rastreamento neste aplicativo e não pedimos o login de terceiros fora da nossa equipe e dos titulares das contas conectadas.
      </p>
      <h2>3. Como usamos os dados</h2>
      <p>
        Usamos os dados do Google Ads exclusivamente para: (a) gerar relatórios e análises de desempenho; (b) criar e editar campanhas mediante revisão humana; e (c) prestar o serviço de gestão de tráfego ao titular da conta.
      </p>
      <h2>4. Compartilhamento</h2>
      <p>
        Não vendemos, alugamos nem compartilhamos dados obtidos do Google com terceiros, exceto quando exigido por lei. Os dados não são usados para publicidade direcionada, para criar perfis nem para treinar modelos de inteligência artificial de uso geral.
      </p>
      <h2>5. Uso de dados de APIs do Google</h2>
      <p>
        O uso e a transferência, para qualquer outro aplicativo, das informações recebidas das APIs do Google seguirão a{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">Política de Dados do Usuário dos Serviços de API do Google</a>, incluindo os requisitos de Uso Limitado.
      </p>
      <h2>6. Armazenamento e segurança</h2>
      <p>
        As credenciais de acesso (tokens) ficam armazenadas em arquivos protegidos nos computadores da nossa equipe, nunca em repositórios públicos. Os relatórios gerados ficam em armazenamento restrito e são mantidos apenas pelo tempo necessário à prestação do serviço.
      </p>
      <h2>7. Seus direitos e revogação de acesso</h2>
      <p>
        Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar acesso, correção ou exclusão dos seus dados. Também pode revogar a qualquer momento o acesso do aplicativo à sua conta do Google em{" "}
        <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>. Para qualquer solicitação, escreva para <a href="mailto:in2out.systems@gmail.com">in2out.systems@gmail.com</a>.
      </p>
      <h2>8. Alterações</h2>
      <p>Podemos atualizar esta política. A data da última atualização aparece no topo desta página.</p>
    </PaginaLegal>
  );
}
