import { AbrirCookies } from "@/components/AbrirCookies";
import { PaginaLegal } from "@/components/PaginaLegal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  titulo: "Política de cookies",
  descricao: "Quais cookies e armazenamentos o site usa, para quê, e como recusar ou mudar sua escolha.",
  caminho: "/cookies",
});

export default function Cookies() {
  return (
    <PaginaLegal titulo="Política de cookies" caminho="/cookies" atualizado="[inserir data]">
      <h2>O que são</h2>
      <p>Cookies são pequenos arquivos guardados no seu navegador. Usamos também o armazenamento local do navegador para lembrar escolhas.</p>
      <h2>O que usamos</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-base">
          <caption className="sr-only">Cookies e armazenamentos usados no site</caption>
          <thead>
            <tr className="border-b border-linha">
              <th scope="col" className="py-2 pr-4">Nome</th>
              <th scope="col" className="py-2 pr-4">Tipo</th>
              <th scope="col" className="py-2 pr-4">Para que serve</th>
              <th scope="col" className="py-2">Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-linha align-top">
              <td className="py-2 pr-4">ws3-consent</td>
              <td className="py-2 pr-4">Necessário (armazenamento local)</td>
              <td className="py-2 pr-4">Guarda se você aceitou ou recusou os cookies de medição.</td>
              <td className="py-2">Até você limpar os dados do navegador</td>
            </tr>
            <tr className="border-b border-linha align-top">
              <td className="py-2 pr-4">ws3-utm</td>
              <td className="py-2 pr-4">Necessário (armazenamento da sessão)</td>
              <td className="py-2 pr-4">Guarda de qual campanha você veio, para o formulário informar a origem do contato.</td>
              <td className="py-2">Até fechar a aba</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4">_ga, _ga_*</td>
              <td className="py-2 pr-4">Medição (Google Analytics)</td>
              <td className="py-2 pr-4">Contam visitas e mostram quais páginas ajudam mais. Só são criados se você aceitar.</td>
              <td className="py-2">Definida pelo Google Analytics</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Como recusar ou mudar a escolha</h2>
      <p>Você pode recusar no aviso que aparece na primeira visita. Para mudar de ideia a qualquer momento, use o botão abaixo.</p>
      <p>
        <AbrirCookies className="!text-acao underline" />
      </p>
      <p>Também é possível apagar cookies nas configurações do navegador.</p>
    </PaginaLegal>
  );
}
