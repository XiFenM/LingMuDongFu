---
slug: "pytorch-dispatcher"
title: "PyTorch 调度器干货大合集"
visual: "route"
image: "/assets/lydt/thumbnails/blog/blog-ink-pytorch-dispatcher.png"
tags: ["PyTorch", "Distributed", "NCCL"]
date: "2025-04-12"
readTime: "18 分钟阅读"
href: "/blog/pytorch-dispatcher"
category: "玉简"
excerpt: "系统梳理 PyTorch Dispatcher、Kernel 注册、调度路径与执行模型的核心知识体系。"
---

## 引言

PyTorch 的灵活性来自它的调度能力。Dispatcher 负责将一个算子调用路由到最合适的后端实现，并在 Autograd、设备、分布式等多个维度上进行组合调度。

> Dispatcher 不是一个黑箱，它是 PyTorch 算子分发、后端选择与扩展能力的关键枢纽。

## 为什么要理解 Dispatcher？

在实际工程中，我们常会遇到算子未命中、性能不达预期或自定义算子行为异常等问题。这些问题的根源往往与 DispatchKey 的分发逻辑息息相关。

## 核心概念速览

- **Operator**：算子在 IR 层的定义，包含 Schema 与元信息。
- **DispatchKey**：调度键，表示当前上下文可用的后端或变换策略。
- **Kernel 注册**：将具体实现与 DispatchKey 绑定，形成分发表。
- **后端与 Autograd 分层**：不同后端与 Autograd 机制通过 DispatchKey 组合协同工作。

## 一个典型调用流程

```cpp
Tensor my_add(const Tensor& a, const Tensor& b) {
  auto op = Dispatcher::singleton()
    .findSchemaOrThrow("myops::add", "")
    .typed<Tensor (const Tensor&, const Tensor&)>();
  return op.call(a, b);
}
```

上述流程中，Dispatcher 会根据当前的 DispatchKeySet，在分发表中查找最优 Kernel，并执行对应实现。

## 常见误区与排查建议

- 注册点没有命中实际 Kernel。
- DispatchKey 理解不完整。
- 自定义算子与 Autograd 边界没有处理清楚。
- 性能问题隐藏在 fallback 路径中。

## Dispatcher 关注点

| 关注项 | 说明 |
| --- | --- |
| Schema | 定义算子签名，参数与返回类型 |
| Kernel | 不同后端的具体实现，被 DispatchKey 选择 |
| DispatchKey | 决定命中路径，影响性能与正确性 |

## 小结

Dispatcher 是 PyTorch 核心能力的重要支柱。掌握其原理与最佳实践，不仅能帮助我们写出更高效的算子与后端实现，也是在系统层面理解 PyTorch 的重要一步。
