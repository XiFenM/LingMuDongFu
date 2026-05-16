import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { BlogCard } from "@/components/BlogCard";
import { POSTS, getPost } from "@/lib/data";
import { getBlogDetailContent } from "@/lib/content";
import { IconArrowLeft, IconArrowRight, IconCalendar, IconClock, IconUser } from "@/components/Icons";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const content = getBlogDetailContent();
  const currentIndex = POSTS.findIndex((item) => item.slug === post.slug);
  const previous = currentIndex > 0 ? POSTS[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < POSTS.length - 1 ? POSTS[currentIndex + 1] : null;
  const related = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const headings = post.sections.map((section) => section.title);

  return (
    <>
      <Header />
      <main>
        <PageHero
          background="/assets/lydt/bg/bg-blog-detail-study-desktop.png"
          crumbs={[{ label: content.blogCrumbLabel, href: "/blog" }, { label: post.tags[0] ?? post.category }, { label: post.category }]}
          title={post.title}
          description={post.excerpt}
          bannerText={content.bannerText}
          heightClass="min-h-[390px]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="tag-jade"><IconCalendar width={13} height={13} /> {post.date}</span>
            <span className="tag-jade"><IconClock width={13} height={13} /> {post.readTime}</span>
            {post.tags.map((tag) => <span key={tag} className="tag-jade">{tag}</span>)}
          </div>
          <div className="mt-6 flex items-center gap-3 text-[#cfc4a8]">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(224,204,136,.35)] text-[var(--color-gold-300)]"><IconUser width={18} height={18} /></span>
            <span className="font-display tracking-[0.12em]">{content.authorLabel}</span>
          </div>
        </PageHero>

        <section className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 lg:grid-cols-[1fr_290px]">
          <article className="card-paper p-6 md:p-8">
            {post.sections.map((section) => (
              <ArticleSection key={section.title} title={section.title}>
                <MarkdownBlocks source={section.body} codeLanguageLabel={content.codeLanguageLabel} />
              </ArticleSection>
            ))}
          </article>

          <aside className="space-y-6">
            <div className="card-wood sticky top-28 p-6">
              <h2 className="font-display text-[24px] tracking-[0.12em] text-[var(--color-gold-300)]">{content.tocTitle}</h2>
              <ul className="mt-6 space-y-2 text-[13px] text-[#cfc4a8]">
                {headings.map((h, i) => <li key={h} className={`rounded-md px-3 py-2 ${i === 0 ? "bg-[rgba(156,240,189,.1)] text-[var(--color-firefly-300)]" : ""}`}>{h}</li>)}
              </ul>
            </div>
            <div className="card-wood p-6">
              <h2 className="font-display text-[22px] tracking-[0.12em] text-[var(--color-gold-300)]">{content.infoTitle}</h2>
              <dl className="mt-5 space-y-4 text-[13px] text-[#cfc4a8]"><div><dt className="text-[#807765]">{content.categoryLabel}</dt><dd>{post.category} / {post.tags[0]}</dd></div><div><dt className="text-[#807765]">{content.publishedLabel}</dt><dd>{post.date}</dd></div><div><dt className="text-[#807765]">{content.readTimeLabel}</dt><dd>{post.readTime}</dd></div></dl>
              <Link href="/blog" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[rgba(224,204,136,.35)] px-4 py-3 text-[13px] tracking-[0.14em] text-[var(--color-gold-300)]"><IconArrowLeft width={14} height={14} /> {content.backLabel}</Link>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-8">
          <div className="grid gap-4 md:grid-cols-2">
            {previous ? <Link href={previous.href} className="card-wood flex items-center justify-between p-5 text-[#cfc4a8]"><span><span className="block text-[12px] text-[var(--color-gold-300)]">{content.previousLabel}</span>{previous.title}</span><IconArrowLeft /></Link> : <div />}
            {next ? <Link href={next.href} className="card-wood flex items-center justify-between p-5 text-[#cfc4a8]"><span><span className="block text-[12px] text-[var(--color-gold-300)]">{content.nextLabel}</span>{next.title}</span><IconArrowRight /></Link> : <div />}
          </div>
          <h2 className="mt-10 font-display text-[28px] tracking-[0.14em] text-[var(--color-moon)]">{content.relatedTitle}</h2>
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

function MarkdownBlocks({ source, codeLanguageLabel }: { source: string; codeLanguageLabel: string }) {
  const lines = source.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || codeLanguageLabel;
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(<CodeBlock key={`code-${blocks.length}`} language={language} code={code.join("\n")} />);
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${blocks.length}`} className="my-5 rounded-md border border-[rgba(74,50,29,.36)] bg-[rgba(255,255,255,.22)] p-5 font-display text-[17px] leading-[1.8] text-[#5d4a2c]">{renderInline(quote.join(" "))}</blockquote>);
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(<ul key={`list-${blocks.length}`} className="my-3 list-disc space-y-2 pl-6">{items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ul>);
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.includes("---")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const current = lines[index].trim();
        if (!/^\|\s*:?-{3,}/.test(current)) {
          rows.push(current.split("|").slice(1, -1).map((cell) => cell.trim()));
        }
        index += 1;
      }
      const [head, ...body] = rows;
      blocks.push(
        <table key={`table-${blocks.length}`} className="my-4 w-full text-left text-[13px]">
          <thead className="bg-[rgba(74,50,29,.16)]"><tr>{head.map((cell) => <th key={cell} className="px-3 py-2">{renderInline(cell)}</th>)}</tr></thead>
          <tbody>{body.map((row) => <tr key={row.join("-")} className="border-t border-[rgba(74,50,29,.2)]">{row.map((cell) => <td key={cell} className="px-3 py-2">{renderInline(cell)}</td>)}</tr>)}</tbody>
        </table>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !/^(```|>|- |\|)/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={`p-${blocks.length}`} className="my-3">{renderInline(paragraph.join(" "))}</p>);
  }

  return <>{blocks}</>;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="my-5 overflow-hidden rounded-md border border-[rgba(74,50,29,.45)] bg-[#071714] text-[#cfe8d7] shadow-inner">
      <div className="flex items-center justify-between border-b border-[rgba(224,204,136,.25)] px-4 py-2 text-[12px] text-[var(--color-gold-300)]"><span>article-snippet</span><span className="inline-flex items-center gap-2">{language} {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/assets/lydt/icons/code/icon-code-copy.svg" alt="" aria-hidden className="h-3.5 w-3.5" /></span></div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.8]"><code>{code}</code></pre>
    </div>
  );
}

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<code key={`${token}-${match.index}`} className="rounded bg-[rgba(74,50,29,.14)] px-1 py-0.5 font-mono text-[13px]">{token.slice(1, -1)}</code>);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
