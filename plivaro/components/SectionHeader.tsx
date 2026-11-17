type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  tone = "light",
  id,
}: Readonly<SectionHeaderProps>) {
  const dark = tone === "dark";
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <Eyebrow tone={tone}>{label}</Eyebrow>
      <h2
        id={id}
        className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-fg"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg ${dark ? "text-white/60" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: Readonly<{
  children: React.ReactNode;
  tone?: "light" | "dark";
}>) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${
        tone === "dark"
          ? "bg-brand/20 text-brand-light"
          : "bg-brand/10 text-brand-dark"
      }`}
    >
      {children}
    </span>
  );
}
