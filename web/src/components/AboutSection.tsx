import { SectionHeader } from "./SectionHeader";
import { getAboutContent } from "@/lib/content";

export function AboutSection() {
  const about = getAboutContent();

  return (
    <section id="about" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
        <SectionHeader title={about.title} sub={about.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {about.cards.map((card) => (
            <article key={card.title} className="card-wood p-5">
              <div className="mb-3 font-display text-[15px] tracking-[0.12em] text-[var(--color-gold-300)]">{card.title}</div>
              <p className="text-[12.5px] leading-[1.75] text-[#cfc4a8]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
