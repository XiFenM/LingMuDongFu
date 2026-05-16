import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { getResumePageContent, getSiteContent } from "@/lib/content";
import { IconDownload, IconMail } from "@/components/Icons";

export default function ResumePage() {
  const content = getResumePageContent();
  const site = getSiteContent();

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-resume-tree-study-desktop.png"
          crumbs={[{ label: site.homeLabel, href: "/" }, { label: site.resumeLabel }]}
          title={content.title}
          english={content.english}
          description={content.description}
          bannerText={content.bannerText}
          heightClass="min-h-[390px]"
        >
          <div className="flex flex-wrap gap-4">
            {content.actions.map((action, index) => {
              const Icon = action.icon === "download" ? IconDownload : IconMail;
              return (
                <a key={action.href} href={action.href} className={`${index === 0 ? "border-[rgba(224,204,136,.4)] bg-[rgba(232,226,207,.9)] text-[var(--color-ink-950)]" : "border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] text-[var(--color-gold-300)]"} inline-flex items-center gap-2 rounded-md border px-5 py-3 text-[14px] tracking-[0.14em]`}>
                  <Icon /> {action.label}
                </a>
              );
            })}
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
              <h2 className="mt-2 font-display text-[34px] tracking-[0.18em] text-[var(--color-moon)]">{site.ownerName}</h2>
              <p className="font-display text-[18px] tracking-[0.08em] text-[var(--color-gold-300)]">{site.ownerEnglishName}</p>
            </div>
            <p className="mt-6 border-y border-[rgba(224,204,136,.16)] py-5 text-center text-[14px] leading-[1.8] text-[#cfc4a8]">{site.role}</p>
            <dl className="mt-6 space-y-3 text-[13px] text-[#cfc4a8]">
              {content.profileItems.map((item) => <div key={item.label} className="flex justify-between gap-3 border-b border-[rgba(224,204,136,.1)] pb-2"><dt className="text-[var(--color-gold-300)]">{item.label}</dt><dd className="text-right">{item.value}</dd></div>)}
            </dl>
            <h3 className="mt-8 font-display text-[20px] tracking-[0.16em] text-[var(--color-gold-300)]">{content.skillsTitle}</h3>
            <div className="mt-4 space-y-3">
              {content.skillLevels.map(({ label, value }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-[12px] text-[#cfc4a8]"><span>{label}</span><span>{value}</span></div>
                  <div className="h-2 rounded-full border border-[rgba(224,204,136,.12)] bg-[rgba(232,226,207,.08)] [background-image:url('/assets/lydt/texture/texture-tree-ring-subtle.png')] bg-[length:240px_240px]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-firefly-500)] shadow-[0_0_12px_rgba(156,240,189,.24)]" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-8 font-display text-[20px] tracking-[0.16em] text-[var(--color-gold-300)]">{content.educationTitle}</h3>
            <div className="mt-3 flex gap-3 rounded-md border border-[rgba(224,204,136,.16)] bg-[rgba(7,18,16,.36)] p-3">
              <Image src="/assets/lydt/resume/emblem-sjtu.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0" />
              <p className="text-[14px] leading-[1.8] text-[#cfc4a8]">{content.education?.school}<br />{content.education?.major}<br />{content.education?.period}</p>
            </div>
            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-md border border-[rgba(224,204,136,.18)]">
              <Image src="/assets/lydt/scene/desk-resume-scroll.png" alt="" fill sizes="300px" className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,18,16,.55)] to-transparent" />
            </div>
          </aside>

          <div className="space-y-6">
            <section className="card-wood p-6">
              <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">{content.experienceTitle}</h2>
              <div className="mt-8 space-y-6 border-l border-[rgba(224,204,136,.28)] pl-7">
                {content.experience.map((exp) => (
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
                <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">{content.featuredProjectsTitle}</h2>
                <Link href="/projects" className="text-[13px] tracking-[0.14em] text-[var(--color-gold-300)]">{content.featuredProjectsActionLabel}</Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {content.featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            </section>

            <section className="card-wood p-6">
              <h2 className="font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">{content.honorsTitle}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-5">
                {content.honors.map((honor) => (
                  <div key={honor.label} className="rounded-md border border-[rgba(224,204,136,.24)] bg-[rgba(7,18,16,.52)] p-4 text-center text-[13px] leading-[1.6] text-[#cfc4a8]">
                    <Image src={honor.icon} alt="" width={58} height={58} className="mx-auto mb-3 h-[58px] w-[58px]" />
                    {honor.label}
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
            <div className="relative max-w-[640px]"><h2 className="font-display text-[30px] tracking-[0.14em] text-[var(--color-moon)]">{content.ctaTitle}</h2><p className="mt-3 text-[#cfc4a8]">{content.ctaBody}</p></div>
            <a href={content.ctaHref || `mailto:${site.email}`} className="relative inline-flex items-center justify-center gap-2 rounded-md border border-[rgba(224,204,136,.4)] bg-[rgba(7,18,16,.38)] px-8 py-3 text-[var(--color-gold-300)]"><IconMail /> {content.ctaLabel}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
