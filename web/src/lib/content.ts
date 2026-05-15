import "server-only";

import { PROJECTS, POSTS, type Post, type Project } from "./data";
import { asArray, asString, markdownList, readMarkdown, splitHeadingSections } from "./markdown";

type NavItem = { label: string; href: string };
type Action = { label: string; href: string };
export type ContactCardContent = { key: string; label: string; value: string; href: string; icon: string };

function isProject(project: Project | undefined): project is Project {
  return Boolean(project);
}

function isPost(post: Post | undefined): post is Post {
  return Boolean(post);
}

export function getSiteContent() {
  const doc = readMarkdown("site.md");

  return {
    brandName: asString(doc.meta.brandName, "夕丰木"),
    ownerName: asString(doc.meta.ownerName, "沈殷桀"),
    ownerEnglishName: asString(doc.meta.ownerEnglishName, "Yinjie Shen"),
    role: asString(doc.meta.role),
    siteDescription: asString(doc.meta.siteDescription),
    copyrightName: asString(doc.meta.copyrightName, "Yinjie Shen"),
    email: asString(doc.meta.email),
    github: asString(doc.meta.github),
    linkedin: asString(doc.meta.linkedin),
    site: asString(doc.meta.site),
    nav: asArray<NavItem>(doc.meta.nav),
  };
}

export function getHeroContent() {
  const doc = readMarkdown("home/hero.md");

  return {
    name: asString(doc.meta.name, "沈殷桀"),
    englishName: asString(doc.meta.englishName, "Yinjie Shen"),
    role: asString(doc.meta.role),
    body: doc.body,
    tags: asArray<string>(doc.meta.tags),
    actions: asArray<Action>(doc.meta.actions),
    hangingText: asString(doc.meta.hangingText),
    hangingSub: asString(doc.meta.hangingSub),
  };
}

export function getAboutContent() {
  const doc = readMarkdown("home/about_me.md");

  return {
    title: asString(doc.meta.title, "关于我"),
    sub: asString(doc.meta.sub, "About Me"),
    cards: splitHeadingSections(doc.body),
  };
}

export function getSkillsContent() {
  const doc = readMarkdown("home/skills_tree.md");

  return {
    title: asString(doc.meta.title, "技能树"),
    sub: asString(doc.meta.sub, "Skills Tree"),
    branches: splitHeadingSections(doc.body).map((section) => {
      const accent = section.body.match(/^accent:\s*(\w+)/m)?.[1] ?? "gold";
      return {
        branch: section.title,
        accent,
        items: markdownList(section.body),
      };
    }),
  };
}

export function getFeaturedProjectsContent() {
  const doc = readMarkdown("home/featured_projects.md");
  const ids = asArray<string>(doc.meta.featuredIds);

  return {
    title: asString(doc.meta.title, "精选项目"),
    sub: asString(doc.meta.sub, "Featured Projects"),
    actionLabel: asString(doc.meta.actionLabel, "查看全部"),
    actionHref: asString(doc.meta.actionHref, "/projects"),
    projects: ids.map((id) => PROJECTS.find((project) => project.id === id)).filter(isProject),
  };
}

export function getLatestNotesContent() {
  const doc = readMarkdown("home/latest_notes.md");
  const slugs = asArray<string>(doc.meta.latestSlugs);

  return {
    title: asString(doc.meta.title, "技术札记"),
    sub: asString(doc.meta.sub, "Recent Notes"),
    actionLabel: asString(doc.meta.actionLabel, "前往藏书枝阁"),
    actionHref: asString(doc.meta.actionHref, "/blog"),
    posts: slugs.map((slug) => POSTS.find((post) => post.slug === slug)).filter(isPost),
  };
}

export function getTimelineContent() {
  const doc = readMarkdown("home/timeline.md");

  return {
    title: asString(doc.meta.title, "年轮时间线"),
    sub: asString(doc.meta.sub, "Timeline"),
    items: splitHeadingSections(doc.body).map((section) => {
      const [year, ...titleParts] = section.title.split(/\s+/);
      return {
        year: Number(year),
        title: titleParts.join(" "),
        note: section.body,
      };
    }),
  };
}

export function getContactContent() {
  const doc = readMarkdown("home/contact.md");

  return {
    title: asString(doc.meta.title, "月窗茶室"),
    sub: asString(doc.meta.sub, "Get In Touch"),
    description: doc.body,
    cards: asArray<ContactCardContent>(doc.meta.cards),
  };
}
