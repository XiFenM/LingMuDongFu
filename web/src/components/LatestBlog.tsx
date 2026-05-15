import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getLatestNotesContent } from "@/lib/content";
import { IconArrowRight, IconCalendar } from "./Icons";

export function LatestBlog() {
  const latest = getLatestNotesContent();

  return (
    <section id="blog" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <div className="flex items-end justify-between">
        <SectionHeader title={latest.title} sub={latest.sub} />
        <Link href={latest.actionHref} className="hidden items-center gap-2 text-[12px] tracking-[0.18em] text-[var(--color-gold-300)] transition hover:text-[var(--color-firefly-300)] md:inline-flex">{latest.actionLabel} <IconArrowRight width={14} height={14} /></Link>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {latest.posts.map((p) => (
          <Link key={p.href} href={p.href} className="card-paper group block overflow-hidden p-0 transition hover:-translate-y-0.5">
            <div className="relative aspect-[16/7.6] overflow-hidden border-b border-[rgba(74,50,29,.18)]">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(247,238,213,.2)] to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-[17px] leading-snug tracking-[0.06em] text-[#2a2117]">{p.title}</h3>
              <p className="mt-3 line-clamp-3 text-[12px] leading-[1.65] text-[#5d513f]">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-[11px] text-[#5d513f]">
                <span className="inline-flex items-center gap-1"><IconCalendar width={12} height={12} /> {p.date}</span>
                <span className="rounded-md border border-[rgba(74,50,29,.28)] bg-[rgba(255,255,255,.18)] px-2 py-0.5 text-[#5d4a2c]">{p.tags[0]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
