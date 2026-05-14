import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionHeader } from "./SectionHeader";
import { TIMELINE } from "@/lib/data";

const markerLayout = [
  {
    text: { left: "2%", top: "82px" },
    node: { left: "31%", top: "146px" },
    line: { left: "17%", top: "169px", width: "22%" },
    align: "right",
  },
  {
    text: { left: "9%", top: "242px" },
    node: { left: "36%", top: "250px" },
    line: { left: "23%", top: "272px", width: "19%" },
    align: "right",
  },
  {
    text: { right: "4%", top: "82px" },
    node: { right: "31%", top: "146px" },
    line: { right: "17%", top: "169px", width: "22%" },
    align: "left",
  },
  {
    text: { right: "8%", top: "242px" },
    node: { right: "36%", top: "250px" },
    line: { right: "23%", top: "272px", width: "19%" },
    align: "left",
  },
] as const;

export function Timeline() {
  return (
    <section id="timeline" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <SectionHeader title="年轮时间线" sub="Timeline" />

      <div className="relative mt-6 min-h-[390px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-8 bg-[radial-gradient(ellipse_at_center,rgba(224,204,136,.12),transparent_56%)] opacity-80" />
        <YearRingDisk />

        <ol className="relative z-10 hidden min-h-[360px] md:block">
          {TIMELINE.map((item, index) => {
            const layout = markerLayout[index % markerLayout.length];
            return (
              <li key={item.year}>
                <span
                  aria-hidden
                  className="absolute h-px bg-gradient-to-r from-transparent via-[rgba(224,204,136,.84)] to-transparent drop-shadow-[0_0_10px_rgba(224,204,136,.45)]"
                  style={layout.line as CSSProperties}
                />
                <span
                  aria-hidden
                  className="absolute z-20 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[url('/assets/lydt/timeline/timeline-ring-node.svg')] bg-contain bg-center bg-no-repeat drop-shadow-[0_0_18px_rgba(224,204,136,.46)]"
                  style={layout.node as CSSProperties}
                />
                <div
                  className={`absolute z-20 w-[188px] ${layout.align === "right" ? "text-right" : "text-left"}`}
                  style={layout.text as CSSProperties}
                >
                  <div className="font-display text-[24px] leading-none tracking-[0.08em] text-[var(--color-gold-300)] drop-shadow-[0_0_12px_rgba(224,204,136,.24)]">
                    {item.year}
                  </div>
                  <div className="mt-2 font-display text-[15px] tracking-[0.12em] text-[var(--color-moon)]">
                    {item.title}
                  </div>
                  <p className="mt-2 text-[12px] leading-[1.55] text-[#cfc4a8]">
                    {item.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <ol className="relative z-10 grid gap-3 pt-[230px] md:hidden">
          {TIMELINE.map((item) => (
            <li key={item.year} className="card-wood grid grid-cols-[70px_1fr] gap-3 p-4">
              <div className="font-display text-[22px] tracking-[0.08em] text-[var(--color-gold-300)]">{item.year}</div>
              <div>
                <div className="font-display text-[15px] tracking-[0.12em] text-[var(--color-moon)]">{item.title}</div>
                <p className="mt-1 text-[12px] leading-[1.6] text-[#cfc4a8]">{item.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function YearRingDisk() {
  return (
    <div className="absolute left-1/2 top-[50px] z-0 h-[260px] w-[min(84vw,800px)] -translate-x-1/2 md:h-[315px]">
      <div
        aria-hidden
        className="absolute inset-x-[7%] top-1/2 h-[48%] -translate-y-1/2 rounded-[999px] bg-[radial-gradient(ellipse,rgba(224,204,136,.2),rgba(156,240,189,.08)_45%,transparent_72%)] blur-md"
      />
      <Image
        src="/assets/lydt/timeline/timeline-large-tree-ring-disk.png"
        alt=""
        fill
        sizes="(min-width: 768px) 800px, 84vw"
        className="object-fill opacity-[.96] drop-shadow-[0_34px_52px_rgba(0,0,0,.65)]"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[16%] w-[15%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(224,204,136,.18),transparent_72%)] blur-[2px]"
      />
    </div>
  );
}
