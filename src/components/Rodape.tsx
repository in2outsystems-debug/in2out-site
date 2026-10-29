import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { dadoPreenchido, rodape, site, whatsappFormatado, whatsappLink } from "@/lib/site";
import { AbrirCookies } from "./AbrirCookies";
import { NomeMarca } from "./Marca";

/*
 * Rodapé nos mesmos parâmetros do site de referência (Zentra): fundo preto, py-12, borda superior fina,
 * quatro colunas a partir de md com gap de 32px, títulos de coluna em 16px semibold na cor da marca,
 * links em 14px com 32px de passo, e uma linha final com o direito autoral centralizado em 14px.
 */
const link =
  "inline-flex min-h-8 items-center text-sm text-tinta/85 transition-colors hover:text-white focus-visible:text-white";

function Coluna({ titulo, itens, extra }: { titulo: string; itens: { href: string; rotulo: string }[]; extra?: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-base font-semibold text-acao">{titulo}</h2>
      <ul>
        {itens.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className={link}>
              {i.rotulo}
            </Link>
          </li>
        ))}
        {extra}
      </ul>
    </div>
  );
}

const svgProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function IconeWhatsApp() {
  // Símbolo cheio, o mesmo do botão flutuante.
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconeEmail() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconeInstagram() {
  return (
    <svg {...svgProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Rodape() {
  const identidade = [site.razaoSocial, site.cnpj && dadoPreenchido(site.cnpj) ? `CNPJ ${site.cnpj}` : "", site.endereco].filter(dadoPreenchido).filter(Boolean);

  return (
    <footer className="escuro border-t border-white/[0.06] bg-escuro py-12 text-sobre-escuro">
      <div className="pagina">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Marca, promessa e contato escrito (número e e-mail à vista) */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Image src="/img/icone.png" alt="" width={40} height={38} className="h-9 w-auto" />
              <NomeMarca />
            </div>
            <p className="mt-4 text-sm text-tinta/85">{site.slogan}</p>
            <ul className="mt-4">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${link} gap-2`}>
                  <IconeWhatsApp />
                  {whatsappFormatado()}
                  <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`${link} gap-2`}>
                  <IconeEmail />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={`${link} gap-2`}>
                  <IconeInstagram />@{site.instagram.usuario}
                  <span className="sr-only"> no Instagram (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>

          <Coluna titulo="Soluções" itens={rodape.solucoes} />
          <Coluna titulo="Empresa" itens={rodape.empresa} />
          <Coluna
            titulo="Legal"
            itens={rodape.legal}
            extra={
              <li>
                <AbrirCookies className={link} />
              </li>
            }
          />
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-mudo">
          <p>
            © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
          </p>
          {identidade.length > 0 && <p className="mt-1">{identidade.join(" · ")}</p>}
        </div>
      </div>
    </footer>
  );
}
