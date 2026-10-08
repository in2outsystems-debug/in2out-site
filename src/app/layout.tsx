import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { Consentimento } from "@/components/Consentimento";
import { JsonLd } from "@/components/Blocos";
import { organizationLd, websiteLd } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--next-font-texto" });

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

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080E1C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-marca focus:bg-acao focus:px-4 focus:py-3 focus:font-semibold focus:text-sobre-acao"
        >
          Ir para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Rodape />
        <WhatsAppFlutuante />
        <Consentimento />
        <JsonLd dados={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
