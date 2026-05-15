import "server-only";

import { asArray, asString, readMarkdown, splitHeadingSections } from "./markdown";

export const SITE = (() => {
  const doc = readMarkdown("site.md");
  return {
    name: asString(doc.meta.brandName, "夕丰木"),
    brand: asString(doc.meta.brandName, "夕丰木"),
    fullName: `${asString(doc.meta.ownerName, "沈殷桀")} / ${asString(doc.meta.ownerEnglishName, "Yinjie Shen")}`,
    role: asString(doc.meta.role),
    tagline: ["PyTorch Internals", "CUDA", "Distributed Training"],
    about: asString(doc.meta.siteDescription),
    hangingSignText: "夕木成林·向深处扎根",
    hangingSignSub: "风过留纹，木长成林",
  };
})();

export const NAV = asArray<{ label: string; href: string }>(readMarkdown("site.md").meta.nav);

export const SOCIAL = (() => {
  const doc = readMarkdown("site.md");
  return {
    github: asString(doc.meta.github),
    linkedin: asString(doc.meta.linkedin),
    email: `mailto:${asString(doc.meta.email)}`,
    site: asString(doc.meta.site),
  };
})();

export type SkillAccent = "firefly" | "gold" | "jade";

export const SKILLS = splitHeadingSections(readMarkdown("home/skills_tree.md").body).map((section) => ({
  branch: section.title,
  items: section.body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim()),
  accent: (section.body.match(/^accent:\s*(\w+)/m)?.[1] ?? "gold") as SkillAccent,
}));

export type VisualKind =
  | "tree"
  | "cube"
  | "vortex"
  | "lantern"
  | "network"
  | "bonsai"
  | "scroll"
  | "route"
  | "waves"
  | "steps"
  | "gates"
  | "pages";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  visual: VisualKind;
  image: string;
  tags: string[];
  summary: string;
  date: string;
  stars: string;
  views: string;
  readTime: string;
  href: string;
  sourceHref: string;
  demoHref: string;
  sections: { title: string; body: string }[];
  features: { title: string; desc: string }[];
  metrics: { label: string; value: string; note: string }[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  visual: VisualKind;
  image: string;
  tags: string[];
  date: string;
  readTime: string;
  href: string;
  category: string;
};

const projectIds = [
  "megatron-parallel",
  "cuda-softmax",
  "pytorch-collective",
  "llm-inference",
  "distributed-training",
  "pytorch-dispatcher",
];

const postSlugs = [
  "triton-vs-cuda",
  "pytorch-dispatcher",
  "megatron-parallelism",
  "allreduce-kernel",
  "processgroup-nccl",
  "softmax-kernel-optimization",
  "torch-compile-fx",
  "zero-allgather",
];

function loadProject(id: string): Project {
  const doc = readMarkdown(`projects/${id}.md`);
  return {
    id: asString(doc.meta.id, id),
    title: asString(doc.meta.title),
    subtitle: asString(doc.meta.subtitle),
    category: asString(doc.meta.category),
    visual: asString(doc.meta.visual) as VisualKind,
    image: asString(doc.meta.image),
    tags: asArray<string>(doc.meta.tags),
    summary: asString(doc.meta.summary),
    date: asString(doc.meta.date),
    stars: asString(doc.meta.stars),
    views: asString(doc.meta.views),
    readTime: asString(doc.meta.readTime),
    href: asString(doc.meta.href, `/projects/${id}`),
    sourceHref: asString(doc.meta.sourceHref, SOCIAL.github),
    demoHref: asString(doc.meta.demoHref),
    sections: splitHeadingSections(doc.body),
    features: asArray<{ title: string; desc: string }>(doc.meta.features),
    metrics: asArray<{ label: string; value: string; note: string }>(doc.meta.metrics),
  };
}

function loadPost(slug: string): Post {
  const doc = readMarkdown(`posts/${slug}.md`);
  return {
    slug: asString(doc.meta.slug, slug),
    title: asString(doc.meta.title),
    excerpt: doc.body,
    visual: asString(doc.meta.visual) as VisualKind,
    image: asString(doc.meta.image),
    tags: asArray<string>(doc.meta.tags),
    date: asString(doc.meta.date),
    readTime: asString(doc.meta.readTime),
    href: asString(doc.meta.href, `/blog/${slug}`),
    category: asString(doc.meta.category),
  };
}

export const PROJECTS: Project[] = projectIds.map(loadProject);
export const POSTS: Post[] = postSlugs.map(loadPost);

export const BLOG_CATEGORIES = ["全部", "CUDA", "PyTorch", "Distributed", "AI Framework", "LLM", "Engineering", "Notes"];
export const PROJECT_CATEGORIES = ["全部项目", "AI / 深度学习", "系统优化", "GPU / 内核", "分布式系统", "工具 / 框架", "研究 / 探索"];

export const FEATURED_PROJECTS = PROJECTS.slice(1, 4);
export const LATEST_POSTS = POSTS.slice(0, 3);

export const TIMELINE = splitHeadingSections(readMarkdown("home/timeline.md").body).map((section) => {
  const [year, ...titleParts] = section.title.split(/\s+/);
  return { year: Number(year), title: titleParts.join(" "), note: section.body };
});

export const CONTACT_CARDS = asArray<{ key: string; label: string; value: string; href: string; icon: string }>(readMarkdown("home/contact.md").meta.cards);

export const EXPERIENCE = [
  {
    period: "2023.07 — 至今",
    title: "AI Framework Engineer",
    company: "Megatron 团队 / DeepSpeed 社区",
    tags: ["PyTorch", "Distributed", "CUDA"],
    bullets: [
      "参与 Megatron-LM 与 DeepSpeed 并行策略与调度系统的设计与实现。",
      "优化大规模训练的通信效率与显存利用率，支持千卡级别模型训练。",
      "构建自动化性能分析与瓶颈诊断工具链，提升训练稳定性与可观测性。",
    ],
  },
  {
    period: "2022.06 — 2023.06",
    title: "高性能计算研发工程师",
    company: "某 AI 基础设施公司",
    tags: ["GPU", "Performance", "C++"],
    bullets: [
      "负责 GPU 计算内核优化与推理加速，提升模型推理吞吐与延迟。",
      "参与自研推理框架设计与实现，支持多模型异构后端。",
      "构建性能基准测试体系与自动化回归检测工具。",
    ],
  },
  {
    period: "2021.03 — 2022.06",
    title: "算法工程实习生",
    company: "某研究机构",
    tags: ["Research", "PyTorch", "System"],
    bullets: [
      "参与大规模模型训练与分布式系统相关研究。",
      "实现数据并行与模型并行在训练框架中的高效集成。",
      "撰写技术文档与内部技术分享，沉淀最佳实践。",
    ],
  },
];

export const HONORS = [
  "Top Coder LeetCode Top 1%",
  "ACM ICPC Regional Bronze Medal",
  "国家奖学金 2019, 2020",
  "上海交通大学优秀毕业生 2022",
  "NVIDIA Deep Learning Institute",
];

export function getProject(id: string) {
  return PROJECTS.find((project) => project.id === id);
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
