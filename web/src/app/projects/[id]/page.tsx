import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PROJECTS, getProject } from "@/lib/data";
import { IconArrowRight, IconBook, IconCalendar, IconExternal, IconGithub, IconStar } from "@/components/Icons";

const FEATURE_ICON_ASSETS = [
  "/assets/lydt/project-detail/feature-book.svg",
  "/assets/lydt/project-detail/feature-code.svg",
  "/assets/lydt/project-detail/feature-gauge.svg",
  "/assets/lydt/project-detail/feature-tools.svg",
];

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const related = PROJECTS.filter((item) => item.id !== project.id).slice(0, 3);
  const isCudaProject = project.id === "cuda-softmax";

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-project-detail-research-chamber-desktop.png"
          crumbs={[{ label: "首页", href: "/" }, { label: "项目", href: "/projects" }, { label: project.title }]}
          title={project.title}
          description={project.subtitle ?? project.summary}
          bannerText="观万物流行之理·究极致效率之道"
          heightClass="min-h-[410px]"
        >
          <ul className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <li key={tag} className="tag-jade text-[13px]">{tag}</li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-4">
            <a href={project.sourceHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[rgba(224,204,136,.45)] bg-[rgba(232,226,207,.86)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-ink-950)]"><IconGithub /> 查看源码</a>
            <Link href={project.demoHref} className="inline-flex items-center gap-2 rounded-md border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.55)] px-5 py-3 text-[14px] tracking-[0.14em] text-[var(--color-gold-300)]">在线阅读 <IconExternal /></Link>
          </div>
          <div className="mt-8 grid max-w-[650px] gap-3 sm:grid-cols-4">
            {[{ label: "最后更新", value: project.date, icon: IconCalendar }, { label: "阅读时长", value: project.readTime, icon: IconBook }, { label: "Star", value: project.stars, icon: IconStar }, { label: "语言", value: "Python / CUDA", icon: IconExternal }].map((item) => {
              const Icon = item.icon;
              return <div key={item.label} className="rounded-md border border-[rgba(192,163,93,.25)] bg-[rgba(7,18,16,.5)] p-3"><div className="flex items-center gap-1.5 text-[12px] text-[var(--color-gold-300)]"><Icon width={14} height={14} /> {item.label}</div><div className="mt-2 text-[13px] text-[#cfc4a8]">{item.value}</div></div>;
            })}
          </div>
        </PageHero>

        <section className="mx-auto grid max-w-[1280px] gap-8 px-6 py-8 lg:grid-cols-[190px_1fr_270px]">
          <aside className="hidden lg:block">
            <div className="card-wood sticky top-28 p-5">
              <h2 className="font-display text-[22px] tracking-[0.16em] text-[var(--color-moon)]">目录</h2>
              <ul className="mt-5 space-y-3 text-[13px] text-[#cfc4a8]">
                {["项目概览", "背景与动机", "核心特性", "性能示例", "项目结构", "相关资源"].map((item, i) => <li key={item} className={`flex items-center gap-2 rounded-md px-3 py-2 ${i === 0 ? "bg-[rgba(156,240,189,.1)] text-[var(--color-firefly-300)]" : ""}`}><span className="h-2 w-2 rounded-full border border-[var(--color-gold-300)]" />{item}</li>)}
              </ul>
            </div>
          </aside>

          <article className="space-y-6">
            <section className="card-wood p-6">
              <h2 className="font-display text-[28px] tracking-[0.12em] text-[var(--color-moon)]">项目概览</h2>
              <p className="mt-4 text-[15px] leading-[1.9] text-[#cfc4a8]">{project.sections[0]?.body}</p>
              {isCudaProject ? (
                <div className="relative mt-6 overflow-hidden rounded-lg border border-[rgba(224,204,136,.25)] bg-[rgba(7,18,16,.72)] p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/lydt/project-detail/diagram-triton-cuda.svg"
                    alt="Triton 与 CUDA 技术图示"
                    className="h-auto w-full drop-shadow-[0_0_28px_rgba(156,240,189,.18)]"
                  />
                  <div className="pointer-events-none absolute inset-x-8 top-8 flex justify-between text-[11px] tracking-[0.18em] text-[var(--color-gold-300)]">
                    <span>TRITON PROGRAM</span>
                    <span>CUDA KERNEL</span>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-[11px] tracking-[0.2em] text-[#cfc4a8]">
                    BLOCK · WARP · SHARED MEMORY · GLOBAL MEMORY
                  </div>
                </div>
              ) : (
                <div className="relative mt-6 h-[250px] overflow-hidden rounded-lg border border-[rgba(224,204,136,.25)]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 730px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,14,13,.5)] to-transparent" />
                </div>
              )}
            </section>

            {project.sections.slice(1).map((section) => (
              <section key={section.title} className="card-paper p-6">
                <h2 className="font-display text-[26px] tracking-[0.12em] text-[#2a2117]">{section.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.9] text-[#473929]">{section.body}</p>
              </section>
            ))}

            <section className="card-wood p-6">
              <h2 className="font-display text-[26px] tracking-[0.12em] text-[var(--color-moon)]">核心特性</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {project.features.map((feature, index) => (
                  <div key={feature.title} className="card-paper p-5 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(74,50,29,.3)] bg-[rgba(255,255,255,.16)] text-[#5d4a2c]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={FEATURE_ICON_ASSETS[index % FEATURE_ICON_ASSETS.length]} alt="" aria-hidden className="h-8 w-8 opacity-80 mix-blend-multiply" />
                    </div>
                    <h3 className="font-display text-[16px] tracking-[0.1em] text-[#2a2117]">{feature.title}</h3>
                    <p className="mt-2 text-[12px] leading-[1.6] text-[#5d513f]">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card-wood p-6">
              <h2 className="font-display text-[26px] tracking-[0.12em] text-[var(--color-moon)]">性能示例</h2>
              <div className="mt-5 overflow-hidden rounded-md border border-[rgba(224,204,136,.25)]">
                <table className="w-full min-w-[560px] text-left text-[13px] text-[#cfc4a8]">
                  <thead className="bg-[rgba(224,204,136,.1)] text-[var(--color-gold-300)]"><tr><th className="px-4 py-3">指标</th><th className="px-4 py-3">结果</th><th className="px-4 py-3">说明</th></tr></thead>
                  <tbody>
                    {project.metrics.map((m) => <tr key={m.label} className="border-t border-[rgba(224,204,136,.15)]"><td className="px-4 py-3">{m.label}</td><td className="px-4 py-3 text-[var(--color-firefly-300)]">{m.value}</td><td className="px-4 py-3">{m.note}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </section>
          </article>

          <aside className="space-y-6">
            <div className="card-paper p-6">
              <h2 className="font-display text-[22px] tracking-[0.12em] text-[#2a2117]">项目信息</h2>
              <dl className="mt-5 space-y-4 text-[13px] text-[#5d513f]">
                <div><dt className="text-[#8a6c37]">项目类型</dt><dd className="mt-1">{project.category}</dd></div>
                <div><dt className="text-[#8a6c37]">开源协议</dt><dd className="mt-1">MIT License</dd></div>
                <div><dt className="text-[#8a6c37]">创建时间</dt><dd className="mt-1">{project.date}</dd></div>
                <div><dt className="text-[#8a6c37]">仓库地址</dt><dd className="mt-1 break-words">github.com/yinjie-shen/{project.id}</dd></div>
              </dl>
            </div>
            <div className="card-paper p-6">
              <h2 className="font-display text-[22px] tracking-[0.12em] text-[#2a2117]">相关项目</h2>
              <ul className="mt-5 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="group flex items-center gap-3 text-[13px] text-[#473929]">
                      <span className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[rgba(74,50,29,.25)]">
                        <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="leading-snug group-hover:text-[#0b211d]">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#5d4a2c]">查看更多项目 <IconArrowRight width={14} height={14} /></Link>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-12">
          <div className="card-wood relative grid min-h-[240px] overflow-hidden p-6 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <Image
              src="/assets/lydt/decor/decor-project-cta-banner.png"
              alt=""
              fill
              sizes="1280px"
              className="object-cover opacity-72"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(7,18,16,.9)] via-[rgba(7,18,16,.62)] to-[rgba(7,18,16,.2)]" />
            <div className="relative max-w-[620px]">
              <p className="font-display text-[13px] tracking-[0.38em] text-[var(--color-gold-300)]">TREE HOLLOW LAB</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.7rem)] tracking-[0.12em] text-[var(--color-moon)]">
                继续翻阅夕丰木中的工程卷宗
              </h2>
              <p className="mt-4 text-[14px] leading-[1.85] text-[#cfc4a8]">
                从项目复盘回到完整项目集，或前往博客阅读与此相关的源码笔记。
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
              <Link href="/projects" className="rounded-md border border-[rgba(224,204,136,.45)] bg-[rgba(224,204,136,.1)] px-5 py-3 text-[13px] tracking-[0.16em] text-[var(--color-gold-300)]">
                返回项目集
              </Link>
              <Link href={project.demoHref} className="inline-flex items-center gap-2 rounded-md border border-[rgba(156,240,189,.38)] bg-[rgba(156,240,189,.1)] px-5 py-3 text-[13px] tracking-[0.16em] text-[var(--color-moon)]">
                阅读相关笔记 <IconArrowRight width={14} height={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
