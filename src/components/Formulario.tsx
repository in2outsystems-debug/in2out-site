"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type ReactNode } from "react";
import { readUtm, track } from "@/lib/analytics";
import { formularios, mensagens, validarCampo, type TipoFormulario } from "@/lib/forms";

type Props = {
  tipo: TipoFormulario;
  /** Identifica de onde veio o envio (para a análise e a página de agradecimento). */
  origem: string;
  /** Valores fixos para campos ocultos ou pré-preenchidos. */
  valores?: Record<string, string>;
  rotuloEnviar?: string;
  aviso?: ReactNode;
  /** Se informado, não redireciona para /obrigado; chama esta função. */
  aoSucesso?: () => void;
  /** Parâmetros extras para a página de agradecimento. */
  paramsObrigado?: Record<string, string>;
};

export function Formulario({ tipo, origem, valores = {}, rotuloEnviar, aviso, aoSucesso, paramsObrigado }: Props) {
  const def = formularios[tipo];
  const router = useRouter();
  const uid = useId();
  const [dados, setDados] = useState<Record<string, string>>(valores);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [erroConsent, setErroConsent] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [linkWa, setLinkWa] = useState("");
  const iniciou = useRef(false);
  const abertoEm = useRef(Date.now());
  const form = useRef<HTMLFormElement>(null);
  const isca = useRef<HTMLInputElement>(null);

  const iniciar = () => {
    if (!iniciou.current) {
      iniciou.current = true;
      track("form_start", { formulario: tipo, origem });
    }
  };

  const mudar = (nome: string, valor: string) => {
    setDados((d) => ({ ...d, [nome]: valor }));
    if (erros[nome]) setErros((e) => ({ ...e, [nome]: "" }));
  };

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErroGeral("");
    const novos: Record<string, string> = {};
    for (const c of def.campos) {
      const msg = validarCampo(c, dados[c.nome] ?? "");
      if (msg) novos[c.nome] = msg;
    }
    const semConsent = !consent;
    setErros(novos);
    setErroConsent(semConsent ? mensagens.consentimento : "");

    if (Object.keys(novos).length || semConsent) {
      const primeiro = Object.keys(novos)[0];
      const alvo = primeiro
        ? form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)
        : form.current?.querySelector<HTMLElement>(`[name="consentimento"]`);
      alvo?.focus();
      return;
    }

    setEnviando(true);
    try {
      const resp = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tipo,
          campos: Object.fromEntries(def.campos.map((c) => [c.nome, (dados[c.nome] ?? "").trim()])),
          consentimento: true,
          hp: isca.current?.value ?? "",
          t: Date.now() - abertoEm.current,
          pagina: window.location.pathname,
          utm: readUtm(),
        }),
      });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok || !json.ok) {
        if (json.campos) setErros(json.campos);
        setErroGeral(json.mensagem || "Não foi possível enviar agora. Tente de novo em instantes.");
        setEnviando(false);
        return;
      }
      track("form_submit", { formulario: tipo, origem });
      if (tipo === "newsletter") track("newsletter_signup", { origem });
      if (tipo === "material") track("material_download", { material: dados.material, origem });
      const wa: string = json.whatsapp ?? "";
      if (aoSucesso) {
        setLinkWa(wa);
        setConcluido(true);
        aoSucesso();
      } else {
        const q = new URLSearchParams({ origem: tipo, ...(paramsObrigado ?? {}) });
        if (wa) {
          try {
            window.sessionStorage.setItem("ws3-wa", wa);
          } catch {
            /* sem armazenamento: a página de agradecimento usa o link geral */
          }
          q.set("via", "wa");
        }
        router.push(`/obrigado?${q.toString()}`);
      }
    } catch {
      setErroGeral("Sem conexão com o servidor. Confira sua internet e tente de novo.");
      setEnviando(false);
    }
  };

  if (concluido) {
    return (
      <div role="status" className="rounded-marca-lg border border-ok bg-superficie p-5">
        {linkWa ? (
          <>
            <p className="font-medium text-ok">Falta um passo: envie os dados pelo WhatsApp para a nossa equipe receber.</p>
            <a
              href={linkWa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { posicao: "formulario_envio", formulario: tipo })}
              className="alvo mt-3 inline-flex items-center rounded-marca bg-acao px-5 py-3 font-semibold text-sobre-acao hover:bg-acao-forte"
            >
              Enviar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </>
        ) : (
          <p className="font-medium text-ok">Recebemos seus dados. Obrigado!</p>
        )}
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={enviar} noValidate onFocus={iniciar} className="space-y-5">
      {Object.keys(erros).filter((k) => erros[k]).length > 0 && (
        <div role="alert" className="rounded-marca border border-erro bg-superficie p-4 text-erro">
          Confira os campos destacados abaixo.
        </div>
      )}
      {erroGeral && (
        <div role="alert" className="rounded-marca border border-erro bg-superficie p-4 text-erro">
          {erroGeral}
        </div>
      )}

      {def.campos.map((c) => {
        if (c.tipo === "hidden") return <input key={c.nome} type="hidden" name={c.nome} value={dados[c.nome] ?? ""} />;
        const id = `${uid}-${c.nome}`;
        const descr = [c.dica ? `${id}-dica` : "", erros[c.nome] ? `${id}-erro` : ""].filter(Boolean).join(" ") || undefined;
        const comum = {
          id,
          name: c.nome,
          required: c.obrigatorio,
          "aria-invalid": erros[c.nome] ? (true as const) : undefined,
          "aria-describedby": descr,
          autoComplete: c.autoComplete,
          className: "campo",
          value: dados[c.nome] ?? "",
          maxLength: c.max,
        };
        return (
          <div key={c.nome}>
            <label htmlFor={id} className="mb-1 block font-medium">
              {c.rotulo}
              {!c.obrigatorio && <span className="font-normal text-mudo"> (opcional)</span>}
            </label>
            {c.dica && (
              <p id={`${id}-dica`} className="mb-1 text-sm text-mudo">
                {c.dica}
              </p>
            )}
            {c.tipo === "textarea" ? (
              <textarea {...comum} rows={5} onChange={(e) => mudar(c.nome, e.target.value)} />
            ) : c.tipo === "select" ? (
              <select {...comum} onChange={(e) => mudar(c.nome, e.target.value)}>
                <option value="">Selecione</option>
                {c.opcoes?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...comum}
                type={c.tipo}
                inputMode={c.tipo === "tel" ? "tel" : undefined}
                onChange={(e) => mudar(c.nome, e.target.value)}
              />
            )}
            {erros[c.nome] && (
              <p id={`${id}-erro`} className="mt-1 text-sm font-medium text-erro">
                {erros[c.nome]}
              </p>
            )}
          </div>
        );
      })}

      {/* Campo isca contra robôs: invisível para pessoas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha este campo
          <input ref={isca} type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {aviso && <div className="rounded-marca bg-dado-fundo p-4 text-base text-tinta">{aviso}</div>}

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${uid}-consent`}
            name="consentimento"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErroConsent("");
            }}
            aria-invalid={erroConsent ? true : undefined}
            aria-describedby={erroConsent ? `${uid}-consent-erro` : undefined}
            className="mt-1 h-6 w-6 flex-shrink-0 accent-[rgb(var(--c-acao))]"
          />
          <label htmlFor={`${uid}-consent`} className="text-base">
            Autorizo a WS3 Systems a usar meus dados para responder a este contato, conforme a{" "}
            <Link href="/privacidade" className="text-acao underline underline-offset-2">
              política de privacidade
            </Link>{" "}
            (LGPD).
          </label>
        </div>
        {erroConsent && (
          <p id={`${uid}-consent-erro`} className="mt-1 text-sm font-medium text-erro">
            {erroConsent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="alvo inline-flex w-full items-center justify-center rounded-marca bg-acao px-6 py-3 text-lg font-semibold text-sobre-acao hover:bg-acao-forte disabled:opacity-70 sm:w-auto"
      >
        {enviando ? "Enviando..." : (rotuloEnviar ?? def.enviar)}
      </button>
    </form>
  );
}
