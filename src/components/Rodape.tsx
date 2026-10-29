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
            <Link href={i.href} className="alvo inline-flex items-center text-[0.9375rem] text-sobre-escuro/80 underline-offset-2 hover:text-white hover:underline">
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
  // Símbolo cheio, o mesmo do botão flutuante: o contorno desenhado à mão deixava o fone fora do centro.
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    <footer className="escuro bg-escuro text-sobre-escuro">
      <div className="pagina grid gap-12 py-14 lg:grid-cols-12 lg:gap-8">
        {/* Marca, promessa e contato: a última chance de falar com alguém */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Image src="/img/icone.png" alt="" width={40} height={38} className="h-9 w-auto" />
            <NomeMarca />
          </div>
          <p className="mt-4 max-w-sm text-base text-sobre-escuro/85">{site.slogan}</p>
          <Link href="/produtos" className="alvo inline-flex items-center gap-1 font-semibold text-acao underline-offset-2 hover:underline">
            Conheça os nossos sistemas
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
