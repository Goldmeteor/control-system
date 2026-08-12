# Learning Hub

学习管理网站，统一整合路径规划科研、软件工程、法律学习与备案合规四类内容。

## 功能

- 总览：三条学习线的总进度、模块入口和 12 周科研时间线
- 路径规划：12 周移动机器人路径规划科研主线，含教程、清单与模板
- 软件工程：分周工程仪表盘、分类清单、教程、清单与模板
- 法律学习：16 周实用法律计划、互联网/AI 合规、备案资质与自查清单
- 编程基础：8 周语言与工具学习计划
- 网络安全：16 周安全、渗透、逆向与工控安全学习计划
- AI技术：12 周 MCP、本地模型、量化与微调学习计划
- 知识库：术语、命令、学习资源与杂项速查
- 设置：深浅主题切换、学习线进度和 JSON 导入导出

## 技术栈

- Vue 3
- TypeScript
- Vite
- Vue Router
- Lucide

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

GitHub Pages 部署：

1. 仓库设置中打开 Pages。
2. Build and deployment 的 Source 选择 `GitHub Actions`。
3. 推送 `main` 分支后，workflow 会自动构建并发布到
   `https://goldmeteor.github.io/control-system/`。
