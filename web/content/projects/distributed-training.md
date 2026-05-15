---
id: "distributed-training"
title: "Distributed Training 工程实践"
subtitle: "训练前后端的系统化工程落地记录。"
category: "分布式系统"
visual: "network"
image: "/assets/lydt/thumbnails/projects/project-distributed-training.png"
tags: ["DDP","FSDP","ZeRO"]
summary: "大规模分布式训练的系统设计与落地，包括调度、监控、容错与性能分析工具链。"
date: "2024-05-14"
stars: "2.3k"
views: "7.8k"
readTime: "38 min"
href: "/projects/distributed-training"
sourceHref: "https://github.com/XiFenM"
demoHref: "/blog/processgroup-nccl"
features: [{"title":"容错","desc":"节点异常下的恢复策略。"},{"title":"监控","desc":"显存、吞吐、通信统一看板。"},{"title":"调度","desc":"任务生命周期更可控。"}]
metrics: [{"label":"稳定运行","value":"72h","note":"压力测试"},{"label":"GPU 利用","value":"+21%","note":"调优后"},{"label":"告警项","value":"18","note":"可观测"}]
---

## 项目概览

把 DDP、FSDP、ZeRO 等训练策略放到真实工程链路中观察，包含调度、监控、容错与数据面。

## 背景与动机

大规模训练不只关心算法，还关心失败恢复、资源利用率、日志可观测性与可复现的 benchmark。

## 核心特性

形成从启动脚本到通信 profile，再到异常定位的全链路文档与工具。
