const weekWords = [
  '第一周',
  '第二周',
  '第三周',
  '第四周',
  '第五周',
  '第六周',
  '第七周',
  '第八周',
  '第九周',
  '第十周',
  '第十一周',
  '第十二周',
  '第十三周',
  '第十四周',
  '第十五周',
  '第十六周',
]

export function chineseWeek(week: number) {
  return weekWords[week - 1] ?? `${week}周`
}
