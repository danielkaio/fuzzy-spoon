/**
 * Regras do formulário de proposta, compartilhadas entre o navegador
 * (validação imediata) e a rota /api/proposta (validação definitiva).
 *
 * Os erros são códigos, não frases: cada idioma traduz em
 * messages › Form.erros.
 */

/** `value` é o que chega no e-mail; o texto exibido vem de messages › Form.planos. */
export const PLANOS = [
  { value: "Starter", key: "starter" },
  { value: "Pro", key: "pro" },
  { value: "Enterprise", key: "enterprise" },
  { value: "Não sei ainda", key: "naoSei" },
] as const;

export type Plano = (typeof PLANOS)[number]["value"];

export type Proposta = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  plano: Plano;
  mensagem: string;
};

export type CampoProposta = keyof Proposta;
export type CodigoErro = "nomeCurto" | "emailInvalido" | "planoInvalido";
export type ErrosProposta = Partial<Record<CampoProposta, CodigoErro>>;

/** Respostas da rota /api/proposta, traduzidas em messages › Form.status. */
export const CODIGOS_RESPOSTA = [
  "sucesso",
  "requisicaoInvalida",
  "limiteExcedido",
  "camposInvalidos",
  "envioIndisponivel",
  "falhaEnvio",
] as const;
export type CodigoResposta = (typeof CODIGOS_RESPOSTA)[number];

const LIMITES: Record<CampoProposta, number> = {
  nome: 120,
  empresa: 120,
  email: 254,
  telefone: 30,
  plano: 40,
  mensagem: 2000,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texto(valor: unknown, campo: CampoProposta): string {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, LIMITES[campo]);
}

export function validarProposta(
  entrada: Record<string, unknown>,
):
  | { ok: true; dados: Proposta }
  | { ok: false; erros: ErrosProposta } {
  const nome = texto(entrada.nome, "nome");
  const empresa = texto(entrada.empresa, "empresa");
  const email = texto(entrada.email, "email");
  const telefone = texto(entrada.telefone, "telefone");
  const plano = texto(entrada.plano, "plano");
  const mensagem = texto(entrada.mensagem, "mensagem");

  const erros: ErrosProposta = {};
  if (nome.length < 2) erros.nome = "nomeCurto";
  if (!EMAIL_REGEX.test(email)) erros.email = "emailInvalido";
  if (!PLANOS.some((p) => p.value === plano)) erros.plano = "planoInvalido";

  if (Object.keys(erros).length > 0) return { ok: false, erros };

  return {
    ok: true,
    dados: { nome, empresa, email, telefone, plano: plano as Plano, mensagem },
  };
}

/** Formata um telefone brasileiro enquanto o usuário digita. */
export function formatarTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
