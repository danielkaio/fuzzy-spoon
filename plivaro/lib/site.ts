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

/** Serviços; título, descrição e itens vêm de messages › Services.items. */
export const services: {
  key: "landingPage" | "hotsite" | "apis" | "proposta" | "analytics" | "hospedagem";
  icon: LucideIcon;
  color: string;
}[] = [
  { key: "landingPage", icon: LayoutTemplate, color: "#6C63FF" },
  { key: "hotsite", icon: Flame, color: "#FF6B6B" },
  { key: "apis", icon: Plug, color: "#00BFA6" },
  { key: "proposta", icon: MailCheck, color: "#F7B731" },
  { key: "analytics", icon: ChartLine, color: "#A855F7" },
  { key: "hospedagem", icon: Rocket, color: "#3B82F6" },
];

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
