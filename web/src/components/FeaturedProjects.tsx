import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getFeaturedProjectsContent } from "@/lib/content";
import { IconArrowRight, IconGithub } from "./Icons";

export function FeaturedProjects() {
  const featured = getFeaturedProjectsContent();

  return (
    <section id="projects" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <div className="flex items-end justify-between">
        <SectionHeader title={featured.title} sub={featured.sub} />
        <Link href={featured.actionHref} className="hidden items-center gap-2 text-[12px] tracking-[0.18em] text-[var(--color-gold-300)] transition hover:text-[var(--color-firefly-300)] md:inline-flex">{featured.actionLabel} <IconArrowRight width={14} height={14} /></Link>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {featured.projects.map((p, i) => (
          <article key={p.id} className="card-paper group relative overflow-hidden p-0">
            <span className="bamboo-tab">{i === 0 ? "壹" : i === 1 ? "贰" : "叁"}</span>
            <div className="relative aspect-[16/7.8] overflow-hidden border-b border-[rgba(74,50,29,.2)]">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,33,29,.34)] to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-[18px] leading-snug tracking-[0.06em] text-[#2a2117]">{p.title}</h3>
              <p className="mt-3 line-clamp-2 text-[12px] leading-[1.65] text-[#5d513f]">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => <li key={t} className="rounded-md border border-[rgba(74,50,29,.28)] bg-[rgba(255,255,255,.18)] px-2 py-0.5 text-[11px] text-[#5d4a2c]">{t}</li>)}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-[rgba(74,50,29,.18)] pt-3">
                <Link href={p.href} className="rounded-md bg-[#0b211d] px-4 py-2 text-[12px] tracking-[0.14em] text-[var(--color-moon)]">详情</Link>
                <a href={p.sourceHref} className="inline-flex items-center gap-1 rounded-md border border-[rgba(74,50,29,.3)] px-3 py-2 text-[12px] text-[#2a2117]"><IconGithub width={13} height={13} /> GitHub</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
