import { z } from "zod";

// Definição única dos formulários: usada pelo navegador (campos e validação) e pelo servidor (validação).

export type CampoDef = {
  nome: string;
  rotulo: string;
  tipo: "text" | "email" | "tel" | "textarea" | "select" | "number" | "hidden";
  obrigatorio?: boolean;
  opcoes?: string[];
  dica?: string;
  autoComplete?: string;
  max?: number;
};

export const segmentos = [
  "Comércio",
  "Serviços",
  "Escola ou curso",
  "Provedor de internet",
  "Agência ou consultoria",
  "Indústria ou produtos",
  "Saúde ou bem-estar",
  "Outro",
];

const nome: CampoDef = { nome: "nome", rotulo: "Nome", tipo: "text", obrigatorio: true, autoComplete: "name", max: 120 };
const email: CampoDef = {
  nome: "email",
  rotulo: "E-mail",
  tipo: "email",
  obrigatorio: true,
  autoComplete: "email",
  max: 160,
};
const whatsapp = (obrigatorio: boolean): CampoDef => ({
  nome: "whatsapp",
  rotulo: "WhatsApp",
  tipo: "tel",
  obrigatorio,
  autoComplete: "tel",
  dica: "Com DDD. Exemplo: 11 91234-5678",
  max: 20,
});
const empresa = (obrigatorio: boolean): CampoDef => ({
  nome: "empresa",
  rotulo: "Empresa",
  tipo: "text",
  obrigatorio,
  autoComplete: "organization",
  max: 120,
});

export const tiposDeFormulario = ["contato", "teste", "material", "newsletter", "diagnostico"] as const;
export type TipoFormulario = (typeof tiposDeFormulario)[number];

export const formularios: Record<TipoFormulario, { campos: CampoDef[]; enviar: string }> = {
  contato: {
    enviar: "Enviar mensagem",
    campos: [
      nome,
      empresa(true),
      whatsapp(true),
      email,
      {
        nome: "assunto",
        rotulo: "Assunto",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Gestão de processos",
          "Automação",
          "IA aplicada",
          "Tráfego pago",
          "WS3 Atendy",
          "Outro assunto",
        ],
      },
      { nome: "mensagem", rotulo: "Mensagem", tipo: "textarea", obrigatorio: true, max: 2000 },
    ],
  },
  teste: {
    enviar: "Pedir teste gratuito de 7 dias",
    campos: [
      nome,
      email,
      whatsapp(true),
      empresa(true),
      { nome: "segmento", rotulo: "Segmento", tipo: "select", obrigatorio: true, opcoes: segmentos },
      {
        nome: "atendentes",
        rotulo: "Quantas pessoas atendem clientes?",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["1", "2 a 3", "4 a 10", "Mais de 10"],
      },
      {
        nome: "volume",
        rotulo: "Conversas por mês, aproximadamente",
        tipo: "select",
        obrigatorio: true,
        opcoes: ["Até 100", "101 a 500", "501 a 2.000", "Mais de 2.000", "Não sei dizer"],
      },
      {
        nome: "necessidade",
        rotulo: "O que você mais precisa resolver?",
        tipo: "select",
        obrigatorio: true,
        opcoes: [
          "Responder mais rápido",
          "Organizar os contatos e o funil",
          "Agendar atendimentos",
          "Fazer retorno e follow-up",
          "Reduzir o trabalho repetitivo da equipe",
          "Outra necessidade",
        ],
      },
    ],
  },
  material: {
    enviar: "Quero receber o material",
    campos: [nome, email, { nome: "material", rotulo: "Material", tipo: "hidden" }],
  },
  newsletter: {
    enviar: "Quero receber",
    campos: [email],
  },
  diagnostico: {
    enviar: "Receber minha recomendação",
    campos: [
      { ...nome, obrigatorio: false },
      email,
      { nome: "nivel", rotulo: "Nível", tipo: "hidden" },
      { nome: "respostas", rotulo: "Respostas", tipo: "hidden" },
      { nome: "segmento", rotulo: "Segmento", tipo: "hidden" },
      { nome: "porte", rotulo: "Porte", tipo: "hidden" },
    ],
  },
};

export const mensagens = {
  obrigatorio: "Preencha este campo.",
  email: "Digite um e-mail válido, como nome@empresa.com.br.",
  whatsapp: "Digite um WhatsApp com DDD, por exemplo 11 91234-5678.",
  opcao: "Escolha uma das opções.",
  consentimento: "Marque a caixa para autorizar o uso dos seus dados.",
  longo: "Este texto está longo demais.",
};

export function validarCampo(def: CampoDef, valor: string): string | null {
  const v = valor.trim();
  if (!v) return def.obrigatorio && def.tipo !== "hidden" ? mensagens.obrigatorio : null;
  if (def.max && v.length > def.max) return mensagens.longo;
  if (def.tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return mensagens.email;
  if (def.tipo === "tel") {
    const digitos = v.replace(/\D/g, "");
    if (digitos.length < 10 || digitos.length > 13) return mensagens.whatsapp;
  }
  if (def.tipo === "select" && def.opcoes && !def.opcoes.includes(v)) return mensagens.opcao;
  return null;
}

/** Esquema zod do envio completo, usado no servidor. */
export const envioSchema = z.object({
  tipo: z.enum(tiposDeFormulario),
  campos: z.record(z.string(), z.string().max(4000)),
  consentimento: z.literal(true, { error: mensagens.consentimento }),
  hp: z.string().max(200).optional(),
  t: z.number().optional(),
  pagina: z.string().max(300).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
});

export type Envio = z.infer<typeof envioSchema>;

const titulos: Record<TipoFormulario, string> = {
  contato: "Quero falar com a WS3",
  teste: "Quero testar o WS3 Atendy por 7 dias",
  material: "Quero receber um material gratuito",
  newsletter: "Quero receber os novos artigos",
  diagnostico: "Fiz o diagnóstico no site",
};

/** Mensagem de WhatsApp com os dados do formulário. Usada quando não há webhook configurado. */
export function mensagemWhatsapp(tipo: TipoFormulario, campos: Record<string, string>) {
  const linhas = formularios[tipo].campos
    .map((c) => {
      const v = (campos[c.nome] ?? "").trim();
      return v ? `${c.rotulo}: ${v}` : "";
    })
    .filter(Boolean);
  return ["Olá! " + titulos[tipo] + ".", "", ...linhas].join("\n");
}
