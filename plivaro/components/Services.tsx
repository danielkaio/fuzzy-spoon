import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          id="servicos-titulo"
          label="O que entregamos"
          title="Soluções digitais completas"
          description="Desde a criação da página até a integração com seus sistemas — tudo em um único lugar."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, items, icon: Icon, color }) => (
            <li
              key={title}
              style={{ "--c": color } as React.CSSProperties}
              className="reveal group rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_12px_40px_rgba(108,99,255,0.14)]"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--c)_12%,transparent)] text-(--c) transition-transform group-hover:scale-110">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-fg">{title}</h3>
              <p className="mt-2.5 text-[0.92rem] text-muted">{description}</p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <Check className="size-4 shrink-0 text-teal" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
