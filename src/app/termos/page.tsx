import { PaginaLegal } from "@/components/PaginaLegal";
import { pageMeta } from "@/lib/seo";
import { dadoPreenchido, site } from "@/lib/site";

export const metadata = pageMeta({
  titulo: "Termos de uso",
  descricao: "Condições para uso do site e dos conteúdos da WS3 Systems.",
  caminho: "/termos",
});

// O foro depende de definição jurídica; só aparece fora de produção, para a equipe lembrar de preencher.
const pendentes = process.env.NODE_ENV !== "production";

export default function Termos() {
  return (
    <PaginaLegal titulo="Termos de uso" caminho="/termos" atualizado="[inserir data]">
      <h2>Sobre o site</h2>
      <p>
        Este site {dadoPreenchido(site.razaoSocial) && dadoPreenchido(site.cnpj) ? `é mantido por ${site.razaoSocial}, CNPJ ${site.cnpj}, e` : ""} apresenta a marca {site.nome}, seus serviços, produtos e conteúdos educativos.
      </p>
      <h2>Conteúdo informativo</h2>
      <p>Os artigos, guias e planilhas têm finalidade educativa. Eles não substituem uma análise do seu caso e não garantem resultados específicos, que dependem de cada empresa.</p>
      <h2>Propriedade intelectual</h2>
      <p>Textos, marcas, imagens e materiais pertencem à WS3 Systems ou são usados com autorização. Você pode usar os materiais gratuitos em sua própria empresa. A cópia e a revenda dependem de autorização por escrito.</p>
      <h2>Serviços e produtos</h2>
      <p>
        As condições de cada serviço, incluindo valores, prazos e responsabilidades, são combinadas em proposta ou contrato próprio. O teste gratuito de 7 dias do WS3 Atendy segue as condições informadas a você antes da ativação, incluindo duração e eventuais custos de serviços de terceiros.
      </p>
      <h2>Links externos</h2>
      <p>O site pode apontar para páginas de terceiros. Não controlamos o conteúdo delas.</p>
      <h2>Alterações</h2>
      <p>Podemos atualizar estes termos. A data no topo indica a versão em vigor.</p>
      {pendentes && (
        <>
          <h2>Foro</h2>
          <p>[inserir foro e legislação aplicável]</p>
        </>
      )}
      <h2>Contato</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </PaginaLegal>
  );
}
