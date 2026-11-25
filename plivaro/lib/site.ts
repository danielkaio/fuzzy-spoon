import type { LucideIcon } from "lucide-react";
import {
  ChartLine,
  Flame,
  LayoutTemplate,
  MailCheck,
  Plug,
  Rocket,
} from "lucide-react";

// Os textos do site ficam em messages/<idioma>.json. Aqui ficam só os dados
// que não mudam com o idioma.

/** URL pública do site. Pode ser sobrescrita por NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://plivaro.com"
).replace(/\/$/, "");

export const site = {
  name: "Plivaro",
  contactEmail: "daniel@plivaro.com",
  privacyEmail: "abidala@plivaro.com",
  gaId: "G-4LMB7WFWT4",
  adsenseClient: "ca-pub-8360693037438432",
};

/** Links do menu; o texto vem de messages › Nav. */
export const navLinks = [
  { href: "/#servicos", key: "servicos" },
  { href: "/#como-funciona", key: "comoFunciona" },
  { href: "/#depoimentos", key: "depoimentos" },
  { href: "/#proposta", key: "especialista" },
] as const;

export type ServiceKey =
  | "landingPage"
  | "hotsite"
  | "apis"
  | "proposta"
  | "analytics"
  | "hospedagem";

export type Service = {
  key: ServiceKey;
  /** Endereço da página do serviço: /servicos/<slug>. */
  slug: string;
  icon: LucideIcon;
  color: string;
};

/**
 * Serviços; título, descrição e itens vêm de messages › Services.items e o
 * conteúdo da página de cada um vem de messages › ServicePage.items.
 */
export const services: Service[] = [
  { key: "landingPage", slug: "landing-page", icon: LayoutTemplate, color: "#6C63FF" },
  { key: "hotsite", slug: "hotsite", icon: Flame, color: "#FF6B6B" },
  { key: "apis", slug: "integracao-apis", icon: Plug, color: "#00BFA6" },
  { key: "proposta", slug: "envio-de-proposta", icon: MailCheck, color: "#F7B731" },
  { key: "analytics", slug: "analytics-rastreamento", icon: ChartLine, color: "#A855F7" },
  { key: "hospedagem", slug: "hospedagem-deploy", icon: Rocket, color: "#3B82F6" },
];

export const serviceHref = (s: Pick<Service, "slug">) => `/servicos/${s.slug}`;

export const findService = (slug: string) => services.find((s) => s.slug === slug);

/** Passos do processo, na ordem; o texto vem de messages › Process.steps. */
export const steps = [
  "solicite",
  "briefing",
  "desenvolvimento",
  "revisao",
  "publicacao",
] as const;

export const testimonial = {
  author: "Edson Procópio",
  initials: "EP",
};
