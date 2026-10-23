import { Secao, TopoPagina } from "@/components/Blocos";
import { pageMeta } from "@/lib/seo";
import { FormularioTardio } from "@/components/movimento/Tardios";

export const metadata = pageMeta({
  titulo: "Materiais gratuitos para organizar seus processos",
  descricao: "Guia, checklist e planilha de indicadores para pequenas empresas. Receba por e-mail.",
  caminho: "/materiais",
});

const materiais = [
  {
    nome: "Mapeie seu primeiro processo em 1 hora",
    tipo: "Guia em PDF",
    texto: "Um passo a passo para desenhar como uma tarefa acontece hoje, usando só papel e caneta.",
  },
  {
    nome: "Checklist de erros comuns",
    tipo: "Checklist em PDF",
    texto: "Os erros que mais fazem a organização de processos não pegar, para você conferir antes de começar.",
  },
  {
    nome: "Planilha de indicadores",
    tipo: "Planilha editável",
    texto: "Modelo para registrar tempo, erro e dinheiro por semana e comparar com o mês anterior.",
  },
];

export default function Materiais() {
  return (
    <>
      <TopoPagina
        migalhas={[{ nome: "Materiais", caminho: "/materiais" }]}
        olho="Materiais gratuitos"
        titulo="Ferramentas prontas para usar hoje"
        texto="Preencha nome e e-mail e peça o material. Por enquanto, a entrega é feita pelo WhatsApp ou e-mail da nossa equipe."
      />
      <Secao>
        <ul className="grid gap-6 lg:grid-cols-3">
          {materiais.map((m) => (
            <li key={m.nome} className="cartao flex flex-col">
              <p className="olho">{m.tipo}</p>
              <h2 className="titulo-3 mt-1 text-2xl">{m.nome}</h2>
              <p className="mb-6 mt-2 text-mudo">{m.texto}</p>
              <div className="mt-auto border-t border-linha pt-6">
                <FormularioTardio tipo="material" origem={`material_${m.nome}`} valores={{ material: m.nome }} paramsObrigado={{ material: m.nome }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-mudo">[inserir: arquivos dos três materiais. Enquanto não houver automação, a equipe envia manualmente]</p>
      </Secao>
    </>
  );
}
