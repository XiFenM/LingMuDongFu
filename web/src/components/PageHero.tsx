import Image from "next/image";
import Link from "next/link";
import { Fireflies } from "./Fireflies";
import { HangingBanner } from "./HangingBanner";

type Crumb = { label: string; href?: string };

type Props = {
  background: string;
  eyebrow?: string;
  title: string;
  english?: string;
  description: string;
  crumbs?: Crumb[];
  active?: string;
  bannerText?: string;
  bannerSub?: string;
  children?: React.ReactNode;
  heightClass?: string;
};

export function PageHero({
  background,
  eyebrow,
  title,
  english,
  description,
  crumbs,
  bannerText,
  bannerSub,
  children,
  heightClass = "min-h-[360px]",
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${heightClass}`}>
      <div className="absolute inset-0 -z-10">
        <Image src={background} alt="" fill priority sizes="100vw" className="object-cover object-right-top" />
        {/* Layered reconstruction assets: mist + foreground roots stay separate from the scene background. */}
        {/* eslint-disable @next/next/no-img-element */}
        <img src="/assets/lydt/scene/fog-layer-01.png" alt="" aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 w-full object-cover opacity-[0.35] mix-blend-screen" />
        <img src="/assets/lydt/scene/fog-layer-02.png" alt="" aria-hidden className="absolute inset-x-0 top-0 h-1/2 w-full object-cover opacity-20 mix-blend-screen" />
        <img src="/assets/lydt/scene/tree-root-foreground-left.png" alt="" aria-hidden className="absolute left-0 top-0 h-full w-auto max-w-none opacity-[0.18]" />
        <img src="/assets/lydt/scene/tree-root-foreground-right.png" alt="" aria-hidden className="absolute right-0 top-0 h-full w-auto max-w-none opacity-[0.22]" />
        {/* eslint-enable @next/next/no-img-element */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,18,16,0.96)] via-[rgba(7,18,16,0.66)] to-[rgba(7,18,16,0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-ink-950)]" />
      </div>
      <Fireflies count={8} />
      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-8 px-6 pt-12 pb-14 lg:pt-14">
        <div className="max-w-[720px]">
          {crumbs?.length ? (
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[13px] tracking-[0.18em] text-[#cfc4a8]">
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
                  {c.href ? <Link href={c.href} className="hover:text-[var(--color-gold-300)]">{c.label}</Link> : <span>{c.label}</span>}
                  {i < crumbs.length - 1 ? <span className="text-[var(--color-gold-500)]">/</span> : null}
                </span>
              ))}
            </nav>
          ) : null}
          {eyebrow ? <div className="mb-3 font-display text-[13px] uppercase tracking-[0.42em] text-[var(--color-gold-300)]">{eyebrow}</div> : null}
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1.08] tracking-[0.08em] text-[var(--color-moon)] drop-shadow-[0_6px_18px_rgba(0,0,0,.45)]">
              {title}
            </h1>
            {english ? <span className="mb-2 font-display text-[clamp(1.3rem,2vw,2rem)] tracking-[0.08em] text-[var(--color-gold-300)]">{english}</span> : null}
          </div>
          <div className="mt-4 h-px w-56 bg-gradient-to-r from-[rgba(224,204,136,.75)] via-[rgba(224,204,136,.35)] to-transparent" />
          <p className="mt-4 max-w-[640px] whitespace-pre-line text-[15px] leading-[1.95] tracking-[0.06em] text-[#d7ccb0]">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        {bannerText ? (
          <div className="hidden shrink-0 lg:block">
            <HangingBanner text={bannerText} sub={bannerSub} className="mt-2" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
