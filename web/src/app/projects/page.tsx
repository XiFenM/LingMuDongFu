import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FilterTabs } from "@/components/FilterTabs";
import { Pagination } from "@/components/Pagination";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/data";
import { getProjectsPageContent, getSiteContent } from "@/lib/content";
import { IconChevronDown, IconSearch, IconSpark } from "@/components/Icons";
import Link from "next/link";

export default function ProjectsPage() {
  const content = getProjectsPageContent();
  const site = getSiteContent();

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-projects-workshop-desktop.png"
          crumbs={[{ label: site.homeLabel, href: "/" }, { label: site.projectsLabel }]}
          title={content.title}
          english={content.english}
          description={content.description}
          bannerText={content.bannerText}
          heightClass="min-h-[360px]"
        >
          <div className="hidden h-24 w-24 items-center justify-center rounded-full border border-[rgba(224,204,136,.35)] bg-[rgba(7,18,16,.45)] text-[var(--color-gold-300)] lg:inline-flex">
            <IconSpark width={44} height={44} />
          </div>
        </PageHero>

        <section className="mx-auto max-w-[1280px] px-6 py-9">
          <FilterTabs items={content.categories} active={0} />

          <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_360px_160px] lg:items-center">
            <label className="relative block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-300)]"><IconSearch /></span>
              <input className="w-full rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] py-4 pl-12 pr-4 text-[14px] text-[var(--color-moon)] outline-none placeholder:text-[#807765] focus:border-[rgba(156,240,189,.56)]" placeholder={content.searchPlaceholder} />
            </label>
            <button type="button" className="flex items-center justify-between rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] px-5 py-4 text-[14px] tracking-[0.12em] text-[#cfc4a8]">
              {content.sortLabel} <IconChevronDown width={16} height={16} />
            </button>
            <div className="flex items-center justify-start gap-3 lg:justify-end">
              <span className="text-[13px] tracking-[0.18em] text-[var(--color-gold-300)]">{content.viewLabel}</span>
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
              <h2 className="font-display text-[28px] tracking-[0.12em] text-[var(--color-moon)]">{content.ctaTitle}</h2>
              <p className="mt-3 max-w-[560px] text-[14px] leading-[1.8] text-[#cfc4a8]">{content.ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.ctaActions.map((action, index) => (
                <Link key={action.href} href={action.href} className={`${index === 0 ? "border-[rgba(224,204,136,.4)] bg-[rgba(224,204,136,.1)] text-[var(--color-gold-300)]" : "border-[rgba(156,240,189,.32)] bg-[rgba(156,240,189,.08)] text-[var(--color-moon)]"} rounded-md border px-6 py-3 text-[14px] tracking-[0.18em] transition hover:text-[var(--color-firefly-300)]`}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
