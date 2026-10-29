import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { ConsentimentoTardio } from "@/components/movimento/TardiosCliente";
import { TransicaoRota } from "@/components/movimento/TransicaoRota";
import { RevelarGlobal } from "@/components/movimento/RevelarGlobal";
import { JsonLd } from "@/components/Blocos";
import { organizationLd, websiteLd } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--next-font-texto" });
const montserrat = localFont({ src: "../fonts/Montserrat.woff2", display: "swap", variable: "--next-font-titulo", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.nome}: gestão de processos, automação e IA para pequenas empresas`, template: `%s | ${site.nome}` },
  description: site.descricao,
  applicationName: site.nome,
  icons: { icon: "/img/icone.png", apple: "/img/icone.png" },
  alternates: { types: { "application/rss+xml": `${SITE_URL}/rss.xml` } },
  openGraph: { siteName: site.nome, locale: "pt_BR", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#040B17" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-acao-cheia focus:px-4 focus:py-3 focus:font-semibold focus:text-sobre-acao"
        >
          Ir para o conteúdo
        </a>
        <TransicaoRota />
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Rodape />
        <RevelarGlobal escopo="footer" />
        <ConsentimentoTardio />
        <JsonLd dados={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
