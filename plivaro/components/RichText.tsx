import type { ReactNode } from "react";

// Marcações usadas em t.rich(). Ficam fora dos componentes para não serem
// recriadas a cada render.

/** <destaque>…</destaque>: trecho do título com o gradiente da marca. */
export const destaque = (chunks: ReactNode) => (
  <span className="text-gradient">{chunks}</span>
);
