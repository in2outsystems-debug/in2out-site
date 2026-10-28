import { PaginaLegal } from "@/components/PaginaLegal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Política de privacidade",
  descricao: "Como a WS3 Systems coleta, usa e protege os seus dados, conforme a LGPD.",
  caminho: "/privacidade",
});

export default function Privacidade() {
  return (
    <PaginaLegal titulo="Política de privacidade" caminho="/privacidade" atualizado="[inserir data]">
      <h2>1. Quem somos</h2>
      <p>
        {site.razaoSocial}, CNPJ {site.cnpj}, que opera a marca {site.nome}. Esta política explica como tratamos os dados pessoais de quem usa o site, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>
      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>Dados que você informa nos formulários: nome, e-mail, WhatsApp, empresa, segmento e as informações que escrever na mensagem.</li>
        <li>Respostas do diagnóstico, quando você pede a recomendação por e-mail.</li>
        <li>Dados de navegação (páginas visitadas, origem do acesso), somente se você aceitar os cookies de medição.</li>
      </ul>
      <h2>3. Para que usamos</h2>
      <ul>
        <li>Responder ao seu contato e ao seu pedido de teste.</li>
        <li>Enviar o material ou a recomendação que você pediu.</li>
        <li>Enviar artigos novos, se você assinou a newsletter.</li>
        <li>Entender quais conteúdos ajudam mais e melhorar o site.</li>
      </ul>
      <h2>4. Base legal</h2>
      <p>O tratamento se apoia no seu consentimento, que você dá ao marcar a caixa nos formulários e no aviso de cookies, e na execução de procedimentos preliminares a um contrato, quando você pede uma proposta ou um teste.</p>
      <h2>5. Com quem compartilhamos</h2>
      <p>
        Usamos serviços de terceiros para operar o site: hospedagem (Vercel), automação de formulários e e-mails ([inserir ferramenta, por exemplo n8n e provedor de e-mail]), e medição (Google Analytics, via Google Tag Manager, somente com consentimento). [inserir lista final de operadores]
      </p>
      <h2>6. Por quanto tempo guardamos</h2>
      <p>[inserir prazos de retenção por tipo de dado]</p>
      <h2>7. Seus direitos</h2>
      <p>
        Você pode pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados e a revogação do consentimento. Escreva para{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>8. Cookies</h2>
      <p>
        Os detalhes estão na <a href="/cookies">política de cookies</a>.
      </p>
      <p>
        O aplicativo Gestor Tráfego IA tem uma política própria:{" "}
        <a href="/privacidade-gestor-trafego-ia">privacidade do Gestor Tráfego IA</a>.
      </p>
      <h2>9. Encarregado de dados</h2>
      <p>[inserir nome e contato do encarregado, se aplicável]</p>
      <h2>10. Mudanças</h2>
      <p>Quando esta política mudar, a data no topo da página é atualizada.</p>
    </PaginaLegal>
  );
}
