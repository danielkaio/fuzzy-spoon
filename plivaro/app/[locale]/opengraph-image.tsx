import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "Plivaro — Landing pages que convertem visitantes em clientes reais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: param } = await params;
  const locale = hasLocale(routing.locales, param) ? param : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "OpenGraph" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#fff",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1250 60%, #0f0f23 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: 48, fontWeight: 800 }}>Plivaro</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1, display: "flex", flexWrap: "wrap" }}>
            {t("tituloInicio")}&nbsp;
            <span style={{ color: "#a78bfa" }}>{t("tituloDestaque")}</span>
            &nbsp;{t("tituloFim")}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)" }}>
            {t("subtitulo")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
