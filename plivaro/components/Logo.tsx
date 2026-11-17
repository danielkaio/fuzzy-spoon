import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-white ${className}`}
      aria-label="Plivaro, página inicial"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-brand to-brand-dark shadow-lg shadow-brand/30">
        <Zap className="size-4 fill-white text-white" aria-hidden />
      </span>
      Plivaro
    </Link>
  );
}
