import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FilterTabs } from "@/components/FilterTabs";
import { Pagination } from "@/components/Pagination";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";
import { IconChevronDown, IconSearch, IconSpark } from "@/components/Icons";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-projects-workshop-desktop.png"
          crumbs={[{ label: "首页", href: "/" }, { label: "项目" }]}
          title="项目集"
          english="PROJECTS"
          description={"在灵木洞天中，每个项目都是一段探索与实践的记录，\n从想法到实现，从算法到系统，从代码到影响力。"}
          bannerText="万物皆可炼·代码亦成器"
          heightClass="min-h-[360px]"
        >
          <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-[rgba(224,204,136,.35)] bg-[rgba(7,18,16,.45)] text-[var(--color-gold-300)] lg:inline-flex">
            <IconSpark width={44} height={44} />
          </div>
        </PageHero>

        <section className="mx-auto max-w-[1280px] px-6 py-9">
          <FilterTabs items={PROJECT_CATEGORIES} active={0} />

          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_360px_160px] lg:items-center">
            <label className="relative block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-300)]"><IconSearch /></span>
              <input className="w-full rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] py-4 pl-12 pr-4 text-[14px] text-[var(--color-moon)] outline-none placeholder:text-[#807765] focus:border-[rgba(156,240,189,.56)]" placeholder="搜索项目名称、技术栈或关键词..." />
            </label>
            <button type="button" className="flex items-center justify-between rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] px-5 py-4 text-[14px] tracking-[0.12em] text-[#cfc4a8]">
              排序：最新发布 <IconChevronDown width={16} height={16} />
            </button>
            <div className="flex items-center justify-start gap-3 lg:justify-end">
              <span className="text-[13px] tracking-[0.18em] text-[var(--color-gold-300)]">视图：</span>
              <button className="inline-flex h-12 w-14 items-center justify-center rounded-md border border-[rgba(156,240,189,.42)] bg-[rgba(156,240,189,.1)] text-[var(--color-firefly-300)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lydt/icons/ui/icon-view-grid.svg" alt="" aria-hidden className="h-5 w-5" />
              </button>
              <button className="inline-flex h-12 w-14 items-center justify-center rounded-md border border-[rgba(192,163,93,.28)] text-[#a99d82]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/lydt/icons/ui/icon-view-list.svg" alt="" aria-hidden className="h-5 w-5 opacity-65" />
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <Pagination />
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-12">
          <div className="card-wood grid gap-6 overflow-hidden p-6 md:grid-cols-[180px_1fr_auto] md:items-center">
            <div className="relative flex h-32 items-center justify-center rounded-full border border-[rgba(224,204,136,.25)] bg-[radial-gradient(circle,rgba(224,204,136,.16),rgba(7,18,16,.15))]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/lydt/decor/rune-circle.svg" alt="" aria-hidden className="h-24 w-24 opacity-[0.65] drop-shadow-[0_0_22px_rgba(224,204,136,.18)]" />
            </div>
            <div>
              <h2 className="font-display text-[28px] tracking-[0.12em] text-[var(--color-moon)]">有想法，也有实现。</h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.8] text-[#cfc4a8]">每一个项目，都是一次向内生长的旅程。代码只是载体，思考与探索才是核心。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#contact" className="rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(224,204,136,.1)] px-6 py-3 text-[14px] tracking-[0.18em] text-[var(--color-gold-300)] transition hover:text-[var(--color-firefly-300)]">联系我们</Link>
              <Link href="/" className="rounded-md border border-[rgba(156,240,189,.32)] bg-[rgba(156,240,189,.08)] px-6 py-3 text-[14px] tracking-[0.18em] text-[var(--color-moon)] transition hover:text-[var(--color-firefly-300)]">探索游戏彩蛋</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
