const ICON_BASE = "/assets/lydt/icons";

const CATEGORY_ICON_MAP: Record<string, string> = {
  全部: "all",
  全部项目: "all",
  CUDA: "cuda",
  PyTorch: "pytorch",
  Distributed: "distributed",
  "AI Framework": "ai",
  LLM: "llm",
  Engineering: "engineering",
  Notes: "notes",
  "AI / 深度学习": "ai",
  系统优化: "system",
  "GPU / 内核": "cuda",
  分布式系统: "distributed",
  "工具 / 框架": "tools",
  "研究 / 探索": "research",
};

const TECH_ICON_MAP: Record<string, string> = {
  Megatron: "megatron",
  PyTorch: "pytorch",
  CUDA: "cuda",
  Triton: "triton",
  NCCL: "nccl",
  ZeRO: "zero",
  Dispatcher: "dispatcher",
  Optimization: "optimization",
  Performance: "performance",
  FSDP: "fsdp",
  DDP: "ddp",
  Kernel: "kernel",
  "KV Cache": "kvcache",
  Compiler: "compiler",
  FX: "compiler",
  Distributed: "distributed",
  LLM: "llm",
  DeepSpeed: "deepspeed",
  Inference: "llm",
  Python: "python",
  "C++": "cpp",
  GPU: "cuda",
  Research: "optimization",
  System: "distributed",
};

export function categoryIconFor(label: string) {
  const key = CATEGORY_ICON_MAP[label] ?? "all";
  return `${ICON_BASE}/category/icon-cat-${key}.svg`;
}

export function techIconFor(label: string) {
  const key = TECH_ICON_MAP[label] ?? "optimization";
  return `${ICON_BASE}/tech/icon-tech-${key}.svg`;
}
