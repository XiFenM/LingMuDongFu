import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getSkillsContent } from "@/lib/content";

const accentMap: Record<string, string> = {
  firefly: "text-[var(--color-firefly-300)] border-[rgba(156,240,189,0.35)]",
  gold: "text-[var(--color-gold-300)] border-[rgba(224,204,136,0.4)]",
  jade: "text-[var(--color-jade-300)] border-[rgba(185,209,196,0.35)]",
};

export function SkillsTree() {
  const skills = getSkillsContent();

  return (
    <section id="skills" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <SectionHeader title={skills.title} sub={skills.sub} />

      <div className="relative mt-8 grid items-center gap-y-5 md:grid-cols-[1fr_300px_1fr] md:gap-x-5 lg:grid-cols-[1fr_360px_1fr] lg:gap-x-8">
        <BranchConnectors />

        <div className="relative z-10 flex flex-col gap-3">
          {skills.branches.slice(0, 3).map((s) => <SkillBranch key={s.branch} {...s} align="right" />)}
        </div>

        <SkillTreeIllustration />

        <div className="relative z-10 flex flex-col gap-3">
          {skills.branches.slice(3).map((s) => <SkillBranch key={s.branch} {...s} align="left" />)}
        </div>
      </div>
    </section>
  );
}

function BranchConnectors() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-[18%] top-8 z-0 hidden h-[300px] w-[64%] overflow-visible md:block"
      viewBox="0 0 760 300"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="skillBranchGold" x1="0" x2="1">
          <stop stopColor="#e0cc88" stopOpacity="0" />
          <stop offset=".5" stopColor="#e0cc88" stopOpacity=".78" />
          <stop offset="1" stopColor="#e0cc88" stopOpacity="0" />
        </linearGradient>
        <filter id="skillBranchGlow" x="-10%" y="-80%" width="120%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[
        "M366 90 C285 72 240 42 126 42",
        "M350 142 C258 138 210 130 126 130",
        "M362 196 C280 214 232 235 126 236",
        "M394 90 C475 72 520 42 634 42",
        "M410 142 C502 138 550 130 634 130",
        "M398 196 C480 214 528 235 634 236",
      ].map((d) => (
        <path key={d} d={d} stroke="url(#skillBranchGold)" strokeWidth="1.6" filter="url(#skillBranchGlow)" />
      ))}
    </svg>
  );
}

function SkillTreeIllustration() {
  return (
    <div className="relative z-10 mx-auto h-[340px] w-[330px] lg:h-[385px] lg:w-[380px]">
      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(224,204,136,.15),rgba(156,240,189,.08)_38%,transparent_68%)] blur-[1px]"
      />
      <div
        aria-hidden
        className="absolute bottom-5 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,.55),transparent_70%)] blur-sm"
      />
      <Image
        src="/assets/lydt/scene/skill-tree-trunk-alpha.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 380px, 330px"
        className="object-contain drop-shadow-[0_0_30px_rgba(224,204,136,.22)]"
        aria-hidden
      />
    </div>
  );
}

function SkillBranch({ branch, items, accent, align }: { branch: string; items: string[]; accent: string; align: "left" | "right" }) {
  const dotSide = align === "right" ? "right-[-10px]" : "left-[-10px]";
  return (
    <div className={`card-wood relative px-4 py-3 ${align === "right" ? "text-right" : "text-left"}`}>
      <span className={`absolute top-1/2 ${dotSide} -translate-y-1/2 inline-flex h-3 w-3 rounded-full bg-[var(--color-firefly-500)] ring-2 ring-[rgba(7,18,16,0.85)]`} />
      <div className={`mb-2 font-display text-[13px] tracking-[0.14em] ${accentMap[accent]?.split(" ")[0] ?? "text-[var(--color-gold-300)]"}`}>{branch}</div>
      <ul className={`flex flex-wrap gap-1.5 text-[11px] ${align === "right" ? "justify-end" : "justify-start"}`}>
        {items.map((it) => <li key={it} className={`rounded-md border ${accentMap[accent] ?? ""} bg-[rgba(7,18,16,0.55)] px-2 py-0.5 tracking-[0.03em]`}>{it}</li>)}
      </ul>
    </div>
  );
}
