import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Categoria } from "./site";

// Camada de conteúdo do blog. Hoje lê arquivos MDX em /content/artigos.
// Para trocar por um CMS headless (Sanity, Contentful, Strapi etc.), reescreva apenas
// as funções getTodosArtigos e getArtigo mantendo o tipo Artigo.

export type Fonte = { nome: string; data: string; url?: string };

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  publicado: string;
  atualizado: string;
  resposta: string;
  checklist: string[];
  fontes: Fonte[];
  relacionados: string[];
  corpo: string;
  toc: { id: string; texto: string }[];
  minutos: number;
};

const DIR = path.join(process.cwd(), "content", "artigos");

export function slugify(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ler(arquivo: string): Artigo {
  const bruto = fs.readFileSync(path.join(DIR, arquivo), "utf8");
  const { data, content } = matter(bruto);
  const toc = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: slugify(m[1]), texto: m[1].trim() }));
  const palavras = `${data.resposta ?? ""} ${content}`.split(/\s+/).length;
  return {
    slug: arquivo.replace(/\.mdx$/, ""),
    titulo: data.titulo,
    resumo: data.resumo,
    categoria: data.categoria,
    publicado: data.publicado,
    atualizado: data.atualizado ?? data.publicado,
    resposta: data.resposta,
    checklist: data.checklist ?? [],
    fontes: data.fontes ?? [],
    relacionados: data.relacionados ?? [],
    corpo: content,
    toc,
    minutos: Math.max(2, Math.round(palavras / 200)),
  };
}

export function getTodosArtigos(): Artigo[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(ler)
    .sort((a, b) => b.publicado.localeCompare(a.publicado));
}

export function getArtigo(slug: string): Artigo | undefined {
  return getTodosArtigos().find((a) => a.slug === slug);
}

export function formatarData(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}
