import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { CONTACT_CARDS, EXPERIENCE, HONORS, PROJECTS, SITE, SOCIAL } from "@/lib/data";
import { IconDownload, IconMail } from "@/components/Icons";

const SKILL_LEVELS = [
  ["CUDA / GPU Computing", "95%"],
  ["PyTorch Internals", "90%"],
  ["Distributed Training", "88%"],
  ["Performance Optimization", "90%"],
  ["System Design & Backend", "82%"],
  ["LLM / AI Systems", "85%"],
];

const HONOR_ICONS = [
  "/assets/lydt/resume/certificate-topcoder.svg",
  "/assets/lydt/resume/certificate-acm.svg",
  "/assets/lydt/resume/certificate-scholarship.svg",
  "/assets/lydt/resume/certificate-graduate.svg",
  "/assets/lydt/resume/certificate-nvidia-dli.svg",
];

export default function ResumePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-resume-tree-study-desktop.png"
          crumbs={[{ label: "首页", href: "/" }, { label: "简历" }]}
          title="我的简历"
          english="RESUME"
          description={"热爱系统与性能，专注 AI 基础设施、\n高性能计算与算法工程。\n持续构建可落地、可扩展、可复用的技术方案。"}
          bannerText="以木为根·以技为枝"
          heightClass="min-h-[390px]"
        >
          <div className="flex flex-wrap gap-4">
            <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(232,226,207,.9)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-ink-950)]"><IconDownload /> 下载 PDF 简历</a>
            <a href={SOCIAL.email} className="inline-flex items-center gap-2 rounded-md border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-gold-300)]"><IconMail /> 联系我</a>
          </div>
        </PageHero>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 lg:grid-cols-[350px_1fr]">
          <aside className="card-wood p-6">
            <div className="mx-auto w-56 text-center">
              <div className="relative mx-auto h-52 w-52">
                <div className="absolute left-1/2 top-1/2 h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[rgba(156,240,189,.08)]">
                  <Image src="/assets/lydt/resume/avatar-yinjie.png" alt="Yinjie Shen" fill sizes="154px" className="object-cover" />
                </div>
                <Image src="/assets/lydt/resume/avatar-frame-tree-ring.svg" alt="" fill sizes="208px" className="pointer-events-none object-contain drop-shadow-[0_0_24px_rgba(224,204,136,.2)]" />
              </div>
              <h2 className="mt-2 font-display text-[34px] tracking-[0.18em] text-[var(--color-moon)]">沈寅杰</h2>
              <p className="font-display text-[18px] tracking-[0.08em] text-[var(--color-gold-300)]">Yinjie Shen</p>
            </div>
            <p className="mt-6 border-y border-[rgba(224,204,136,.16)] py-5 text-center text-[14px] leading-[1.8] text-[#cfc4a8]">{SITE.role}</p>
            <dl className="mt-6 space-y-3 text-[13px] text-[#cfc4a8]">
              {["生日 2000-04-12", "所在地 中国 · 上海", "邮箱 yinjie.shen@gmail.com", "网站 yinjie-shen.com", "Github github.com/yinjie-shen", "LinkedIn linkedin.com/in/yinjie-shen"].map((item) => <div key={item} className="flex justify-between gap-3 border-b border-[rgba(224,204,136,.1)] pb-2"><dt className="text-[var(--color-gold-300)]">{item.split(' ')[0]}</dt><dd className="text-right">{item.split(' ').slice(1).join(' ')}</dd></div>)}
            </dl>
            <h3 className="mt-8 font-display text-[20px] tracking-[0.16em] text-[var(--color-gold-300)]">核心技能概览</h3>
            <div className="mt-4 space-y-3">
              {SKILL_LEVELS.map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-[12px] text-[#cfc4a8]"><span>{label}</span><span>{value}</span></div>
                  <div className="h-2 rounded-full border border-[rgba(224,204,136,.12)] bg-[rgba(232,226,207,.08)] [background-image:url('/assets/lydt/texture/texture-tree-ring-subtle.png')] bg-[length:240px_240px]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-firefly-500)] shadow-[0_0_12px_rgba(156,240,189,.24)]" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-8 font-display text-[20px] tracking-[0.16em] text-[var(--color-gold-300)]">教育背景</h3>
            <div className="mt-3 flex gap-3 rounded-md border border-[rgba(224,204,136,.16)] bg-[rgba(7,18,16,.36)] p-3">
              <Image src="/assets/lydt/resume/emblem-sjtu.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0" />
              <p className="text-[14px] leading-[1.8] text-[#cfc4a8]">上海交通大学<br />计算机科学与技术 本科<br />2018.09 — 2022.06</p>
            </div>
            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-md border border-[rgba(224,204,136,.18)]">
              <Image src="/assets/lydt/scene/desk-resume-scroll.png" alt="" fill sizes="300px" className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,18,16,.55)] to-transparent" />
            </div>
          </aside>

          <div className="space-y-6">
            <section className="card-wood p-6">
              <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">工作经历</h2>
              <div className="mt-8 space-y-6 border-l border-[rgba(224,204,136,.28)] pl-7">
                {EXPERIENCE.map((exp) => (
                  <article key={exp.period} className="relative">
                    <Image src="/assets/lydt/resume/resume-timeline-node.svg" alt="" width={42} height={42} className="absolute -left-[49px] top-[-8px] h-[42px] w-[42px]" />
                    <div className="grid gap-4 md:grid-cols-[130px_1fr]">
                      <div className="text-[13px] text-[var(--color-gold-300)]">{exp.period}</div>
                      <div>
                        <div className="flex items-start gap-3">
                          <Image src="/assets/lydt/resume/emblem-company-abstract.svg" alt="" width={42} height={42} className="hidden h-[42px] w-[42px] shrink-0 sm:block" />
                          <div>
                            <h3 className="font-display text-[18px] tracking-[0.08em] text-[var(--color-gold-300)]">{exp.title}</h3>
                            <p className="mt-1 text-[14px] text-[#cfc4a8]">{exp.company}</p>
                          </div>
                        </div>
                        <ul className="mt-3 flex flex-wrap content-start items-start gap-2">{exp.tags.map((tag) => <li key={tag} className="tag-jade">{tag}</li>)}</ul>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-[1.75] text-[#cfc4a8]">{exp.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="card-wood p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">代表项目</h2>
                <Link href="/projects" className="text-[13px] tracking-[0.14em] text-[var(--color-gold-300)]">查看全部项目 →</Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {PROJECTS.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            </section>

            <section className="card-wood p-6">
              <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">荣誉与证明</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-5">
                {HONORS.map((honor, i) => (
                  <div key={honor} className="rounded-md border border-[rgba(224,204,136,.24)] bg-[rgba(7,18,16,.52)] p-4 text-center text-[13px] leading-[1.6] text-[#cfc4a8]">
                    <Image src={HONOR_ICONS[i] ?? HONOR_ICONS[0]} alt="" width={58} height={58} className="mx-auto mb-3 h-[58px] w-[58px]" />
                    {honor}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-12">
          <div className="card-wood relative flex min-h-[230px] flex-col gap-5 overflow-hidden p-8 md:flex-row md:items-center md:justify-between">
            <Image src="/assets/lydt/scene/desk-tea.png" alt="" fill sizes="1280px" className="object-cover opacity-68" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,18,16,.88)] via-[rgba(7,18,16,.58)] to-[rgba(7,18,16,.22)]" />
            <div className="relative max-w-[640px]"><h2 className="font-display text-[30px] tracking-[0.14em] text-[var(--color-moon)]">期待与你一起探索更多可能。</h2><p className="mt-3 text-[#cfc4a8]">如果你对我的工作感兴趣，欢迎在月窗茶室留下一次安静的对谈。</p></div>
            <a href={CONTACT_CARDS[0].href} className="relative inline-flex items-center justify-center gap-2 rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(7,18,16,.38)] px-8 py-3 text-[var(--color-gold-300)]"><IconMail /> 联系我</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
