import type { Week } from '../types'

export const weeks: Week[] = [
  {
    id: 1,
    phase: 'foundation',
    color: '#6ee7ff',
    icon: 'A*',
    date: '08.10 - 08.16',
    title: '启发式搜索：从手推到实现',
    tag: '建立算法直觉与工程骨架',
    objective:
      '理解图搜索、优先队列与启发函数；从第一周开始产生可运行代码。',
    groups: [
      {
        name: '理论',
        tasks: [
          '快速阅读 1 篇综合综述，提取分类与评价指标',
          '精读 A* 的核心思想与最优性条件',
          '补齐图、优先队列、完备性与最优性概念',
        ],
      },
      {
        name: '实现',
        tasks: [
          '创建 Git 仓库与 Python 环境',
          '实现 Dijkstra 与 A*，支持 4/8 邻域',
          '可视化 Open / Closed 集合与最终路径',
          '手推 5x5 栅格并与程序日志核对',
        ],
      },
      {
        name: '结果',
        tasks: [
          '完成 5 张地图的基础测试',
          '比较不同启发函数的节点数与耗时',
          '绘制方法谱系图 v1',
        ],
      },
    ],
    softwareLine: [
      '初始化 Git 仓库、分支策略与 README',
      '配置 Python 虚拟环境和统一依赖清单',
      '熟悉 VS Code 调试与快捷键',
      'LeetCode 基础数组/字符串 2 题',
    ],
    deliverable: 'dijkstra.py、astar.py、方法谱系图、启发函数对比记录。',
    gate: '能解释 g(n)、h(n)、可采纳性与一致性，以及 A* 保证最优的条件。',
  },
  {
    id: 2,
    phase: 'foundation',
    color: '#62d5a7',
    icon: 'Θ*',
    date: '08.17 - 08.23',
    title: '任意角规划：从能跑到能比较',
    tag: '搭建统一 Benchmark',
    objective: '实现 Theta*，建立第一套可重复的批量评测框架。',
    groups: [
      {
        name: '理论',
        tasks: [
          '精读 Theta* 与 line-of-sight',
          '区分任意角规划与路径后处理',
          '学习均值、标准差、中位数与箱线图',
        ],
      },
      {
        name: '实现',
        tasks: [
          '实现 Theta* 与统一 Planner 接口',
          '批量生成/加载至少 20 张地图',
          '自动输出 CSV、路径图与时间图',
          '为碰撞检测和启发函数编写测试',
        ],
      },
      {
        name: '分析',
        tasks: [
          '对比 Dijkstra / A* / Theta*',
          '记录 3 个 Theta* 退化或不占优案例',
          '建立 failure_cases.md',
        ],
      },
    ],
    softwareLine: [
      '用 pytest 建立第一组自动化测试',
      '统一 CSV 输出与 matplotlib 制图脚本',
      'Git 提交按“实现-测量-复盘”拆分',
      'LeetCode 链表/哈希 2 题',
    ],
    deliverable: '20 张地图对比、自动评测脚本、失败案例库初版。',
    gate: '能说明为什么“路径更短”不一定代表轨迹更好。',
  },
  {
    id: 3,
    phase: 'foundation',
    color: '#ffd166',
    icon: 'RRT',
    date: '08.24 - 08.30',
    title: '采样规划：理解探索与渐进优化',
    tag: '进入连续空间',
    objective: '掌握 RRT/RRT* 的概率思想、Rewire 机制与参数影响。',
    groups: [
      {
        name: '理论',
        tasks: [
          '阅读 RRT 原始技术报告',
          '精读 RRT* 算法部分',
          '理解概率完备、渐进最优与探索-利用',
        ],
      },
      {
        name: '实现',
        tasks: [
          '实现 RRT 与 RRT*',
          '加入目标偏置、步长、邻域半径',
          '每张地图重复运行 20 次',
          '绘制路径长度-迭代次数曲线',
        ],
      },
      {
        name: '分析',
        tasks: [
          '比较栅格与采样算法适用场景',
          '完成关键参数敏感性分析',
          '沉淀至少 5 条经典算法缺陷',
        ],
      },
    ],
    softwareLine: [
      '把随机种子、参数与实验版本写进配置',
      '为采样算法补充类型注解和模块边界',
      '更新方法谱系图与实验 README',
      'LeetCode 树/图基础 2 题',
    ],
    deliverable: 'RRT 系列代码、收敛曲线、参数敏感性图、缺陷清单。',
    gate: '能画出 ChooseParent 与 Rewire，并说明“找到路径”和“渐进最优”的区别。',
  },
  {
    id: 4,
    phase: 'system',
    color: '#ff9f6e',
    icon: 'DWA',
    date: '08.31 - 09.06',
    title: '系统闭环：全局路径接入局部运动',
    tag: '规划开始驱动机器人',
    objective: '打通全局路径、局部规划与动态障碍，明确路径、轨迹和控制的边界。',
    groups: [
      {
        name: '理论',
        tasks: [
          '学习 D* Lite/LPA* 的增量重规划思想',
          '学习 DWA 的速度空间与评价函数',
          '区分路径规划、轨迹规划、运动控制',
        ],
      },
      {
        name: '实现',
        tasks: [
          '优先：Python 实现简化 DWA',
          '以 A*/Theta* 路径提供局部目标',
          '加入动态障碍并生成运动动画',
          '有 ROS 2 基础时可改用 Nav2',
        ],
      },
      {
        name: '实验',
        tasks: [
          '记录碰撞率、到达时间与重规划次数',
          '构造 3 类局部规划失败场景',
          '形成第一版具体问题陈述',
        ],
      },
    ],
    softwareLine: [
      '为仿真项目写最小可运行文档',
      '用模块化接口隔离规划器与可视化',
      '为动态障碍测试补充回归用例',
      'LeetCode 动态规划入门 2 题',
    ],
    deliverable: '完整导航动画、动态测试结果、3 类失败场景。',
    gate: '能明确自己的研究对象是几何路径、时间轨迹，还是闭环导航系统。',
  },
  {
    id: 5,
    phase: 'reproduce',
    color: '#ff7b8b',
    icon: 'REP',
    date: '09.07 - 09.13',
    title: '近期工作复现：从 Run 到 Stress',
    tag: '建立可信复现能力',
    objective: '主选 Zeta*/Zeta*-SIPP；若偏采样规划，则选择 AdaRRT 方向。',
    groups: [
      {
        name: '复现阶梯',
        tasks: [
          'Run：官方示例能够运行',
          'Match：关键趋势与论文一致',
          'Transfer：替换自己的地图',
          'Stress：压力测试算法边界',
        ],
      },
      {
        name: '记录',
        tasks: [
          '固定环境、版本、参数与数据集',
          '比较原论文与自己结果的差异',
          '保存失败日志和原始数据',
          '补充可复现 README',
        ],
      },
      {
        name: '压力场景',
        tasks: [
          '极窄通道',
          '大尺寸地图',
          '高障碍密度',
          '静态稳定后再进入动态版本',
        ],
      },
    ],
    softwareLine: [
      '用 requirements.txt / lock 文件固定环境',
      '练习 Code Review 与提交信息规范',
      '为复现实验建立结果目录结构',
      'LeetCode 二分/滑动窗口 2 题',
    ],
    deliverable: 'reproduction_report.md、环境说明、结果差异、至少 3 个失败案例。',
    gate: '其他人仅按照 README，就能重复你的关键结果。',
  },
  {
    id: 6,
    phase: 'reproduce',
    color: '#c58cff',
    icon: 'Δ',
    date: '09.14 - 09.20',
    title: '最小改进：提出一个可证伪假设',
    tag: '不堆模块，只解决一个问题',
    objective: '从失败案例中选择单一机制问题，做 Baseline、完整方法、消融与敏感性实验。',
    groups: [
      {
        name: '候选机制',
        tasks: [
          '障碍密度驱动自适应采样',
          '窄通道附近切换采样策略',
          '长度/净空/平滑度联合代价',
          '基于拥挤度动态调节 DWA 权重',
        ],
      },
      {
        name: '必须实验',
        tasks: [
          'Baseline：原算法',
          'Proposed：完整改进',
          'Ablation：移除关键模块',
          'Sensitivity：参数取 3-5 个值',
        ],
      },
      {
        name: '科学表达',
        tasks: [
          '主动寻找无效或变差场景',
          '报告均值、波动与计算代价',
          '明确适用条件与交换关系',
        ],
      },
    ],
    softwareLine: [
      '用伪代码和类图整理改进模块',
      '为消融实验抽象统一运行入口',
      '用设计模式优化重复实验代码',
      'LeetCode 图/回溯 2 题',
    ],
    deliverable: '方法伪代码、主结果表、消融表、敏感性图、失败案例。',
    gate: '能回答“相对谁、在哪些场景、提升多少、牺牲什么”。',
  },
  {
    id: 7,
    phase: 'research',
    color: '#8b7cff',
    icon: 'GAP',
    date: '09.21 - 09.27',
    title: '研究收敛：验证 Gap 而不是想象 Gap',
    tag: '从实验者切换到研究者',
    objective: '检索最接近工作，建立对照矩阵，并通过存在性、重要性、可行性检查。',
    groups: [
      {
        name: '检索',
        tasks: [
          '检索最接近的 10-20 篇论文',
          '精读最接近的 3 篇',
          '建立 Related Work 对照矩阵',
          '明确方法假设和评价协议',
        ],
      },
      {
        name: 'Gap 自检',
        tasks: [
          '现有工作是否真的没有解决',
          '问题是否影响可测指标',
          '现有算力与平台能否验证',
          '机制差异能否一句话说清',
        ],
      },
      {
        name: '沟通',
        tasks: [
          '准备 10 分钟导师汇报',
          '记录质疑与反例',
          '根据反馈保留 1 个主 Gap',
          '明确下一阶段资源需求',
        ],
      },
    ],
    softwareLine: [
      '整理论文引用与 Zotero/文献目录',
      '为对照矩阵编写可复用表格模板',
      'Review 自己 8 周的代码与文档',
      'LeetCode 每周 2-3 题维持手感',
    ],
    deliverable: '对照矩阵、合格 Gap 句式、导师汇报材料与反馈记录。',
    gate: '能指出最接近论文，并清楚解释自己与它的本质差异。',
  },
  {
    id: 8,
    phase: 'research',
    color: '#5ee6a8',
    icon: 'GO',
    date: '09.28 - 10.04',
    title: '研究提案：把证据组织成可执行方案',
    tag: '不是仓促包装论文',
    objective: '形成研究问题、方法、实验、初步证据、失败边界和后续计划。',
    groups: [
      {
        name: '研究文档',
        tasks: [
          '写清问题定义、输入输出与假设',
          '整理相关方法与局限',
          '绘制方法框架并写伪代码',
          '制定后续 4-8 周计划',
        ],
      },
      {
        name: '证据包',
        tasks: [
          '可复现实验仓库',
          '一张主结果表',
          '总体效果、消融、失败案例三张图',
          '原始数据与运行说明',
        ],
      },
      {
        name: '汇报',
        tasks: [
          '完成 4-6 页研究提案',
          '制作 10-12 页汇报 PPT',
          '进行一次计时试讲',
          '与导师确认下一阶段任务',
        ],
      },
    ],
    softwareLine: [
      '整理个人项目作品集首页与 README',
      '检查开源许可证、引用与依赖清单',
      '把关键脚本抽成可复用工具',
      'LeetCode 每周 2-3 题',
    ],
    deliverable: '研究提案、汇报 PPT、实验仓库、关键图表与决策记录。',
    gate: '10 分钟讲清“问题-方法-证据-不足-下一步”。',
  },
  {
    id: 9,
    phase: 'fullstack',
    color: '#4cc9f0',
    icon: 'WEB',
    date: '10.05 - 10.11',
    title: 'Web 全栈基础：做出可交互页面',
    tag: '前端三件套与工程化',
    objective: '掌握 HTML/CSS/JS，选择 Vue 或 React 并完成个人项目静态原型。',
    groups: [
      {
        name: '前端基础',
        tasks: [
          'HTML5 语义化标签、表单与可访问性',
          'CSS3 Flex/Grid、响应式与移动端适配',
          'JavaScript ES6+、DOM、事件与异步',
        ],
      },
      {
        name: '工程化',
        tasks: [
          '选择 Vue 或 React 学透',
          '用 Vite 初始化项目',
          '掌握 DevTools 与移动端真机调试',
        ],
      },
      {
        name: '网络与项目',
        tasks: [
          'fetch/axios 与 CORS 基础',
          '设计个人项目信息架构',
          '完成静态可交互原型',
        ],
      },
    ],
    softwareLine: [
      '维护统一 Git 仓库与分支协作',
      '为页面写基础单元测试',
      '代码规范与格式化工具接入',
      'LeetCode 每周 2-3 题',
    ],
    deliverable: '个人项目原型、组件代码、基础测试与项目 README。',
    gate: '能独立讲清页面渲染、事件绑定、异步请求与响应式布局。',
  },
  {
    id: 10,
    phase: 'fullstack',
    color: '#f9844a',
    icon: 'API',
    date: '10.12 - 10.18',
    title: '后端与数据：让系统真正跑通',
    tag: '接口、数据库与鉴权',
    objective: '主攻一门后端语言，完成 RESTful API、数据库、缓存与鉴权闭环。',
    groups: [
      {
        name: '后端语言',
        tasks: [
          '三选一：Java(Spring Boot)/Python(FastAPI/Django)/Node(Express/Koa)',
          'RESTful 设计、JSON、状态码与参数校验',
          '编写带错误处理的真实接口',
        ],
      },
      {
        name: '数据与缓存',
        tasks: [
          'MySQL 表设计、SQL 优化、事务与 ORM',
          'Redis 缓存、会话与消息队列基础',
          '数据备份与恢复演练',
        ],
      },
      {
        name: '鉴权与文件',
        tasks: [
          'Session/Cookie 与 JWT',
          'API Key 与 OAuth2 基础',
          '文件上传与静态资源处理',
        ],
      },
    ],
    softwareLine: [
      '为接口写测试与 OpenAPI 文档',
      '用环境变量管理密钥，不硬编码',
      '数据库变更纳入版本管理',
      'LeetCode 每周 2-3 题',
    ],
    deliverable: '可运行后端、MySQL/Redis 接入、JWT 鉴权示例与接口文档。',
    gate: '能说明一次完整请求从浏览器到数据库的链路与安全边界。',
  },
  {
    id: 11,
    phase: 'deploy',
    color: '#e76f51',
    icon: 'DEP',
    date: '10.19 - 10.25',
    title: '部署上线：从本机到公网',
    tag: 'Linux、Nginx 与 HTTPS',
    objective: '完成 Linux 部署、Nginx 反向代理、HTTPS、Docker 与日志排错，并做备案前置检查。',
    groups: [
      {
        name: '服务器',
        tasks: [
          'Linux 用户/权限、systemd、环境变量',
          'Nginx 静态托管、反向代理与负载均衡',
          'DNS 解析与域名配置',
        ],
      },
      {
        name: '安全上线',
        tasks: [
          "Let's Encrypt SSL 与自动续期",
          '强制 HTTPS 跳转',
          '手动部署到 pm2/Docker',
        ],
      },
      {
        name: '备案前置',
        tasks: [
          '确认是否使用国内服务器',
          '准备 ICP 备案主体与材料',
          '通过接入商提交 ICP 备案',
        ],
      },
    ],
    softwareLine: [
      'Nginx 日志、journalctl 与 tail -f 排错',
      'Dockerfile 与部署文档',
      'CDN 原理与缓存刷新',
      'LeetCode 每周 2-3 题',
    ],
    deliverable: '线上站点、HTTPS、Nginx/Docker 配置、部署与回滚文档。',
    gate: '能在新服务器上按文档完成部署、HTTPS 与日志排错。',
  },
  {
    id: 12,
    phase: 'compliance',
    color: '#6a4c93',
    icon: 'SEC',
    date: '10.26 - 11.01',
    title: '安全加固与备案合规：交付作品集',
    tag: '安全、资质与最终复盘',
    objective: '完成服务器安全加固、五类备案/许可证速查、合规红线检查与最终作品集复盘。',
    groups: [
      {
        name: '安全加固',
        tasks: [
          'SSH 密钥、禁用 root 与 fail2ban',
          '防火墙最小放行与最小权限',
          'OWASP Top 10 关键项自测',
        ],
      },
      {
        name: '备案与资质',
        tasks: [
          'ICP 备案与公安联网备案时限检查',
          'ICP 经营许可证适用判断',
          'EDI/ISP 许可证适用判断',
        ],
      },
      {
        name: '交付复盘',
        tasks: [
          '数据备份、监控与应急响应清单',
          '完成带 HTTPS 与加固的项目作品集',
          '12 周证据包与下一阶段计划',
        ],
      },
    ],
    softwareLine: [
      '检查日志留存、隐私政策与用户协议',
      '整理开源许可证与依赖合规',
      '输出 10 分钟项目讲解',
      'LeetCode 每周 2-3 题',
    ],
    deliverable: '加固后的线上项目、备案状态清单、合规自查表与最终作品集。',
    gate: '能回答网站“部署在哪、如何加固、是否备案、哪些业务需要什么资质”。',
  },
]

export const weekPhases = [
  { id: 'foundation', label: '算法基石' },
  { id: 'system', label: '系统闭环' },
  { id: 'reproduce', label: '复现改进' },
  { id: 'research', label: '研究收敛' },
  { id: 'fullstack', label: '全栈开发' },
  { id: 'deploy', label: '部署上线' },
  { id: 'compliance', label: '安全合规' },
]

export function allWeekTaskIds(): string[] {
  return weeks.flatMap((week) =>
    week.groups.flatMap((group, groupIndex) =>
      group.tasks.map((_, taskIndex) => `w${week.id}-g${groupIndex}-t${taskIndex}`),
    ),
  )
}
