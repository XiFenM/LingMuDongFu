import Image from "next/image";
import { SectionHeader } from "./SectionHeader";
import { getTimelineContent } from "@/lib/content";

const markerLayout = [
  { left: "50%", top: "51%" },
  { left: "62%", top: "51%" },
  { left: "74%", top: "51%" },
  { left: "86%", top: "51%" },
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
    <div
      className="pointer-events-none absolute left-0 top-[-320px] -z-10 h-[980px] overflow-hidden md:top-[-310px] md:h-[1040px] lg:top-[-370px] lg:h-[1160px]"
      style={{ right: "min(0px, calc((1280px - 100vw) / 2))" }}
    >
      <div className="absolute left-[calc(-64vw-470px)] top-0 h-full w-[1650px] max-w-none md:left-[-760px] md:w-[1750px] lg:left-[-940px] lg:w-[2100px]">
        <div
          aria-hidden
          className="absolute inset-y-[10%] left-[18%] right-[4%] rounded-[999px] bg-[radial-gradient(ellipse,rgba(224,204,136,.18),rgba(156,240,189,.07)_48%,transparent_72%)] blur-xl"
        />
        <Image
          src="/assets/lydt/timeline/timeline-large-tree-ring-disk.png"
          alt=""
          fill
          sizes="1520px"
          className="object-fill opacity-[.82] drop-shadow-[0_36px_60px_rgba(0,0,0,.72)]"
          aria-hidden
        />

        <ol className="absolute inset-0 z-10 hidden md:block">
          {items.map((item, index) => {
            const layout = markerLayout[index % markerLayout.length];

            return (
              <li
                key={item.year}
                className="absolute w-[128px] -translate-x-1/2 -translate-y-1/2 text-center lg:w-[148px]"
                style={layout}
                aria-label={`${item.year} ${item.title}: ${item.note}`}
              >
                <div className="inline-flex flex-col items-center rounded-full border border-[rgba(244,195,106,.24)] bg-[rgba(22,13,4,.34)] px-3.5 py-2 text-[#f6dea4] shadow-[0_8px_20px_rgba(0,0,0,.32)] backdrop-blur-[1px]">
                  <span className="font-display text-[20px] leading-none tracking-[0.08em] drop-shadow-[0_1px_4px_rgba(0,0,0,.72)] lg:text-[22px]">{item.year}</span>
                  <span className="mt-1 font-display text-[12px] leading-none tracking-[0.1em] drop-shadow-[0_1px_4px_rgba(0,0,0,.72)] lg:text-[13px]">{item.title}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
