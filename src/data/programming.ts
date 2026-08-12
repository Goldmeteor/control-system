import type {
  StudyChecklist,
  StudyResource,
  StudyTemplate,
  StudyWeek,
} from '../types'

export const programmingWeeks: StudyWeek[] = [
  {
    id: 1,
    title: '编程语言总览与选型',
    tag: '语言总览',
    summary: '搞懂编译解释与静态动态类型',
    objective: '建立编程语言选型直觉，理解不同语言适合什么场景。',
    color: '#6ee7ff',
    groups: [
      { name: '理论', tasks: ['编译型与解释型区别', '静态类型与动态类型区别', 'Node.js、C、C++、C#、VB、R 定位'] },
      { name: '实现', tasks: ['安装 Python、Node.js 和 Go', '分别运行 Hello World', '用 curl 请求一个公开 API'] },
      { name: '结果', tasks: ['记录三种语言运行结果', '写一张语言选型表', '完成第一份学习笔记'] },
    ],
    deliverable: '三语言 Hello World、选型表、学习笔记。',
    gate: '能解释编译型与解释型、静态与动态类型的区别。',
  },
  {
    id: 2,
    title: '开发环境与 SDK',
    tag: '环境与SDK',
    summary: '把语言和工具链装明白',
    objective: '理解语言、SDK、包管理器和编辑器之间的关系。',
    color: '#62d5a7',
    groups: [
      { name: '理论', tasks: ['SDK 与语言的关系', '包管理器：npm/pip/go mod', '环境变量与 PATH'] },
      { name: '实现', tasks: ['配置 VS Code 调试', '初始化 npm/pip/go 项目', '安装并验证一个常用库'] },
      { name: '结果', tasks: ['环境检查报告', '能运行一个带依赖的小脚本', 'LeetCode 数组/字符串 2 题'] },
    ],
    deliverable: '可复现的开发环境与依赖清单。',
    gate: '能在新电脑上按文档复现环境。',
  },
  {
    id: 3,
    title: 'Go 基础语法',
    tag: 'Go基础',
    summary: '学会编译型静态语言的核心写法',
    objective: '掌握 Go 的包、变量、函数、并发和 HTTP 基础。',
    color: '#ffd166',
    groups: [
      { name: '理论', tasks: ['Go 包与导入', '变量、函数、结构体', 'goroutine 与 channel 概念'] },
      { name: '实现', tasks: ['编写 Go 命令行工具', '实现一个简单 HTTP 服务', '使用 gofmt 格式化'] },
      { name: '结果', tasks: ['CLI 工具可运行', 'HTTP 服务可访问', 'LeetCode 链表/哈希 2 题'] },
    ],
    deliverable: 'Go CLI 工具和 HTTP 服务源码。',
    gate: '能解释 goroutine 为什么适合高并发 I/O。',
  },
  {
    id: 4,
    title: 'JavaScript 基础',
    tag: 'JS基础',
    summary: '打通前端与 Node.js 的共用语言',
    objective: '掌握变量、函数、对象、数组、异步与模块化。',
    color: '#ff9f6e',
    groups: [
      { name: '理论', tasks: ['var/let/const', '函数与箭头函数', 'Promise 与 async/await'] },
      { name: '实现', tasks: ['写一个 Node.js 脚本', '用 fetch 请求 API', '使用 CommonJS/ESM 模块'] },
      { name: '结果', tasks: ['脚本输出结果文件', '能解释事件循环', 'LeetCode 树/图基础 2 题'] },
    ],
    deliverable: 'Node.js 脚本与异步请求示例。',
    gate: '能解释 Promise 和 async/await 的区别。',
  },
  {
    id: 5,
    title: 'Python 与控制仿真',
    tag: 'Python与控制',
    summary: '把控制专业优势接入编程',
    objective: '掌握 Python 数据处理、科学计算和简单控制系统仿真。',
    color: '#4cc9f0',
    groups: [
      { name: '理论', tasks: ['numpy/scipy/matplotlib', '信号与系统基本概念', '阶跃响应与传递函数'] },
      { name: '实现', tasks: ['实现一阶系统阶跃响应', '绘制响应曲线', '封装成可复用函数'] },
      { name: '结果', tasks: ['仿真图与代码', '写一段中文解释', 'LeetCode 动态规划入门 2 题'] },
    ],
    deliverable: '一阶系统仿真脚本与结果图。',
    gate: '能解释传递函数和阶跃响应在代码里如何对应。',
  },
  {
    id: 6,
    title: 'curl 与 API 调试',
    tag: 'API调试',
    summary: '用命令行直接和接口对话',
    objective: '掌握 GET/POST、请求头、请求体和响应调试。',
    color: '#f9844a',
    groups: [
      { name: '理论', tasks: ['HTTP 方法与状态码', 'JSON 请求体', 'Authorization 请求头'] },
      { name: '实现', tasks: ['用 curl 请求公开 API', '用 curl POST JSON 数据', '用 python -m json.tool 格式化'] },
      { name: '结果', tasks: ['记录 5 个 curl 示例', '能读取并解释响应头', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'curl 调试笔记和 5 个可直接复用的命令。',
    gate: '能独立用 curl 完成一次带鉴权的 API 请求。',
  },
  {
    id: 7,
    title: '综合脚本练习',
    tag: '综合脚本',
    summary: '把语言能力变成真实产出',
    objective: '独立完成一个跨语言的小工具项目。',
    color: '#e76f51',
    groups: [
      { name: '理论', tasks: ['脚本设计思路', '错误处理', '文件读写'] },
      { name: '实现', tasks: ['写一个数据整理脚本', '加入命令行参数', '加入错误提示'] },
      { name: '结果', tasks: ['脚本能处理真实文件', 'README 说明用法', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '可复用脚本和 README。',
    gate: '其他人按 README 能运行你的脚本。',
  },
  {
    id: 8,
    title: '学习复盘与验收',
    tag: '复盘验收',
    summary: '整理编程基础阶段的证据包',
    objective: '复盘 8 周内容，完成阶段验收。',
    color: '#6a4c93',
    groups: [
      { name: '理论', tasks: ['整理语言选型结论', '整理 SDK 与环境知识', '整理常见坑'] },
      { name: '实现', tasks: ['汇总所有脚本和项目', '写阶段报告', '准备作品集片段'] },
      { name: '结果', tasks: ['完成 8 周验收清单', '能向别人讲清语言选型', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '编程基础阶段报告和验收清单。',
    gate: '能独立讲清 Go、JS、Python 各自适合什么场景。',
  },
]

export const programmingResources: StudyResource[] = [
  { id: 'mdn', category: '文档', title: 'MDN Web Docs', link: 'https://developer.mozilla.org/', note: 'JavaScript 与 Web 标准权威参考。' },
  { id: 'go-doc', category: '文档', title: 'Go 官方文档', link: 'https://go.dev/doc/', note: 'Go 语法、标准库和工具链。' },
  { id: 'python-doc', category: '文档', title: 'Python 官方文档', link: 'https://docs.python.org/', note: 'Python 标准库与教程。' },
  { id: 'curl-doc', category: '文档', title: 'curl 官方手册', link: 'https://curl.se/docs/manpage.html', note: '所有 curl 参数说明。' },
  { id: 'node-doc', category: '文档', title: 'Node.js 官方文档', link: 'https://nodejs.org/docs/latest/', note: 'Node.js 内置模块与 API。' },
  { id: 'vscode', category: '工具', title: 'VS Code 文档', link: 'https://code.visualstudio.com/docs', note: '调试、扩展和快捷键。' },
]

export const programmingChecklists: StudyChecklist[] = [
  {
    id: 'env',
    title: '开发环境自查清单',
    description: '每次换机器或新建项目前检查一遍。',
    items: [
      { text: '语言版本固定', reference: 'requirements / go.mod / package.json' },
      { text: '依赖可复现安装', reference: 'pip / npm / go mod' },
      { text: '环境变量不硬编码', reference: '.env 或系统环境' },
      { text: '编辑器能调试和格式化', reference: 'VS Code' },
    ],
  },
  {
    id: 'script',
    title: '脚本质量自查清单',
    description: '小工具也需要基础工程规范。',
    items: [
      { text: '有输入校验和错误提示', reference: '健壮性' },
      { text: '输出结果可复现', reference: '固定种子/参数' },
      { text: 'README 说明运行方式', reference: '文档' },
      { text: '没有把密钥写进代码', reference: '安全' },
    ],
  },
]

export const programmingTemplates: StudyTemplate[] = [
  {
    id: 'lang-note',
    title: '语言学习笔记模板',
    description: '每学一门语言都填一张。',
    fields: [
      { label: '定位', hint: '这门语言最适合什么场景' },
      { label: '语法特点', hint: '类型、分号、缩进、并发' },
      { label: '环境与 SDK', hint: '版本、包管理、调试方式' },
      { label: '最小示例', hint: 'Hello World 和一个小工具' },
      { label: '易错点', hint: '写代码时最容易踩的坑' },
    ],
  },
  {
    id: 'experiment',
    title: '脚本实验记录模板',
    description: '每次写脚本都记录输入、输出和结论。',
    fields: [
      { label: '目标', hint: '这个脚本要解决什么问题' },
      { label: '输入', hint: '数据、参数、命令' },
      { label: '输出', hint: '文件、终端输出、图表' },
      { label: '运行环境', hint: '系统、语言版本、依赖' },
      { label: '结论', hint: '是否达到预期，下一步怎么做' },
    ],
  },
]

export function allProgrammingTaskIds(): string[] {
  return programmingWeeks.flatMap((week) =>
    week.groups.flatMap((group, groupIndex) =>
      group.tasks.map((_, taskIndex) => `pg${week.id}-g${groupIndex}-t${taskIndex}`),
    ),
  )
}
