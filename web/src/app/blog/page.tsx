import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { FilterTabs } from "@/components/FilterTabs";
import { Pagination } from "@/components/Pagination";
import { BlogCard } from "@/components/BlogCard";
import { BLOG_CATEGORIES, POSTS } from "@/lib/data";
import { IconChevronDown, IconSearch } from "@/components/Icons";

export default function BlogPage() {
  const featured = POSTS.slice(0, 2);
  const archive = POSTS.slice(2);

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-blog-branch-library-desktop.png"
          crumbs={[{ label: "首页", href: "/" }, { label: "博客" }]}
          title="藏书枝阁"
          description="收录技术文章、学习札记与工程复盘"
          bannerText="夕木成林·枝上藏书"
          heightClass="min-h-[350px]"
        >
          <label className="relative block max-w-[470px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-300)]"><IconSearch /></span>
            <input className="w-full rounded-full border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.62)] py-4 pl-12 pr-5 text-[14px] text-[var(--color-moon)] outline-none placeholder:text-[#a99d82] focus:border-[rgba(156,240,189,.55)]" placeholder="搜索文章、标签或关键词" />
          </label>
        </PageHero>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <FilterTabs items={BLOG_CATEGORIES} active={0} />
            <button type="button" className="inline-flex items-center justify-between gap-8 rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] px-5 py-3 text-[13px] tracking-[0.12em] text-[#cfc4a8]">
              最新发布 <IconChevronDown width={16} height={16} />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="font-display text-[32px] tracking-[0.14em] text-[var(--color-moon)]">精选卷宗</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featured.map((post) => (
              <BlogCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="font-display text-[32px] tracking-[0.14em] text-[var(--color-moon)]">全部文章</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {archive.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination />
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
