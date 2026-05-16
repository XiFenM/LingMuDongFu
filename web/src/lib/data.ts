import "server-only";

import { asArray, asString, readMarkdown, splitHeadingSections } from "./markdown";

export const SOCIAL = (() => {
  const doc = readMarkdown("site.md");
  return {
    github: asString(doc.meta.github),
    linkedin: asString(doc.meta.linkedin),
    email: `mailto:${asString(doc.meta.email)}`,
    site: asString(doc.meta.site),
  };
})();

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
  sections: { title: string; body: string }[];
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
  const sections = splitHeadingSections(doc.body);

  return {
    slug: asString(doc.meta.slug, slug),
    title: asString(doc.meta.title),
    excerpt: asString(doc.meta.excerpt, sections[0]?.body ?? doc.body),
    visual: asString(doc.meta.visual) as VisualKind,
    image: asString(doc.meta.image),
    tags: asArray<string>(doc.meta.tags),
    date: asString(doc.meta.date),
    readTime: asString(doc.meta.readTime),
    href: asString(doc.meta.href, `/blog/${slug}`),
    category: asString(doc.meta.category),
    sections,
  };
}

export const PROJECTS: Project[] = projectIds.map(loadProject);
export const POSTS: Post[] = postSlugs.map(loadPost);

export function getProject(id: string) {
  return PROJECTS.find((project) => project.id === id);
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
