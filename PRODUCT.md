# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos e gestores de pequenas e médias empresas (também MEIs e autônomos que começaram a contratar) que atendem clientes pelo WhatsApp. Chegam sem tempo, quase sempre pelo celular, vindos do Instagram ou de anúncios. O trabalho deles no site: entender rápido se a WS3 resolve o atendimento que hoje trava no WhatsApp e decidir se vale meia hora para ver funcionando.

## Product Purpose

A WS3 Systems une consultoria de processos e produto. A consultoria organiza o trabalho (gestão de processos, automação, IA aplicada, gestão de tráfego pago); o produto, **WS3 Atendy**, atende pelo WhatsApp com IA, CRM e automações, com a equipe no controle do que precisa de atenção humana.

Sucesso do site: a pessoa agenda uma demonstração de 30 minutos (`NEXT_PUBLIC_AGENDA_URL`). WhatsApp é a alternativa.

## Positioning

Processo antes de IA. A WS3 não implanta IA em cima de bagunça: o caminho é Mapear, Padronizar, Medir, Automatizar, IA, sempre nessa ordem. Por isso o **diagnóstico vem primeiro**: ele faz parte da metodologia e decide se o negócio já está pronto para automação e para o Atendy. A demonstração vem depois, como o próximo passo de quem tem o processo minimamente estabelecido.

## Operating Context

- Jornada: diagnóstico gratuito (quiz de 5 perguntas em `/diagnostico`) → agendar demonstração de 30 minutos → teste gratuito de 7 dias do WS3 Atendy (formulário `teste`, condições informadas antes da ativação) → WhatsApp como canal alternativo em todos os pontos.
- Formulários vão para um webhook n8n (`FORM_WEBHOOK_URL`); sem ele, terminam no WhatsApp com a mensagem preenchida.
- Conteúdo de apoio: artigos MDX, materiais gratuitos, perguntas frequentes, glossário de termos.
- Teste de 3 perguntas antes de automatizar: existe processo definido? Está padronizado? Alguém mede?

## Capabilities and Constraints

- Next.js (App Router), TypeScript, Tailwind; deploy na Vercel (projeto `ws3systems`).
- Português do Brasil, mobile-first.
- Consentimento LGPD: GTM/GA4 só carregam após aceite; banner com "Recusar" e "Aceitar" de mesmo peso.
- O produto se chama **WS3 Atendy** (nome provisório), na rota `/produtos/ws3-atendy`; `/produtos/raiptor-atende` redireciona para ela. A imagem `public/img/raiptor-painel.png` ainda mostra o nome antigo.
- Indefinidos: política de preços, link da agenda, dados legais da empresa (razão social, CNPJ, endereço), Instagram definitivo (`@ws3.systems` a confirmar).

### O que o WS3 Atendy faz (fonte: WS3-Systems-Guia-de-Funcionalidades.pdf, out/2026)

- Conversas: todo o WhatsApp da empresa numa caixa de entrada única, em tempo real; indicador de quem atende ("IA atendendo" ou "Atendimento humano"); a equipe assume com um clique e devolve para a IA.
- Funil (kanban), base de contatos única, tags, campos personalizados, tarefas e mensagens agendadas; importação de planilhas.
- Agendamentos com várias agendas, sincronização opcional com Google Agenda e link do Google Meet; status "Não compareceu".
- Follow-up automático por etapa do funil e disparos segmentados por tags, com cadência e horário controlados.
- Agentes de IA em equipes: atendem, qualificam, agendam, movem o lead no funil, fazem follow-up e transferem para uma pessoa com o contexto; treinados com PDFs, tom de voz e regras da empresa; guardrails e horários de atendimento.
- Automações visuais sem código (gatilhos e ações ligados ao WhatsApp, CRM, agenda e IA); dashboard, relatórios, NPS; permissões por equipe.
- A empresa usa a própria chave da OpenAI: o consumo de IA vai direto na conta dela.

### O que não prometer

- API oficial do WhatsApp ou "parceiro Meta": a conexão é por pareamento do celular (QR Code ou código).
- Respostas por voz da IA; análise de imagens em toda instalação; gestão financeira ou cobranças; autocadastro (o acesso é liberado pela equipe WS3).
- Números, depoimentos ou casos enquanto não existirem.

## Brand Commitments

- Nome: WS3 Systems. Produto: WS3 Atendy.
- Tom: tecnológico, direto, confiável. Frases curtas, verbo na frente, sem jargão, sem travessão.
- Identidade vinculante: preto, azul #0453F1, ciano #00D6F0, Montserrat. Logo em `public/img/logo.png` e `public/img/icone.png`.

## Evidence on Hand

- **Não há clientes, depoimentos, casos nem números de resultado.** Nenhum deles pode ser inventado.
- Os únicos dados usados são da pesquisa Sobrevivência de Empresas do Sebrae (2020), sempre com fonte via `DadoComFonte`.
- Capturas de tela do produto ainda não são definitivas (`raiptor-painel.png` é do nome antigo); telas reais do Atendy precisam ser fornecidas.
- Os seis artigos em `content/artigos` são exemplos com datas fictícias, pendentes de revisão.

## Product Principles

1. Processo primeiro: nenhuma página promete IA como atalho para um negócio desorganizado.
2. Diagnóstico abre a porta, demonstração fecha: toda página leva a um dos dois, nessa ordem.
3. Prova antes de promessa: sem prova disponível, ser específico sobre o que é entregue e o que não é (limites explícitos), em vez de adjetivos.
4. Respeitar o tempo de quem lê no celular: um ponto por bloco.

## Accessibility & Inclusion

Contraste mínimo 4.5:1 em todo texto; movimento respeita `prefers-reduced-motion`; linguagem simples com glossário para termos técnicos (CRM, funil, webhook).
