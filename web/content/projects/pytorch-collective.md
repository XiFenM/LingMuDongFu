---
id: "pytorch-collective"
title: "PyTorch Custom Collective"
subtitle: "实现高性能自定义通信算子，支持 AllReduce / ReduceScatter 场景。"
category: "AI / 深度学习"
visual: "vortex"
image: "/assets/lydt/thumbnails/projects/project-pytorch-collective.png"
tags: ["PyTorch","Distributed","NCCL"]
summary: "实现高性能自定义通信算子，支持 AllReduce / ReduceScatter 等分布式集合通信场景。"
date: "2024-10-08"
stars: "2.1k"
views: "993"
readTime: "28 min"
href: "/projects/pytorch-collective"
sourceHref: "https://github.com/XiFenM"
demoHref: "/blog/allreduce-kernel"
features: [{"title":"通信路径","desc":"清晰映射前后端调用链。"},{"title":"异步重叠","desc":"观察计算与通信调度。"},{"title":"Profile","desc":"从 trace 定位吞吐瓶颈。"}]
metrics: [{"label":"吞吐提升","value":"+18%","note":"端到端"},{"label":"通信原语","value":"4","note":"Collective"},{"label":"追踪指标","value":"12","note":"Profile"}]
---

## 项目概览

围绕 PyTorch 分布式后端，构建自定义 Collective 的注册、调度、通信与 profile 流程。

## 背景与动机

训练瓶颈常常隐藏在梯度通信中，需要在框架层观察通信何时发生、如何与计算重叠。

## 核心特性

打通 ProcessGroup、NCCL stream、bucket 化梯度与异步 work handle。
