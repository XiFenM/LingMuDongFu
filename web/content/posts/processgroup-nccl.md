---
slug: "processgroup-nccl"
title: "ProcessGroup 与 NCCL 通信路径梳理"
visual: "network"
image: "/assets/lydt/thumbnails/blog/blog-ink-processgroup-nccl.png"
tags: ["Distributed","PyTorch","NCCL"]
date: "2025-03-28"
readTime: "15 分钟阅读"
href: "/blog/processgroup-nccl"
category: "札记"
---

深入 ProcessGroup 的后端实现，梳理 NCCL 通信路径、Stream 管理与异步执行机制。
