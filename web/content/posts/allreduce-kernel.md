---
slug: "allreduce-kernel"
title: "自定义 AllReduce 算子实现思路"
visual: "waves"
image: "/assets/lydt/thumbnails/blog/blog-ink-allreduce.png"
tags: ["Distributed", "NCCL", "CUDA"]
date: "2025-04-02"
readTime: "16 分钟阅读"
href: "/blog/allreduce-kernel"
category: "卷宗"
excerpt: "从环形 AllReduce 到树形 AllReduce，详解自定义算子的实现与优化策略。"
---

## 引言

AllReduce 是分布式训练中最关键的通信原语之一。它连接着每一次梯度同步，也决定了训练吞吐、尾延迟与扩展效率的上限。

## 核心思路

- 明确通信拓扑：环形、树形与分层 AllReduce 适合不同规模与网络结构。
- 拆分数据块：通过 chunk / slice 让通信与规约可以流水化执行。
- 关注 stream：通信 stream 与计算 stream 的同步边界会直接影响重叠效率。

## 工程实现关注点

自定义算子不仅要实现数学语义，还要处理 buffer 管理、异步 work handle、错误传播以及 profile 标记。真正的难点在于让通信路径稳定、可观测、可复现。

## 小结

AllReduce 优化不是单点 kernel 优化，而是拓扑、调度、内存与框架接口的整体工程。
