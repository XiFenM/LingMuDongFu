import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { BlogCard } from "@/components/BlogCard";
import { POSTS, getPost } from "@/lib/data";
import { IconArrowLeft, IconArrowRight, IconCalendar, IconClock, IconUser } from "@/components/Icons";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

const headings = ["引言", "为什么要理解 Dispatcher？", "核心概念速览", "一个典型调用流程", "常见误区与排查建议", "Dispatcher 关注点", "小结"];

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-blog-detail-study-desktop.png"
          crumbs={[{ label: "博客", href: "/blog" }, { label: "PyTorch" }, { label: "调度器专题" }]}
          title={post.title}
          description="系统梳理 PyTorch Dispatcher、Kernel 注册与分发策略，覆盖自定义算子集成与性能陷阱，帮助真正理解计算图背后的调度逻辑。"
          bannerText="技近乎道·知行合一"
          heightClass="min-h-[390px]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="tag-jade"><IconCalendar width={13} height={13} /> {post.date}</span>
            <span className="tag-jade"><IconClock width={13} height={13} /> {post.readTime}</span>
            {post.tags.map((tag) => <span key={tag} className="tag-jade">{tag}</span>)}
          </div>
          <div className="mt-6 flex items-center gap-3 text-[#cfc4a8]">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(224,204,136,.35)] text-[var(--color-gold-300)]"><IconUser width={18} height={18} /></span>
            <span className="font-display tracking-[0.12em]">沈寅杰 / Yinjie Shen</span>
          </div>
        </PageHero>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 lg:grid-cols-[1fr_290px]">
          <article className="card-paper p-6 md:p-8">
            <ArticleSection title="引言">
              PyTorch 的灵活性来自它的调度能力。离不开其强大的调度系统（Dispatcher）。Dispatcher 负责将一个算子调用路由到最合适的后端实现，并在 Autograd、设备、分布式等多个维度上进行组合调度。理解 Dispatcher，有助于我们更好地扩展自定义算子、定位性能问题，并为框架优化打下坚实基础。
            </ArticleSection>
            <ArticleSection title="为什么要理解 Dispatcher？">
              在实际工程中，我们常会遇到算子未命中、性能不达预期或自定义算子行为异常等问题。这些问题的根源往往与 DispatchKey 的分发逻辑息息相关。Dispatcher 不是一个黑箱，它是 PyTorch 算子分发、后端选择与扩展能力的关键枢纽。
            </ArticleSection>
            <blockquote className="my-5 rounded-md border border-[rgba(74,50,29,.36)] bg-[rgba(255,255,255,.22)] p-5 font-display text-[17px] leading-[1.8] text-[#5d4a2c]">
              Dispatcher 不是一个黑箱，它是 PyTorch 算子分发、后端选择与扩展能力的关键枢纽。
            </blockquote>
            <ArticleSection title="核心概念速览">
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Operator</strong>：算子在 IR 层的定义，包含 Schema 与元信息。</li>
                <li><strong>DispatchKey</strong>：调度键，表示当前上下文可用的后端 / 变换策略。</li>
                <li><strong>Kernel 注册</strong>：将具体实现与 DispatchKey 绑定，形成分发表。</li>
                <li><strong>后端与 Autograd 分层</strong>：不同后端与 Autograd 机制通过 DispatchKey 组合协同工作。</li>
              </ul>
            </ArticleSection>
            <ArticleSection title="一个典型调用流程">
              <CodeBlock />
              上述流程中，Dispatcher 会根据当前的 DispatchKeySet，在分发表中查找最优 Kernel，并执行对应实现。
            </ArticleSection>
            <ArticleSection title="常见误区与排查建议">
              <div className="grid gap-3 md:grid-cols-2">
                {["注册点加在本命中 Kernel", "DispatchKey 理解不完整", "自定义算子与 Autograd 边界", "性能问题与 fallback 路径"].map((item, i) => <div key={item} className="rounded-md border border-[rgba(74,50,29,.28)] bg-[rgba(255,255,255,.16)] p-3"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0b211d] text-[12px] text-[var(--color-firefly-300)]">{i+1}</span>{item}</div>)}
              </div>
            </ArticleSection>
            <ArticleSection title="Dispatcher 关注点">
              <table className="my-4 w-full text-left text-[13px]">
                <thead className="bg-[rgba(74,50,29,.16)]"><tr><th className="px-3 py-2">关注项</th><th className="px-3 py-2">说明</th></tr></thead>
                <tbody>{[["Schema", "定义算子签名，参数与返回类型"], ["Kernel", "不同后端的具体实现，被 DispatchKey 选择"], ["DispatchKey", "决定命中路径，影响性能与正确性"]].map(([a,b]) => <tr key={a} className="border-t border-[rgba(74,50,29,.2)]"><td className="px-3 py-2">{a}</td><td className="px-3 py-2">{b}</td></tr>)}</tbody>
              </table>
            </ArticleSection>
            <ArticleSection title="小结">
              Dispatcher 是 PyTorch 核心能力的重要支柱，掌握其原理与最佳实践，不仅能帮助我们写出更高效的算子与后端实现，也是在系统层面理解 PyTorch 的重要一步。
            </ArticleSection>
          </article>

          <aside className="space-y-6">
            <div className="card-wood sticky top-28 p-6">
              <h2 className="font-display text-[24px] tracking-[0.12em] text-[var(--color-gold-300)]">目录 TOC</h2>
              <ul className="mt-6 space-y-2 text-[13px] text-[#cfc4a8]">
                {headings.map((h, i) => <li key={h} className={`rounded-md px-3 py-2 ${i === 0 ? "bg-[rgba(156,240,189,.1)] text-[var(--color-firefly-300)]" : ""}`}>{h}</li>)}
              </ul>
            </div>
            <div className="card-wood p-6">
              <h2 className="font-display text-[22px] tracking-[0.12em] text-[var(--color-gold-300)]">文章信息</h2>
              <dl className="mt-5 space-y-4 text-[13px] text-[#cfc4a8]"><div><dt className="text-[#807765]">分类</dt><dd>{post.tags[0]} / 调度器专题</dd></div><div><dt className="text-[#807765]">发布时间</dt><dd>{post.date}</dd></div><div><dt className="text-[#807765]">阅读时长</dt><dd>{post.readTime}</dd></div></dl>
              <Link href="/blog" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[rgba(224,204,136,.35)] px-4 py-3 text-[13px] tracking-[0.14em] text-[var(--color-gold-300)]"><IconArrowLeft width={14} height={14} /> 返回文章列表</Link>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/blog/triton-vs-cuda" className="card-wood flex items-center justify-between p-5 text-[#cfc4a8]"><span><span className="block text-[12px] text-[var(--color-gold-300)]">上一篇</span>Triton 与 CUDA 核心原理整理</span><IconArrowLeft /></Link>
            <Link href="/blog/megatron-parallelism" className="card-wood flex items-center justify-between p-5 text-[#cfc4a8]"><span><span className="block text-[12px] text-[var(--color-gold-300)]">下一篇</span>Megatron 并行机制笔记</span><IconArrowRight /></Link>
          </div>
          <h2 className="mt-10 font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">相关文章</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => <BlogCard key={item.slug} post={item} variant="paper" />)}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mb-5 text-[15px] leading-[1.95] text-[#2f281e]"><h2 className="mb-3 font-display text-[24px] tracking-[0.12em] text-[#2a2117]">{title}</h2>{typeof children === "string" ? <p>{children}</p> : children}</section>;
}

function CodeBlock() {
  return (
    <div className="my-5 overflow-hidden rounded-md border border-[rgba(74,50,29,.45)] bg-[#071714] text-[#cfe8d7] shadow-inner">
      <div className="flex items-center justify-between border-b border-[rgba(224,204,136,.25)] px-4 py-2 text-[12px] text-[var(--color-gold-300)]"><span>dispatcher_call.cpp</span><span className="inline-flex items-center gap-2">C++ {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/assets/lydt/icons/code/icon-code-copy.svg" alt="" aria-hidden className="h-3.5 w-3.5" /></span></div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.8]"><code>{`Tensor my_add(const Tensor& a, const Tensor& b) {
  auto op = Dispatcher::singleton()
    .findSchemaOrThrow("myops::add", "")
    .typed<Tensor (const Tensor&, const Tensor&)>();
  return op.call(a, b);
}`}</code></pre>
    </div>
  );
}
