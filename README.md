# In2Out Systems — Site institucional

Site institucional (one-page) da In2Out Systems: gestão de processos e automação para PME, MEI e profissional liberal.

## Stack

HTML, CSS e JS puros (sem build step). Deploy estático direto na Vercel.

## Estrutura

```
site/
  index.html
  assets/
    css/style.css
    js/script.js
    img/           # logo e ícone da marca
```

## Rodar localmente

Abra `index.html` no navegador, ou sirva a pasta com qualquer servidor estático, por exemplo:

```
npx serve .
```

## Editar conteúdo

Todo o texto está direto no `index.html`, seção por seção (Hero, Serviços, Como funciona, Sobre, Contato). Cores e tipografia (paleta oficial in2out) estão centralizadas em `:root` no topo de `assets/css/style.css`.
