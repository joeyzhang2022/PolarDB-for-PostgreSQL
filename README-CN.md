<div align="center">

[![logo](docs/.vuepress/public/images/polardb.png)](https://developer.aliyun.com/topic/polardb-for-pg)

# PolarDB for PostgreSQL

**阿里云自主研发的云原生数据库产品**

#### [English](README.md) | 简体中文

[![official](https://img.shields.io/badge/官方网站-blueviolet?style=for-the-badge&logo=alibabacloud)](https://developer.aliyun.com/topic/polardb-for-pg)

[![cirrus-ci-stable](https://img.shields.io/cirrus/github/ApsaraDB/PolarDB-for-PostgreSQL/POLARDB_11_STABLE?style=for-the-badge&logo=cirrusci)](https://cirrus-ci.com/github/ApsaraDB/PolarDB-for-PostgreSQL/POLARDB_11_STABLE)
[![cirrus-ci-dev](https://img.shields.io/cirrus/github/ApsaraDB/PolarDB-for-PostgreSQL/POLARDB_11_DEV?style=for-the-badge&logo=cirrusci)](https://cirrus-ci.com/github/ApsaraDB/PolarDB-for-PostgreSQL/POLARDB_11_DEV)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue?style=for-the-badge&logo=apache)](LICENSE)
[![github-issues](https://img.shields.io/github/issues/ApsaraDB/PolarDB-for-PostgreSQL?style=for-the-badge&logo=github)](https://GitHub.com/ApsaraDB/PolarDB-for-PostgreSQL/issues)
[![github-pullrequest](https://img.shields.io/github/issues-pr/ApsaraDB/PolarDB-for-PostgreSQL?style=for-the-badge&logo=github)](https://GitHub.com/ApsaraDB/PolarDB-for-PostgreSQL/pulls)
[![github-forks](https://img.shields.io/github/forks/ApsaraDB/PolarDB-for-PostgreSQL?style=for-the-badge&logo=github)](https://github.com/ApsaraDB/PolarDB-for-PostgreSQL/network/members)
[![github-stars](https://img.shields.io/github/stars/ApsaraDB/PolarDB-for-PostgreSQL?style=for-the-badge&logo=github)](https://github.com/ApsaraDB/PolarDB-for-PostgreSQL/stargazers)
[![github-contributors](https://img.shields.io/github/contributors/ApsaraDB/PolarDB-for-PostgreSQL?style=for-the-badge&logo=github)](https://github.com/ApsaraDB/PolarDB-for-PostgreSQL/graphs/contributors)

</div>

## 什么是 PolarDB for PostgreSQL

![arch.png](docs/zh/imgs/1_polardb_architecture.png)

PolarDB for PostgreSQL（下文简称为 PolarDB）是一款阿里云自主研发的云原生数据库产品，100% 兼容 PostgreSQL，采用基于 Shared-Storage 的存储计算分离架构，具有极致弹性、毫秒级延迟、HTAP 的能力。

1. 极致弹性：存储与计算能力均可独立地横向扩展。
   - 当计算能力不够时，可以单独扩展计算集群，数据无需复制。
   - 当存储容量或 I/O 不够时，可以单独扩展存储集群，而不中断业务。
2. 毫秒级延迟：
   - WAL 日志存储在共享存储上，RW 到所有 RO 之间仅复制 WAL 的元数据。
   - 独创的 _LogIndex_ 技术，实现了 Lazy 回放和 Parallel 回放，理论上最大程度地缩小了 RW 和 RO 节点间的延迟。
3. HTAP 能力：基于 Shared-Storage 的分布式并行执行框架，加速在 OLTP 场景下的 OLAP 查询。一套 OLTP 型的数据，可支持 2 套计算引擎：
   - 单机执行引擎：处理高并发的 TP 型负载。
   - 分布式执行引擎：处理大查询的 AP 型负载。

PolarDB 还支持时空、GIS、图像、向量、搜索、图谱等多模创新特性，应对企业对数据处理日新月异的需求。

## 分支说明

`POLARDB_11_STABLE` 为稳定分支，持存储计算分离的云原生形态。 `distribute` 分支支持分布式形态。

## 产品架构和版本规划

PolarDB 采用了基于 Shared-Storage 的存储计算分离架构。数据库由传统的 Share-Nothing 架构，转变成了 Shared-Storage 架构。由原来的 N 份计算 + N 份存储，转变成了 N 份计算 + 1 份存储。虽然共享存储上数据是一份，但是数据在各节点内存中的状态是不同的，需要通过内存状态的同步来维护数据的一致性；同时主节点在刷脏时也需要做协调，避免只读节点读取到超前的 **“未来页面”**，也要避免只读节点读取到过时的没有在内存中被正确回放的 **“过去页面”**。为了解决该问题，PolarDB 创造性地设计了 _LogIndex_ 数据结构来维护页面的回放历史，该结构能够实现主节点与只读节点之间的同步。

在存储计算分离后，I/O 单路延迟变大的同时，I/O 的吞吐也变大了。在处理分析型查询时，仅使用单个只读节点无法发挥出存储侧的大 I/O 带宽优势，也无法利用其他只读节点的 CPU、内存和 I/O 资源。为了解决该问题，PolarDB 研发了基于 Shared-Storage 的并行执行引擎，能够在 SQL 级别上弹性利用任意数目的 CPU 来加速分析查询，支持 HTAP 的混合负载场景。

详情请查阅 [产品架构](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/architecture/) 和 [版本规划](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/roadmap/)。

## 快速入门

如果您正在使用一个干净的 CentOS 7 系统，且正以一个非 root 用户登录，那么您可以使用以下最小化编译部署方式快速尝鲜 PolarDB for PostgreSQL。

```bash
# install extra software source
sudo yum install epel-release centos-release-scl
# update
sudo yum update
# install minimal dependencies
sudo yum install devtoolset-9-gcc devtoolset-9-gcc-c++ \
                 devtoolset-9-gdb devtoolset-9-make \
                 bison flex perl-IPC-Run

# enable GCC 9
sudo bash -c 'echo "source /opt/rh/devtoolset-9/enable" >> /etc/bashrc'
source /etc/bashrc

# building
./polardb_build -m
```

进入 `psql` 命令行则表明编译部署成功：

```bash
$HOME/tmp_basedir_polardb_pg_1100_bld/bin/psql -h 127.0.0.1

psql (11.9)
Type "help" for help.
postgres=# select version();
            version             
--------------------------------
 PostgreSQL 11.9 (POLARDB 11.9)
(1 row)
```

对于更多进阶部署方式，请移步在线文档中的 [快速入门指南](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/guide/)。推荐使用 [基于单机存储的部署方式 + Docker 开发镜像](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/guide/deploy-on-local-storage.html) 部署 PolarDB for PostgreSQL。

## 文档

请移步本项目的 [在线文档网站](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/) 查阅完整文档。

如果需要在本地预览或开发文档，请参考 [贡献文档](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/contributing/contributing-polardb-docs.html)。

## 参与贡献

我们诚挚欢迎社区参与 PolarDB 的贡献，无论是代码还是文档。在线文档中的 [参与社区](https://apsaradb.github.io/PolarDB-for-PostgreSQL/zh/contributing/) 提供了关于贡献流程与规范的更多信息。

## Software License

PolarDB code is released under the Apache License (Version 2.0), developed based on the PostgreSQL which is released under the PostgreSQL License. This product contains various third-party components under other open source licenses.

See the [LICENSE](./LICENSE) and [NOTICE](./NOTICE) file for more information.

## 致谢

部分代码和设计思路参考了其他开源项目，例如：PG-XC/XL (pgxc_ctl)、TBase (部分基于时间戳的 vacuum 和 MVCC)、Greenplum 以及 Citus (pg_cron)。感谢以上开源项目的贡献。

## 联系我们

- PolarDB PostgreSQL Slack：[https://app.slack.com/client/T023NM10KGE/C023VEMKS02](https://app.slack.com/client/T023NM10KGE/C023VEMKS02)
- 使用钉钉扫描如下二维码，加入 PolarDB 技术推广组钉钉群

  ![polardb_group](docs/zh/imgs/polardb_group.png)

---

Copyright © Alibaba Group, Inc.
