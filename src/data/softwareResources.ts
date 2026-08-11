export const softwareResources = [
  {
    id: 'mdn',
    category: '文档',
    title: 'MDN Web Docs',
    link: 'https://developer.mozilla.org/',
    note: 'HTML、CSS 和 JavaScript 的权威参考。',
  },
  {
    id: 'vue-docs',
    category: '文档',
    title: 'Vue.js 官方文档',
    link: 'https://vuejs.org/',
    note: '前端框架选 Vue 时的主线文档。',
  },
  {
    id: 'fastapi-docs',
    category: '文档',
    title: 'FastAPI 官方文档',
    link: 'https://fastapi.tiangolo.com/',
    note: 'Python 后端接口、校验和 OpenAPI 文档。',
  },
  {
    id: 'mysql-docs',
    category: '数据库',
    title: 'MySQL 官方文档',
    link: 'https://dev.mysql.com/doc/',
    note: 'SQL、索引、事务和备份参考。',
  },
  {
    id: 'redis-docs',
    category: '数据库',
    title: 'Redis 官方文档',
    link: 'https://redis.io/docs/latest/',
    note: '缓存、会话和消息队列基础。',
  },
  {
    id: 'nginx-docs',
    category: '部署',
    title: 'Nginx 官方文档',
    link: 'https://nginx.org/en/docs/',
    note: '反向代理、负载均衡和静态托管。',
  },
  {
    id: 'docker-docs',
    category: '部署',
    title: 'Docker 官方文档',
    link: 'https://docs.docker.com/',
    note: '镜像、容器、Compose 和部署实践。',
  },
  {
    id: 'letsencrypt',
    category: '安全',
    title: "Let's Encrypt",
    link: 'https://letsencrypt.org/',
    note: '免费 HTTPS 证书与自动续期。',
  },
  {
    id: 'owasp',
    category: '安全',
    title: 'OWASP Top 10',
    link: 'https://owasp.org/www-project-top-ten/',
    note: 'Web 应用最常见安全风险清单。',
  },
  {
    id: 'github-actions',
    category: '工程',
    title: 'GitHub Actions 文档',
    link: 'https://docs.github.com/actions',
    note: 'CI/CD、自动构建和 Pages 发布。',
  },
]

export const softwareChecklists = [
  {
    id: 'project',
    title: '项目交付自查清单',
    description: '一个项目在提交前需要完成的基础工程检查。',
    items: [
      { text: 'README 说明项目用途、运行方式和目录结构', reference: '工程文档' },
      { text: '密钥通过环境变量管理，不硬编码', reference: '安全基线' },
      { text: '数据库变更纳入版本管理', reference: '迁移规范' },
      { text: '接口有测试和 OpenAPI 文档', reference: '质量检查' },
      { text: '依赖和运行环境可复现', reference: 'requirements/lock 文件' },
    ],
  },
  {
    id: 'deploy',
    title: '部署上线自查清单',
    description: '从本机到公网服务器前的关键检查。',
    items: [
      { text: 'SSH 使用密钥登录并禁用 root 远程登录', reference: '服务器加固' },
      { text: '防火墙只放行必要端口', reference: '安全基线' },
      { text: 'HTTPS 已配置并强制跳转', reference: 'Let’s Encrypt' },
      { text: '日志、监控和回滚方案已准备', reference: '部署文档' },
      { text: '国内服务器域名确认备案状态', reference: '备案合规' },
    ],
  },
  {
    id: 'security',
    title: '安全自测清单',
    description: '上线前后用 OWASP 思路快速自测。',
    items: [
      { text: 'SQL 注入：所有数据库查询使用参数化', reference: 'OWASP A03' },
      { text: 'XSS：输出内容正确转义，CSP 已配置', reference: 'OWASP A03' },
      { text: 'CSRF：状态变更请求有防护', reference: 'OWASP A01' },
      { text: 'SSRF：外部 URL 请求限制内网访问', reference: 'OWASP A10' },
      { text: '文件上传：校验类型、大小和存储隔离', reference: 'OWASP A04' },
    ],
  },
]

export const softwareTemplates = [
  {
    id: 'readme',
    title: '项目 README 模板',
    description: '让别人能快速运行并理解你的项目。',
    fields: [
      { label: '项目简介', hint: '解决什么问题，核心功能是什么' },
      { label: '快速开始', hint: '环境、依赖、安装、运行命令' },
      { label: '目录结构', hint: '关键模块和代码入口' },
      { label: '配置说明', hint: '环境变量、端口、数据库' },
      { label: '部署与回滚', hint: '上线命令、日志、回滚方式' },
    ],
  },
  {
    id: 'api-doc',
    title: '接口文档模板',
    description: '每个接口需要说明请求、响应和错误。',
    fields: [
      { label: '接口路径', hint: '方法 + URL，例如 POST /api/users' },
      { label: '请求参数', hint: '字段、类型、是否必填' },
      { label: '响应结构', hint: '成功时的 JSON 示例' },
      { label: '错误码', hint: '常见错误和 HTTP 状态码' },
      { label: '鉴权方式', hint: 'Token、Cookie、API Key' },
    ],
  },
  {
    id: 'deploy-doc',
    title: '部署文档模板',
    description: '让新服务器能按文档复现整个上线过程。',
    fields: [
      { label: '环境准备', hint: '系统、依赖、Node/Python 版本' },
      { label: '应用部署', hint: '构建、启动、systemd/pm2/Docker' },
      { label: '反向代理', hint: 'Nginx 配置和 HTTPS' },
      { label: '数据与备份', hint: '数据库、备份和恢复命令' },
      { label: '监控与排错', hint: '日志位置和常见故障处理' },
    ],
  },
]
