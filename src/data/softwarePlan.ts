export interface SoftwarePlanWeek {
  id: number
  title: string
  tag: string
  summary: string
  objective: string
  color: string
  groups: { name: string; tasks: string[] }[]
  deliverable: string
  gate: string
}

export const softwarePlanWeeks: SoftwarePlanWeek[] = [
  {
    id: 1,
    title: '编程与工具地基',
    tag: '工具与版本',
    summary: '建立工程环境与版本习惯',
    objective: '搭建可运行、可提交的工程环境。',
    color: '#6ee7ff',
    groups: [
      {
        name: '理论',
        tasks: ['数据结构与算法基础', 'Git 工作流与提交规范', 'Linux 基本命令与权限'],
      },
      {
        name: '实现',
        tasks: ['配置 Python 虚拟环境和依赖清单', '初始化 Git 仓库与分支策略', '熟悉 VS Code 调试'],
      },
      {
        name: '结果',
        tasks: ['完成 README 与首次提交', 'LeetCode 数组/字符串 2 题'],
      },
    ],
    deliverable: '可运行 Python 环境、Git 仓库与 README。',
    gate: '能独立完成一次 Git 提交并运行 Python 脚本。',
  },
  {
    id: 2,
    title: '测试与评测框架',
    tag: '测试与评测',
    summary: '把结果变成可重复的数据',
    objective: '建立能重复生成结果的测试与评测框架。',
    color: '#62d5a7',
    groups: [
      {
        name: '理论',
        tasks: ['单元测试与回归测试思维', '均值、标准差与箱线图'],
      },
      {
        name: '实现',
        tasks: ['用 pytest 建立第一组自动化测试', '统一 CSV 输出与 matplotlib 制图'],
      },
      {
        name: '结果',
        tasks: ['测试全部通过并生成结果文件', 'Git 提交按“实现-测量-复盘”拆分', 'LeetCode 链表/哈希 2 题'],
      },
    ],
    deliverable: '自动化测试与第一版结果输出。',
    gate: '能解释测试为什么能防止后续改动破坏结果。',
  },
  {
    id: 3,
    title: '算法工程与实验配置',
    tag: '实验配置',
    summary: '让实验配置与代码可复现',
    objective: '让实验配置和算法代码可复现。',
    color: '#ffd166',
    groups: [
      {
        name: '理论',
        tasks: ['随机种子与参数配置', '类型注解与模块边界'],
      },
      {
        name: '实现',
        tasks: ['把随机种子、参数与版本写进配置', '为算法补充类型注解'],
      },
      {
        name: '结果',
        tasks: ['更新方法谱系图与实验 README', 'LeetCode 树/图基础 2 题'],
      },
    ],
    deliverable: '可复现配置与类型化算法代码。',
    gate: '换个环境只修改配置即可复现结果。',
  },
  {
    id: 4,
    title: '仿真与模块边界',
    tag: '模块与仿真',
    summary: '用清晰边界搭建仿真闭环',
    objective: '用清晰模块边界完成仿真闭环。',
    color: '#ff9f6e',
    groups: [
      {
        name: '理论',
        tasks: ['模块化接口设计', '动态障碍与回归测试'],
      },
      {
        name: '实现',
        tasks: ['为仿真项目写最小可运行文档', '隔离规划器与可视化', '补充动态障碍回归用例'],
      },
      {
        name: '结果',
        tasks: ['动态测试通过并记录结果', 'LeetCode 动态规划入门 2 题'],
      },
    ],
    deliverable: '模块化仿真项目与动态测试结果。',
    gate: '能替换可视化模块而不修改规划器代码。',
  },
  {
    id: 5,
    title: '前端基础与交互原型',
    tag: '前端原型',
    summary: '从数据流做出可交互界面',
    objective: '做出可交互、可响应式的前端原型。',
    color: '#4cc9f0',
    groups: [
      {
        name: '理论',
        tasks: ['HTML/CSS/JavaScript 基础', 'Vue 或 React 选型'],
      },
      {
        name: '实现',
        tasks: ['用 Vite 初始化项目', '完成静态可交互原型'],
      },
      {
        name: '结果',
        tasks: ['响应式页面与移动端适配', '为页面写基础单元测试'],
      },
    ],
    deliverable: '可交互前端原型与基础测试。',
    gate: '能独立讲清页面渲染、事件绑定和异步请求。',
  },
  {
    id: 6,
    title: '后端接口与数据设计',
    tag: '后端接口',
    summary: '打通请求、数据与鉴权链路',
    objective: '打通后端接口、数据库和鉴权闭环。',
    color: '#f9844a',
    groups: [
      {
        name: '理论',
        tasks: ['RESTful API 与状态码', 'MySQL/Redis 基础', 'JWT 鉴权'],
      },
      {
        name: '实现',
        tasks: ['后端三选一完成真实接口', '数据库与缓存接入', '完成鉴权闭环'],
      },
      {
        name: '结果',
        tasks: ['OpenAPI 文档与接口测试', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '可运行后端、数据库、缓存与接口文档。',
    gate: '能说明一次完整请求从浏览器到数据库的链路。',
  },
  {
    id: 7,
    title: '部署与容器化',
    tag: '部署上线',
    summary: '把应用稳定送上公网',
    objective: '把应用稳定部署到公网。',
    color: '#e76f51',
    groups: [
      {
        name: '理论',
        tasks: ['Linux/systemd 与进程管理', 'Nginx 反向代理', 'Docker 与 HTTPS'],
      },
      {
        name: '实现',
        tasks: ['编写部署脚本与 Dockerfile', '配置 Nginx 与强制 HTTPS', '完成自动续期证书'],
      },
      {
        name: '结果',
        tasks: ['线上站点与回滚文档', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '线上项目、HTTPS 与部署回滚文档。',
    gate: '能在新服务器上按文档完成部署和排错。',
  },
  {
    id: 8,
    title: '安全加固与合规基线',
    tag: '安全合规',
    summary: '上线前先守住安全底线',
    objective: '上线前完成安全加固和合规基线。',
    color: '#6a4c93',
    groups: [
      {
        name: '理论',
        tasks: ['OWASP Top 10 关键风险', '备案、日志与隐私合规'],
      },
      {
        name: '实现',
        tasks: ['SSH 密钥、防火墙与最小权限', '检查日志留存与隐私政策', '检查备案状态'],
      },
      {
        name: '结果',
        tasks: ['安全自测表与备案状态清单', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '安全加固清单与合规自查报告。',
    gate: '能回答网站部署在哪、如何加固、是否备案。',
  },
  {
    id: 9,
    title: '复现环境与结果目录',
    tag: '复现环境',
    summary: '让结果可以被别人重复',
    objective: '让复现结果可以被别人重复。',
    color: '#8b7cff',
    groups: [
      {
        name: '理论',
        tasks: ['可复现实验与固定环境', 'Code Review 与提交规范'],
      },
      {
        name: '实现',
        tasks: ['用 requirements/lock 固定环境', '建立结果目录结构'],
      },
      {
        name: '结果',
        tasks: ['完成复现报告与失败日志', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '可复现实验包与复现报告。',
    gate: '别人只按 README 就能重复你的关键结果。',
  },
  {
    id: 10,
    title: '消融实验与代码设计',
    tag: '消融实验',
    summary: '验证每个改动是否真的必要',
    objective: '用消融实验验证每个改动的必要性。',
    color: '#5ee6a8',
    groups: [
      {
        name: '理论',
        tasks: ['设计模式与代码结构', '消融与敏感性实验'],
      },
      {
        name: '实现',
        tasks: ['统一实验运行入口', '抽象消融模块并写伪代码'],
      },
      {
        name: '结果',
        tasks: ['方法伪代码、消融表与敏感性图', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '消融实验包与关键图表。',
    gate: '能说明每个模块的作用、代价与适用条件。',
  },
  {
    id: 11,
    title: '文献复盘与作品集',
    tag: '作品集',
    summary: '把过程整理成可展示成果',
    objective: '把过程整理成可展示的作品集。',
    color: '#c58cff',
    groups: [
      {
        name: '理论',
        tasks: ['文献引用与对照矩阵', '项目复盘方法'],
      },
      {
        name: '实现',
        tasks: ['整理文献目录与对照矩阵', 'Review 之前代码并更新作品集'],
      },
      {
        name: '结果',
        tasks: ['完成 10 分钟项目讲解', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '作品集、对照矩阵与讲解稿。',
    gate: '能清楚说明项目定位、技术栈和解决的问题。',
  },
  {
    id: 12,
    title: '安全、备案与交付',
    tag: '最终交付',
    summary: '完成最终交付与合规收尾',
    objective: '完成最终安全、备案与交付。',
    color: '#f9844a',
    groups: [
      {
        name: '理论',
        tasks: ['开源许可证与依赖合规', '备案、日志与应急响应'],
      },
      {
        name: '实现',
        tasks: ['检查日志留存、隐私政策与用户协议', '整理开源许可证清单'],
      },
      {
        name: '结果',
        tasks: ['最终作品集与 12 周证据包', 'LeetCode 每周 2-3 题'],
      },
    ],
    deliverable: '最终交付包与完整证据链。',
    gate: '能完整回答安全、备案和交付相关问题。',
  },
  {
    id: 13,
    title: '前端工程化深化',
    tag: '前端深化',
    summary: '组件、路由、状态与构建优化',
    objective: '把前端从原型提升到工程化项目。',
    color: '#4cc9f0',
    groups: [
      { name: '理论', tasks: ['组件拆分与复用', '路由与状态管理', '构建与打包优化'] },
      { name: '实现', tasks: ['重构前端组件结构', '加入路由和全局状态', '配置生产构建'] },
      { name: '结果', tasks: ['组件目录与文档', '构建产物分析', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '工程化前端项目与组件文档。',
    gate: '能讲清组件、路由、状态和构建之间的关系。',
  },
  {
    id: 14,
    title: '后端与数据深化',
    tag: '后端深化',
    summary: '接口、事务、缓存与权限一起打通',
    objective: '把后端从单接口提升到完整业务系统。',
    color: '#f9844a',
    groups: [
      { name: '理论', tasks: ['RESTful 接口设计', '事务与索引优化', '缓存一致性与鉴权'] },
      { name: '实现', tasks: ['设计业务表结构', '实现事务接口', '加入 Redis 缓存与权限'] },
      { name: '结果', tasks: ['接口文档与测试', '性能测试记录', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '完整后端业务模块与接口文档。',
    gate: '能说明一个业务请求从接口到数据库再到缓存的完整链路。',
  },
  {
    id: 15,
    title: '部署与运维深化',
    tag: '部署深化',
    summary: '从能上线到能长期维护',
    objective: '掌握监控、日志、备份、回滚和 CI/CD。',
    color: '#e76f51',
    groups: [
      { name: '理论', tasks: ['监控指标与告警', '日志采集与分析', '备份恢复与回滚'] },
      { name: '实现', tasks: ['配置健康检查与日志', '实现自动备份', '配置 GitHub Actions 发布'] },
      { name: '结果', tasks: ['运维手册', '部署流水线', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '运维手册与自动发布流水线。',
    gate: '能按文档完成部署、监控、备份和回滚。',
  },
  {
    id: 16,
    title: '全栈整合与交付',
    tag: '全栈交付',
    summary: '把前后端、部署和工程规范串成作品',
    objective: '完成一个完整全栈项目并交付作品集。',
    color: '#6a4c93',
    groups: [
      { name: '理论', tasks: ['全栈项目架构', '项目文档结构', '作品集展示重点'] },
      { name: '实现', tasks: ['整合前后端与数据库', '完成部署与 HTTPS', '写 README 与演示'] },
      { name: '结果', tasks: ['完整全栈项目', '作品集与复盘报告', '最终验收清单'] },
    ],
    deliverable: '全栈项目、部署地址和作品集文档。',
    gate: '能完整讲清自己的全栈项目从设计到上线全过程。',
  },
]

export function allSoftwarePlanTaskIds(): string[] {
  return softwarePlanWeeks.flatMap((week) =>
    week.groups.flatMap((group, groupIndex) =>
      group.tasks.map((_, taskIndex) => `sw${week.id}-g${groupIndex}-t${taskIndex}`),
    ),
  )
}
