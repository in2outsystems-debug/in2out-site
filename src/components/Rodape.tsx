import Image from "next/image";
import Link from "next/link";
import { rodape, site, whatsappLink } from "@/lib/site";
import { AbrirCookies } from "./Consentimento";

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

export function Rodape() {
  return (
    <footer className="escuro bg-escuro text-sobre-escuro">
      <div className="pagina grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/img/icone.png" alt="" width={40} height={35} className="h-9 w-auto" />
            <span>{site.nome}</span>
          </div>
          <p className="mt-4 max-w-sm text-sobre-escuro/80">{site.slogan}</p>
        </div>
        <Coluna titulo="Mapa do site" itens={rodape.site} />
        <Coluna titulo="Materiais" itens={rodape.materiais} />
        <div>
          <h2 className="mb-3 text-base font-semibold">Contato</h2>
          <ul className="space-y-1 text-sobre-escuro/80">
            <li>
              <a className="alvo inline-flex items-center underline-offset-2 hover:text-white hover:underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a className="alvo inline-flex items-center underline-offset-2 hover:text-white hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="alvo inline-flex items-center underline-offset-2 hover:text-white hover:underline" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram @{site.instagram.usuario}<span className="sr-only"> (abre em nova aba)</span>
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
