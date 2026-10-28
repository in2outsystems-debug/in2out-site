// Configuração central do site. Novos produtos entram em `produtos` sem mexer na navegação.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ws3systems.vercel.app").replace(/\/$/, "");

export const site = {
  nome: "WS3 Systems",
  slogan: "Processos, automação e IA para quem atende pelo WhatsApp.",
  descricao:
    "Consultoria de gestão de processos, automação, IA e tráfego pago para micro e pequenas empresas, MEIs e autônomos. Primeiro organizar, depois automatizar.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5599984195490",
  email: "ws3.systems@gmail.com",
  instagram: { usuario: "ws3.systems", url: "https://instagram.com/ws3.systems" },
  agendaUrl: process.env.NEXT_PUBLIC_AGENDA_URL || "",
  razaoSocial: "[inserir razão social]",
  cnpj: "[inserir CNPJ]",
  endereco: "[inserir endereço ou cidade de atuação]",
};

export function whatsappLink(mensagem = "Olá! Vim pelo site da WS3 Systems e quero conversar sobre o meu negócio.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Número do WhatsApp para leitura: "5599984195490" vira "(99) 98419-5490". */
export function whatsappFormatado(numero = site.whatsapp) {
  const m = numero.replace(/\D/g, "").replace(/^55/, "").match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : numero;
}

/** Dados da empresa só aparecem quando deixarem de ser placeholders. */
export const dadoPreenchido = (valor: string) => !valor.startsWith("[");

/**
 * Demonstração de 30 minutos: abre a agenda online ou, sem ela, o WhatsApp com o pedido escrito.
 * O rótulo diz para onde o botão leva.
 */
export function demonstracao() {
  return site.agendaUrl
    ? { href: site.agendaUrl, rotulo: "Agendar demonstração (30 min)", viaWhatsapp: false }
    : {
        href: whatsappLink("Olá! Vim pelo site da WS3 Systems e quero agendar uma demonstração de 30 minutos do WS3 Atendy."),
        rotulo: "Pedir demonstração pelo WhatsApp",
        viaWhatsapp: true,
      };
}

export const menu = [
  { href: "/metodo", rotulo: "Método" },
  { href: "/servicos", rotulo: "Serviços" },
  { href: "/produtos", rotulo: "Produtos" },
  { href: "/conteudo", rotulo: "Conteúdo" },
  { href: "/sobre", rotulo: "Sobre" },
];

// Rodapé agrupado pelo que o visitante quer fazer, não pela estrutura do site.
export const rodape = {
  comece: [
    { href: "/diagnostico", rotulo: "Diagnóstico gratuito" },
    { href: "/produtos/ws3-atendy#demonstracao", rotulo: "Demonstração" },
    { href: "/produtos/ws3-atendy#teste-gratuito", rotulo: "Teste de 7 dias" },
    { href: "/contato", rotulo: "Contato" },
  ],
  conheca: [
    { href: "/produtos/ws3-atendy", rotulo: "WS3 Atendy" },
    { href: "/metodo", rotulo: "Método" },
    { href: "/servicos", rotulo: "Serviços" },
    { href: "/sobre", rotulo: "Sobre" },
  ],
  aprenda: [
    { href: "/conteudo", rotulo: "Conteúdo" },
    { href: "/materiais", rotulo: "Materiais gratuitos" },
    { href: "/perguntas-frequentes", rotulo: "Perguntas frequentes" },
  ],
  legal: [
    { href: "/privacidade", rotulo: "Privacidade" },
    { href: "/termos", rotulo: "Termos de uso" },
    { href: "/rss.xml", rotulo: "RSS" },
  ],
};

export type Passo = { numero: number; slug: string; nome: string; resumo: string; detalhe: string };

export const metodo: Passo[] = [
  {
    numero: 1,
    slug: "mapear",
    nome: "Mapear",
    resumo: "Desenhar como o trabalho acontece hoje.",
    detalhe:
      "Anotar quem faz o quê, em que ordem e com quais ferramentas. O mapa mostra o processo como ele é, e não como deveria ser.",
  },
  {
    numero: 2,
    slug: "padronizar",
    nome: "Padronizar",
    resumo: "Escolher um jeito único de fazer.",
    detalhe:
      "Definir o melhor caminho conhecido e escrevê-lo em poucas linhas. Assim qualquer pessoa da equipe entrega o mesmo resultado.",
  },
  {
    numero: 3,
    slug: "medir",
    nome: "Medir",
    resumo: "Acompanhar tempo, erro e dinheiro.",
    detalhe: "Escolher poucos números simples e olhar todo mês. Sem medida, ninguém sabe se a mudança funcionou.",
  },
  {
    numero: 4,
    slug: "automatizar",
    nome: "Automatizar",
    resumo: "Passar para a máquina o que é repetitivo.",
    detalhe:
      "Só entra depois dos três passos anteriores. Automatizar um processo bagunçado faz o erro acontecer mais rápido.",
  },
  {
    numero: 5,
    slug: "ia",
    nome: "IA",
    resumo: "Usar inteligência artificial onde ela ajuda.",
    detalhe:
      "Agentes de IA funcionam bem em tarefas com regra clara e informação autorizada, sempre com transferência para uma pessoa quando necessário.",
  },
];

export type Servico = {
  slug: string;
  nome: string;
  curto: string;
  dor: string;
  paraQuem: string[];
  entregamos: string[];
  etapas: string[];
  entregaveis: string[];
  limites: string[];
  faq: { p: string; r: string }[];
  condicao?: string;
};

export const servicos: Servico[] = [
  {
    slug: "gestao-de-processos",
    nome: "Gestão de processos",
    curto: "Mapeamos um processo-piloto, padronizamos o jeito de fazer e criamos indicadores simples.",
    dor: "O mesmo erro volta todo mês, cada pessoa faz a tarefa do seu jeito e o dono vira o único que sabe como as coisas funcionam.",
    paraQuem: [
      "Comércio local e prestadores de serviço com equipe de 2 a 10 pessoas.",
      "MEIs que começaram a contratar e perceberam que o jeito do dono não se repassa sozinho.",
      "Gestores de PMEs com atendimento intenso e pouca padronização.",
    ],
    entregamos: [
      "Mapa do processo-piloto, que começa pelo atendimento.",
      "Padrão escrito em linguagem simples, com responsáveis e prazos.",
      "Três indicadores: tempo, erro e dinheiro.",
      "Revisão trimestral para ajustar o que a rotina mostrou.",
    ],
    etapas: [
      "Conversa inicial para escolher o processo que mais pesa hoje.",
      "Mapeamento com quem executa a tarefa, não só com o dono.",
      "Padronização e teste com a equipe por algumas semanas.",
      "Definição dos indicadores e da forma de acompanhar.",
      "Revisão trimestral.",
    ],
    entregaveis: [
      "Mapa do processo (PDF e editável)",
      "Padrão de execução de uma página",
      "Painel simples de indicadores",
      "Registro das decisões da revisão",
    ],
    limites: [
      "Começamos por um processo. Os outros entram depois, um de cada vez.",
      "Não implantamos sistemas de gestão completos.",
      "O resultado depende de a equipe seguir o padrão combinado.",
    ],
    faq: [
      {
        p: "Preciso parar a operação para mapear?",
        r: "Não. O mapeamento acontece em conversas curtas, junto da rotina. O tempo exato depende do processo escolhido e é combinado antes de começar.",
      },
      {
        p: "Por que começar pelo atendimento?",
        r: "É onde o cliente percebe a bagunça primeiro e onde o retorno aparece mais rápido. Se outro processo pesar mais, conversamos e ajustamos.",
      },
      {
        p: "Preciso de algum sistema?",
        r: "Não. O processo começa em papel ou planilha. Sistema vem depois, quando já está claro o que ele precisa fazer.",
      },
    ],
  },
  {
    slug: "automacao",
    nome: "Automação",
    curto: "Conectamos as ferramentas que você já usa para tirar o trabalho repetitivo da equipe.",
    dor: "A equipe copia a mesma informação em três lugares, esquece de responder, e o tempo de quem poderia atender melhor vai embora em tarefa manual.",
    paraQuem: [
      "Empresas que já têm o processo definido, padronizado e medido.",
      "Equipes que gastam horas por semana com cópia de dados, avisos e lembretes.",
      "Negócios que usam planilhas, WhatsApp e e-mail e querem que eles conversem entre si.",
    ],
    condicao:
      "Só automatizamos depois do teste de 3 perguntas: existe processo definido? Está padronizado? Alguém mede o resultado? Se a resposta for não, voltamos primeiro para a gestão de processos.",
    entregamos: [
      "Teste de 3 perguntas aplicado ao processo escolhido.",
      "Fluxos automáticos documentados, com o que acontece em cada passo.",
      "Alertas quando algo falhar, para a equipe saber na hora.",
      "Treinamento curto de quem vai conviver com a automação.",
    ],
    etapas: [
      "Aplicar o teste de 3 perguntas.",
      "Desenhar o fluxo automático sobre o processo padronizado.",
      "Construir e testar com dados de exemplo.",
      "Colocar em uso com acompanhamento nas primeiras semanas.",
      "Medir o resultado contra os indicadores de antes.",
    ],
    entregaveis: [
      "Fluxos construídos e documentados",
      "Lista de acessos e integrações usadas",
      "Guia de o que fazer quando algo falha",
      "Comparativo de indicadores antes e depois",
    ],
    limites: [
      "Não automatizamos processo sem padrão definido.",
      "Ferramentas de terceiros podem ter custo próprio, informado antes de começar.",
      "A automação depende de as ferramentas conectadas permitirem integração.",
    ],
    faq: [
      {
        p: "Posso pular direto para a automação?",
        r: "Se o processo já passa no teste de 3 perguntas, sim. Se não passa, automatizar só acelera o erro, e por isso começamos pela organização.",
      },
      {
        p: "Preciso trocar as ferramentas que uso?",
        r: "Na maior parte dos casos, não. A ideia é conectar o que já existe. Quando uma ferramenta não permite integração, dizemos isso antes de começar.",
      },
      {
        p: "Quem cuida da automação depois?",
        r: "Entregamos a documentação para a sua equipe saber como funciona. Manutenção contínua pode ser combinada à parte.",
      },
    ],
  },
  {
    slug: "ia-aplicada",
    nome: "IA aplicada",
    curto: "Agentes de IA que trabalham com informações autorizadas e passam o cliente para uma pessoa quando precisa.",
    dor: "O atendimento recebe as mesmas perguntas o dia todo, o cliente espera por resposta e a equipe não consegue olhar o que exige atenção de verdade.",
    paraQuem: [
      "Empresas com volume de conversas repetidas, principalmente no WhatsApp.",
      "Negócios que já têm o atendimento padronizado e querem dar velocidade a ele.",
      "Equipes pequenas que precisam liberar tempo para os casos que pedem pessoa.",
    ],
    condicao:
      "A IA entra por último no método. Ela precisa de um processo claro e de informações que você autorizou, e sempre com um caminho para a equipe assumir a conversa.",
    entregamos: [
      "Definição do que o agente pode e não pode responder.",
      "Base de conhecimento montada com informações autorizadas pela empresa.",
      "Regras de transferência para uma pessoa.",
      "Período de ajuste com revisão de conversas reais.",
    ],
    etapas: [
      "Escolher a tarefa de atendimento que será apoiada pela IA.",
      "Reunir e revisar as informações autorizadas.",
      "Configurar o agente e as regras de transferência.",
      "Testar com a equipe antes de abrir para clientes.",
      "Revisar conversas e ajustar.",
    ],
    entregaveis: [
      "Agente configurado e testado",
      "Base de conhecimento documentada",
      "Regras de transferência para pessoa",
      "Relatório de revisão das primeiras conversas",
    ],
    limites: [
      "O agente responde apenas conforme a configuração e a base de conhecimento.",
      "Não prometemos resposta correta para qualquer pergunta.",
      "A equipe continua responsável pelo que exige decisão humana.",
    ],
    faq: [
      {
        p: "A IA vai substituir minha equipe?",
        r: "Não. Ela cuida do repetitivo e passa para uma pessoa o que exige atenção humana. A equipe fica no controle.",
      },
      {
        p: "A IA pode inventar respostas?",
        r: "Por isso o agente trabalha com informações autorizadas e com regras de transferência. Revisamos conversas reais para ajustar o que for preciso.",
      },
      {
        p: "Existe um produto pronto para isso?",
        r: "Sim, o WS3 Atendy, que reúne IA, CRM e automações no WhatsApp. Também montamos soluções sob medida quando faz sentido.",
      },
    ],
  },
  {
    slug: "trafego-pago",
    nome: "Gestão de tráfego pago",
    curto: "Criamos e acompanhamos anúncios no Google e no Meta (Instagram e Facebook) para trazer novos clientes até o seu atendimento.",
    dor: "Já tentou impulsionar posts ou rodar anúncios, o dinheiro saiu e ninguém sabe dizer quantos clientes vieram de lá.",
    paraQuem: [
      "Negócios com o atendimento já organizado que querem receber mais contatos.",
      "Comércio local e prestadores de serviço que querem aparecer para quem procura na região.",
      "Empresas que já anunciam, mas não sabem dizer o que funciona e o que só gasta.",
    ],
    condicao:
      "Anúncio traz gente para o atendimento. Se o atendimento ainda perde contatos ou demora a responder, o investimento vaza. Por isso olhamos primeiro se o processo de atendimento aguenta o volume.",
    entregamos: [
      "Plano de campanhas com objetivo, público e verba definidos.",
      "Criação e configuração das campanhas no Google Ads e no Meta Ads.",
      "Acompanhamento e ajustes periódicos dos anúncios.",
      "Relatório mensal com os contatos gerados e o custo de cada um.",
    ],
    etapas: [
      "Conversa para definir objetivo, região e verba.",
      "Revisar o atendimento e a forma de saber de onde veio cada contato.",
      "Montar as campanhas e os anúncios.",
      "Publicar e acompanhar de perto as primeiras semanas.",
      "Relatório mensal e ajustes.",
    ],
    entregaveis: [
      "Campanhas configuradas nas contas da empresa",
      "Plano de campanhas documentado",
      "Relatório mensal de desempenho",
      "Registro das mudanças feitas nas campanhas",
    ],
    limites: [
      "Atuamos apenas no Google Ads e no Meta Ads.",
      "A verba dos anúncios é paga direto às plataformas, separada do valor do serviço.",
      "Não prometemos número de vendas. O resultado depende também da oferta, do preço e do atendimento.",
    ],
    faq: [
      {
        p: "A conta de anúncios fica no meu nome?",
        r: "Sim. As campanhas rodam nas contas da sua empresa e você dá acesso à WS3. Se o trabalho terminar, tudo continua com você.",
      },
      {
        p: "Quanto preciso investir em anúncios?",
        r: "Depende do objetivo e da região. Combinamos a verba antes de começar, e dá para começar pequeno e aumentar conforme os números aparecem.",
      },
      {
        p: "Por que vocês olham o atendimento antes dos anúncios?",
        r: "Porque anúncio sem atendimento organizado desperdiça verba. Se o contato chega e ninguém responde a tempo, o dinheiro foi embora.",
      },
    ],
  },
];

export type Produto = {
  slug: string;
  nome: string;
  chamada: string;
  descricao: string;
  href: string;
  cta: string;
  ctaHref: string;
};

// Para adicionar um produto novo: inclua um item aqui e crie a página em src/app/produtos/<slug>.
export const produtos: Produto[] = [
  {
    slug: "ws3-atendy",
    nome: "WS3 Atendy",
    chamada: "Atendimento com IA, CRM e automações no WhatsApp.",
    descricao:
      "Atenda novos interessados e clientes atuais pelo WhatsApp, organize as informações e dê continuidade às conversas. A equipe fica no controle do que precisa de atenção humana.",
    href: "/produtos/ws3-atendy",
    cta: demonstracao().rotulo,
    ctaHref: demonstracao().href,
  },
];

export const categorias = [
  "Diagnóstico",
  "Mitos",
  "Passo a passo",
  "Erros comuns",
  "Automação e IA",
  "Indicadores",
] as const;
export type Categoria = (typeof categorias)[number];

export const glossario = {
  CRM: "Sistema onde ficam registrados os contatos, as conversas e o andamento de cada cliente. Substitui o caderno e a memória.",
  funil:
    "O caminho que a pessoa percorre desde o primeiro contato até virar cliente. Cada etapa mostra quantos ficaram e quantos saíram.",
  BPM: "Sigla de gestão de processos de negócio. É o hábito de desenhar, melhorar e acompanhar como o trabalho acontece.",
  processo:
    "A sequência de passos que a empresa repete para entregar algo, como atender um cliente ou emitir um orçamento.",
  indicador: "Um número simples que mostra se o processo está indo bem, como o tempo para responder um cliente.",
  webhook: "Um endereço que recebe um aviso automático de outro sistema assim que algo acontece.",
  "base de conhecimento":
    "O conjunto de informações da empresa que a IA pode consultar para responder, como preços, horários e regras.",
} as const;
export type Termo = keyof typeof glossario;
