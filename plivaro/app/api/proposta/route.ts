import { Resend } from "resend";
import { validarProposta, type Proposta } from "@/lib/proposta";

/**
 * Variáveis de ambiente (mesmas do site anterior):
 *   RESEND_API_KEY   chave da API do Resend (obrigatória)
 *   EMAIL_TO         destinatário (ou PLIVARO_EMAIL_TO)
 *   EMAIL_CC         cópia (opcional)
 *   FROM_EMAIL       remetente verificado no Resend
 */

// Limite simples por IP. Em ambiente serverless vale por instância,
// então funciona como freio contra abuso, não como garantia absoluta.
const JANELA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const recentes = (envios.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  envios.set(ip, recentes);
  if (envios.size > 5000) envios.clear();
  return recentes.length > MAX_ENVIOS;
}

function escaparHtml(valor: string): string {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
    if (!corpo || typeof corpo !== "object") throw new Error();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Robôs costumam preencher o campo isca; fingimos sucesso para não dar pistas.
  if (typeof corpo.website === "string" && corpo.website.trim() !== "") {
    return Response.json({ success: true, message: "Proposta enviada com sucesso!" });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconhecido";
  if (excedeuLimite(ip)) {
    return Response.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429 },
    );
  }

  const resultado = validarProposta(corpo);
  if (!resultado.ok) {
    return Response.json(
      { error: "Revise os campos destacados.", fields: resultado.erros },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destinatario = process.env.EMAIL_TO || process.env.PLIVARO_EMAIL_TO;
  if (!apiKey || !destinatario) {
    console.error("[proposta] RESEND_API_KEY ou EMAIL_TO não configurados.");
    return Response.json(
      { error: "Envio indisponível no momento. Escreva para nós por e-mail." },
      { status: 500 },
    );
  }

  const dados = resultado.dados;
  const copia = process.env.EMAIL_CC;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Plivaro <noreply@plivaro.com>",
      to: destinatario,
      ...(copia ? { cc: copia } : {}),
      replyTo: dados.email,
      subject: `Nova proposta - ${dados.nome} — ${dados.plano}`.replace(/[\r\n]+/g, " "),
      html: montarEmail(dados),
      text: montarTexto(dados),
    });
    if (error) throw new Error(error.message);

    return Response.json({
      success: true,
      message: "Proposta enviada com sucesso! Retornaremos em até 2 horas úteis.",
    });
  } catch (err) {
    console.error("[proposta] Falha no envio:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: "Não foi possível enviar agora. Tente novamente em instantes." },
      { status: 502 },
    );
  }
}

const ROTULOS: [keyof Proposta, string][] = [
  ["nome", "Nome"],
  ["empresa", "Empresa"],
  ["email", "E-mail"],
  ["telefone", "Telefone"],
  ["plano", "Plano"],
  ["mensagem", "Mensagem"],
];

function montarTexto(dados: Proposta): string {
  return ROTULOS.map(([campo, rotulo]) => `${rotulo}: ${dados[campo] || "—"}`).join("\n");
}

function montarEmail(dados: Proposta): string {
  const recebido = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const linhas = ROTULOS.map(([campo, rotulo], i) => {
    const bruto = dados[campo];
    let valor = bruto ? escaparHtml(bruto).replace(/\n/g, "<br/>") : "—";
    if (campo === "email") {
      valor = `<a href="mailto:${escaparHtml(bruto)}" style="color:#6C63FF;">${valor}</a>`;
    }
    if (campo === "plano") {
      valor = `<span style="background:#f0eeff;color:#6C63FF;padding:3px 10px;border-radius:20px;font-weight:600;">${valor}</span>`;
    }
    const borda = i > 0 ? "border-top:1px solid #f0f0f0;" : "";
    return `<tr style="${borda}"><td style="padding:10px 0;color:#888;font-weight:600;width:120px;vertical-align:top;">${rotulo}</td><td style="padding:10px 0;">${valor}</td></tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
    <div style="background:linear-gradient(135deg,#6C63FF,#3B37CE);padding:32px 40px;">
      <h1 style="color:#fff;margin:0;font-size:22px;">📩 Nova solicitação</h1>
      <p style="color:rgba(255,255,255,.8);margin:4px 0 0;">Recebida em ${recebido}</p>
    </div>
    <div style="padding:32px 40px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">${linhas}</table>
    </div>
  </div>
</body>
</html>`;
}
