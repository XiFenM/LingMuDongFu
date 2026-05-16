---
slug: "triton-vs-cuda"
title: "Triton 与 CUDA 核心原理整理"
visual: "cube"
image: "/assets/lydt/thumbnails/blog/blog-ink-triton-cuda.png"
tags: ["CUDA", "Performance", "Kernel"]
date: "2025-05-26"
readTime: "22 分钟阅读"
href: "/blog/triton-vs-cuda"
category: "玉简"
excerpt: "深入 Triton 与 CUDA 的执行模型，调度关键路径，编译优化策略与性能关键点。"
---

## 引言

Triton 与 CUDA 都服务于 GPU 编程，但它们处在不同抽象层级。CUDA 更接近硬件，Triton 更强调块级程序抽象与编译器优化。

## 执行模型对比

- CUDA：显式管理 block、thread、shared memory 与同步。
- Triton：以 program 为单位描述块级计算，由编译器负责较多底层细节。
- 二者都需要理解内存层次、访存合并与并行规约。

## 工程取舍

Triton 适合快速实现高性能原型，CUDA 适合极致控制与硬件相关优化。真实工程中，两者往往是互补关系。

## 小结

学习 Triton 不意味着绕过 CUDA。真正稳定的优化能力，来自对底层硬件与上层抽象的共同理解。
