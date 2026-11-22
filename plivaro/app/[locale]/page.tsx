import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProposalSection } from "@/components/ProposalSection";
import { Services } from "@/components/Services";
import { Testimonial } from "@/components/Testimonial";
import { SITE_URL, site } from "@/lib/site";

export default async function Home() {
  const t = await getTranslations("Metadata");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: SITE_URL,
    description: t("description"),
    email: site.contactEmail,
    areaServed: "BR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
  };

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Process />
        <Testimonial />
        <ProposalSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
