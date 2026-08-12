import type {
  StudyChecklist,
  StudyResource,
  StudyTemplate,
  StudyWeek,
} from '../types'

export const aiTechWeeks: StudyWeek[] = [
  {
    id: 1,
    title: 'MCP 与 AI 工具连接',
    tag: 'MCP',
    summary: '理解 AI 如何连接外部世界',
    objective: '理解 Model Context Protocol 的作用，并完成一次工具调用。',
    color: '#6ee7ff',
    groups: [
      { name: '理论', tasks: ['MCP 是什么', 'MCP 与 API 的区别', '客户端、服务端、工具'] },
      { name: '实现', tasks: ['配置一个本地 MCP 服务', '查看工具列表', '调用一次工具'] },
      { name: '结果', tasks: ['MCP 使用记录', '工具调用日志', '写一篇 MCP 笔记'] },
    ],
    deliverable: 'MCP 配置与调用记录。',
    gate: '能解释 MCP 为什么像 AI 的 USB-C 接口。',
  },
  {
    id: 2,
    title: 'AI Skills 技能包',
    tag: 'Skills',
    summary: '把重复工作固化成技能',
    objective: '理解 Skills 与 MCP 的区别，并设计一个自己的技能包。',
    color: '#62d5a7',
    groups: [
      { name: '理论', tasks: ['Skills 是什么', 'Skills 与 MCP 分工', 'SKILL.md 结构'] },
      { name: '实现', tasks: ['设计一个技能目录', '写最小 SKILL.md', '测试技能描述'] },
      { name: '结果', tasks: ['技能包草稿', '使用说明', '写一篇对比笔记'] },
    ],
    deliverable: '一个可安装的最小技能包草稿。',
    gate: '能说清 MCP 和 Skills 分别解决什么问题。',
  },
  {
    id: 3,
    title: 'Hugging Face 模型生态',
    tag: 'HF生态',
    summary: '找到模型、数据集和推理代码',
    objective: '理解 Hugging Face 的模型、数据集、Spaces 生态。',
    color: '#ffd166',
    groups: [
      { name: '理论', tasks: ['模型仓库与数据集', 'transformers 库', 'Pipeline 推理'] },
      { name: '实现', tasks: ['加载一个小模型', '用 Pipeline 推理', '记录显存占用'] },
      { name: '结果', tasks: ['推理脚本', '模型信息表', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'Hugging Face 推理脚本和运行记录。',
    gate: '能用 transformers 加载模型并完成一次推理。',
  },
  {
    id: 4,
    title: 'Apple Silicon 与 MLX',
    tag: 'MLX',
    summary: '在苹果统一内存上跑模型',
    objective: '理解 Apple Silicon 统一内存和 MLX 框架。',
    color: '#ff9f6e',
    groups: [
      { name: '理论', tasks: ['统一内存原理', 'MLX 与 NumPy 相似性', 'mlx-lm 用法'] },
      { name: '实现', tasks: ['安装 mlx-lm', '运行一个量化模型', '对比 CPU/GPU 使用'] },
      { name: '结果', tasks: ['MLX 运行记录', '资源占用对比', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'MLX 本地模型运行记录。',
    gate: '能解释统一内存为什么适合本地大模型。',
  },
  {
    id: 5,
    title: '量化与 GGUF',
    tag: '量化',
    summary: '给大模型减肥',
    objective: '理解量化原理，并用 Ollama 运行 GGUF 模型。',
    color: '#4cc9f0',
    groups: [
      { name: '理论', tasks: ['量化为什么能省显存', 'GGUF 格式', 'Q4/Q8 精度差异'] },
      { name: '实现', tasks: ['用 Ollama 拉取量化模型', '运行对话', '记录模型大小与速度'] },
      { name: '结果', tasks: ['量化对比表', 'Ollama 使用笔记', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'Ollama 量化模型运行报告。',
    gate: '能解释量化如何降低模型运行成本。',
  },
  {
    id: 6,
    title: 'vLLM 推理部署',
    tag: 'vLLM',
    summary: '把模型变成标准 API',
    objective: '使用 vLLM 部署 OpenAI 兼容接口。',
    color: '#f9844a',
    groups: [
      { name: '理论', tasks: ['PagedAttention', '连续批处理', 'OpenAI 兼容接口'] },
      { name: '实现', tasks: ['用 vLLM 启动服务', '用 curl 调用', '测试并发请求'] },
      { name: '结果', tasks: ['API 调用记录', '并发测试结果', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'vLLM 部署脚本和 API 测试记录。',
    gate: '能用标准 OpenAI 格式调用本地模型。',
  },
  {
    id: 7,
    title: 'SGLang 推理引擎',
    tag: 'SGLang',
    summary: '对比主流推理引擎',
    objective: '理解 SGLang 特点，并与 vLLM 做对比实验。',
    color: '#e76f51',
    groups: [
      { name: '理论', tasks: ['SGLang 特性', 'RadixAttention', '与 vLLM 差异'] },
      { name: '实现', tasks: ['部署 SGLang', '跑同一模型', '记录吞吐与延迟'] },
      { name: '结果', tasks: ['引擎对比表', '实验数据', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'vLLM 与 SGLang 对比实验记录。',
    gate: '能说明 SGLang 和 vLLM 各自适合什么场景。',
  },
  {
    id: 8,
    title: 'QLoRA 低成本微调',
    tag: 'QLoRA',
    summary: '在少量显存里定制模型',
    objective: '理解 LoRA/QLoRA 原理，并完成一次最小微调。',
    color: '#6a4c93',
    groups: [
      { name: '理论', tasks: ['LoRA 低秩适配', 'QLoRA 量化微调', 'peft 与 transformers'] },
      { name: '实现', tasks: ['准备小型数据集', '运行 QLoRA 微调', '保存并加载 LoRA'] },
      { name: '结果', tasks: ['微调脚本', '效果对比', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: 'QLoRA 最小微调实验记录。',
    gate: '能解释 LoRA 为什么比全量微调更省资源。',
  },
  {
    id: 9,
    title: 'JSONL 训练数据',
    tag: 'JSONL',
    summary: '把数据整理成模型能吃的格式',
    objective: '掌握 JSONL 格式和处理脚本。',
    color: '#ffd166',
    groups: [
      { name: '理论', tasks: ['JSONL 与 JSON 区别', '指令数据格式', '数据清洗'] },
      { name: '实现', tasks: ['构造 100 条训练样本', '写读取脚本', '检查数据质量'] },
      { name: '结果', tasks: ['数据集文件', '统计报告', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '100 条 JSONL 训练数据和处理脚本。',
    gate: '能解释为什么要用 JSONL 而不是大 JSON。',
  },
  {
    id: 10,
    title: '全模态模型',
    tag: '全模态',
    summary: '文本、图像、音频一起理解',
    objective: '了解多模态模型的能力边界。',
    color: '#8b7cff',
    groups: [
      { name: '理论', tasks: ['多模态输入', '视觉编码器', '能力与限制'] },
      { name: '实现', tasks: ['找一个多模态模型', '输入图片', '对比文本输出'] },
      { name: '结果', tasks: ['多模态实验记录', '能力清单', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '多模态模型实验记录。',
    gate: '能说明多模态模型的输入和输出边界。',
  },
  {
    id: 11,
    title: '本地部署全链路',
    tag: '部署链路',
    summary: '把模型、数据、接口串起来',
    objective: '完成一次“下载模型 → 量化 → 部署 API → 调用”全链路。',
    color: '#5ee6a8',
    groups: [
      { name: '理论', tasks: ['全链路架构', '显存与吞吐', '服务稳定性'] },
      { name: '实现', tasks: ['下载量化模型', '用 vLLM 部署', '用脚本批量调用'] },
      { name: '结果', tasks: ['全链路文档', '接口测试结果', 'LeetCode 每周 2-3 题'] },
    ],
    deliverable: '本地大模型部署全链路文档。',
    gate: '能把模型从下载到 API 调用完整跑通。',
  },
  {
    id: 12,
    title: 'AI 项目复盘与交付',
    tag: 'AI交付',
    summary: '整理成可展示的 AI 作品集',
    objective: '把 12 周实验整理成项目作品集。',
    color: '#4cc9f0',
    groups: [
      { name: '理论', tasks: ['AI 项目文档结构', '实验证据整理', '展示重点'] },
      { name: '实现', tasks: ['汇总所有脚本', '写 README', '录制演示'] },
      { name: '结果', tasks: ['AI 作品集', '复盘报告', '最终验收清单'] },
    ],
    deliverable: 'AI技术阶段作品集和复盘报告。',
    gate: '能完整展示自己的 AI 实验路径。',
  },
]

export const aiTechResources: StudyResource[] = [
  { id: 'mcp-doc', category: '协议', title: 'Model Context Protocol 文档', link: 'https://modelcontextprotocol.io/', note: 'MCP 官方规范。' },
  { id: 'hf', category: '平台', title: 'Hugging Face', link: 'https://huggingface.co/', note: '模型、数据集和推理工具。' },
  { id: 'ollama', category: '工具', title: 'Ollama', link: 'https://ollama.com/', note: '一行命令运行本地模型。' },
  { id: 'vllm', category: '工具', title: 'vLLM', link: 'https://docs.vllm.ai/', note: '高性能推理引擎。' },
  { id: 'sglang', category: '工具', title: 'SGLang', link: 'https://docs.sglang.ai/', note: '推理引擎与结构化生成。' },
  { id: 'mlx', category: '工具', title: 'MLX', link: 'https://ml-explore.github.io/mlx/', note: 'Apple Silicon 上的机器学习框架。' },
  { id: 'peft', category: '库', title: 'PEFT 文档', link: 'https://huggingface.co/docs/peft/', note: 'LoRA/QLoRA 微调。' },
]

export const aiTechChecklists: StudyChecklist[] = [
  {
    id: 'local-model',
    title: '本地模型运行清单',
    description: '部署本地模型前的关键检查。',
    items: [
      { text: '显存/内存是否满足模型需求', reference: '资源评估' },
      { text: '模型格式是否为 GGUF 或兼容格式', reference: '格式' },
      { text: 'API 是否 OpenAI 兼容', reference: '接口' },
      { text: '是否记录模型版本和参数', reference: '复现性' },
    ],
  },
  {
    id: 'fine-tune',
    title: '微调实验清单',
    description: '避免微调变成玄学。',
    items: [
      { text: '数据量与质量足够', reference: '数据集' },
      { text: '有 Baseline 对比', reference: '原模型' },
      { text: '固定随机种子和参数', reference: '可复现' },
      { text: '记录训练损失和效果变化', reference: '实验记录' },
    ],
  },
]

export const aiTechTemplates: StudyTemplate[] = [
  {
    id: 'model-log',
    title: '模型实验记录模板',
    description: '每个模型实验都填一张。',
    fields: [
      { label: '模型与版本', hint: '名称、量化等级、来源' },
      { label: '硬件环境', hint: 'GPU/统一内存、显存' },
      { label: '运行方式', hint: 'Ollama/vLLM/SGLang/MLX' },
      { label: '结果', hint: '速度、内存、质量' },
      { label: '结论', hint: '这个配置是否可用' },
    ],
  },
  {
    id: 'api-test',
    title: 'API 调用模板',
    description: '记录接口参数和返回结果。',
    fields: [
      { label: '接口地址', hint: '本地或远程 URL' },
      { label: '请求体', hint: 'model、messages、temperature' },
      { label: '响应', hint: '返回内容与 token 数' },
      { label: '错误', hint: '状态码和错误信息' },
      { label: '优化', hint: '下一步如何调整' },
    ],
  },
]

export function allAiTechTaskIds(): string[] {
  return aiTechWeeks.flatMap((week) =>
    week.groups.flatMap((group, groupIndex) =>
      group.tasks.map((_, taskIndex) => `ai${week.id}-g${groupIndex}-t${taskIndex}`),
    ),
  )
}
