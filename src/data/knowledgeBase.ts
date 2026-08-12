export interface KnowledgeItem {
  id: string
  title: string
  text: string
  ref?: string
  link?: string
  detail?: { heading: string; content: string[] }[]
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

export const knowledgeGroupOrder = [
  '编程语言',
  'Web 前端',
  '数据与存储',
  '网络与安全',
  'API 与鉴权',
  '部署运维',
  'AI 与工具',
  '软件工程',
  '容器与部署',
  'Git',
  'Linux',
  '前端工具',
  '环境管理',
  'API 调试',
  '学习资源',
  '安全资源',
  '模型资源',
  '概念辨析',
]

export const knowledgeGroupMap: Record<string, string> = {
  'compiled-language': '编程语言',
  'interpreted-language': '编程语言',
  typescript: '编程语言',
  sdk: '编程语言',
  curl: '编程语言',
  css: 'Web 前端',
  ccs: 'Web 前端',
  vue: 'Web 前端',
  vite: 'Web 前端',
  npm: 'Web 前端',
  webp: 'Web 前端',
  json: '数据与存储',
  yaml: '数据与存储',
  redis: '数据与存储',
  tcp: '网络与安全',
  http: '网络与安全',
  https: '网络与安全',
  tls: '网络与安全',
  ssh: '网络与安全',
  owasp: '网络与安全',
  'restful-api': 'API 与鉴权',
  jwt: 'API 与鉴权',
  oauth: 'API 与鉴权',
  nginx: '部署运维',
  docker: '部署运维',
  'docker-compose': '部署运维',
  anaconda: '部署运维',
  mcp: 'AI 与工具',
  skills: 'AI 与工具',
  pytest: '软件工程',
  git: '软件工程',
  'ci-cd': '软件工程',
  'docker-build': '容器与部署',
  'docker-run': '容器与部署',
  'docker-compose-up': '容器与部署',
  'docker-compose-down': '容器与部署',
  'git-add': 'Git',
  'git-commit': 'Git',
  'git-push': 'Git',
  'ssh-login': 'Linux',
  'ls-la': 'Linux',
  'systemctl-restart': 'Linux',
  'npm-create-vue': '前端工具',
  'npm-run-dev': '前端工具',
  'conda-create': '环境管理',
  'conda-activate': '环境管理',
  'curl-get': 'API 调试',
  'curl-post': 'API 调试',
  mdn: '学习资源',
  'vue-docs': '学习资源',
  'fastapi-docs': '学习资源',
  'docker-docs': '学习资源',
  'owasp-top10': '安全资源',
  tryhackme: '安全资源',
  huggingface: '模型资源',
  ollama: '模型资源',
  'java-js': '概念辨析',
  'css-ccs': '概念辨析',
  'json-yaml': '概念辨析',
  'docker-vm': '概念辨析',
  'anaconda-docker': '概念辨析',
  'mcp-skills': '概念辨析',
  'training-finetune': '概念辨析',
  'red-blue-team': '概念辨析',
}

export const knowledgeItems: Record<string, KnowledgeItem[]> = {
  terms: [
    { id: 'compiled-language', title: '编译型', text: '源代码运行前先编译成机器码或字节码，错误提前暴露。', ref: 'Go、C、C++、Java' },
    { id: 'interpreted-language', title: '解释型', text: '源代码由解释器逐行执行，上手快但运行时才暴露错误。', ref: 'Python、JavaScript' },
    { id: 'typescript', title: 'TypeScript', text: 'JavaScript 的超集，在 JS 基础上加入静态类型检查。', ref: 'TS、类型系统' },
    { id: 'sdk', title: 'SDK', text: '官方提供的一整套开发工具，包括库、编译器、调试器和文档。', ref: 'JDK、.NET SDK、Go SDK' },
    { id: 'curl', title: 'curl', text: '命令行 HTTP 客户端，用来调试和自动化请求。', ref: 'GET/POST/Header' },
    { id: 'css', title: 'CSS', text: '网页样式描述语言，负责颜色、布局和动画。', ref: 'Cascading Style Sheets' },
    { id: 'ccs', title: 'CCS', text: '在不同领域含义不同，前端指 CSS，控制领域常指 Code Composer Studio。', ref: '防混淆' },
    { id: 'json', title: 'JSON', text: '前后端数据交换的标准文本格式。', ref: 'JavaScript Object Notation' },
    { id: 'yaml', title: 'YAML', text: '配置文件格式，缩进敏感。', ref: 'docker-compose.yml' },
    { id: 'redis', title: 'Redis', text: '内存缓存数据库，常用于缓存、会话和消息队列。', ref: 'Remote Dictionary Server' },
    { id: 'vue', title: 'Vue', text: '前端框架，把页面拆成组件。', ref: 'Vue 3' },
    { id: 'vite', title: 'Vite', text: '前端构建工具，开发快、构建快。', ref: 'npm create vue@latest' },
    { id: 'npm', title: 'npm', text: 'JavaScript 包管理器。', ref: 'Node Package Manager' },
    { id: 'tcp', title: 'TCP', text: '可靠传输协议，有连接、确认和重传。', ref: '面向连接' },
    { id: 'http', title: 'HTTP', text: '网页通信协议，明文传输。', ref: 'HyperText Transfer Protocol' },
    { id: 'https', title: 'HTTPS', text: 'HTTP + TLS 加密，防止窃听和篡改。', ref: 'SSL/TLS' },
    { id: 'ssh', title: 'SSH', text: '安全远程登录协议，常用于服务器管理。', ref: 'Secure Shell' },
    { id: 'restful-api', title: 'RESTful API', text: '用 HTTP 方法和资源路径设计接口。', ref: 'GET/POST/PUT/DELETE' },
    { id: 'jwt', title: 'JWT', text: '无状态登录凭证，通常放在 Authorization 请求头。', ref: 'JSON Web Token' },
    { id: 'oauth', title: 'OAuth', text: '第三方授权协议，让应用访问用户资源。', ref: '授权码流程' },
    { id: 'owasp', title: 'OWASP', text: 'Web 安全权威组织，发布 Top 10 漏洞清单。', ref: 'Open Worldwide Application Security Project' },
    { id: 'nginx', title: 'nginx', text: '高性能 Web 服务器和反向代理。', ref: 'Nginx' },
    { id: 'docker', title: 'Docker', text: '容器化部署工具，把应用和依赖打包。', ref: '镜像、容器' },
    { id: 'docker-compose', title: 'docker-compose', text: '多容器编排工具，用一个 YAML 管理多个服务。', ref: 'Docker Compose' },
    { id: 'anaconda', title: 'Anaconda', text: 'Python 环境与包管理工具。', ref: 'conda' },
    { id: 'mcp', title: 'MCP', text: 'AI 连接外部工具和数据的协议。', ref: 'Model Context Protocol' },
    { id: 'skills', title: 'Skills', text: 'AI 可复用的技能包，以 SKILL.md 为核心。', ref: 'Codex Skills' },
    { id: 'webp', title: 'WebP', text: '谷歌推出的图片格式，压缩率高。', ref: 'WebP' },
    { id: 'pytest', title: 'pytest', text: 'Python 测试框架。', ref: 'pytest' },
    { id: 'git', title: 'Git', text: '分布式版本控制工具。', ref: 'git' },
    { id: 'ci-cd', title: 'CI/CD', text: '持续集成与持续部署，自动化构建发布流水线。', ref: 'GitHub Actions' },
    {
      id: 'tls',
      title: 'TLS',
      text: 'TLS 是传输层安全协议，负责为 HTTP、邮件等通信提供加密、认证和完整性保护。',
      ref: 'Transport Layer Security',
      detail: [
        {
          heading: 'TLS 是什么',
          content: [
            'TLS 是 Transport Layer Security 的缩写，前身是 SSL。',
            '它在应用层和 TCP 之间增加一层安全保护，防止数据被窃听、篡改和伪造。',
            'HTTPS 就是 HTTP over TLS，所以访问 HTTPS 网站时实际使用的是 TLS 协议。',
          ],
        },
        {
          heading: 'TLS 握手',
          content: [
            '客户端和服务器先协商协议版本、加密套件和随机数。',
            '服务器发送证书，客户端验证证书是否由可信 CA 签发。',
            '双方通过密钥交换生成会话密钥，之后用对称加密传输业务数据。',
            '握手完成后，普通 HTTP 请求就运行在加密通道内。',
          ],
        },
        {
          heading: '证书与信任链',
          content: [
            '服务器证书证明“这个公钥属于这个域名”。',
            '浏览器会检查证书有效期、域名匹配、CA 签名和吊销状态。',
            '自签名证书不会自动被信任，生产环境应使用受信任 CA 签发的证书。',
          ],
        },
        {
          heading: 'HTTPS 与 TLS 的关系',
          content: [
            'HTTPS 是 HTTP 协议与 TLS 协议的组合。',
            'TLS 解决传输安全，HTTP 解决资源语义。',
            '即使网站使用 HTTPS，应用层依然需要处理 SQL 注入、XSS 等漏洞。',
          ],
        },
        {
          heading: '常见坑',
          content: [
            '不要禁用证书校验来绕过开发报错。',
            '不要只把 TLS 终止在反向代理，却忽略后端内网明文传输风险。',
            '证书过期是最常见的线上事故，需要配置自动续期和监控。',
            'TLS 1.2 以下版本应逐步停用。',
          ],
        },
        {
          heading: 'TLS、SSL 与 SSH 的区别',
          content: [
            'TLS 是通用传输加密协议，前身是 SSL。',
            'HTTPS 使用 TLS 保护网页流量。',
            'SSH 是远程登录协议，虽然也使用加密，但用途完全不同。',
          ],
        },
      ],
    },
  ],
  commands: [
    { id: 'docker-build', title: 'Docker 构建', text: 'docker build -t app .', ref: '构建镜像' },
    { id: 'docker-run', title: 'Docker 运行', text: 'docker run -p 8080:80 app', ref: '端口映射' },
    { id: 'docker-compose-up', title: 'Docker Compose 启动', text: 'docker compose up -d', ref: '后台启动' },
    { id: 'docker-compose-down', title: 'Docker Compose 停止', text: 'docker compose down', ref: '停止服务' },
    { id: 'git-add', title: 'Git 添加', text: 'git add .', ref: '暂存' },
    { id: 'git-commit', title: 'Git 提交', text: 'git commit -m "feat: xxx"', ref: '提交信息规范' },
    { id: 'git-push', title: 'Git 推送', text: 'git push', ref: '推送到远程' },
    { id: 'ssh-login', title: 'SSH 登录', text: 'ssh user@server', ref: '远程登录' },
    { id: 'ls-la', title: '查看目录', text: 'ls -la', ref: 'Linux' },
    { id: 'systemctl-restart', title: '重启服务', text: 'systemctl restart nginx', ref: 'systemd' },
    { id: 'npm-create-vue', title: '创建 Vue 项目', text: 'npm create vue@latest', ref: 'Vite' },
    { id: 'npm-run-dev', title: '启动开发服务器', text: 'npm run dev', ref: '本地开发' },
    { id: 'conda-create', title: '创建 conda 环境', text: 'conda create -n env python=3.11', ref: 'Anaconda' },
    { id: 'conda-activate', title: '激活环境', text: 'conda activate env', ref: 'Anaconda' },
    { id: 'curl-get', title: 'curl GET', text: 'curl https://api.example.com/users', ref: 'API 调试' },
    { id: 'curl-post', title: 'curl POST JSON', text: 'curl -X POST -H "Content-Type: application/json" -d \'{"name":"x"}\' URL', ref: 'API 调试' },
  ],
  resources: [
    { id: 'mdn', title: 'MDN Web Docs', text: '前端和 Web 标准权威文档。', link: 'https://developer.mozilla.org/', ref: '官方文档' },
    { id: 'vue-docs', title: 'Vue 官方文档', text: 'Vue 框架学习主线。', link: 'https://vuejs.org/', ref: '官方文档' },
    { id: 'fastapi-docs', title: 'FastAPI 官方文档', text: 'Python 后端接口框架。', link: 'https://fastapi.tiangolo.com/', ref: '官方文档' },
    { id: 'docker-docs', title: 'Docker 官方文档', text: '容器与镜像。', link: 'https://docs.docker.com/', ref: '官方文档' },
    { id: 'owasp-top10', title: 'OWASP Top 10', text: 'Web 安全风险清单。', link: 'https://owasp.org/www-project-top-ten/', ref: '官方文档' },
    { id: 'tryhackme', title: 'TryHackMe', text: '引导式安全学习平台。', link: 'https://tryhackme.com/', ref: '实战平台' },
    { id: 'huggingface', title: 'Hugging Face', text: '模型和数据集平台。', link: 'https://huggingface.co/', ref: '模型平台' },
    { id: 'ollama', title: 'Ollama', text: '本地运行大模型工具。', link: 'https://ollama.com/', ref: '本地模型' },
  ],
  misc: [
    { id: 'java-js', title: 'Java 与 JavaScript', text: '两者只是语法相似，Java 是编译型企业语言，JavaScript 是网页脚本语言。' },
    { id: 'css-ccs', title: 'CSS 与 CCS', text: '前端看 CSS，控制实验室看 Code Composer Studio。' },
    { id: 'json-yaml', title: 'JSON 与 YAML', text: 'JSON 适合数据交换，YAML 适合配置文件，但缩进敏感。' },
    { id: 'docker-vm', title: 'Docker 与虚拟机', text: 'Docker 共享内核更轻量，虚拟机隔离更彻底。' },
    { id: 'anaconda-docker', title: 'Anaconda 与 Docker', text: 'Anaconda 管 Python 包，Docker 管整个运行环境。' },
    { id: 'mcp-skills', title: 'MCP 与 Skills', text: 'MCP 是连接外部工具的协议，Skills 是固化工作流的技能包。' },
    { id: 'training-finetune', title: '训练与微调', text: '训练是从头学习，微调是在已有模型上定制。' },
    { id: 'red-blue-team', title: '红队与蓝队', text: '红队模拟攻击，蓝队负责防御，紫队做攻防演练。' },
  ],
}

const termDetails: Record<string, { heading: string; content: string[] }[]> = {
  'compiled-language': [
    { heading: '是什么', content: ['编译型语言会在运行前把源代码翻译成机器码或字节码。', '代表语言：Go、C、C++、Java。'] },
    { heading: '为什么重要', content: ['错误能在编译期提前暴露，减少运行时事故。', '执行效率通常更高，适合性能敏感场景。'] },
    { heading: '怎么用', content: ['写完代码后先执行编译命令，再运行产物。', '在 CI 里把编译检查作为第一道关卡。'] },
  ],
  'interpreted-language': [
    { heading: '是什么', content: ['解释型语言由解释器逐行执行，不需要单独编译。', '代表语言：Python、JavaScript。'] },
    { heading: '为什么重要', content: ['上手快、跨平台，适合快速开发和脚本自动化。', '但运行时才暴露错误，需要测试兜底。'] },
    { heading: '怎么用', content: ['直接运行脚本或启动解释器。', '用类型注解和测试提升可靠性。'] },
  ],
  typescript: [
    { heading: '是什么', content: ['TypeScript 是 JavaScript 的超集，增加了静态类型系统。', '最终会被编译成 JavaScript 运行。'] },
    { heading: '为什么重要', content: ['在写代码阶段就能发现类型错误。', '大型项目里更容易维护和重构。'] },
    { heading: '怎么用', content: ['通过 tsconfig.json 管理编译配置。', '用 interface、type、泛型描述数据结构。', '运行 vue-tsc 或 tsc 做类型检查。'] },
  ],
  sdk: [
    { heading: '是什么', content: ['SDK 是官方提供的一整套开发工具包。', '通常包含库、编译器、调试器、文档和示例。'] },
    { heading: '为什么重要', content: ['开发不需要从零实现底层能力。', '语言和 SDK 配合才能高效写出软件。'] },
    { heading: '怎么用', content: ['先安装对应平台 SDK。', '按官方文档初始化项目并调用 API。', '示例：Java 用 JDK，Go 用 Go SDK。'] },
  ],
  curl: [
    { heading: '是什么', content: ['curl 是命令行 HTTP 客户端，用来发送 GET/POST 等请求。', '几乎所有系统都自带或可安装。'] },
    { heading: '为什么重要', content: ['后端写完接口后先用 curl 自测。', '可以脚本化，适合自动化测试。'] },
    { heading: '怎么用', content: ['GET：curl https://api.example.com/users', 'POST：curl -X POST -H "Content-Type: application/json" -d \'{"name":"x"}\' URL', '调试：加 -i 看响应头，加 -v 看详细过程。'] },
  ],
  css: [
    { heading: '是什么', content: ['CSS 是层叠样式表，负责网页的颜色、布局和动画。', 'HTML 管结构，CSS 管外观，JavaScript 管交互。'] },
    { heading: '为什么重要', content: ['没有 CSS 的网页只有文字结构。', '响应式布局主要靠 CSS 实现。'] },
    { heading: '怎么用', content: ['选择器 { 属性: 值 } 定义样式。', '用 Flexbox 和 Grid 做布局。', '用媒体查询适配不同屏幕。'] },
  ],
  ccs: [
    { heading: '是什么', content: ['CCS 在不同领域含义不同。', '前端领域常指 CSS，控制领域常指 Code Composer Studio。'] },
    { heading: '为什么重要', content: ['查资料时容易混淆，需要根据上下文判断。', '控制专业看到 CCS 很可能指 TI 的 DSP 开发环境。'] },
    { heading: '怎么用', content: ['前端场景默认识别为层叠样式表。', '嵌入式场景先确认是否在讨论 Code Composer Studio。'] },
  ],
  json: [
    { heading: '是什么', content: ['JSON 是前后端交换数据的标准文本格式。', '支持对象、数组、字符串、数字、布尔值和 null。'] },
    { heading: '为什么重要', content: ['RESTful API 最常用的请求和响应格式。', '几乎所有编程语言都能解析。'] },
    { heading: '怎么用', content: ['键名用双引号，字符串也用双引号。', '用 python -m json.tool 或 jq 格式化。', '避免在 JSON 里写注释。'] },
  ],
  yaml: [
    { heading: '是什么', content: ['YAML 是配置文件格式，靠缩进表示层级。', '常用于 docker-compose、GitHub Actions、K8s。'] },
    { heading: '为什么重要', content: ['缩进错误会导致配置解析失败。', '比 JSON 更适合人类阅读。'] },
    { heading: '怎么用', content: ['统一使用空格缩进，不要混用 Tab。', '用列表、字典和字符串描述配置。', '复杂配置先格式化再提交。'] },
  ],
  redis: [
    { heading: '是什么', content: ['Redis 是内存数据库，读写速度极快。', '常用于缓存、会话、消息队列和排行榜。'] },
    { heading: '为什么重要', content: ['能显著降低数据库压力。', '适合高并发读多写少的场景。'] },
    { heading: '怎么用', content: ['用 SET/GET 做缓存。', '设置过期时间防止内存无限增长。', '注意缓存一致性，不能把 Redis 当唯一数据源。'] },
  ],
  vue: [
    { heading: '是什么', content: ['Vue 是前端框架，把界面拆成组件。', '使用响应式数据自动更新页面。'] },
    { heading: '为什么重要', content: ['能高效管理复杂页面状态。', '生态完善，适合中小型项目快速开发。'] },
    { heading: '怎么用', content: ['用 Vite 初始化项目。', '组件由 template、script、style 组成。', '通过 props 和事件在组件间通信。'] },
  ],
  vite: [
    { heading: '是什么', content: ['Vite 是前端构建工具，开发服务器启动极快。', '支持 Vue、React 等框架。'] },
    { heading: '为什么重要', content: ['热更新快，开发体验好。', '生产构建简单可靠。'] },
    { heading: '怎么用', content: ['npm create vue@latest 初始化项目。', 'npm run dev 本地开发。', 'npm run build 生产构建。'] },
  ],
  npm: [
    { heading: '是什么', content: ['npm 是 JavaScript 的包管理器。', '用于安装、发布和管理依赖。'] },
    { heading: '为什么重要', content: ['前端项目依赖都通过 npm 管理。', 'package.json 描述项目依赖和脚本。'] },
    { heading: '怎么用', content: ['npm install 安装依赖。', 'npm run dev / build 执行脚本。', '用 package-lock.json 固定依赖版本。'] },
  ],
  tcp: [
    { heading: '是什么', content: ['TCP 是可靠传输协议，提供连接、确认、重传和排序。', 'HTTP、HTTPS、SSH 都基于 TCP。'] },
    { heading: '为什么重要', content: ['保证数据不丢、不乱序。', '理解 TCP 才能理解连接和性能问题。'] },
    { heading: '怎么用', content: ['三次握手建立连接。', '流量控制和拥塞控制保障稳定性。', '与 UDP 相比延迟更高但更可靠。'] },
  ],
  http: [
    { heading: '是什么', content: ['HTTP 是网页通信协议，默认明文传输。', '客户端发请求，服务器返回响应。'] },
    { heading: '为什么重要', content: ['Web 开发每天都要处理 HTTP。', '状态码和请求方法是接口设计基础。'] },
    { heading: '怎么用', content: ['GET 获取资源，POST 提交数据，PUT 更新，DELETE 删除。', '用 2xx/3xx/4xx/5xx 判断结果。', '敏感信息必须走 HTTPS。'] },
  ],
  https: [
    { heading: '是什么', content: ['HTTPS 是 HTTP 加上 TLS 加密。', '防止数据被窃听和篡改。'] },
    { heading: '为什么重要', content: ['现代网站默认要求 HTTPS。', '浏览器会对未加密网站给出警告。'] },
    { heading: '怎么用', content: ['部署时申请 TLS 证书。', '配置强制跳转 HTTPS。', '证书要自动续期并监控。'] },
  ],
  ssh: [
    { heading: '是什么', content: ['SSH 是安全远程登录协议。', '用于管理 Linux 服务器。'] },
    { heading: '为什么重要', content: ['服务器远程操作的最常用方式。', '比明文 Telnet 安全得多。'] },
    { heading: '怎么用', content: ['ssh user@server 登录服务器。', '生产环境使用密钥登录，禁用密码。', '不要暴露公网 SSH 默认端口给所有人。'] },
  ],
  'restful-api': [
    { heading: '是什么', content: ['RESTful API 是使用 HTTP 方法操作资源的接口规范。', '资源用 URL 表示，操作用方法表示。'] },
    { heading: '为什么重要', content: ['接口设计统一，容易理解和使用。', '前后端联调成本低。'] },
    { heading: '怎么用', content: ['GET /users 获取列表。', 'POST /users 创建用户。', 'PUT /users/1 更新，DELETE /users/1 删除。'] },
  ],
  jwt: [
    { heading: '是什么', content: ['JWT 是无状态登录凭证，包含签名信息。', '通常放在 Authorization: Bearer 请求头。'] },
    { heading: '为什么重要', content: ['适合分布式系统和无状态服务。', '但无法主动吊销，需要设计过期时间。'] },
    { heading: '怎么用', content: ['登录成功后签发 JWT。', '服务端验证签名和过期时间。', '不要把敏感数据直接放进 JWT。'] },
  ],
  oauth: [
    { heading: '是什么', content: ['OAuth 是第三方授权协议。', '让应用代表用户访问受保护资源。'] },
    { heading: '为什么重要', content: ['登录第三方网站时常用。', '用户不需要把密码交给第三方应用。'] },
    { heading: '怎么用', content: ['应用跳转到授权服务器。', '用户授权后返回授权码。', '应用用授权码换访问令牌。'] },
  ],
  owasp: [
    { heading: '是什么', content: ['OWASP 是 Web 安全权威组织。', '每年发布 Top 10 漏洞清单。'] },
    { heading: '为什么重要', content: ['是 Web 安全学习的起点。', '安全测试和代码审计常以它为依据。'] },
    { heading: '怎么用', content: ['先学习 SQL 注入、XSS、CSRF。', '在 DVWA 等靶场练习。', '上线前用 OWASP 清单自测。'] },
  ],
  nginx: [
    { heading: '是什么', content: ['nginx 是高性能 Web 服务器和反向代理。', '常用于静态托管、负载均衡和 HTTPS 终止。'] },
    { heading: '为什么重要', content: ['大多数线上 Web 服务都经过 nginx。', '配置错误会导致站点无法访问。'] },
    { heading: '怎么用', content: ['配置 server 和 location。', '把请求转发到后端服务。', '配置 SSL 证书和强制 HTTPS。'] },
  ],
  docker: [
    { heading: '是什么', content: ['Docker 是容器化部署工具。', '把应用和依赖打包成镜像，运行成容器。'] },
    { heading: '为什么重要', content: ['环境一致，避免“本机能跑线上不能跑”。', '部署和回滚更方便。'] },
    { heading: '怎么用', content: ['编写 Dockerfile 定义镜像。', 'docker build -t app . 构建。', 'docker run -p 8080:80 app 运行。'] },
  ],
  'docker-compose': [
    { heading: '是什么', content: ['docker-compose 用 YAML 管理多个容器。', '适合前端、后端、数据库一起启动。'] },
    { heading: '为什么重要', content: ['一条命令启动整个项目。', '开发和生产环境更容易复现。'] },
    { heading: '怎么用', content: ['在 docker-compose.yml 定义 services。', 'docker compose up -d 启动。', 'docker compose down 停止。'] },
  ],
  anaconda: [
    { heading: '是什么', content: ['Anaconda 是 Python 环境与包管理工具。', '使用 conda 管理环境和依赖。'] },
    { heading: '为什么重要', content: ['避免不同项目依赖冲突。', '科学计算库安装更简单。'] },
    { heading: '怎么用', content: ['conda create -n env python=3.11 创建环境。', 'conda activate env 激活环境。', '用 requirements.txt 或 environment.yml 固定依赖。'] },
  ],
  mcp: [
    { heading: '是什么', content: ['MCP 是 AI 连接外部工具和数据的协议。', '类似 AI 的 USB-C 接口。'] },
    { heading: '为什么重要', content: ['让模型能调用真实工具和数据。', '把 AI 从对话扩展到自动化。'] },
    { heading: '怎么用', content: ['配置 MCP 服务端。', '在客户端查看工具列表。', '通过标准协议调用工具。'] },
  ],
  skills: [
    { heading: '是什么', content: ['Skills 是 AI 可复用的技能包。', '以 SKILL.md 为核心描述使用方式。'] },
    { heading: '为什么重要', content: ['把重复工作固化成标准流程。', '比提示词更结构化，更容易维护。'] },
    { heading: '怎么用', content: ['创建技能目录和 SKILL.md。', '描述适用场景和步骤。', '安装后在任务中按需调用。'] },
  ],
  webp: [
    { heading: '是什么', content: ['WebP 是谷歌推出的图片格式。', '压缩率高，适合网页使用。'] },
    { heading: '为什么重要', content: ['减小图片体积，加快页面加载。', '现代浏览器基本都支持。'] },
    { heading: '怎么用', content: ['生成时使用 WebP 格式。', '保持合适尺寸，避免超大图。', '必要时提供兼容回退。'] },
  ],
  pytest: [
    { heading: '是什么', content: ['pytest 是 Python 测试框架。', '用 assert 写断言，自动发现测试文件。'] },
    { heading: '为什么重要', content: ['防止修改代码后出现回归。', '是 Python 项目质量保障的基础。'] },
    { heading: '怎么用', content: ['测试文件命名为 test_*.py。', '函数命名 test_xxx。', '运行 pytest 并保证全绿。'] },
  ],
  git: [
    { heading: '是什么', content: ['Git 是分布式版本控制工具。', '记录代码历史，支持分支协作。'] },
    { heading: '为什么重要', content: ['代码版本管理和协作的基础。', '回滚、Code Review 都依赖它。'] },
    { heading: '怎么用', content: ['git add 暂存，git commit 提交，git push 推送。', '用分支管理功能开发。', 'Commit 信息遵循 Conventional Commits。'] },
  ],
  'ci-cd': [
    { heading: '是什么', content: ['CI/CD 是持续集成与持续部署。', '通过自动化流水线完成构建、测试和发布。'] },
    { heading: '为什么重要', content: ['减少人工发布错误。', '每次提交都能快速验证。'] },
    { heading: '怎么用', content: ['用 GitHub Actions 配置 workflow。', '推送到 main 后自动构建测试。', '通过后自动部署到服务器。'] },
  ],
}

knowledgeItems.terms = knowledgeItems.terms.map((item) =>
  item.detail
    ? item
    : {
        ...item,
        detail: termDetails[item.id] ?? [
          { heading: '是什么', content: [item.text] },
          { heading: '为什么重要', content: ['这是技术体系中经常遇到的概念，值得掌握。'] },
          { heading: '怎么用', content: item.ref ? [`参考：${item.ref}`] : ['结合实际项目理解并练习。'] },
        ],
      },
)

export function findKnowledgeItem(id: string): KnowledgeItem | undefined {
  for (const items of Object.values(knowledgeItems)) {
    const found = items.find((item) => item.id === id)
    if (found) return found
  }
  return undefined
}

export function findKnowledgeTabForItem(id: string): string {
  for (const [tabId, items] of Object.entries(knowledgeItems)) {
    if (items.some((item) => item.id === id)) return tabId
  }
  return 'terms'
}
