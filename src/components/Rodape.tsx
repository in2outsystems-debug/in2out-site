import Image from "next/image";
import Link from "next/link";
import { dadoPreenchido, rodape, site, whatsappFormatado, whatsappLink } from "@/lib/site";
import { Botao } from "./Botao";
import { AbrirCookies } from "./AbrirCookies";
import { NomeMarca } from "./Marca";

function Coluna({ titulo, itens }: { titulo: string; itens: { href: string; rotulo: string }[] }) {
  return (
    <div>
      <h2 className="olho mb-3">{titulo}</h2>
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

const svgProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

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
  const identidade = [site.razaoSocial, site.cnpj && dadoPreenchido(site.cnpj) ? `CNPJ ${site.cnpj}` : "", site.endereco].filter(dadoPreenchido).filter(Boolean);

  return (
    <footer className="escuro bg-escuro text-sobre-escuro">
      <div className="pagina grid gap-12 py-14 lg:grid-cols-12 lg:gap-8">
        {/* Marca, promessa e contato: a última chance de falar com alguém */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/img/icone.png" alt="" width={40} height={38} className="h-9 w-auto" />
            <NomeMarca />
          </div>
          <p className="mt-4 max-w-sm text-lg text-sobre-escuro/85">{site.slogan}</p>
          <Link href="/produtos/ws3-atendy" className="alvo inline-flex items-center gap-1 font-semibold text-acao underline-offset-2 hover:underline">
            Conheça o WS3 Atendy
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </Link>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="olho">Fale com a gente</h2>
            <Botao href={whatsappLink()} posicao="rodape_whatsapp" className="mt-4 w-full sm:w-auto">
              <IconeWhatsApp />
              WhatsApp {whatsappFormatado()}
            </Botao>
            <ul className="mt-4 flex flex-col gap-1 text-sobre-escuro/80">
              <li>
                <a href={`mailto:${site.email}`} className="alvo inline-flex items-center gap-2 underline-offset-2 hover:text-white hover:underline">
                  <IconeEmail />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="alvo inline-flex items-center gap-2 underline-offset-2 hover:text-white hover:underline">
                  <IconeInstagram />
                  @{site.instagram.usuario}
                  <span className="sr-only"> no Instagram (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:pt-1">
          <Coluna titulo="Comece aqui" itens={rodape.comece} />
          <Coluna titulo="Conheça" itens={rodape.conheca} />
          <Coluna titulo="Aprenda" itens={rodape.aprenda} />
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="pagina flex flex-col gap-3 py-6 text-sm text-sobre-escuro/80 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}
            {identidade.length > 0 && <> · {identidade.join(" · ")}</>}
          </p>
          <ul className="flex flex-wrap gap-x-4">
            {rodape.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="alvo inline-flex items-center justify-center underline-offset-2 hover:text-white hover:underline">
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <AbrirCookies className="hover:text-white hover:underline" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
