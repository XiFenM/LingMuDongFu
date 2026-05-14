import { SectionHeader } from "./SectionHeader";

const cards = [
  { title: "专注于 AI 基础设施系统研究", body: "深入底层框架实现、探索计算系统的边界。" },
  { title: "我的专注", body: "AI 框架内核、GPU 计算引擎、分布式系统训练，并行计算与自动化性能分析。" },
  { title: "我的特质", body: "底层思考、性能优化、工程落地。" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-[1280px] px-6 py-9">
      <div className="grid gap-6 md:grid-cols-[150px_1fr] md:items-start">
        <SectionHeader title="关于我" sub="About Me" />
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
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
