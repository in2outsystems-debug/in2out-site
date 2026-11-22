export type Pergunta = { p: string; r: string; grupo: "Geral" | "Método" | "Serviços" | "WS3 Atendy" | "Dados e privacidade" };

export const perguntas: Pergunta[] = [
  {
    grupo: "Geral",
    p: "O que a WS3 Systems faz?",
    r: "Trazemos clientes para pequenas empresas e autônomos com anúncios no Instagram, no Facebook e no Google, e cuidamos para que nenhum fique sem resposta com o WS3 Atendy, nosso sistema de atendimento com IA no WhatsApp. Também organizamos processos e automatizamos tarefas repetitivas.",
  },
  {
    grupo: "Geral",
    p: "Para que tipo de empresa o trabalho serve?",
    r: "Para comércio local, prestadores de serviço com equipe de 2 a 10 pessoas, MEIs em crescimento e gestores de PMEs com atendimento intenso. Se você tem dúvida, faça o diagnóstico gratuito.",
  },
  {
    grupo: "Geral",
    p: "Quanto custa?",
    r: "A gestão de tráfego começa em R$ 497 por mês e o WS3 Atendy custa R$ 397 por mês. Juntos, nos combos, a partir de R$ 797. A verba dos anúncios é paga direto ao Meta ou ao Google, e o consumo de IA do Atendy vai direto na conta OpenAI da sua empresa, sem intermediário. Todos os valores estão na página de planos.",
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
    grupo: "WS3 Atendy",
    p: "O WS3 Atendy substitui funcionários?",
    r: "Não. Ele combina automação e atendimento humano. A equipe continua cuidando do que precisa de atenção humana.",
  },
  {
    grupo: "WS3 Atendy",
    p: "A IA responde qualquer pergunta?",
    r: "Não. As respostas dependem da configuração e das informações autorizadas pela empresa. O que ficar fora disso pode ser passado para uma pessoa.",
  },
  {
    grupo: "WS3 Atendy",
    p: "Quanto custa o WS3 Atendy?",
    r: "R$ 397 por mês, com implantação de R$ 397 (isenta nos combos com tráfego). O consumo de IA é pago direto na conta OpenAI da sua empresa, conforme o uso. Dá para testar por 7 dias antes de contratar.",
  },
  {
    grupo: "WS3 Atendy",
    p: "O WS3 Atendy tem CRM?",
    r: "Sim. O CRM registra contatos, conversas e o andamento de cada cliente, e já vem junto com a IA e as automações.",
  },
  {
    grupo: "WS3 Atendy",
    p: "Ele faz agendamentos?",
    r: "Sim. Os agentes de IA consultam os horários livres, marcam, remarcam e cancelam pela conversa. A agenda pode ser sincronizada com o Google Agenda e gerar o link do Google Meet.",
  },
  {
    grupo: "WS3 Atendy",
    p: "Como o WhatsApp é conectado?",
    r: "Pelo próprio celular: você lê um QR Code ou digita um código de pareamento. O mesmo número passa a servir o atendimento, os follow-ups e os agentes de IA.",
  },
  {
    grupo: "Serviços",
    p: "Vocês gerenciam anúncios?",
    r: "Sim. Criamos e acompanhamos campanhas no Meta Ads e no Google Ads, nas contas da sua empresa. A partir do plano Crescimento, montamos os criativos como cortesia, com as fotos e vídeos que você envia. E olhamos se o atendimento aguenta o volume, porque anúncio sem resposta rápida desperdiça verba.",
  },
  {
    grupo: "WS3 Atendy",
    p: "Posso enviar mensagens em massa pelo WhatsApp?",
    r: "Não recomendamos. O WS3 Atendy conecta o WhatsApp por QR Code, que não é a conexão oficial da Meta, e envios em massa podem bloquear o número. Ele permite campanhas pequenas e segmentadas por tags, com intervalo entre os envios, só para quem autorizou receber.",
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
