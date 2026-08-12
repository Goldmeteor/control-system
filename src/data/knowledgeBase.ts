export interface KnowledgeItem {
  title: string
  text: string
  ref?: string
}

export interface KnowledgeTab {
  id: string
  label: string
  description: string
}

export const knowledgeTabs: KnowledgeTab[] = [
  { id: 'terms', label: '术语速查', description: '常用技术名词一句话解释' },
  { id: 'commands', label: '命令速查', description: 'Docker、Git、Linux、npm、conda 常用命令' },
  { id: 'resources', label: '学习资源', description: '课程、文档、靶场与社区' },
  { id: 'misc', label: '杂项知识', description: '容易混淆但值得记住的小知识点' },
]

export const knowledgeItems: Record<string, KnowledgeItem[]> = {
  terms: [
    { title: '编译型', text: '源代码运行前先编译成机器码或字节码，错误提前暴露。', ref: 'Go、C、C++、Java' },
    { title: '解释型', text: '源代码由解释器逐行执行，上手快但运行时才暴露错误。', ref: 'Python、JavaScript' },
    { title: 'SDK', text: '官方提供的一整套开发工具，包括库、编译器、调试器和文档。', ref: 'JDK、.NET SDK、Go SDK' },
    { title: 'curl', text: '命令行 HTTP 客户端，用来调试和自动化请求。', ref: 'GET/POST/Header' },
    { title: 'CSS', text: '网页样式描述语言，负责颜色、布局和动画。', ref: 'Cascading Style Sheets' },
    { title: 'CCS', text: '在不同领域含义不同，前端指 CSS，控制领域常指 Code Composer Studio。', ref: '防混淆' },
    { title: 'JSON', text: '前后端数据交换的标准文本格式。', ref: 'JavaScript Object Notation' },
    { title: 'YAML', text: '配置文件格式，缩进敏感。', ref: 'docker-compose.yml' },
    { title: 'Redis', text: '内存缓存数据库，常用于缓存、会话和消息队列。', ref: 'Remote Dictionary Server' },
    { title: 'Vue', text: '前端框架，把页面拆成组件。', ref: 'Vue 3' },
    { title: 'Vite', text: '前端构建工具，开发快、构建快。', ref: 'npm create vue@latest' },
    { title: 'npm', text: 'JavaScript 包管理器。', ref: 'Node Package Manager' },
    { title: 'TCP', text: '可靠传输协议，有连接、确认和重传。', ref: '面向连接' },
    { title: 'HTTP', text: '网页通信协议，明文传输。', ref: 'HyperText Transfer Protocol' },
    { title: 'HTTPS', text: 'HTTP + TLS 加密，防止窃听和篡改。', ref: 'SSL/TLS' },
    { title: 'SSH', text: '安全远程登录协议，常用于服务器管理。', ref: 'Secure Shell' },
    { title: 'RESTful API', text: '用 HTTP 方法和资源路径设计接口。', ref: 'GET/POST/PUT/DELETE' },
    { title: 'JWT', text: '无状态登录凭证，通常放在 Authorization 请求头。', ref: 'JSON Web Token' },
    { title: 'OAuth', text: '第三方授权协议，让应用访问用户资源。', ref: '授权码流程' },
    { title: 'OWASP', text: 'Web 安全权威组织，发布 Top 10 漏洞清单。', ref: 'Open Worldwide Application Security Project' },
    { title: 'nginx', text: '高性能 Web 服务器和反向代理。', ref: 'Nginx' },
    { title: 'Docker', text: '容器化部署工具，把应用和依赖打包。', ref: '镜像、容器' },
    { title: 'docker-compose', text: '多容器编排工具，用一个 YAML 管理多个服务。', ref: 'Docker Compose' },
    { title: 'Anaconda', text: 'Python 环境与包管理工具。', ref: 'conda' },
    { title: 'MCP', text: 'AI 连接外部工具和数据的协议。', ref: 'Model Context Protocol' },
    { title: 'Skills', text: 'AI 可复用的技能包，以 SKILL.md 为核心。', ref: 'Codex Skills' },
    { title: 'WebP', text: '谷歌推出的图片格式，压缩率高。', ref: 'WebP' },
    { title: 'pytest', text: 'Python 测试框架。', ref: 'pytest' },
    { title: 'Git', text: '分布式版本控制工具。', ref: 'git' },
    { title: 'CI/CD', text: '持续集成与持续部署，自动化构建发布流水线。', ref: 'GitHub Actions' },
  ],
  commands: [
    { title: 'Docker 构建', text: 'docker build -t app .', ref: '构建镜像' },
    { title: 'Docker 运行', text: 'docker run -p 8080:80 app', ref: '端口映射' },
    { title: 'Docker Compose 启动', text: 'docker compose up -d', ref: '后台启动' },
    { title: 'Docker Compose 停止', text: 'docker compose down', ref: '停止服务' },
    { title: 'Git 添加', text: 'git add .', ref: '暂存' },
    { title: 'Git 提交', text: 'git commit -m "feat: xxx"', ref: '提交信息规范' },
    { title: 'Git 推送', text: 'git push', ref: '推送到远程' },
    { title: 'SSH 登录', text: 'ssh user@server', ref: '远程登录' },
    { title: '查看目录', text: 'ls -la', ref: 'Linux' },
    { title: '重启服务', text: 'systemctl restart nginx', ref: 'systemd' },
    { title: '创建 Vue 项目', text: 'npm create vue@latest', ref: 'Vite' },
    { title: '启动开发服务器', text: 'npm run dev', ref: '本地开发' },
    { title: '创建 conda 环境', text: 'conda create -n env python=3.11', ref: 'Anaconda' },
    { title: '激活环境', text: 'conda activate env', ref: 'Anaconda' },
    { title: 'curl GET', text: 'curl https://api.example.com/users', ref: 'API 调试' },
    { title: 'curl POST JSON', text: 'curl -X POST -H "Content-Type: application/json" -d \'{"name":"x"}\' URL', ref: 'API 调试' },
  ],
  resources: [
    { title: 'MDN Web Docs', text: '前端和 Web 标准权威文档。', ref: 'https://developer.mozilla.org/' },
    { title: 'Vue 官方文档', text: 'Vue 框架学习主线。', ref: 'https://vuejs.org/' },
    { title: 'FastAPI 官方文档', text: 'Python 后端接口框架。', ref: 'https://fastapi.tiangolo.com/' },
    { title: 'Docker 官方文档', text: '容器与镜像。', ref: 'https://docs.docker.com/' },
    { title: 'OWASP Top 10', text: 'Web 安全风险清单。', ref: 'https://owasp.org/www-project-top-ten/' },
    { title: 'TryHackMe', text: '引导式安全学习平台。', ref: 'https://tryhackme.com/' },
    { title: 'Hugging Face', text: '模型和数据集平台。', ref: 'https://huggingface.co/' },
    { title: 'Ollama', text: '本地运行大模型工具。', ref: 'https://ollama.com/' },
  ],
  misc: [
    { title: 'Java 与 JavaScript', text: '两者只是语法相似，Java 是编译型企业语言，JavaScript 是网页脚本语言。' },
    { title: 'CSS 与 CCS', text: '前端看 CSS，控制实验室看 Code Composer Studio。' },
    { title: 'JSON 与 YAML', text: 'JSON 适合数据交换，YAML 适合配置文件，但缩进敏感。' },
    { title: 'Docker 与虚拟机', text: 'Docker 共享内核更轻量，虚拟机隔离更彻底。' },
    { title: 'Anaconda 与 Docker', text: 'Anaconda 管 Python 包，Docker 管整个运行环境。' },
    { title: 'MCP 与 Skills', text: 'MCP 是连接外部工具的协议，Skills 是固化工作流的技能包。' },
    { title: '训练与微调', text: '训练是从头学习，微调是在已有模型上定制。' },
    { title: '红队与蓝队', text: '红队模拟攻击，蓝队负责防御，紫队做攻防演练。' },
  ],
}
