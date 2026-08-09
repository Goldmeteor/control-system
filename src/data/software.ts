import type { SoftwareCategory } from '../types'

export const softwareCategories: SoftwareCategory[] = [
  {
    id: 'foundation',
    title: '专业地基',
    description: '数学、编程与计算机核心理论，是后续所有模块的共同底座。',
    priority: '先补数据结构与算法，再做产出型项目',
    sections: [
      {
        name: '数学与逻辑',
        items: [
          '高等数学（微积分）',
          '线性代数',
          '离散数学（集合、图论、逻辑）',
          '概率论与数理统计',
        ],
      },
      {
        name: '编程基础',
        items: [
          'C 语言：指针、内存、结构体',
          'C++ 或 Java：面向对象三大特性',
          'Python：脚本、自动化、数据处理',
        ],
      },
      {
        name: '计算机核心理论',
        items: [
          '数据结构与算法：数组、链表、栈、队列、树、图、排序、查找、复杂度',
          '计算机组成原理：CPU、内存、指令、存储',
          '操作系统：进程、线程、内存管理、文件系统',
          '计算机网络：TCP/IP、HTTP、DNS、三次握手',
          '数据库原理：关系模型、SQL、事务、索引',
        ],
      },
      {
        name: '工具与习惯',
        items: [
          'Git/GitHub：版本控制与协作',
          'Linux 基本命令：文件、权限、进程、端口',
          '编辑器：VS Code 或 Vim 熟练使用',
          '英文技术文档阅读：Stack Overflow、官方文档',
        ],
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Web 全栈开发',
    description: '从页面到接口、数据库与部署，形成能独立交付的完整项目能力。',
    priority: '先学一门后端语言到能写接口，再补齐上线链路',
    sections: [
      {
        name: '前端',
        items: [
          'HTML5：语义化标签、表单、布局',
          'CSS3：Flex/Grid、响应式、移动端适配',
          'JavaScript：ES6+、DOM、事件、异步',
          '框架：Vue 或 React 选一个学透',
          '构建工具：Vite / Webpack',
          '网络请求：fetch / axios，跨域 CORS',
          '调试：DevTools、移动端真机调试',
        ],
      },
      {
        name: '后端',
        items: [
          '主攻语言三选一：Java(Spring Boot)/Python(FastAPI/Django)/Node(Express/Koa)',
          'RESTful 设计、JSON、状态码、参数校验',
          'MySQL：SQL 优化、事务、ORM',
          'Redis：缓存、会话、消息队列基础',
          '鉴权：Session/Cookie、JWT、API Key、OAuth2 基础',
          '文件上传与静态资源处理',
        ],
      },
      {
        name: '服务器与部署',
        items: [
          'Linux：用户/权限、进程管理、systemd、环境变量',
          'Nginx：静态托管、反向代理、负载均衡、限速',
          '域名：DNS 解析、ICP 备案流程',
          "HTTPS：Let's Encrypt SSL、自动续期、强制跳转",
          '部署：手动部署到 pm2/Docker 容器化',
          '日志排错：Nginx 日志、journalctl、tail -f',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: '部署与安全',
    description: '上线前后必须掌握的安全基线、数据保护与攻防进阶。',
    priority: 'SSH + 防火墙 + HTTPS 是上线前安全三件套',
    sections: [
      {
        name: '基础加固',
        items: [
          'SSH 密钥登录、禁用 root 远程登录、修改默认端口',
          'fail2ban 防暴力破解',
          '防火墙只放行 80、443、SSH',
          '最小权限：普通用户运行服务',
          '关闭无用服务与端口',
        ],
      },
      {
        name: 'Web 安全',
        items: [
          'OWASP Top 10：SQL 注入、XSS、CSRF、SSRF、文件上传',
          '参数化查询防 SQL 注入',
          '输入输出过滤/转义防 XSS',
          'CSRF Token 机制',
          '安全响应头：CSP、HSTS、X-Frame-Options',
          '密钥管理：环境变量或密钥管理工具',
        ],
      },
      {
        name: '数据与监控',
        items: [
          '数据库不暴露公网端口',
          '数据库账号独立、最小权限',
          '定期自动备份与异地加密',
          '登录记录、异常 IP、Nginx access log 分析',
          '自动安全更新',
        ],
      },
      {
        name: '攻防进阶（选学）',
        items: [
          'nmap 扫自己服务器，了解暴露面',
          'DVWA / PortSwigger 靶场练习',
          '应急响应流程：登录记录、可疑进程、隔离主机',
        ],
      },
    ],
  },
  {
    id: 'compliance',
    title: '备案与合规',
    description: '上线登记、经营资质与法律红线，按业务场景判断需要办理哪一类。',
    priority: '先确认服务器位置，再判断备案与许可证',
    sections: [
      {
        name: '备案体系',
        items: [
          'ICP 备案：国内服务器网站上线前必须办理',
          'ICP 经营许可证：经营性互联网信息服务企业需要',
          'EDI：在线数据处理与交易处理业务需要',
          'ISP：互联网接入服务业务需要',
          '公安联网备案：ICP 备案通过后 30 天内办理',
        ],
      },
      {
        name: 'CDN 与域名',
        items: [
          'CDN 原理：节点、回源、缓存命中/未命中',
          '国内 CDN 必须备案，海外可用 Cloudflare',
          'CDN 费用、缓存刷新与源站隐藏',
        ],
      },
      {
        name: '法律红线',
        items: [
          '网络安全法：等级保护、日志留存至少 6 个月',
          '数据安全法：分类分级、重要数据保护',
          '个人信息保护法：告知-同意、最小必要、删除权',
          '未授权渗透、入侵或绕过反爬属于违规/违法',
          '开源代码商用前检查许可证',
        ],
      },
    ],
  },
  {
    id: 'craft',
    title: '软件工程素养',
    description: '贯穿整个学习周期的工程习惯、测试思维与项目经验。',
    priority: 'Git 协作、测试、文档与代码规范是日常底线',
    sections: [
      {
        name: '工程习惯',
        items: [
          'Git 协作工作流：分支、PR、Code Review',
          '单元测试与测试思维：JUnit / pytest',
          '设计模式：工厂、单例、观察者等常用即可',
          '软件工程流程：需求分析、模块设计、文档编写',
          '代码规范与重构意识',
        ],
      },
      {
        name: '持续产出',
        items: [
          'LeetCode 刷题：大二开始每周 2-3 题',
          '个人项目：前端 + 后端 + 部署 + 安全加固',
          '团队项目：参与开源或组队开发',
          '实习经历：大三暑假前尽量拿到',
        ],
      },
    ],
  },
]

export const softwarePriorities = [
  '数据结构与算法：一切的地基，面试必考',
  '一门后端语言学到能写接口：产出能力',
  'Linux + Nginx + 部署：让项目真正上线',
  'SSH + 防火墙 + HTTPS：上线前安全三件套',
  '一个完整项目：把上面全部串起来',
]

export function allSoftwareTaskIds(): string[] {
  return softwareCategories.flatMap((category, categoryIndex) =>
    category.sections.flatMap((section, sectionIndex) =>
      section.items.map((_, itemIndex) => `s${categoryIndex}-g${sectionIndex}-t${itemIndex}`),
    ),
  )
}
