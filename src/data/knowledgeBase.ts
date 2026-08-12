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
  '硬件原理',
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
  cpu: '硬件原理',
  'gpu-graphics-card': '硬件原理',
  'memory-module': '硬件原理',
  'storage-type': '硬件原理',
  'monitor-params': '硬件原理',
  'motherboard-params': '硬件原理',
  'psu-params': '硬件原理',
  'pc-case': '硬件原理',
  cooler: '硬件原理',
  'cooling-method': '硬件原理',
  overclocking: '硬件原理',
  'bios-flash': '硬件原理',
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
    {
      id: 'cpu',
      title: 'CPU',
      text: '中央处理器负责通用计算，性能由 IPC、频率与有效核心数共同决定。',
      ref: '核心 / 线程 / 缓存 / 睿频',
      detail: [
        {
          heading: '是什么',
          content: [
            'CPU 是中央处理器，负责指令解释、逻辑计算和系统调度。',
            '性能约等于 IPC × 频率 × 有效核心数，还要受内存和系统调度影响。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            'IPC 由微架构决定，分支预测、乱序执行、解码宽度和缓存层级都会影响它。',
            '缓存从 L1 到 L3，越靠近核心越快但容量越小，缓存命中率决定内存延迟压力。',
            'CPU 内部集成内存控制器和直连 PCIe 通道，USB、网卡、SATA 等外设走芯片组。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '核心数与线程数决定并行吞吐，单核性能决定低延迟场景。',
            '基频是长期保证频率，睿频是短时冲高；Intel 用 PL1/PL2，AMD 用 PPT/TDC/EDC。',
            'TDP 是散热参考而不是实际功耗，实际频率由功耗、温度和供电共同决定。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '核心越多不一定越快，游戏和编译对单核与多核的需求不同。',
            '只看主频不看架构没有意义，IPC 提升同样重要。',
            '更换更高端主板不会直接提升 CPU 性能，但供电和扩展会影响稳定性。',
          ],
        },
      ],
    },
    {
      id: 'gpu-graphics-card',
      title: 'GPU / 显卡',
      text: 'GPU 是并行计算芯片，显卡是包含显存、供电与散热的整卡。',
      ref: '流处理器 / 显存带宽 / TGP / 光追',
      detail: [
        {
          heading: '是什么',
          content: [
            'GPU 是图形处理器芯片，擅长大量并行计算。',
            '显卡是 GPU 芯片加显存、PCB、供电和散热组成的整卡。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            '流处理器做并行计算，纹理单元采样贴图，光栅单元输出像素，Tensor/RT 单元加速 AI 和光追。',
            '显存带宽 = 位宽 × 等效速率 / 8，高分辨率和高纹理最依赖带宽与容量。',
            '现代显卡频率由功耗墙和温度墙动态决定，供电和散热不足会掉频。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '显存容量决定纹理和帧缓冲上限，显存类型和位宽决定带宽。',
            '核心频率、显存频率、TGP/TBP 决定持续性能和功耗。',
            'PCIe 版本通常不是瓶颈，但供电接口不足会限制整卡功耗。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '显存大不等于一定强，还要看带宽、核心规模和驱动优化。',
            'GPU 与显卡不是同一概念，整卡功耗必须由电源和机箱承载。',
            '光追与 AI 功能依赖专用单元，不能只按流处理器数量比较。',
          ],
        },
      ],
    },
    {
      id: 'memory-module',
      title: '内存条',
      text: '内存是高速暂存，DDR 每时钟双沿传输，双通道与高频共同决定带宽。',
      ref: 'DDR4 / DDR5 / 双通道 / XMP / EXPO',
      detail: [
        {
          heading: '是什么',
          content: [
            '内存条由 DRAM 颗粒组成，为 CPU 提供高速临时数据存储。',
            '断电后数据丢失，所以它只负责暂存，持久化依赖硬盘。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            'DRAM 每个 bit 是电容加晶体管，需要周期刷新。',
            'DDR 在时钟上下沿各传一次数据，带宽约等于通道数 × 等效频率 × 每通道字节数。',
            '时序以时钟周期为单位，实际延迟约等于 CL × 2000 / 等效频率（ns）。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '容量决定同时打开的程序和数据结构上限，游戏建议 32GB 起步。',
            '等效频率和 CL 时序共同决定实际延迟，不能只看频率。',
            '双通道需要成对插入正确插槽；XMP/EXPO 要在 BIOS 中开启才能达到标称频率。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '高频不一定低延迟，DDR5 频率高但 CL 也高。',
            '单条大容量不如两条组成双通道，除非后期需要继续加容量。',
            '混插不同频率和时序的内存，系统会按较低规格运行。',
          ],
        },
      ],
    },
    {
      id: 'storage-type',
      title: '硬盘类型',
      text: 'HDD 适合大容量仓库，SSD 适合系统与游戏，SATA 和 NVMe 的性能差距来自协议。',
      ref: 'HDD / SSD / SATA / NVMe / TLC / QLC',
      detail: [
        {
          heading: '是什么',
          content: [
            '机械硬盘靠碟片和磁头寻道，随机访问慢但容量单价低。',
            '固态硬盘靠 NAND 闪存存储，随机性能高，适合系统和常用软件。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            'NAND 按每单元 bit 数分 SLC/MLC/TLC/QLC，单元数越多越便宜但寿命和缓外写入越弱。',
            'SSD 实际性能由主控、闪存通道数、DRAM 缓存/HMB 和 SLC 缓存策略共同决定。',
            'SATA 接口约 550MB/s 封顶，NVMe 走 PCIe 3.0/4.0/5.0 可达数 GB/s。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '接口和协议决定顺序带宽上限，随机 IOPS 决定日常响应。',
            '容量、TBW 和缓外速度决定长期可用性。',
            'M.2 只是外形，不代表一定比 2.5 英寸 SATA SSD 快。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '标称顺序读写很快，不代表随机小文件场景也快。',
            'QLC 不一定是差的，但要关注缓外性能和寿命。',
            '任何硬盘都不是备份，重要数据仍需要额外备份。',
          ],
        },
      ],
    },
    {
      id: 'monitor-params',
      title: '显示器参数',
      text: '分辨率、刷新率、响应时间和色域共同决定显示效果，面板类型影响物理特性。',
      ref: 'IPS / VA / TN / OLED / HDR / VRR',
      detail: [
        {
          heading: '是什么',
          content: [
            '显示器把显卡输出的画面转换成可见图像，不同参数决定清晰度、流畅度和色彩。',
            '选购时要同时考虑用途，办公、游戏和设计对参数侧重不同。',
          ],
        },
        {
          heading: '核心参数',
          content: [
            '分辨率决定像素总量，刷新率决定每秒画面次数，响应时间 GtG 决定灰阶切换速度。',
            '色域看 sRGB、DCI-P3、Adobe RGB 覆盖，色深看 8bit、10bit 和 FRC 抖动。',
            'HDR 要看峰值亮度、控光分区和色域；FreeSync/G-Sync/VRR 减少画面撕裂。',
          ],
        },
        {
          heading: '面板对比',
          content: [
            'IPS 色彩和可视角度好，VA 对比度高但响应偏慢，TN 响应快但色彩差。',
            'OLED 自发光、响应极快、对比度无限，但存在烧屏风险。',
            'Overdrive 能缩短响应时间，过强会产生鬼影。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '支持 HDR 不代表 HDR 效果好，低亮度面板开 HDR 反而更差。',
            '高刷新率需要显卡帧率配合，否则优势发挥不出来。',
            '厂商标称响应时间有时是极限值，实际 GtG 更重要。',
          ],
        },
      ],
    },
    {
      id: 'motherboard-params',
      title: '主板参数',
      text: '主板决定供电、扩展与兼容，VRM 用料比相数数字更关键。',
      ref: '芯片组 / VRM / M.2 / 板型',
      detail: [
        {
          heading: '是什么',
          content: [
            '主板是供电中枢和总线中枢，把 CPU、内存、显卡、硬盘和外设连接起来。',
            '芯片组和 CPU 直连通道共同决定扩展能力。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            'CPU 供电由 VRM 完成，PWM 控制、DrMOS/功率级、电感和电容共同滤波。',
            'CPU 直连部分 PCIe、M.2 和 USB，其余设备通过芯片组转发。',
            '内存插槽布线影响高频稳定性，双槽菊花链通常比四槽更容易超频。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            'CPU 插槽和芯片组决定兼容性，M.2、PCIe、SATA 和 USB 数量决定扩展能力。',
            'VRM 相数和用料决定持续供电能力，高负载下过热会掉频。',
            '板型决定机箱兼容，ATX 扩展强、MATX 均衡、ITX 紧凑。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '芯片组等级不会直接提高 CPU 性能，只决定扩展规格。',
            '相数越多不代表一定越好，还要看功率级用料、散热和 PWM 方案。',
            '装机前必须核对 BIOS 版本、内存代数、M.2 通道和散热器安装空间。',
          ],
        },
      ],
    },
    {
      id: 'psu-params',
      title: '电源参数',
      text: '电源把交流转成多路直流，+12V 能力与保护机制比 80 PLUS 等级更重要。',
      ref: '额定功率 / 80 PLUS / +12V / DC-DC / ATX 3.x',
      detail: [
        {
          heading: '是什么',
          content: [
            '电源把市电交流整流成 +12V、+5V、+3.3V 直流，为整机供电。',
            'CPU 和 GPU 主要吃 +12V，其他低压用于主板、硬盘和外设。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            '80 PLUS 只代表 20/50/100% 负载效率，不代表用料和保护好坏。',
            'DC-DC 拓扑从 +12V 降压出 5V/3.3V，稳压通常优于老式群调方案。',
            'ATX 3.x 针对现代显卡瞬时功耗和 12VHPWR/12V-2x6 接口做了规范。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '额定功率要看 +12V 实际输出能力，而不是只买总功率数字。',
            '模组化影响理线便利性，半模组和全模组按预算选择。',
            'OCP/OVP/UVP/SCP/OTP 保护必须齐全。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '金牌电源不一定比铜牌耐用，效率和用料是两件事。',
            '整机满载功耗应预留 30~50% 余量，让电源工作在高效低噪区。',
            '老旧电源带新显卡时，要确认 PCIe 接口和瞬态响应是否够用。',
          ],
        },
      ],
    },
    {
      id: 'pc-case',
      title: '机箱',
      text: '机箱决定硬件兼容与风道，选购前要核对板型、显卡限长和散热器高度。',
      ref: 'ATX / MATX / ITX / 风道 / 显卡限长',
      detail: [
        {
          heading: '是什么',
          content: [
            '机箱是硬件的物理外壳，同时决定风道、扩展空间和理线方式。',
            '它不是纯外观件，散热和兼容性由内部结构决定。',
          ],
        },
        {
          heading: '核心参数',
          content: [
            '支持的主板板型、显卡长度、CPU 散热器高度和电源长度必须核对。',
            '冷排安装位置和尺寸决定水冷兼容性，硬盘位决定扩展能力。',
            '前置 IO、防尘网、理线空间和侧透样式影响日常使用体验。',
          ],
        },
        {
          heading: '风道',
          content: [
            '常规风道是前下进风、后上出风，冷排通常装在前部或顶部。',
            '进气略大于出气形成正压，可减少缝隙进灰。',
            '前脸封闭但侧面开孔的机箱，散热能力通常不如前部网孔设计。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '风扇数量多不代表风道好，进出风方向一致才有意义。',
            '只关注外观而忽略显卡限长，装机时容易放不下。',
            '大机箱不一定散热更好，风道设计比体积更关键。',
          ],
        },
      ],
    },
    {
      id: 'cooler',
      title: '散热器',
      text: '散热器把核心热量导走，能力取决于热管、鳍片面积、风扇静压和热界面材料。',
      ref: '热管 / 鳍片 / 静压 / 风量 / 硅脂',
      detail: [
        {
          heading: '是什么',
          content: [
            '散热器负责把 CPU/GPU 产生的热量转移到空气中。',
            '核心温度约等于环境温度加功耗乘以热阻，目标是降低热阻。',
          ],
        },
        {
          heading: '核心原理',
          content: [
            '热管利用相变把热量快速导到鳍片，风扇再把鳍片热量吹走。',
            '热管数量、直径、鳍片面积和风道共同决定散热上限。',
            '热界面材料填充芯片与散热器之间的微小缝隙，老化或过厚会明显升温。',
          ],
        },
        {
          heading: '关键参数',
          content: [
            '额定解热能力、TDP 参考、安装高度和平台兼容性都要匹配。',
            '风扇看风量和静压，冷排和密集鳍片更需要静压。',
            '双塔、单塔、下压式适合不同机箱和内存空间。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '风扇更大更响不等于散热更强，风道和安装贴合度同样重要。',
            '热管数量多不一定比好鳍片设计强，整体解热能力才是标准。',
            '硅脂不是涂越多越好，过多反而增加热阻。',
          ],
        },
      ],
    },
    {
      id: 'cooling-method',
      title: '散热方式',
      text: '风冷、一体水冷与分体水冷各有取舍，机箱风道决定整体散热效率。',
      ref: '风冷 / 一体水冷 / 分体水冷 / 风道',
      detail: [
        {
          heading: '是什么',
          content: [
            '散热方式决定热量从核心到机箱外部的搬运路径。',
            '常见方案是塔式风冷、一体式水冷和分体式水冷。',
          ],
        },
        {
          heading: '风冷与水冷',
          content: [
            '风冷结构简单、故障率低，靠热管和鳍片散热。',
            '一体水冷通过冷头、水泵和冷排转移热量，冷排尺寸决定散热面积。',
            '分体水冷可覆盖 CPU 和 GPU，散热强但成本高、维护复杂。',
          ],
        },
        {
          heading: '风道',
          content: [
            '常规风道是前下进风、后上出风，保证冷空气经过核心。',
            '正压机箱进灰更少，负压机箱更容易从缝隙吸入灰尘。',
            '冷排摆放位置会影响其他硬件温度，顶部排气效率通常低于前部进风。',
          ],
        },
        {
          heading: '常见误区',
          content: [
            '低发热平台不一定需要水冷，高端风冷可能更省心。',
            '一体水冷不是完全免维护，泵体故障和冷液挥发仍需关注。',
            '机箱风道差时，再强的散热器也无法发挥全部能力。',
          ],
        },
      ],
    },
    {
      id: 'overclocking',
      title: '电脑超频',
      text: '超频是放弃出厂安全裕量换取更高频率，收益有限但会带来发热、稳定性与寿命风险。',
      ref: '倍频 / 电压 / XMP / EXPO / PBO / 降压',
      detail: [
        {
          heading: '是什么',
          content: [
            '超频是让 CPU、内存或 GPU 跑得比出厂设定更快。',
            '出厂频率不是物理极限，而是厂商在功耗、温度、良率与寿命之间取的保守点。',
          ],
        },
        {
          heading: '为什么不稳定',
          content: [
            '动态功耗约等于 C × V² × f，频率提高会让功耗明显上升。',
            '频率升高后逻辑电路在一个周期内来不及收敛，需要更高电压缩短延迟。',
            '电压不足、温度过高和信号噪声都会导致蓝屏、黑屏或花屏。',
          ],
        },
        {
          heading: '怎么超',
          content: [
            'CPU 通常调整倍频、功耗墙和电压，或用 PBO/自动超频功能。',
            '内存先开 XMP/EXPO，再逐步调频率、时序和内存控制器电压。',
            'GPU 靠拉功耗墙、核心频率或降压曲线，配合 3DMark 和游戏稳定性测试。',
          ],
        },
        {
          heading: '风险',
          content: [
            '收益通常只有百分之几到十几，现代自动 Boost 已压得很紧。',
            '长期高压高温有电迁移风险，可能导致缩缸或硬件退化。',
            '每次只改一项，用 Prime95、OCCT、MemTest 和 3DMark 反复验证。',
          ],
        },
      ],
    },
    {
      id: 'bios-flash',
      title: '刷 BIOS',
      text: 'BIOS/UEFI 是主板固件，刷写主要用于新 CPU 支持与兼容修复，断电可能变砖。',
      ref: 'UEFI / 微码 / AGESA / Flashback / 救砖',
      detail: [
        {
          heading: '是什么',
          content: [
            'BIOS/UEFI 是主板固件，先于操作系统运行。',
            '它负责硬件初始化、自检、启动顺序和设置保存，内含 CPU 微码与内存训练逻辑。',
          ],
        },
        {
          heading: '为什么刷',
          content: [
            '主要用于支持新 CPU、修复漏洞和兼容性问题。',
            '有时能改善内存高频稳定性，但一般不是普通性能提升手段。',
          ],
        },
        {
          heading: '怎么刷',
          content: [
            '从官网下载对应主板型号的文件，解压到 FAT32 U 盘。',
            '进 BIOS 用 Q-Flash、Flashback 等工具刷写，全程不能断电或拔盘。',
            '新主板优先选择带无 CPU 刷写功能的型号，方便救砖。',
          ],
        },
        {
          heading: '风险与恢复',
          content: [
            '最大风险是刷写中断导致固件损坏，主板可能变砖。',
            '双 BIOS 可自动回退，部分主板支持 U 盘 recovery。',
            '无法恢复时可使用 CH341A 等编程器直接写 SPI 芯片，属于硬件级修复。',
          ],
        },
      ],
    },
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
