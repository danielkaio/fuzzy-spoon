import type { LucideIcon } from "lucide-react";
import {
  ChartLine,
  Flame,
  LayoutTemplate,
  MailCheck,
  Plug,
  Rocket,
} from "lucide-react";

/** URL pública do site. Pode ser sobrescrita por NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://plivaro.com"
).replace(/\/$/, "");

export const site = {
  name: "Plivaro",
  title: "Plivaro | Landing Pages e Sites Profissionais",
  description:
    "Criamos landing pages e hotsites de alta conversão com integração de APIs e automações. Solicite sua proposta grátis.",
  contactEmail: "daniel@plivaro.com.br",
  privacyEmail: "abidala@plivaro.com.br",
  location: "São Paulo, SP — Brasil",
  hours: "Seg–Sex · 9h às 18h",
  gaId: "G-4LMB7WFWT4",
  adsenseClient: "ca-pub-8360693037438432",
};

export const navLinks = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#proposta", label: "Falar com especialista" },
];

export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  color: string;
};

export const services: Service[] = [
  {
    title: "Landing Page",
    description:
      "Página de vendas otimizada para conversão, com design profissional, copy persuasivo e carregamento ultrarrápido.",
    items: ["Responsivo (mobile first)", "SEO on-page", "Pixel de rastreamento"],
    icon: LayoutTemplate,
    color: "#6C63FF",
  },
  {
    title: "Hotsite",
    description:
      "Página de campanha ou lançamento com contagem regressiva, inscrições e notificações automáticas.",
    items: ["Countdown dinâmico", "Lista de espera", "E-mail automático"],
    icon: Flame,
    color: "#FF6B6B",
  },
  {
    title: "Integração com APIs",
    description:
      "Conectamos sua página a CRMs, ERPs, WhatsApp Business, Stripe, PagSeguro, Hotmart e muito mais.",
    items: ["Webhook personalizado", "RD Station / HubSpot", "Pagamento online"],
    icon: Plug,
    color: "#00BFA6",
  },
  {
    title: "Envio de Proposta",
    description:
      "Formulário inteligente que captura o lead e envia a proposta formatada por e-mail automaticamente, em segundos.",
    items: ["E-mail transacional", "Notificação imediata", "Anti-spam integrado"],
    icon: MailCheck,
    color: "#F7B731",
  },
  {
    title: "Analytics & Rastreamento",
    description:
      "Instalação de GA4, Meta Pixel, GTM e heatmaps para você saber exatamente de onde vêm seus leads.",
    items: ["Google Analytics 4", "Meta Pixel + CAPI", "Heatmap / Hotjar"],
    icon: ChartLine,
    color: "#A855F7",
  },
  {
    title: "Hospedagem & Deploy",
    description:
      "Publicamos sua página em domínio próprio com HTTPS, CDN global e uptime de 99,9%.",
    items: ["SSL gratuito", "CDN global", "Deploy em minutos"],
    icon: Rocket,
    color: "#3B82F6",
  },
];

export const steps = [
  {
    title: "Solicite sua proposta",
    description:
      "Preencha o formulário abaixo. Em até 2 horas você recebe a proposta com valores e cronograma.",
  },
  {
    title: "Briefing & aprovação",
    description:
      "Nossa equipe entra em contato, entende seu negócio e envia o briefing completo para aprovação.",
  },
  {
    title: "Desenvolvimento",
    description:
      "Criamos design, código e integrações. Você acompanha o progresso em tempo real.",
  },
  {
    title: "Revisão & ajustes",
    description:
      "Rodadas de revisão ilimitadas. Você aprova cada detalhe antes do lançamento.",
  },
  {
    title: "Publicação & suporte",
    description:
      "Sua página vai ao ar. Suporte técnico incluso por 30 dias após a entrega.",
  },
];

export const testimonial = {
  paragraphs: [
    "Contratei o Daniel Ajala para construir um site institucional para um produto de minha empresa, a Evolução Máxima.",
    "Fiquei muito satisfeito com o serviço prestado. O site superou minhas expectativas, o prazo combinado foi cumprido e o Daniel manteve contato permanente, apresentando as etapas do trabalho e aceitando os feedbacks.",
    "Fiquei muito satisfeito com a parceria.",
  ],
  author: "Edson Procópio",
  role: "Diretor · Evolução Máxima",
  initials: "EP",
};
