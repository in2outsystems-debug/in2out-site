export type Pergunta = { p: string; r: string; grupo: "Geral" | "Método" | "Serviços" | "rAIptor Atende" | "Dados e privacidade" };

export const perguntas: Pergunta[] = [
  {
    grupo: "Geral",
    p: "O que a WS3 Systems faz?",
    r: "Ajudamos micro e pequenas empresas, MEIs e autônomos a organizar processos, automatizar o que é repetitivo e usar inteligência artificial onde ela realmente ajuda. Também oferecemos o rAIptor Atende, produto de atendimento pelo WhatsApp.",
  },
  {
    grupo: "Geral",
    p: "Para que tipo de empresa o trabalho serve?",
    r: "Para comércio local, prestadores de serviço com equipe de 2 a 10 pessoas, MEIs em crescimento e gestores de PMEs com atendimento intenso. Se você tem dúvida, faça o diagnóstico gratuito.",
  },
  {
    grupo: "Geral",
    p: "Quanto custa?",
    r: "O valor depende do que será feito e é informado na conversa inicial, antes de qualquer contratação. [inserir política de preços]",
  },
  {
    grupo: "Método",
    p: "Por que organizar antes de automatizar?",
    r: "Porque automatizar uma bagunça só faz o erro acontecer mais rápido. Primeiro se mapeia, padroniza e mede o processo. Depois se automatiza. A IA entra por último.",
  },
  {
    grupo: "Método",
    p: "Preciso de um sistema caro para começar?",
    r: "Não. O processo começa com papel ou planilha. O sistema vem depois, quando já está claro o que ele precisa fazer.",
  },
  {
    grupo: "Método",
    p: "O que é o teste de 3 perguntas?",
    r: "São três perguntas antes de automatizar qualquer coisa: existe processo definido? Ele está padronizado? Alguém mede o resultado? Se alguma resposta for não, o melhor próximo passo é organizar.",
  },
  {
    grupo: "Serviços",
    p: "Por onde o trabalho começa?",
    r: "Por um processo-piloto, normalmente o atendimento. Mapeamos, padronizamos e criamos indicadores. Os outros processos entram depois, um de cada vez.",
  },
  {
    grupo: "Serviços",
    p: "A IA vai substituir minha equipe?",
    r: "Não. A IA cuida do que é repetitivo e passa para uma pessoa o que exige atenção humana. A equipe fica no controle.",
  },
  {
    grupo: "Serviços",
    p: "Como funciona o diagnóstico gratuito?",
    r: "São poucas perguntas sobre o seu negócio. Ao final você vê em qual de três níveis está (pronto, quase pronto ou organizar antes) e recebe uma recomendação.",
  },
  {
    grupo: "rAIptor Atende",
    p: "O rAIptor Atende substitui funcionários?",
    r: "Não. Ele combina automação e atendimento humano. A equipe continua cuidando do que precisa de atenção humana.",
  },
  {
    grupo: "rAIptor Atende",
    p: "A IA responde qualquer pergunta?",
    r: "Não. As respostas dependem da configuração e das informações autorizadas pela empresa. O que ficar fora disso pode ser passado para uma pessoa.",
  },
  {
    grupo: "rAIptor Atende",
    p: "O rAIptor Atende tem CRM?",
    r: "Sim. O CRM registra contatos, conversas e o andamento de cada cliente, e já vem junto com a IA e as automações.",
  },
  {
    grupo: "rAIptor Atende",
    p: "Ele faz agendamentos?",
    r: "Depende da conexão autorizada com a sua agenda e da validação do fluxo. Isso é combinado na ativação.",
  },
  {
    grupo: "Dados e privacidade",
    p: "O que acontece com os dados que envio nos formulários?",
    r: "Eles são usados só para responder ao seu contato, conforme a política de privacidade e a LGPD. Você pode pedir a exclusão a qualquer momento pelo e-mail de contato.",
  },
  {
    grupo: "Dados e privacidade",
    p: "O site usa cookies de rastreamento?",
    r: "Só de medição, e apenas se você aceitar no aviso de cookies. Recusar é tão simples quanto aceitar e você pode mudar de ideia quando quiser.",
  },
];

export const faqCurto = [perguntas[3], perguntas[4], perguntas[7], perguntas[2]];
