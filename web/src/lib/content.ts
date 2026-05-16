import "server-only";

import { PROJECTS, POSTS, type Post, type Project } from "./data";
import { asArray, asString, markdownList, readMarkdown, splitHeadingSections } from "./markdown";

type NavItem = { label: string; href: string };
type Action = { label: string; href: string };
export type ContactCardContent = { key: string; label: string; value: string; href: string; icon: string };
export type PageAction = { label: string; href: string; icon?: string };
export type ResumeSkill = { label: string; value: string };
export type ResumeExperience = { period: string; title: string; company: string; tags: string[]; bullets: string[] };
export type ResumeHonor = { label: string; icon: string };
export type ResumeProfileItem = { label: string; value: string };
export type MetricHeader = [string, string, string];

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
    metadataTitle: asString(doc.meta.metadataTitle, `${asString(doc.meta.brandName, "夕丰木")} — ${asString(doc.meta.ownerEnglishName, "Yinjie Shen")}`),
    metadataDescription: asString(doc.meta.metadataDescription, asString(doc.meta.siteDescription)),
    homeLabel: asString(doc.meta.homeLabel, "首页"),
    projectsLabel: asString(doc.meta.projectsLabel, "项目"),
    blogLabel: asString(doc.meta.blogLabel, "博客"),
    resumeLabel: asString(doc.meta.resumeLabel, "简历"),
    footerCopyright: asString(doc.meta.footerCopyright, `© 2026 ${asString(doc.meta.copyrightName, "Yinjie Shen")}. All rights reserved.`),
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
    indexLabels: asArray<string>(doc.meta.indexLabels),
    detailLabel: asString(doc.meta.detailLabel, "详情"),
    sourceLabel: asString(doc.meta.sourceLabel, "GitHub"),
    projects: ids.map((id) => PROJECTS.find((project) => project.id === id)).filter(isProject),
  };
}

export function getUiContent() {
  const doc = readMarkdown("ui.md");

  return {
    projectCardDetailLabel: asString(doc.meta.projectCardDetailLabel, "详情"),
    projectCardSourceLabel: asString(doc.meta.projectCardSourceLabel, "GitHub"),
    blogCardReadMoreLabel: asString(doc.meta.blogCardReadMoreLabel, "阅读全文"),
    featuredProjectIndexLabels: asArray<string>(doc.meta.featuredProjectIndexLabels),
    paginationAriaLabel: asString(doc.meta.paginationAriaLabel, "分页"),
    paginationNextLabel: asString(doc.meta.paginationNextLabel, "下一页"),
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

export function getProjectsPageContent() {
  const doc = readMarkdown("pages/projects.md");

  return {
    title: asString(doc.meta.title, "项目集"),
    english: asString(doc.meta.english, "PROJECTS"),
    description: asArray<string>(doc.meta.descriptionLines).join("\n") || doc.body,
    bannerText: asString(doc.meta.bannerText),
    searchPlaceholder: asString(doc.meta.searchPlaceholder, "搜索项目名称、技术栈或关键词..."),
    sortLabel: asString(doc.meta.sortLabel, "排序：最新发布"),
    viewLabel: asString(doc.meta.viewLabel, "视图："),
    categories: asArray<string>(doc.meta.categories),
    ctaTitle: asString(doc.meta.ctaTitle),
    ctaBody: asString(doc.meta.ctaBody),
    ctaActions: asArray<PageAction>(doc.meta.ctaActions),
  };
}

export function getBlogPageContent() {
  const doc = readMarkdown("pages/blog.md");

  return {
    title: asString(doc.meta.title, "藏书枝阁"),
    english: asString(doc.meta.english, "BLOG"),
    description: asString(doc.meta.description, doc.body),
    bannerText: asString(doc.meta.bannerText),
    searchPlaceholder: asString(doc.meta.searchPlaceholder, "搜索文章、标签或关键词"),
    sortLabel: asString(doc.meta.sortLabel, "最新发布"),
    categories: asArray<string>(doc.meta.categories),
    featuredTitle: asString(doc.meta.featuredTitle, "精选卷宗"),
    archiveTitle: asString(doc.meta.archiveTitle, "全部文章"),
  };
}

export function getBlogDetailContent() {
  const doc = readMarkdown("pages/blog_detail.md");

  return {
    blogCrumbLabel: asString(doc.meta.blogCrumbLabel, "博客"),
    bannerText: asString(doc.meta.bannerText),
    tocTitle: asString(doc.meta.tocTitle, "目录 TOC"),
    infoTitle: asString(doc.meta.infoTitle, "文章信息"),
    categoryLabel: asString(doc.meta.categoryLabel, "分类"),
    publishedLabel: asString(doc.meta.publishedLabel, "发布时间"),
    readTimeLabel: asString(doc.meta.readTimeLabel, "阅读时长"),
    backLabel: asString(doc.meta.backLabel, "返回文章列表"),
    previousLabel: asString(doc.meta.previousLabel, "上一篇"),
    nextLabel: asString(doc.meta.nextLabel, "下一篇"),
    relatedTitle: asString(doc.meta.relatedTitle, "相关文章"),
    authorLabel: asString(doc.meta.authorLabel),
    codeLanguageLabel: asString(doc.meta.codeLanguageLabel, "Code"),
  };
}

export function getProjectDetailContent() {
  const doc = readMarkdown("pages/project_detail.md");
  const statLabels = doc.meta.statLabels as Record<string, string> | undefined;
  const metricHeaders = asArray<string>(doc.meta.metricsHeaders, ["指标", "结果", "说明"]);

  return {
    homeCrumbLabel: asString(doc.meta.homeCrumbLabel, "首页"),
    projectsCrumbLabel: asString(doc.meta.projectsCrumbLabel, "项目"),
    bannerText: asString(doc.meta.bannerText),
    sourceLabel: asString(doc.meta.sourceLabel, "查看源码"),
    demoLabel: asString(doc.meta.demoLabel, "在线阅读"),
    statLabels: {
      updated: asString(statLabels?.updated, "最后更新"),
      readTime: asString(statLabels?.readTime, "阅读时长"),
      stars: asString(statLabels?.stars, "Star"),
      language: asString(statLabels?.language, "语言"),
    },
    languageValue: asString(doc.meta.languageValue, "Python / CUDA"),
    tocTitle: asString(doc.meta.tocTitle, "目录"),
    overviewTitle: asString(doc.meta.overviewTitle, "项目概览"),
    featuresTitle: asString(doc.meta.featuresTitle, "核心特性"),
    metricsTitle: asString(doc.meta.metricsTitle, "性能示例"),
    metricsHeaders: [
      metricHeaders[0] ?? "指标",
      metricHeaders[1] ?? "结果",
      metricHeaders[2] ?? "说明",
    ] as MetricHeader,
    diagramAlt: asString(doc.meta.diagramAlt, "Triton 与 CUDA 技术图示"),
    diagramLeftLabel: asString(doc.meta.diagramLeftLabel),
    diagramRightLabel: asString(doc.meta.diagramRightLabel),
    diagramFooter: asString(doc.meta.diagramFooter),
    infoTitle: asString(doc.meta.infoTitle, "项目信息"),
    categoryLabel: asString(doc.meta.categoryLabel, "项目类型"),
    licenseLabel: asString(doc.meta.licenseLabel, "开源协议"),
    licenseValue: asString(doc.meta.licenseValue, "MIT License"),
    createdLabel: asString(doc.meta.createdLabel, "创建时间"),
    repositoryLabel: asString(doc.meta.repositoryLabel, "仓库地址"),
    repositoryBase: asString(doc.meta.repositoryBase, "github.com/yinjie-shen"),
    relatedTitle: asString(doc.meta.relatedTitle, "相关项目"),
    relatedMoreLabel: asString(doc.meta.relatedMoreLabel, "查看更多项目"),
    ctaKicker: asString(doc.meta.ctaKicker),
    ctaTitle: asString(doc.meta.ctaTitle),
    ctaBody: asString(doc.meta.ctaBody),
    ctaPrimaryLabel: asString(doc.meta.ctaPrimaryLabel, "返回项目集"),
    ctaSecondaryLabel: asString(doc.meta.ctaSecondaryLabel, "阅读相关笔记"),
  };
}

export function getResumePageContent() {
  const doc = readMarkdown("pages/resume.md");
  const featuredIds = asArray<string>(doc.meta.featuredProjectIds);

  return {
    title: asString(doc.meta.title, "我的简历"),
    english: asString(doc.meta.english, "RESUME"),
    description: asArray<string>(doc.meta.descriptionLines).join("\n") || doc.body,
    bannerText: asString(doc.meta.bannerText),
    actions: asArray<PageAction>(doc.meta.actions),
    profileItems: asArray<ResumeProfileItem>(doc.meta.profileItems),
    skillsTitle: asString(doc.meta.skillsTitle, "核心技能概览"),
    skillLevels: asArray<ResumeSkill>(doc.meta.skillLevels),
    educationTitle: asString(doc.meta.educationTitle, "教育背景"),
    education: doc.meta.education as { school?: string; major?: string; period?: string } | undefined,
    experienceTitle: asString(doc.meta.experienceTitle, "工作经历"),
    experience: asArray<ResumeExperience>(doc.meta.experience),
    featuredProjectsTitle: asString(doc.meta.featuredProjectsTitle, "代表项目"),
    featuredProjectsActionLabel: asString(doc.meta.featuredProjectsActionLabel, "查看全部项目 →"),
    featuredProjects: featuredIds.map((id) => PROJECTS.find((project) => project.id === id)).filter(isProject),
    honorsTitle: asString(doc.meta.honorsTitle, "荣誉与证明"),
    honors: asArray<ResumeHonor>(doc.meta.honors),
    ctaTitle: asString(doc.meta.ctaTitle),
    ctaBody: asString(doc.meta.ctaBody),
    ctaLabel: asString(doc.meta.ctaLabel, "联系我"),
    ctaHref: asString(doc.meta.ctaHref),
  };
}

export function getNotFoundContent() {
  const doc = readMarkdown("pages/not_found.md");

  return {
    title: asString(doc.meta.title, "404"),
    description: asArray<string>(doc.meta.descriptionLines).join("\n") || doc.body,
    bannerText: asString(doc.meta.bannerText),
    actions: asArray<PageAction>(doc.meta.actions),
    tipTab: asString(doc.meta.tipTab, "小提示"),
    tipTitle: asString(doc.meta.tipTitle),
    tipBody: asString(doc.meta.tipBody),
    sceneTitle: asString(doc.meta.sceneTitle),
    sceneBody: asString(doc.meta.sceneBody),
  };
}
