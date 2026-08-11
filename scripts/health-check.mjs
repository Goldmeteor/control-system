#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const isWindows = process.platform === 'win32'
const useColor = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  pass: '\x1b[32m',
  warn: '\x1b[33m',
  fail: '\x1b[31m',
}

function paint(text, style) {
  return useColor ? `${colors[style]}${text}${colors.reset}` : text
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
    timeout: 180_000,
    shell: options.shell ?? false,
  })

  const output = [result.stdout, result.stderr]
    .filter(Boolean)
    .map((text) => text.trim())
    .filter(Boolean)
    .join('\n')

  const errorText = result.error?.message ?? ''

  return {
    status: result.status,
    output: output || errorText,
    error: errorText,
  }
}

function runNpm(args) {
  const npmCli = resolveNpmCli()
  if (npmCli) {
    return runCommand(process.execPath, [npmCli, ...args])
  }

  return runCommand(isWindows ? 'npm.cmd' : 'npm', args, {
    shell: isWindows,
  })
}

function resolveNpmCli() {
  if (process.env.npm_execpath) {
    return process.env.npm_execpath
  }

  const finder = runCommand(isWindows ? 'where.exe' : 'which', ['npm'])
  const firstPath = finder.status === 0 ? finder.output.split(/\r?\n/)[0] : ''

  if (firstPath) {
    const candidate = path.resolve(
      path.dirname(firstPath),
      'node_modules',
      'npm',
      'bin',
      'npm-cli.js',
    )
    if (existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

function lastLines(text, count = 6) {
  return text.split(/\r?\n/).filter(Boolean).slice(-count).join('\n')
}

function formatStatus(status) {
  const label = status === 'pass' ? 'PASS' : status === 'warn' ? 'WARN' : 'FAIL'
  return paint(`[${label}]`, status)
}

function makeCheck(name, checkFn) {
  const startedAt = Date.now()
  const result = checkFn()
  return {
    name,
    durationMs: Date.now() - startedAt,
    ...result,
  }
}

function checkDependencies() {
  const dryRun = runNpm(['ci', '--dry-run'])
  const tree = runNpm(['ls', '--depth=0'])

  if (dryRun.status !== 0 || tree.status !== 0) {
    const detail = dryRun.output || tree.output
    return {
      status: 'fail',
      message: lastLines(detail),
      fix: '运行 npm install，确保 package-lock.json 与 package.json 同步，并补齐缺失依赖。',
    }
  }

  return {
    status: 'pass',
    message: 'package-lock.json 与 package.json 一致，依赖树完整。',
  }
}

function checkTypeScript() {
  const binary = path.join(projectRoot, 'node_modules', 'vue-tsc', 'bin', 'vue-tsc.js')
  const result = runCommand(process.execPath, [binary, '-b'])

  if (result.status !== 0) {
    return {
      status: 'fail',
      message: lastLines(result.output),
      fix: '修复 TypeScript 类型错误后重新运行 npm run health。',
    }
  }

  return {
    status: 'pass',
    message: 'TypeScript 类型检查通过。',
  }
}

function checkBuild() {
  const result = runNpm(['run', 'build'])

  if (result.status !== 0) {
    return {
      status: 'fail',
      message: lastLines(result.output),
      fix: '根据构建错误修复源码或配置，确认 npm run build 可成功执行。',
    }
  }

  return {
    status: 'pass',
    message: 'Vite 生产构建通过。',
  }
}

function checkGitStatus() {
  const result = runCommand('git', ['status', '--porcelain', '--', '.'])

  if (result.status !== 0) {
    return {
      status: 'fail',
      message: lastLines(result.output || result.error),
      fix: '确认当前目录位于可用的 Git 仓库中。',
    }
  }

  const lines = result.output.split(/\r?\n/).filter(Boolean)
  if (lines.length === 0) {
    return {
      status: 'pass',
      message: '工作区干净，无待提交改动。',
    }
  }

  const preview = lines.map((line) => line.trim()).join('；')
  return {
    status: 'warn',
    message: `${lines.length} 个文件有改动：${preview}`,
    fix: '提交、暂存或还原这些改动后重新检测。',
  }
}

const checks = [
  makeCheck('依赖完整性', checkDependencies),
  makeCheck('TypeScript 类型', checkTypeScript),
  makeCheck('生产构建', checkBuild),
  makeCheck('Git 工作区', checkGitStatus),
]

console.log(paint('Learning Hub 健康检测', 'bold'))
console.log('========================================')

for (const check of checks) {
  console.log(`${formatStatus(check.status)} ${check.name} (${(check.durationMs / 1000).toFixed(2)}s)`)
  for (const line of check.message.split(/\r?\n/)) {
    console.log(`  ${paint(line, 'dim')}`)
  }
  if (check.fix) {
    console.log(`  修复建议：${check.fix}`)
  }
  console.log()
}

const counts = checks.reduce(
  (acc, check) => {
    acc[check.status] += 1
    return acc
  },
  { pass: 0, warn: 0, fail: 0 },
)

console.log(
  `总结：${counts.pass} 项通过，${counts.warn} 项警告，${counts.fail} 项失败`,
)

process.exitCode = counts.fail > 0 ? 1 : 0
