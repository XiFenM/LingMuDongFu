export const SITE = {
  name: "灵木洞天",
  brand: "LYDT",
  fullName: "沈寅杰 / Yinjie Shen",
  role: "AI Framework Engineer · GPU Computing · Distributed Systems",
  tagline: ["PyTorch Internals", "CUDA", "Distributed Training"],
  about:
    "热爱 AI 基础设施、GPU 计算与分布式系统。喜欢在复杂系统中寻找优雅、清晰、可复现的实现路径。",
  hangingSignText: "灵木天职·洞天自有灵",
  hangingSignSub: "洞中无甲子，寒尽不知年",
};

export const NAV = [
  { label: "首页", href: "/" },
  { label: "关于", href: "/#about" },
  { label: "技能", href: "/#skills" },
  { label: "项目", href: "/projects" },
  { label: "博客", href: "/blog" },
  { label: "联系", href: "/#contact" },
];

export const SOCIAL = {
  github: "https://github.com/XiFenM",
  linkedin: "https://www.linkedin.com/in/yinjie-shen",
  email: "mailto:yinjie.shen@example.com",
  site: "yinjie-shen.com",
};

export const SKILLS = [
  {
    branch: "AI Frameworks",
    items: ["PyTorch", "Megatron", "JAX", "TensorFlow", "Triton", "ONNX"],
    accent: "firefly",
  },
  {
    branch: "CUDA / GPU Computing",
    items: ["CUDA", "cuBLAS", "cuDNN", "Kernel Tuning", "NCCL", "GPUDirect"],
    accent: "gold",
  },
  {
    branch: "LLM Systems",
    items: ["Tokenization", "KV Cache", "Inference Optimization", "Quantization"],
    accent: "jade",
  },
  {
    branch: "PyTorch Internals",
    items: ["Dispatcher", "ATen", "Autograd", "Memory Model", "Torch.compile"],
    accent: "firefly",
  },
  {
    branch: "Distributed Training",
    items: ["DDP", "FSDP", "ZeRO", "Parallelism", "Collective Comm."],
    accent: "gold",
  },
  {
    branch: "Backend / Tooling",
    items: ["Linux", "gRPC", "Protobuf", "Docker", "C/C++"],
    accent: "jade",
  },
];

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

export const PROJECTS: Project[] = [
  {
    id: "megatron-parallel",
    title: "Megatron 并行机制笔记",
    subtitle: "系统梳理 Megatron 与 DeepSpeed 并行策略的工程边界。",
    category: "AI / 深度学习",
    visual: "tree",
    image: "/assets/lydt/thumbnails/projects/project-megatron-parallel.png",
    tags: ["PyTorch", "Megatron", "DeepSpeed"],
    summary: "系统性梳理 Megatron 及 DeepSpeed 并行策略与实现细节，结合源码与公式，形成可复用笔记。",
    date: "2025-02-12",
    stars: "1.9k",
    views: "115",
    readTime: "35 min",
    href: "/projects/megatron-parallel",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/megatron-parallelism",
    sections: [
      { title: "项目概览", body: "围绕 Tensor Parallel、Pipeline Parallel 与 Sequence Parallel，拆解模型切分、通信调度与 bubble 形成机制。" },
      { title: "背景与动机", body: "当模型规模超过单卡容量后，训练性能不再只取决于算子速度，而取决于通信、显存与调度之间的整体平衡。" },
      { title: "核心特性", body: "提供并行策略对照、通信路径图、典型配置建议与故障排查清单，便于后续工程复盘。" },
    ],
    features: [
      { title: "并行地图", desc: "TP / PP / SP 边界一图对齐。" },
      { title: "通信复盘", desc: "记录 Collective 与 overlap 代价。" },
      { title: "工程可用", desc: "配置、指标、排查路径可复用。" },
    ],
    metrics: [
      { label: "训练卡数", value: "128", note: "H100 集群" },
      { label: "并行策略", value: "3", note: "TP / PP / SP" },
      { label: "复盘条目", value: "42", note: "工程笔记" },
    ],
  },
  {
    id: "cuda-softmax",
    title: "CUDA Softmax Kernel",
    subtitle: "从 Triton 与 CUDA 视角拆解 GPU 编程、内核优化与算子实现。",
    category: "GPU / 内核",
    visual: "cube",
    image: "/assets/lydt/thumbnails/projects/project-cuda-softmax.png",
    tags: ["CUDA", "Kernel", "Performance"],
    summary: "基于 warp-level 优化的高性能 Softmax Kernel 实现，支持 FP32/FP16 混合精度加速。",
    date: "2024-11-28",
    stars: "2.8k",
    views: "12k",
    readTime: "40 min",
    href: "/projects/cuda-softmax",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/triton-vs-cuda",
    sections: [
      { title: "项目概览", body: "该项目系统梳理 Triton 与 CUDA 的核心概念、编程模型、内存层次、并行执行、性能优化方法与常见高性能算子实现方式。" },
      { title: "背景与动机", body: "在深度学习与科学计算领域，GPU 已经成为性能核心。项目通过从零实现 Softmax，观察访存、规约与数值稳定性如何共同决定吞吐。" },
      { title: "核心特性", body: "包含 shared memory 缓存、warp-level reduction、向量化访存、在线归并与性能基线对照。" },
    ],
    features: [
      { title: "系统化梳理", desc: "从基础概念到高阶优化。" },
      { title: "大量示例", desc: "提供可复现源码与注释。" },
      { title: "性能导向", desc: "用指标驱动优化路径。" },
      { title: "工程可用", desc: "结构清晰，便于迁移。" },
    ],
    metrics: [
      { label: "PyTorch FP32", value: "43.21ms", note: "1.00x" },
      { label: "Triton FP32", value: "18.76ms", note: "2.30x" },
      { label: "CUDA FP32", value: "13.42ms", note: "3.21x" },
    ],
  },
  {
    id: "pytorch-collective",
    title: "PyTorch Custom Collective",
    subtitle: "实现高性能自定义通信算子，支持 AllReduce / ReduceScatter 场景。",
    category: "AI / 深度学习",
    visual: "vortex",
    image: "/assets/lydt/thumbnails/projects/project-pytorch-collective.png",
    tags: ["PyTorch", "Distributed", "NCCL"],
    summary: "实现高性能自定义通信算子，支持 AllReduce / ReduceScatter 等分布式集合通信场景。",
    date: "2024-10-08",
    stars: "2.1k",
    views: "993",
    readTime: "28 min",
    href: "/projects/pytorch-collective",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/allreduce-kernel",
    sections: [
      { title: "项目概览", body: "围绕 PyTorch 分布式后端，构建自定义 Collective 的注册、调度、通信与 profile 流程。" },
      { title: "背景与动机", body: "训练瓶颈常常隐藏在梯度通信中，需要在框架层观察通信何时发生、如何与计算重叠。" },
      { title: "核心特性", body: "打通 ProcessGroup、NCCL stream、bucket 化梯度与异步 work handle。" },
    ],
    features: [
      { title: "通信路径", desc: "清晰映射前后端调用链。" },
      { title: "异步重叠", desc: "观察计算与通信调度。" },
      { title: "Profile", desc: "从 trace 定位吞吐瓶颈。" },
    ],
    metrics: [
      { label: "吞吐提升", value: "+18%", note: "端到端" },
      { label: "通信原语", value: "4", note: "Collective" },
      { label: "追踪指标", value: "12", note: "Profile" },
    ],
  },
  {
    id: "llm-inference",
    title: "LLM Inference 优化实践",
    subtitle: "从 Tokenization 到 KV Cache，压缩推理延迟。",
    category: "系统优化",
    visual: "lantern",
    image: "/assets/lydt/thumbnails/projects/project-llm-inference.png",
    tags: ["Inference", "Optimization", "KV Cache"],
    summary: "从 Tokenization 到 KV Cache，再到推理优化，记录一系列工程优化实践与方案对比。",
    date: "2024-07-21",
    stars: "1.6k",
    views: "6.3k",
    readTime: "31 min",
    href: "/projects/llm-inference",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/kv-cache-inference",
    sections: [
      { title: "项目概览", body: "梳理大模型推理链路中的延迟来源，并围绕 KV Cache、batching 与内存复用做实验。" },
      { title: "背景与动机", body: "推理服务的真实瓶颈往往随负载形态变化，需要同时关注首 token 延迟、吞吐、显存与尾延迟。" },
      { title: "核心特性", body: "包含请求调度、缓存复用、分层指标面板与优化前后对比。" },
    ],
    features: [
      { title: "延迟拆解", desc: "TTFT 与 TPOT 分开观察。" },
      { title: "缓存策略", desc: "KV Cache 生命周期管理。" },
      { title: "服务视角", desc: "兼顾稳定性与吞吐。" },
    ],
    metrics: [
      { label: "TTFT", value: "-32%", note: "优化后" },
      { label: "吞吐", value: "+24%", note: "batching" },
      { label: "显存", value: "-18%", note: "缓存复用" },
    ],
  },
  {
    id: "distributed-training",
    title: "Distributed Training 工程实践",
    subtitle: "训练前后端的系统化工程落地记录。",
    category: "分布式系统",
    visual: "network",
    image: "/assets/lydt/thumbnails/projects/project-distributed-training.png",
    tags: ["DDP", "FSDP", "ZeRO"],
    summary: "大规模分布式训练的系统设计与落地，包括调度、监控、容错与性能分析工具链。",
    date: "2024-05-14",
    stars: "2.3k",
    views: "7.8k",
    readTime: "38 min",
    href: "/projects/distributed-training",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/processgroup-nccl",
    sections: [
      { title: "项目概览", body: "把 DDP、FSDP、ZeRO 等训练策略放到真实工程链路中观察，包含调度、监控、容错与数据面。" },
      { title: "背景与动机", body: "大规模训练不只关心算法，还关心失败恢复、资源利用率、日志可观测性与可复现的 benchmark。" },
      { title: "核心特性", body: "形成从启动脚本到通信 profile，再到异常定位的全链路文档与工具。" },
    ],
    features: [
      { title: "容错", desc: "节点异常下的恢复策略。" },
      { title: "监控", desc: "显存、吞吐、通信统一看板。" },
      { title: "调度", desc: "任务生命周期更可控。" },
    ],
    metrics: [
      { label: "稳定运行", value: "72h", note: "压力测试" },
      { label: "GPU 利用", value: "+21%", note: "调优后" },
      { label: "告警项", value: "18", note: "可观测" },
    ],
  },
  {
    id: "pytorch-dispatcher",
    title: "PyTorch Dispatcher 调度机制大全",
    subtitle: "深入解析 PyTorch Dispatcher、Operator 注册与 Kernel 选择。",
    category: "工具 / 框架",
    visual: "bonsai",
    image: "/assets/lydt/thumbnails/projects/project-pytorch-dispatcher.png",
    tags: ["PyTorch", "Dispatcher", "Kernel"],
    summary: "深入解析 PyTorch Dispatcher、Operator 注册、Kernel 选择与执行路径。",
    date: "2024-04-12",
    stars: "2.6k",
    views: "9.1k",
    readTime: "30 min",
    href: "/projects/pytorch-dispatcher",
    sourceHref: "https://github.com/XiFenM",
    demoHref: "/blog/pytorch-dispatcher",
    sections: [
      { title: "项目概览", body: "把 PyTorch 算子调用路径拆解为 Schema、DispatchKey、Kernel 注册与后端选择几层。" },
      { title: "背景与动机", body: "理解 Dispatcher 是写自定义算子、排查后端 fallback 与观察性能问题的重要入口。" },
      { title: "核心特性", body: "包含注册示例、调用流程图、常见误区与调试建议。" },
    ],
    features: [
      { title: "概念清楚", desc: "Schema / Kernel / Key 对齐。" },
      { title: "示例完整", desc: "从 C++ 注册到调用。" },
      { title: "排错导向", desc: "覆盖 fallback 与缺失注册。" },
    ],
    metrics: [
      { label: "调用层级", value: "5", note: "Dispatcher" },
      { label: "示例代码", value: "16", note: "C++ / Python" },
      { label: "排查项", value: "21", note: "Checklist" },
    ],
  },
];

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

export const POSTS: Post[] = [
  {
    slug: "triton-vs-cuda",
    title: "Triton 与 CUDA 核心原理整理",
    visual: "cube",
    image: "/assets/lydt/thumbnails/blog/blog-ink-triton-cuda.png",
    excerpt: "深入 Triton 与 CUDA 的执行模型，调度关键路径，编译优化策略与性能关键点。",
    tags: ["CUDA", "Performance", "Kernel"],
    date: "2025-05-26",
    readTime: "22 分钟阅读",
    href: "/blog/triton-vs-cuda",
    category: "玉简",
  },
  {
    slug: "pytorch-dispatcher",
    title: "PyTorch 调度器干货大合集",
    visual: "route",
    image: "/assets/lydt/thumbnails/blog/blog-ink-pytorch-dispatcher.png",
    excerpt: "系统梳理 PyTorch Dispatcher、Kernel 注册、调度路径与执行模型的核心知识体系。",
    tags: ["PyTorch", "Distributed", "NCCL"],
    date: "2025-04-12",
    readTime: "18 分钟阅读",
    href: "/blog/pytorch-dispatcher",
    category: "玉简",
  },
  {
    slug: "megatron-parallelism",
    title: "Megatron 并行机制笔记",
    visual: "scroll",
    image: "/assets/lydt/thumbnails/blog/blog-ink-megatron.png",
    excerpt: "梳理 Megatron-LM 的模型并行、流水并行、张量并行与序列并行原理及实现细节。",
    tags: ["LLM", "Distributed", "Megatron"],
    date: "2025-05-08",
    readTime: "20 分钟阅读",
    href: "/blog/megatron-parallelism",
    category: "卷宗",
  },
  {
    slug: "allreduce-kernel",
    title: "自定义 AllReduce 算子实现思路",
    visual: "waves",
    image: "/assets/lydt/thumbnails/blog/blog-ink-allreduce.png",
    excerpt: "从环形 AllReduce 到树形 AllReduce，详解自定义算子的实现与优化策略。",
    tags: ["Distributed", "NCCL", "CUDA"],
    date: "2025-04-02",
    readTime: "16 分钟阅读",
    href: "/blog/allreduce-kernel",
    category: "卷宗",
  },
  {
    slug: "processgroup-nccl",
    title: "ProcessGroup 与 NCCL 通信路径梳理",
    visual: "network",
    image: "/assets/lydt/thumbnails/blog/blog-ink-processgroup-nccl.png",
    excerpt: "深入 ProcessGroup 的后端实现，梳理 NCCL 通信路径、Stream 管理与异步执行机制。",
    tags: ["Distributed", "PyTorch", "NCCL"],
    date: "2025-03-28",
    readTime: "15 分钟阅读",
    href: "/blog/processgroup-nccl",
    category: "札记",
  },
  {
    slug: "softmax-kernel-optimization",
    title: "从 Softmax Kernel 到性能优化",
    visual: "steps",
    image: "/assets/lydt/thumbnails/blog/blog-ink-softmax-kernel.png",
    excerpt: "分析 Softmax 的计算特征与访存模式，探讨 Kernel 优化方法与性能对比。",
    tags: ["CUDA", "Kernel", "Optimization"],
    date: "2025-03-20",
    readTime: "14 分钟阅读",
    href: "/blog/softmax-kernel-optimization",
    category: "札记",
  },
  {
    slug: "torch-compile-fx",
    title: "TorchScript / FX / torch.compile 关系总结",
    visual: "gates",
    image: "/assets/lydt/thumbnails/blog/blog-ink-torchscript-fx-compile.png",
    excerpt: "对比三种图表示与编译路径，总结在不同场景下的适用性与最佳实践。",
    tags: ["PyTorch", "Compiler", "FX"],
    date: "2025-03-15",
    readTime: "17 分钟阅读",
    href: "/blog/torch-compile-fx",
    category: "札记",
  },
  {
    slug: "zero-allgather",
    title: "ZeRO 参数分片与 AllGather 流程分析",
    visual: "pages",
    image: "/assets/lydt/thumbnails/blog/blog-ink-zero-allgather.png",
    excerpt: "解析 ZeRO 各阶段的内存优化策略，深入 AllGather 的执行流程与通信开销。",
    tags: ["LLM", "ZeRO", "Distributed"],
    date: "2025-03-10",
    readTime: "19 分钟阅读",
    href: "/blog/zero-allgather",
    category: "札记",
  },
];

export const BLOG_CATEGORIES = ["全部", "CUDA", "PyTorch", "Distributed", "AI Framework", "LLM", "Engineering", "Notes"];

export const PROJECT_CATEGORIES = ["全部项目", "AI / 深度学习", "系统优化", "GPU / 内核", "分布式系统", "工具 / 框架", "研究 / 探索"];

export const FEATURED_PROJECTS = PROJECTS.slice(1, 4);
export const LATEST_POSTS = POSTS.slice(0, 3);

export const TIMELINE = [
  { year: 2021, title: "本科毕业", note: "专注于 GPU 并行计算与深度学习系统方向，并持续探索未来" },
  { year: 2023, title: "工程实践", note: "参与多项 AI 基础设施项目，专注性能优化与工程落地" },
  { year: 2024, title: "算法探索", note: "深入分布式系统与训练优化，探索大模型算法和系统实现" },
  { year: 2025, title: "系统架构", note: "构建独立完整的训练系统，持续优化性能与可扩展性" },
];

export const CONTACT_CARDS = [
  {
    key: "email",
    label: "Email",
    value: "yinjie.shen@gmail.com",
    href: "mailto:yinjie.shen@gmail.com",
    icon: "mail",
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/yinjie-shen",
    href: SOCIAL.github,
    icon: "github",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/yinjie-shen",
    href: SOCIAL.linkedin,
    icon: "linkedin",
  },
  {
    key: "resume",
    label: "下载简历",
    value: "PDF · 中文 / 英文",
    href: "/resume",
    icon: "file",
  },
];

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
