import type { Metadata } from "next";
import { SITE_URL, site } from "./site";

/** Metadados padrão por página, com Open Graph e canonical. */
export function pageMeta(opts: {
  titulo: string;
  descricao: string;
  caminho: string;
  tipo?: "website" | "article";
  publicado?: string;
  atualizado?: string;
  semIndexar?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.caminho}`;
  return {
    title: opts.titulo,
    description: opts.descricao,
    alternates: { canonical: url },
    robots: opts.semIndexar ? { index: false, follow: false } : undefined,
    openGraph: {
      title: opts.titulo,
      description: opts.descricao,
      url,
      siteName: site.nome,
      locale: "pt_BR",
      type: opts.tipo ?? "website",
      ...(opts.tipo === "article" ? { publishedTime: opts.publicado, modifiedTime: opts.atualizado } : {}),
    },
    twitter: { card: "summary_large_image", title: opts.titulo, description: opts.descricao },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.nome,
  url: SITE_URL,
  logo: `${SITE_URL}/img/icone.png`,
  email: site.email,
  sameAs: [site.instagram.url],
  description: site.descricao,
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.nome,
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@type": "Organization", name: site.nome },
};

export function breadcrumbLd(itens: { nome: string; caminho: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.nome,
      item: `${SITE_URL}${i.caminho}`,
    })),
  };
}

export function faqLd(itens: { p: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((i) => ({
      "@type": "Question",
      name: i.p,
      acceptedAnswer: { "@type": "Answer", text: i.r },
    })),
  };
}
