import Image from "next/image";
import Link from "next/link";
import { rodape, site, whatsappLink } from "@/lib/site";
import { AbrirCookies } from "./AbrirCookies";
import { NomeMarca } from "./Marca";

function Coluna({ titulo, itens }: { titulo: string; itens: { href: string; rotulo: string }[] }) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-sobre-escuro">{titulo}</h2>
      <ul className="space-y-1">
        {itens.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="alvo inline-flex items-center text-sobre-escuro/80 underline-offset-2 hover:text-white hover:underline">
              {i.rotulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const iconeLink =
  "alvo inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-sobre-escuro/80 transition-colors hover:border-white hover:text-white";

const svgProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

function IconeWhatsApp() {
  return (
    <svg {...svgProps}>
      <path d="M3 21l1.65-4.85A9 9 0 1 1 8.2 19.4L3 21z" />
      <path d="M9 10c0 3 2 5 5 5l1.3-1.3a.7.7 0 0 0 0-1l-1.4-.9a.7.7 0 0 0-.9.2l-.4.5a3.6 3.6 0 0 1-1.8-1.8l.5-.4a.7.7 0 0 0 .2-.9l-.9-1.4a.7.7 0 0 0-1 0L9 10z" />
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
  return (
    <footer className="escuro bg-escuro text-sobre-escuro">
      <div className="pagina grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/img/icone.png" alt="" width={40} height={38} className="h-9 w-auto" />
            <NomeMarca />
          </div>
          <p className="mt-4 max-w-sm text-sobre-escuro/80">{site.slogan}</p>
        </div>
        <Coluna titulo="Mapa do site" itens={rodape.site} />
        <Coluna titulo="Materiais" itens={rodape.materiais} />
        <div>
          <h2 className="mb-3 text-base font-semibold">Contato</h2>
          <ul className="flex gap-3">
            <li>
              <a className={iconeLink} href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (abre em nova aba)" title="WhatsApp">
                <IconeWhatsApp />
              </a>
            </li>
            <li>
              <a className={iconeLink} href={`mailto:${site.email}`} aria-label={`E-mail: ${site.email}`} title={site.email}>
                <IconeEmail />
              </a>
            </li>
            <li>
              <a className={iconeLink} href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${site.instagram.usuario} (abre em nova aba)`} title={`@${site.instagram.usuario}`}>
                <IconeInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="pagina flex flex-col gap-3 py-6 text-sm text-sobre-escuro/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-4">
            {rodape.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="alvo inline-flex items-center underline-offset-2 hover:text-white hover:underline">
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <AbrirCookies className="hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
