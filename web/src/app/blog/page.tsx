import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { FilterTabs } from "@/components/FilterTabs";
import { Pagination } from "@/components/Pagination";
import { BlogCard } from "@/components/BlogCard";
import { POSTS } from "@/lib/data";
import { getBlogPageContent, getSiteContent } from "@/lib/content";
import { IconChevronDown, IconSearch } from "@/components/Icons";

export default function BlogPage() {
  const content = getBlogPageContent();
  const site = getSiteContent();
  const featured = POSTS.slice(0, 2);
  const archive = POSTS.slice(2);

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-blog-branch-library-desktop.png"
          crumbs={[{ label: site.homeLabel, href: "/" }, { label: site.blogLabel }]}
          title={content.title}
          english={content.english}
          description={content.description}
          bannerText={content.bannerText}
          heightClass="min-h-[350px]"
        >
          <label className="relative block max-w-[470px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-gold-300)]"><IconSearch /></span>
            <input className="w-full rounded-full border border-[rgba(192,163,93,.35)] bg-[rgba(7,18,16,.62)] py-4 pl-12 pr-5 text-[14px] text-[var(--color-moon)] outline-none placeholder:text-[#a99d82] focus:border-[rgba(156,240,189,.55)]" placeholder={content.searchPlaceholder} />
          </label>
        </PageHero>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <FilterTabs items={content.categories} active={0} />
            <button type="button" className="inline-flex items-center justify-between gap-8 rounded-md border border-[rgba(192,163,93,.28)] bg-[rgba(7,18,16,.62)] px-5 py-3 text-[13px] tracking-[0.12em] text-[#cfc4a8]">
              {content.sortLabel} <IconChevronDown width={16} height={16} />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="font-display text-[32px] tracking-[0.14em] text-[var(--color-moon)]">{content.featuredTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {featured.map((post) => (
              <BlogCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="font-display text-[32px] tracking-[0.14em] text-[var(--color-moon)]">{content.archiveTitle}</h2>
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
