"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";

type HeaderProps = {
  /** Na página legal mostramos só o botão de voltar. */
  variant?: "home" | "legal";
};

export function Header({ variant = "home" }: Readonly<HeaderProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-all duration-300 ${
        solid
          ? "bg-ink/90 py-3 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 sm:px-6">
        <Logo className="mr-auto" />

        {variant === "home" ? (
          <>
            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex gap-7">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/#proposta"
              className="hidden rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/40 sm:inline-flex"
            >
              Solicitar proposta
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </>
        ) : (
          <Link
            href="/"
            className="inline-flex rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Voltar ao site
          </Link>
        )}
      </div>

      {variant === "home" && open && (
        <nav
          id="menu-mobile"
          aria-label="Menu"
          className="border-t border-white/10 lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-medium text-white/85 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Link
                href="/#proposta"
                onClick={() => setOpen(false)}
                className="flex justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white"
              >
                Solicitar proposta
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
