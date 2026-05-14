type Props = {
  title: string;
  sub?: string;
  align?: "left" | "center";
};

export function SectionHeader({ title, sub, align = "left" }: Props) {
  if (align === "center") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.18em] text-[var(--color-moon)]">
          {title}
        </h2>
        {sub ? (
          <div className="grid w-full max-w-[420px] grid-cols-[1fr_auto_1fr] items-center gap-4">
            <span className="h-[17px] min-w-0 scale-x-[-1] bg-[url('/assets/lydt/decor/decor-section-branch-divider.svg')] bg-contain bg-center bg-no-repeat opacity-85" />
            <span className="font-display text-[12px] uppercase tracking-[0.45em] text-[var(--color-gold-300)]">
              {sub}
            </span>
            <span className="h-[17px] min-w-0 bg-[url('/assets/lydt/decor/decor-section-branch-divider.svg')] bg-contain bg-center bg-no-repeat opacity-85" />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] tracking-[0.18em] text-[var(--color-moon)]">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent via-[var(--color-gold-500)] to-transparent" />
        {sub ? (
          <span className="font-display text-[12px] tracking-[0.45em] uppercase text-[var(--color-gold-300)]">
            {sub}
          </span>
        ) : null}
        <span className="h-[17px] w-[180px] bg-[url('/assets/lydt/decor/decor-section-branch-divider.svg')] bg-contain bg-center bg-no-repeat opacity-85" />
      </div>
    </div>
  );
}
