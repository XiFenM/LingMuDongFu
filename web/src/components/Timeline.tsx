import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getTimelineContent } from "@/lib/content";

const markerLayout = [
  { left: "27%", top: "48%" },
  { left: "43%", top: "48%" },
  { left: "58%", top: "48%" },
  { left: "77%", top: "48%" },
] as const;

export function Timeline() {
  const timeline = getTimelineContent();

  return (
    <section id="timeline" className="relative mx-auto max-w-[1280px] overflow-visible px-6 py-10 md:py-14">
      <div className="relative z-20">
        <SectionHeader title={timeline.title} sub={timeline.sub} />
      </div>

      <div className="relative mt-2 min-h-[430px] overflow-visible md:min-h-[560px]">
        <YearRingField />

        <ol className="relative z-20 hidden min-h-[500px] md:block">
          {timeline.items.map((item, index) => {
            const layout = markerLayout[index % markerLayout.length];
            return (
              <li
                key={item.year}
                className="absolute w-[190px] -translate-x-1/2 -translate-y-1/2 text-center"
                style={layout}
              >
                <div className="inline-flex min-w-[112px] flex-col items-center rounded-full border border-[rgba(224,204,136,.45)] bg-[rgba(66,43,15,.5)] px-4 py-2 shadow-[0_0_24px_rgba(224,204,136,.18)] backdrop-blur-[2px]">
                  <span className="font-display text-[22px] leading-none tracking-[0.08em] text-[var(--color-gold-300)] drop-shadow-[0_0_12px_rgba(224,204,136,.32)]">{item.year}</span>
                  <span className="mt-1 font-display text-[13px] tracking-[0.12em] text-[var(--color-moon)]">{item.title}</span>
                </div>
                <p className="mx-auto mt-3 max-w-[180px] text-[11.5px] leading-[1.55] text-[#d8ccb0] drop-shadow-[0_2px_6px_rgba(0,0,0,.85)]">
                  {item.note}
                </p>
              </li>
            );
          })}
        </ol>

        <ol className="relative z-20 grid gap-3 pt-[190px] md:hidden">
          {timeline.items.map((item) => (
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

function YearRingField() {
  return (
    <div className="pointer-events-none absolute -left-[52vw] top-[-180px] z-0 h-[700px] w-[1180px] max-w-none md:-left-[430px] md:top-[-210px] md:h-[840px] md:w-[1420px] lg:-left-[360px] lg:w-[1520px]">
      <div
        aria-hidden
        className="absolute inset-y-[10%] left-[18%] right-[4%] rounded-[999px] bg-[radial-gradient(ellipse,rgba(224,204,136,.22),rgba(156,240,189,.08)_45%,transparent_72%)] blur-xl"
      />
      <Image
        src="/assets/lydt/timeline/timeline-large-tree-ring-disk.png"
        alt=""
        fill
        sizes="1520px"
        className="object-fill opacity-[.62] drop-shadow-[0_36px_60px_rgba(0,0,0,.72)]"
        aria-hidden
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1520 840" fill="none" aria-hidden>
        <defs>
          <radialGradient id="timelineCore" cx="28%" cy="50%" r="38%">
            <stop stopColor="#8b5609" stopOpacity=".95" />
            <stop offset=".55" stopColor="#5b3505" stopOpacity=".9" />
            <stop offset="1" stopColor="#24180f" stopOpacity=".75" />
          </radialGradient>
          <linearGradient id="timelineRingStroke" x1="0" x2="1">
            <stop stopColor="#e0cc88" stopOpacity=".12" />
            <stop offset=".52" stopColor="#f4c36e" stopOpacity=".7" />
            <stop offset="1" stopColor="#e0cc88" stopOpacity=".28" />
          </linearGradient>
          <filter id="timelineRingGlow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <ellipse cx="430" cy="420" rx="315" ry="165" fill="url(#timelineCore)" opacity=".72" />
        {[360, 475, 590, 720, 850].map((rx, index) => (
          <ellipse
            key={rx}
            cx="430"
            cy="420"
            rx={rx}
            ry={180 + index * 48}
            fill={index === 0 ? "rgba(110,65,6,.22)" : "rgba(224,151,45,.08)"}
            stroke="url(#timelineRingStroke)"
            strokeWidth={index === 0 ? 2.2 : 1.5}
            filter={index > 1 ? "url(#timelineRingGlow)" : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
