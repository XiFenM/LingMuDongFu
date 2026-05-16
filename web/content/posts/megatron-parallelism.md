---
slug: "megatron-parallelism"
title: "Megatron 并行机制笔记"
visual: "scroll"
image: "/assets/lydt/thumbnails/blog/blog-ink-megatron.png"
tags: ["LLM", "Distributed", "Megatron"]
date: "2025-05-08"
readTime: "20 分钟阅读"
href: "/blog/megatron-parallelism"
category: "卷宗"
excerpt: "梳理 Megatron-LM 的模型并行、流水并行、张量并行与序列并行原理及实现细节。"
---

## 引言

Megatron-LM 的并行机制把大模型训练拆成多个相互协作的维度：张量并行、流水并行、数据并行以及序列并行。理解这些边界，是理解大模型训练系统的入口。

## 并行维度

- Tensor Parallel：切分单层内部的矩阵计算。
- Pipeline Parallel：沿层维度拆分模型，关注 bubble 与调度策略。
- Data Parallel：复制模型副本，进行梯度同步。
- Sequence Parallel：进一步降低激活显存压力。

## 工程观察

并行策略不是越多越好。通信代价、显存占用、batch size、网络拓扑和算子粒度都会改变最优配置。

## 小结

Megatron 的价值不只在并行算法本身，更在于它把并行策略变成可组合、可配置、可调试的工程系统。
