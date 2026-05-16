---
slug: "processgroup-nccl"
title: "ProcessGroup 与 NCCL 通信路径梳理"
visual: "network"
image: "/assets/lydt/thumbnails/blog/blog-ink-processgroup-nccl.png"
tags: ["Distributed", "PyTorch", "NCCL"]
date: "2025-03-28"
readTime: "15 分钟阅读"
href: "/blog/processgroup-nccl"
category: "札记"
excerpt: "深入 ProcessGroup 的后端实现，梳理 NCCL 通信路径、Stream 管理与异步执行机制。"
---

## 引言

ProcessGroup 是 PyTorch 分布式通信的核心抽象。它把上层 collective 调用转化为具体后端执行，并负责异步任务、错误处理与资源管理。

## 通信路径

从 `torch.distributed` API 到 ProcessGroup，再到 NCCL communicator，调用链中会涉及 bucket、stream、event、work handle 等多个对象。

## 排查重点

- NCCL communicator 初始化是否一致。
- Stream 同步边界是否过度保守。
- Work handle 是否正确 wait 或同步。
- rank 间 tensor shape 与 dtype 是否一致。

## 小结

理解 ProcessGroup 可以帮助我们把通信问题从“黑盒卡住”拆解成可定位的工程路径。
