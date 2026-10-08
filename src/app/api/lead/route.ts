import { NextResponse } from "next/server";
import { envioSchema, formularios, validarCampo, mensagens, mensagemWhatsapp } from "@/lib/forms";
import { whatsappLink } from "@/lib/site";

export const runtime = "nodejs";

// Limite simples por IP. Em ambiente serverless vale por instância; para algo mais forte,
// use um armazenamento compartilhado (Upstash, Vercel KV) ou o firewall da Vercel.
const janela = new Map<string, number[]>();
const MAX_ENVIOS = 5;
const JANELA_MS = 10 * 60 * 1000;

function limitado(ip: string) {
  const agora = Date.now();
  const lista = (janela.get(ip) || []).filter((t) => agora - t < JANELA_MS);
  lista.push(agora);
  janela.set(ip, lista);
  if (janela.size > 5000) janela.clear();
  return lista.length > MAX_ENVIOS;
}

function erro(mensagem: string, status: number, campos?: Record<string, string>) {
  return NextResponse.json({ ok: false, mensagem, campos }, { status });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconhecido";
  if (limitado(ip)) return erro("Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.", 429);

  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return erro("Não foi possível ler o formulário. Recarregue a página e tente de novo.", 400);
  }

  const lido = envioSchema.safeParse(corpo);
  if (!lido.success) {
    const consent = lido.error.issues.some((i) => i.path[0] === "consentimento");
    return erro(consent ? mensagens.consentimento : "Há campos inválidos. Confira o formulário.", 400);
  }
  const envio = lido.data;

  // Anti-spam: campo isca preenchido ou envio rápido demais indicam robô. Respondemos "ok" sem enviar.
  if (envio.hp || (typeof envio.t === "number" && envio.t < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const erros: Record<string, string> = {};
  for (const def of formularios[envio.tipo].campos) {
    const msg = validarCampo(def, envio.campos[def.nome] ?? "");
    if (msg) erros[def.nome] = msg;
  }
  if (Object.keys(erros).length) return erro("Confira os campos destacados.", 400, erros);

  // Sem webhook configurado, o envio termina no WhatsApp da equipe: devolvemos o link com a mensagem pronta.
  const url = process.env.FORM_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ ok: true, whatsapp: whatsappLink(mensagemWhatsapp(envio.tipo, envio.campos)) });
  }

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.FORM_WEBHOOK_SECRET ? { "x-webhook-secret": process.env.FORM_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        tipo: envio.tipo,
        recebidoEm: new Date().toISOString(),
        pagina: envio.pagina,
        utm: envio.utm ?? {},
        consentimentoLgpd: true,
        campos: envio.campos,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) throw new Error(`webhook respondeu ${resp.status}`);
  } catch (e) {
    console.error("[lead] falha ao chamar o webhook:", e);
    return erro("Não conseguimos registrar seu envio agora. Tente de novo em instantes ou chame no WhatsApp.", 502);
  }

  return NextResponse.json({ ok: true });
}
