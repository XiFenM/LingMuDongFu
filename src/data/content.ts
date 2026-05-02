export type Project = {
  id: string;
  title: string;
  type: string;
  summary: string;
  tags: string[];
  metric: string;
  links: {
    detail: string;
    github: string;
  };
};

export type SkillCategory = {
  id: string;
  title: string;
  side: 'left' | 'right';
  skills: string[];
  note: string;
};

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  x: number;
  y: number;
};

export type GameHotspot = {
  id: string;
  label: string;
  room: string;
  x: number;
  y: number;
  detail: string;
  action: string;
};

export const profile = {
  nameCn: '沈寅杰',
  nameEn: 'Yinjie Shen',
  role: 'AI Framework Engineer · GPU Computing · Distributed Systems',
  intro:
    '我关注 AI 框架、GPU 计算和大模型系统优化，喜欢把复杂系统拆解成可观察、可优化、可复用的工程结构。',
  email: 'yinjie.shen@email.com',
  github: 'https://github.com/yinjieshen',
  linkedin: 'https://linkedin.com/in/yinjieshen',
};

export const skills: SkillCategory[] = [
  {
    id: 'ai-frameworks',
    title: 'AI Frameworks',
    side: 'left',
    skills: ['PyTorch', 'Megatron', 'JAX', 'TensorFlow', 'Triton', 'ONNX'],
    note: '关注算子调度、执行图、分布式抽象和框架扩展。',
  },
  {
    id: 'cuda',
    title: 'CUDA / GPU Computing',
    side: 'left',
    skills: ['CUDA', 'cuBLAS', 'cuDNN', 'Kernel Tuning', 'NCCL', 'GPU Direct'],
    note: '围绕吞吐、访存和数值稳定性进行端到端优化。',
  },
  {
    id: 'llm-systems',
    title: 'LLM Systems',
    side: 'left',
    skills: ['Tokenization', 'KV Cache', 'Inference Optimization', 'Quantization'],
    note: '把模型系统问题拆成延迟、显存、通信和工程可维护性。',
  },
  {
    id: 'pytorch-internals',
    title: 'PyTorch Internals',
    side: 'right',
    skills: ['Dispatcher', 'ATen', 'autograd', 'Memory Model', 'TorchInductor'],
    note: '理解框架内部路径，能定位性能瓶颈和可扩展接口。',
  },
  {
    id: 'distributed',
    title: 'Distributed Training',
    side: 'right',
    skills: ['DDP', 'FSDP', 'ZeRO', 'Pipeline', 'Collective Comm.'],
    note: '从并行策略、通信拓扑和训练稳定性评估系统设计。',
  },
  {
    id: 'backend',
    title: 'Backend / Tooling',
    side: 'right',
    skills: ['Linux', 'gRPC', 'Protobuf', 'Docker', 'CI/CD', 'C++'],
    note: '重视可观测、可测试、可交付的工程基础设施。',
  },
];

export const projects: Project[] = [
  {
    id: 'cuda-softmax',
    title: 'CUDA Softmax Kernel',
    type: 'Performance',
    summary: '基于 warp-level reduction 和共享内存优化的 Softmax Kernel 实现，覆盖数值稳定和吞吐分析。',
    tags: ['CUDA', 'Kernel', 'Performance'],
    metric: '2.8x 吞吐提升 / 128K tokens',
    links: { detail: '#projects', github: 'https://github.com/yinjieshen/cuda-softmax' },
  },
  {
    id: 'pytorch-collective',
    title: 'PyTorch Custom Collective',
    type: 'Distributed',
    summary: '实现可插拔自定义通信算子，分析 AllReduce 与 Reduce-Scatter 在多卡训练中的瓶颈。',
    tags: ['PyTorch', 'Distributed', 'NCCL'],
    metric: '训练同步开销降低 18%',
    links: { detail: '#projects', github: 'https://github.com/yinjieshen/pytorch-collective' },
  },
  {
    id: 'megatron-analysis',
    title: 'Megatron / DeepSpeed 分析',
    type: 'LLM Systems',
    summary: '梳理 Megatron 与 DeepSpeed 并行机制、显存模型和配置策略，形成可复用调优笔记。',
    tags: ['LLM', 'System', 'Analysis'],
    metric: '复现实验覆盖 3 类并行策略',
    links: { detail: '#projects', github: 'https://github.com/yinjieshen/megatron-notes' },
  },
];

export const milestones: Milestone[] = [
  {
    year: '2021',
    title: '本科毕业',
    description: '专注于 GPU 并行计算与基础系统能力，开始建立性能优化视角。',
    side: 'left',
    x: 27,
    y: 46,
  },
  {
    year: '2023',
    title: '工程实践',
    description: '参与多项系统性能项目，深入 PyTorch 生态与训练链路。',
    side: 'left',
    x: 38,
    y: 62,
  },
  {
    year: '2024',
    title: '算法探索',
    description: '深入分析大模型训练优化，探索系统观测和通信优化路径。',
    side: 'right',
    x: 63,
    y: 39,
  },
  {
    year: '2025',
    title: '系统架构',
    description: '构建优化链路与评估系统，将性能经验沉淀为可复用工具。',
    side: 'right',
    x: 72,
    y: 57,
  },
];

export const posts: Post[] = [
  {
    title: 'Triton 与 CUDA 核心原理整理',
    excerpt: '从 Triton 编译路径、线程映射和访存模式出发，理解高性能 kernel 的基本约束。',
    date: '2025-03-26',
    category: 'CUDA',
    href: '#blog',
  },
  {
    title: 'PyTorch 调度器干货大全集',
    excerpt: '系统梳理 Dispatcher、ATen、autograd 与编译路径中值得关注的扩展点。',
    date: '2025-04-12',
    category: 'Distributed',
    href: '#blog',
  },
  {
    title: 'Megatron 并行机制笔记',
    excerpt: '梳理 Tensor、Pipeline 和 Data Parallel 的配置方式、通信瓶颈和显存影响。',
    date: '2025-02-12',
    category: 'LLM',
    href: '#blog',
  },
];

export const gameHotspots: GameHotspot[] = [
  {
    id: 'root',
    label: '树根玄关',
    room: '入口石碑',
    x: 48,
    y: 77,
    detail: '欢迎来到灵木洞天。这里把主页信息重新放进一座可探索的树中仙府。',
    action: '返回主页、查看导航与操作提示。',
  },
  {
    id: 'library',
    label: '藏书枝阁',
    room: '竹简书架',
    x: 20,
    y: 28,
    detail: '这里收纳 CUDA、PyTorch、Distributed Training 和 LLM Systems 的技术笔记。',
    action: '对应主页中的博客精选与后续文章列表。',
  },
  {
    id: 'alchemy',
    label: '炼丹小室',
    room: '丹炉',
    x: 78,
    y: 31,
    detail: '丹炉中浮现重点项目：CUDA Softmax、PyTorch Collective、Megatron 分析。',
    action: '对应主页项目卡片，复用同一份项目数据。',
  },
  {
    id: 'sword',
    label: '剑器壁龛',
    room: '剑架',
    x: 18,
    y: 60,
    detail: '剑架代表技能体系：框架、GPU、分布式、LLM 系统和工程工具链。',
    action: '对应主页技能树。',
  },
  {
    id: 'tea',
    label: '月窗茶室',
    room: '茶案',
    x: 77,
    y: 65,
    detail: '这里放着 Email、GitHub、LinkedIn 和简历入口，方便访客回到现实联系。',
    action: '对应主页联系模块。',
  },
];
