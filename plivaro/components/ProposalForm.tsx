"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import {
  PLANOS,
  formatarTelefone,
  validarProposta,
  type CampoProposta,
  type ErrosProposta,
} from "@/lib/proposta";

type Status =
  | { tipo: "ocioso" }
  | { tipo: "enviando" }
  | { tipo: "sucesso"; mensagem: string }
  | { tipo: "erro"; mensagem: string };

const inputBase =
  "w-full rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-[0.95rem] text-fg outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/10";

export function ProposalForm() {
  const [erros, setErros] = useState<ErrosProposta>({});
  const [status, setStatus] = useState<Status>({ tipo: "ocioso" });
  const [telefone, setTelefone] = useState("");

  const enviando = status.tipo === "enviando";

  function limparErro(campo: CampoProposta) {
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }));
  }

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const entrada = Object.fromEntries(new FormData(form));

    const resultado = validarProposta(entrada);
    if (!resultado.ok) {
      setErros(resultado.erros);
      const primeiro = Object.keys(resultado.erros)[0];
      form.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }

    setErros({});
    setStatus({ tipo: "enviando" });

    try {
      const res = await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `website` é o campo isca anti-spam: humanos não o veem.
        body: JSON.stringify({ ...resultado.dados, website: entrada.website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
        fields?: ErrosProposta;
      };

      if (res.ok) {
        setStatus({
          tipo: "sucesso",
          mensagem:
            data.message ??
            "Proposta enviada! Retornaremos em até 2 horas úteis.",
        });
        form.reset();
        setTelefone("");
      } else {
        if (data.fields) setErros(data.fields);
        setStatus({
          tipo: "erro",
          mensagem: data.error ?? "Não foi possível enviar. Tente novamente.",
        });
      }
    } catch {
      setStatus({
        tipo: "erro",
        mensagem: "Erro de conexão. Verifique sua internet e tente novamente.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Solicitar proposta"
      className="reveal relative rounded-3xl border border-line bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-9"
    >
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Campo id="nome" label="Nome completo" obrigatorio erro={erros.nome}>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            required
            maxLength={120}
            onChange={() => limparErro("nome")}
            {...ariaErro("nome", erros.nome)}
            className={`${inputBase} ${borda(erros.nome)}`}
          />
        </Campo>
        <Campo id="empresa" label="Empresa">
          <input
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            placeholder="Nome da empresa"
            maxLength={120}
            className={`${inputBase} ${borda()}`}
          />
        </Campo>
        <Campo id="email" label="E-mail" obrigatorio erro={erros.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="seu@email.com"
            required
            maxLength={254}
            onChange={() => limparErro("email")}
            {...ariaErro("email", erros.email)}
            className={`${inputBase} ${borda(erros.email)}`}
          />
        </Campo>
        <Campo id="telefone" label="Telefone / WhatsApp">
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            placeholder="(11) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            className={`${inputBase} ${borda()}`}
          />
        </Campo>
      </div>

      <Campo id="plano" label="Plano de interesse" obrigatorio erro={erros.plano}>
        <select
          id="plano"
          name="plano"
          required
          defaultValue=""
          onChange={() => limparErro("plano")}
          {...ariaErro("plano", erros.plano)}
          className={`${inputBase} ${borda(erros.plano)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20stroke='%235f6675'%20stroke-width='2'%3E%3Cpath%20d='m4%206%204%204%204-4'/%3E%3C/svg%3E")] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
        >
          <option value="" disabled>
            Selecione um plano
          </option>
          {PLANOS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="mensagem" label="Conte brevemente sobre seu projeto">
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          maxLength={2000}
          placeholder="Ex.: Quero uma landing page para meu curso online com integração de pagamento..."
          className={`${inputBase} ${borda()} min-h-28 resize-y`}
        />
      </Campo>

      {/* Campo isca: escondido de pessoas, preenchido por robôs. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/35 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
      >
        {enviando ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Enviar proposta
          </>
        )}
      </button>

      <div aria-live="polite" role="status">
        {status.tipo === "sucesso" && (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3.5 text-sm font-medium text-emerald-800">
            <CircleCheck className="size-5 shrink-0" aria-hidden />
            {status.mensagem}
          </p>
        )}
        {status.tipo === "erro" && (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-800">
            <TriangleAlert className="size-5 shrink-0" aria-hidden />
            {status.mensagem}
          </p>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Ao enviar, você concorda com nossa{" "}
        <a
          href="/politica-privacidade-cookies#privacidade"
          className="font-medium text-brand-dark underline-offset-2 hover:underline"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}

function Campo({
  id,
  label,
  obrigatorio,
  erro,
  children,
}: Readonly<{
  id: string;
  label: string;
  obrigatorio?: boolean;
  erro?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={id} className="mb-1.5 text-sm font-semibold text-fg">
        {label}
        {obrigatorio && (
          <span className="text-red-600" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {erro && (
        <span id={`${id}-erro`} className="mt-1.5 text-[0.8rem] font-medium text-red-600">
          {erro}
        </span>
      )}
    </div>
  );
}

function ariaErro(id: string, erro?: string) {
  return erro
    ? { "aria-invalid": true as const, "aria-describedby": `${id}-erro` }
    : {};
}

function borda(erro?: string) {
  return erro ? "border-red-400" : "border-line";
}
