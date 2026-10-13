import type { MetadataRoute } from "next";
import { getTodosArtigos } from "@/lib/content";
import { SITE_URL, produtos, servicos } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = [
    "",
    "/metodo",
    "/servicos",
    "/produtos",
    "/diagnostico",
    "/materiais",
    "/conteudo",
    "/sobre",
    "/contato",
    "/perguntas-frequentes",
    "/instagram",
    "/privacidade",
    "/privacidade-gestor-trafego-ia",
    "/termos",
    "/cookies",
  ];
  return [
    ...fixas.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...servicos.map((s) => ({ url: `${SITE_URL}/servicos/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...produtos.map((p) => ({ url: `${SITE_URL}${p.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getTodosArtigos().map((a) => ({
      url: `${SITE_URL}/conteudo/${a.slug}`,
      lastModified: a.atualizado,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
