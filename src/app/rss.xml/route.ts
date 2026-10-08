import { getTodosArtigos } from "@/lib/content";
import { SITE_URL, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const itens = getTodosArtigos()
    .map(
      (a) => `    <item>
      <title>${esc(a.titulo)}</title>
      <link>${SITE_URL}/conteudo/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/conteudo/${a.slug}</guid>
      <pubDate>${new Date(`${a.publicado}T12:00:00-03:00`).toUTCString()}</pubDate>
      <category>${esc(a.categoria)}</category>
      <description>${esc(a.resumo)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.nome)}: conteúdo</title>
    <link>${SITE_URL}/conteudo</link>
    <description>${esc(site.descricao)}</description>
    <language>pt-BR</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itens}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
