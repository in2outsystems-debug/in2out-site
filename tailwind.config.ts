import type { Config } from "tailwindcss";

// Todas as cores, fontes e raios vêm de variáveis CSS definidas em src/app/globals.css.
// Para trocar a identidade visual, edite apenas aquele arquivo.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        fundo: "rgb(var(--c-fundo) / <alpha-value>)",
        superficie: "rgb(var(--c-superficie) / <alpha-value>)",
        suave: "rgb(var(--c-suave) / <alpha-value>)",
        tinta: "rgb(var(--c-tinta) / <alpha-value>)",
        mudo: "rgb(var(--c-mudo) / <alpha-value>)",
        linha: "rgb(var(--c-linha) / <alpha-value>)",
        acao: "rgb(var(--c-acao) / <alpha-value>)",
        "acao-forte": "rgb(var(--c-acao-forte) / <alpha-value>)",
        "sobre-acao": "rgb(var(--c-sobre-acao) / <alpha-value>)",
        dado: "rgb(var(--c-dado) / <alpha-value>)",
        "dado-fundo": "rgb(var(--c-dado-fundo) / <alpha-value>)",
        escuro: "rgb(var(--c-escuro) / <alpha-value>)",
        "sobre-escuro": "rgb(var(--c-sobre-escuro) / <alpha-value>)",
        erro: "rgb(var(--c-erro) / <alpha-value>)",
        ok: "rgb(var(--c-ok) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--fonte-texto)", "system-ui", "sans-serif"],
        titulo: ["var(--fonte-titulo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        marca: "var(--raio)",
        "marca-lg": "var(--raio-grande)",
      },
      maxWidth: { leitura: "68ch", pagina: "72rem" },
    },
  },
  plugins: [],
};

export default config;
