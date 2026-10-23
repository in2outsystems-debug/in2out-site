# WS3 Systems: site institucional

Site em português do Brasil, mobile-first, feito com Next.js (App Router), TypeScript e Tailwind CSS.

## Como rodar

```
npm install
cp .env.example .env.local   # preencha as variáveis abaixo
npm run dev                  # http://localhost:3000
npm run build && npm start   # versão de produção
```

## Variáveis de ambiente

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública, sem barra final. Usada em sitemap, RSS, Open Graph e dados estruturados. |
| `FORM_WEBHOOK_URL` | Opcional. Webhook (n8n, nó "Webhook", método POST) que recebe todos os formulários. **Sem ele, o formulário termina no WhatsApp:** depois de validar, o site mostra um botão "Enviar pelo WhatsApp" com a mensagem já preenchida com os dados. A equipe só recebe o contato quando a pessoa toca em enviar, e materiais e recomendações do diagnóstico precisam ser enviados manualmente. |
| `FORM_WEBHOOK_SECRET` | Opcional. Enviado no cabeçalho `x-webhook-secret` para o n8n conferir a origem. |
| `NEXT_PUBLIC_GTM_ID` | ID do Google Tag Manager (`GTM-XXXXXXX`). O GA4 é configurado dentro do GTM. Só carrega depois do aceite de cookies. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp com DDI e DDD, só números. |
| `NEXT_PUBLIC_AGENDA_URL` | Link da agenda de 30 minutos (Cal.com, Calendly). Vazio mostra um placeholder. |

### Formato do webhook

Todos os formulários enviam o mesmo JSON:

```json
{
  "tipo": "contato | teste | material | newsletter | diagnostico",
  "recebidoEm": "2026-10-08T12:00:00.000Z",
  "pagina": "/contato",
  "utm": { "utm_source": "instagram", "utm_medium": "bio" },
  "consentimentoLgpd": true,
  "campos": { "nome": "...", "email": "..." }
}
```

No n8n, use um nó Switch por `tipo` para rotear: contato e teste para o CRM e o WhatsApp da equipe, material para o envio do arquivo por e-mail, newsletter para a lista, diagnostico para o e-mail com a recomendação.

## Como trocar a identidade visual

Tudo fica em `src/app/globals.css`, no bloco `:root`:

- Cores em formato `R G B` (ação, destaque de dados, seções escuras, erro, sucesso).
- Fontes: `--fonte-texto` e `--fonte-titulo`. A fonte Inter é carregada em `src/app/layout.tsx`; troque lá para mudar de família.
- Raios: `--raio` e `--raio-grande`.
- Logo: `public/img/icone.png` (cabeçalho, rodapé e dados estruturados).

O Tailwind lê essas variáveis em `tailwind.config.ts`, então nada mais precisa mudar. Ao trocar cores, confira o contraste mínimo de 4.5:1 entre texto e fundo.

## Estrutura

```
src/app/            páginas e rotas (api/lead, rss.xml, sitemap, robots)
src/components/     cabeçalho, rodapé, formulário, quiz, tooltip, dado com fonte...
src/lib/site.ts     configuração central: menu, serviços, produtos, passos do método, glossário
src/lib/forms.ts    definição única dos formulários (campos e validação, cliente e servidor)
src/lib/faq.ts      perguntas frequentes
src/lib/content.ts  camada de conteúdo do blog
content/artigos/    artigos em MDX
```

### Adicionar um produto

1. Inclua um item em `produtos` em `src/lib/site.ts`. Ele aparece sozinho na Home e em `/produtos`.
2. Crie a página em `src/app/produtos/<slug>/page.tsx` (use `raiptor-atende` como modelo).

### Adicionar um artigo

Crie `content/artigos/<slug>.mdx` com o cabeçalho (frontmatter) dos artigos existentes: `titulo`, `resumo`, `categoria`, `publicado`, `atualizado`, `resposta`, `checklist`, `fontes`, `relacionados`. O sumário, o tempo de leitura, o RSS, o sitemap e os dados estruturados saem automaticamente.

Para migrar para um CMS headless, reescreva apenas `getTodosArtigos` e `getArtigo` em `src/lib/content.ts`, mantendo o tipo `Artigo`.

### Dado com fonte

Todo número usa o componente `DadoComFonte` (valor, legenda, fonte e data). Em texto corrido, cite a fonte e o ano na mesma frase ou no bloco "Fontes" do artigo.

## Analytics e cookies

- O banner oferece "Recusar" e "Aceitar" com o mesmo peso. A escolha fica em `localStorage` (`ws3-consent`). O rodapé tem "Preferências de cookies" para mudar depois.
- O GTM só é injetado após o aceite. Nenhum evento é enviado sem consentimento.
- Eventos enviados ao `dataLayer`: `cta_click` (com `posicao`), `form_start`, `form_submit`, `quiz_start`, `quiz_complete`, `quiz_lead`, `whatsapp_click`, `material_download`, `newsletter_signup`, `faq_open`, `scroll_depth` (25, 50, 75, 90), `busca_conteudo`, `page_view_spa`. Crie os gatilhos correspondentes no GTM e envie ao GA4.
- UTM: capturadas na primeira visita, em minúsculas, e enviadas junto de cada formulário. Para gerar links de campanha padronizados, use `utmLink()` em `src/lib/analytics.ts`.

## Anti-spam

Campo isca invisível, tempo mínimo de preenchimento (2,5 s) e limite de 5 envios por IP a cada 10 minutos. O limite vale por instância no ambiente serverless; para algo mais forte, adicione Cloudflare Turnstile ou o firewall da Vercel.

## Deploy na Vercel

O projeto `ws3systems` já existe na Vercel. Em Settings, Build and Deployment, confira se o Framework Preset está como **Next.js** (antes o site era estático) e cadastre as variáveis de ambiente.

## Placeholders pendentes

Procure por `[inserir` no código (`grep -rn "\[inserir" src content`) para ver todos. Resumo:

- **Dados da empresa** (`src/lib/site.ts`): razão social, CNPJ, endereço.
- **Páginas legais**: datas, prazos de retenção, lista de operadores de dados, encarregado (DPO), foro, duração dos cookies do GA4. Os três textos são base e precisam de revisão jurídica.
- **Sobre**: história da WS3, nomes, cargos e fotos da equipe.
- **Home**: apresentação e foto da equipe em "Quem está por trás"; captura de tela do rAIptor Atende.
- **rAIptor Atende**: capturas de tela da caixa de entrada e do CRM.
- **Contato**: link da agenda (`NEXT_PUBLIC_AGENDA_URL`).
- **Materiais**: os três arquivos (guia, checklist e planilha) e a automação de envio no n8n.
- **Perguntas frequentes**: política de preços.
- **Identidade visual**: cores, fonte e logo definitivos.
- **Instagram**: o usuário usado no site é `@ws3.systems` (`src/lib/site.ts`). O site anterior apontava para `ws3.systems`; confirme qual é o correto.

## Artigos de exemplo

Os seis artigos em `content/artigos` são exemplos estruturados. As datas de publicação são fictícias e o conteúdo precisa de revisão da equipe antes de ir ao ar. Os únicos números usados vêm da pesquisa Sobrevivência de Empresas do Sebrae (2020).
