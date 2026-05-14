import Image from "next/image";
import { Fireflies } from "./Fireflies";
import { HangingBanner } from "./HangingBanner";
import { SITE } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/assets/lydt/bg/bg-home-hero-tree-sanctuary-desktop.png" alt="" fill priority sizes="100vw" className="object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,18,16,0.95)] via-[rgba(7,18,16,0.58)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-ink-950)]" />
      </div>
      <Fireflies count={14} />
      <div className="pointer-events-none absolute top-3 z-10 hidden origin-top-left scale-[0.64] md:left-4 md:block lg:scale-[0.58] [left:max(0.75rem,calc((100vw-1280px)/2+1rem))]">
        <HangingBanner
          text="灵木无形"
          sub="洞天自有领悟"
          className="drop-shadow-[0_14px_26px_rgba(0,0,0,.55)]"
        />
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 pt-14 pb-18 lg:flex-row lg:items-start lg:gap-14 lg:pt-18 lg:pb-22">
        <div className="max-w-[640px] flex-1 md:pl-[68px] lg:pl-[88px]">
          <div className="flex items-baseline gap-3 font-display">
            <span className="text-[clamp(2.6rem,5.6vw,4.15rem)] leading-none text-[var(--color-moon)]">沈寅杰</span>
            <span className="text-[clamp(1.25rem,2.7vw,2rem)] text-[#e0cc88]">/ Yinjie Shen</span>
          </div>
          <p className="mt-4 text-[14px] tracking-[0.2em] text-[var(--color-gold-300)]">{SITE.role}</p>
          <p className="mt-5 max-w-[560px] text-[14px] leading-[1.8] text-[#d7ccb0] text-balance">{SITE.about}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {SITE.tagline.map((t) => <span key={t} className="tag-jade">{t}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-[rgba(224,204,136,0.55)] bg-[rgba(224,204,136,0.08)] px-6 py-3 text-[14px] tracking-[0.2em] text-[var(--color-moon)] transition hover:bg-[rgba(224,204,136,0.18)]"><span>查看项目</span></a>
            <a href="/blog" className="inline-flex items-center gap-2 rounded-md border border-[rgba(192,163,93,0.28)] bg-transparent px-6 py-3 text-[14px] tracking-[0.2em] text-[var(--color-moon)] transition hover:border-[rgba(192,163,93,0.55)] hover:bg-[rgba(11,33,29,0.55)]"><span>阅读博客</span></a>
          </div>
        </div>

        {/* 首页右侧保留树洞/圆窗主视觉；挂轴按原型移到首屏左侧。 */}
      </div>
    </section>
  );
}
