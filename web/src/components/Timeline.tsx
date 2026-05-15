import { SectionHeader } from "./SectionHeader";
import { getTimelineContent } from "@/lib/content";

const markerLayout = [
  { left: "29%", top: "51%" },
  { left: "51.5%", top: "51%" },
  { left: "66%", top: "51%" },
  { left: "79.5%", top: "51%" },
] as const;

type TimelineItem = ReturnType<typeof getTimelineContent>["items"][number];

export function Timeline() {
  const timeline = getTimelineContent();

  return (
    <section id="timeline" className="relative mx-auto max-w-[1280px] overflow-visible px-6 py-10 md:py-14">
      <div className="relative z-20">
        <SectionHeader title={timeline.title} sub={timeline.sub} />
      </div>

      <div className="relative mt-2 min-h-[430px] overflow-visible md:min-h-[560px]">
        <YearRingField items={timeline.items} />

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

function YearRingField({ items }: { items: TimelineItem[] }) {
  return (
    <div className="pointer-events-none absolute -left-[45vw] right-[-12vw] top-[-158px] z-0 h-[670px] md:-left-[160px] md:right-[-60px] md:top-[-190px] md:h-[760px] lg:-left-[210px] lg:right-[-110px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(244,195,106,.26),rgba(91,54,10,.13)_44%,transparent_73%)] blur-2xl" aria-hidden />
      <svg className="absolute inset-0 h-full w-full drop-shadow-[0_38px_58px_rgba(0,0,0,.68)]" viewBox="0 0 1280 640" preserveAspectRatio="none" fill="none" aria-hidden>
        <defs>
          <linearGradient id="timelineOuter" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#f7d18d" stopOpacity=".98" />
            <stop offset=".56" stopColor="#f0b45d" stopOpacity=".92" />
            <stop offset="1" stopColor="#8f5412" stopOpacity=".76" />
          </linearGradient>
          <linearGradient id="timelineMid" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#d98308" />
            <stop offset=".72" stopColor="#f0b35f" />
            <stop offset="1" stopColor="#75440d" />
          </linearGradient>
          <linearGradient id="timelineInner" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#815006" />
            <stop offset=".62" stopColor="#b56607" />
            <stop offset="1" stopColor="#4a2d08" />
          </linearGradient>
          <radialGradient id="timelineCore" cx="42%" cy="50%" r="74%">
            <stop stopColor="#815006" />
            <stop offset=".66" stopColor="#563103" />
            <stop offset="1" stopColor="#261908" />
          </radialGradient>
        </defs>

        <ellipse cx="170" cy="330" rx="1100" ry="392" fill="url(#timelineOuter)" stroke="#36210a" strokeOpacity=".58" strokeWidth="1.5" />
        <ellipse cx="170" cy="330" rx="918" ry="330" fill="#f5bd70" stroke="#3a250c" strokeOpacity=".46" strokeWidth="1.35" />
        <ellipse cx="170" cy="330" rx="748" ry="274" fill="url(#timelineMid)" stroke="#2c1b07" strokeOpacity=".52" strokeWidth="1.35" />
        <ellipse cx="170" cy="330" rx="574" ry="216" fill="url(#timelineInner)" stroke="#2c1b07" strokeOpacity=".58" strokeWidth="1.35" />
        <ellipse cx="170" cy="330" rx="392" ry="154" fill="url(#timelineCore)" stroke="#1f1507" strokeOpacity=".66" strokeWidth="1.45" />
      </svg>

      <ol className="absolute inset-0 z-10 hidden md:block">
        {items.map((item, index) => {
          const layout = markerLayout[index % markerLayout.length];
          const isInner = index === 0;

          return (
            <li
              key={item.year}
              className="absolute w-[128px] -translate-x-1/2 -translate-y-1/2 text-center lg:w-[148px]"
              style={layout}
              aria-label={`${item.year} ${item.title}: ${item.note}`}
            >
              <div className={`inline-flex flex-col items-center rounded-full px-3.5 py-2 shadow-[0_8px_18px_rgba(0,0,0,.22)] ${isInner ? "bg-[rgba(44,27,5,.38)] text-[#f6dea4]" : "bg-[rgba(255,226,157,.18)] text-[#241606]"}`}>
                <span className="font-display text-[20px] leading-none tracking-[0.08em] lg:text-[22px]">{item.year}</span>
                <span className="mt-1 font-display text-[12px] leading-none tracking-[0.1em] lg:text-[13px]">{item.title}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
