export const pathResources = [
  {
    id: 'book-lavalle',
    category: '教材',
    title: 'Steven M. LaValle《Planning Algorithms》',
    link: 'http://lavalle.pl/planning/',
    note: '路径规划与运动规划理论的系统性教材，开放访问。',
  },
  {
    id: 'book-choset',
    category: '教材',
    title: '《Principles of Robot Motion》',
    note: '机器人运动规划的经典教材，覆盖栅格、采样与势场方法。',
  },
  {
    id: 'paper-astar',
    category: '论文',
    title: 'Hart et al.《A Formal Basis for the Heuristic Determination of Minimum Cost Paths》',
    note: 'A* 算法原始论文，理解可采纳性与一致性必读。',
  },
  {
    id: 'paper-rrt',
    category: '论文',
    title: 'LaValle《Rapidly-exploring Random Trees》',
    note: 'RRT 原始技术报告，理解概率完备性的起点。',
  },
  {
    id: 'paper-dstar',
    category: '论文',
    title: 'Koenig & Likhachev《D* Lite》',
    note: '增量重规划的核心论文，适合第 4 周系统闭环阶段。',
  },
  {
    id: 'ompl',
    category: '工具',
    title: 'OMPL：Open Motion Planning Library',
    link: 'https://ompl.kavrakilab.org/',
    note: '常用运动规划算法库，适合对照自己的 Python 实现。',
  },
  {
    id: 'nav2',
    category: '工具',
    title: 'ROS 2 Navigation2 文档',
    link: 'https://docs.nav2.org/',
    note: '把规划器接入真实机器人导航栈时的参考。',
  },
  {
    id: 'networkx',
    category: '工具',
    title: 'NetworkX 图算法文档',
    link: 'https://networkx.org/documentation/stable/',
    note: '实现图搜索和拓扑关系时的标准工具。',
  },
]

export const pathChecklists = [
  {
    id: 'algorithm',
    title: '算法实现自查清单',
    description: '每次实现新规划器前逐项确认，避免把调参当成验证。',
    items: [
      { text: '输入输出接口固定：起点、终点、地图、路径、节点数', reference: '统一 Planner 接口' },
      { text: '启发函数满足可采纳性或一致性', reference: 'A* 最优性条件' },
      { text: '碰撞检测边界覆盖：起点障碍、终点不可达、窄通道', reference: '网格碰撞规则' },
      { text: '随机种子和参数写入配置，结果可复现', reference: '实验配置规范' },
      { text: '保存路径长度、节点数和耗时，不只看最终图', reference: 'Benchmark 指标' },
    ],
  },
  {
    id: 'reproduce',
    title: '论文复现自查清单',
    description: '复现近期工作时从 Run 到 Stress 的完整检查。',
    items: [
      { text: '官方代码能在固定环境中运行', reference: 'Run' },
      { text: '关键趋势与论文一致', reference: 'Match' },
      { text: '替换自己的地图后结果仍成立', reference: 'Transfer' },
      { text: '极窄通道、大尺寸、高障碍密度压力测试', reference: 'Stress' },
      { text: '记录环境、版本、参数和失败日志', reference: '复现 README' },
    ],
  },
]

export const pathTemplates = [
  {
    id: 'experiment-log',
    title: '实验记录模板',
    description: '每次实验记录算法、参数、地图、指标和结论。',
    fields: [
      { label: '算法与版本', hint: '算法名、参数、随机种子' },
      { label: '地图与场景', hint: '尺寸、障碍密度、通道类型' },
      { label: '指标', hint: '路径长度、节点数、耗时、成功率' },
      { label: '观察', hint: '收敛趋势、失败点、异常行为' },
      { label: '结论', hint: '这个结果支持或否定了什么' },
    ],
  },
  {
    id: 'repro-report',
    title: '复现报告模板',
    description: '让其他人只靠文档就能重复你的关键结果。',
    fields: [
      { label: '原始论文', hint: '标题、年份、方法名称' },
      { label: '环境', hint: '系统、依赖、版本、数据集' },
      { label: '复现结果', hint: '主结果表和对应图表' },
      { label: '差异', hint: '与论文不一致的地方及可能原因' },
      { label: '失败案例', hint: '至少三个失败或退化场景' },
    ],
  },
  {
    id: 'research-proposal',
    title: '研究提案模板',
    description: '把证据组织成问题、方法、实验和风险。',
    fields: [
      { label: '研究问题', hint: '用一句话说清要解决什么' },
      { label: 'Gap', hint: '最接近工作没有解决什么' },
      { label: '方法', hint: '机制、输入输出、伪代码' },
      { label: '实验', hint: 'Baseline、Proposed、Ablation、Sensitivity' },
      { label: '风险', hint: '可能无效、算力不足或指标不敏感' },
    ],
  },
]
