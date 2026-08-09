const { chromium } = require('playwright')
const { mkdirSync } = require('node:fs')

async function main() {
  const baseUrl = 'http://127.0.0.1:5173'
  const outDir = 'test-artifacts'
  mkdirSync(outDir, { recursive: true })

  const routes = [
    { path: '/', title: '学习总览' },
    { path: '/#/roadmap', title: '12 周双主线路线' },
    { path: '/#/software', title: '软件工程清单' },
    { path: '/#/compliance', title: '备案与资质' },
    { path: '/#/settings', title: '数据与设置' },
  ]

  const browser = await chromium.launch({ headless: true, channel: 'msedge' })

  async function checkViewport(width, height, prefix) {
    const context = await browser.newContext({ viewport: { width, height } })
    const page = await context.newPage()
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))

    for (const route of routes) {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(250)
      const heading = await page.locator('h1').first().textContent().catch(() => '')
      if (!heading?.includes(route.title)) {
        throw new Error(`${prefix} ${route.path}: expected ${route.title}, got ${heading}`)
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      if (overflow > 2) {
        throw new Error(`${prefix} ${route.path}: horizontal overflow ${overflow}px`)
      }
      const bannerCount = await page.locator('.visual-banner').count()
      if (bannerCount > 0) {
        const bannerBg = await page
          .locator('.visual-banner')
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundImage)
        if (prefix === 'desktop' && bannerBg.includes('-light')) {
          throw new Error(`${prefix} ${route.path}: dark mode loaded light banner`)
        }
        if (prefix === 'mobile' && bannerBg.includes('-light')) {
          throw new Error(`${prefix} ${route.path}: dark mode loaded light banner`)
        }
      }
      const spotCount = await page.locator('.spot-tile').count()
      if (spotCount > 0) {
        const spotBg = await page
          .locator('.spot-tile')
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundImage)
        if (spotBg.includes('-light')) {
          throw new Error(`${prefix} ${route.path}: dark mode loaded light spot`)
        }
      }
      const favicon = await page
        .locator('link[rel="icon"]')
        .getAttribute('href')
        .catch(() => '')
      if (favicon?.includes('-light')) {
        throw new Error(`${prefix}: dark mode loaded light favicon`)
      }
      const clippedText = await page.evaluate(() => {
        const bad = []
        const selectors = 'h1,h2,h3,h4,p,li,span,strong,small,a,label,td,th'
        document.querySelectorAll(selectors).forEach((el) => {
          const style = getComputedStyle(el)
          if (style.display === 'none' || style.visibility === 'hidden') return
          let parent = el.parentElement
          let insideScroll = false
          while (parent) {
            const parentStyle = getComputedStyle(parent)
            if (parentStyle.overflowX === 'auto' || parentStyle.overflowX === 'scroll') {
              insideScroll = true
              break
            }
            parent = parent.parentElement
          }
          if (insideScroll) return
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && (rect.right > window.innerWidth + 2 || rect.left < -2)) {
            bad.push(`${el.tagName}:${el.textContent?.trim().slice(0, 24)}`)
          }
        })
        return bad.slice(0, 8)
      })
      if (clippedText.length) {
        throw new Error(`${prefix} ${route.path}: clipped text ${clippedText.join(' | ')}`)
      }
      const name = `${prefix}${route.path === '/' ? '-dashboard' : route.path.replace('#/', '-').replaceAll('/', '-')}`
      await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true })
      await page.screenshot({ path: `${outDir}/${prefix}-viewport${route.path === '/' ? '-dashboard' : route.path.replace('#/', '-').replaceAll('/', '-')}.png` })
    }

    await page.goto(`${baseUrl}/#/roadmap`, { waitUntil: 'networkidle' })
    const firstCheckbox = page.locator('.task input').first()
    await firstCheckbox.check()
    await page.waitForTimeout(150)
    const stored = await page.evaluate(() => localStorage.getItem('learning-hub-v1'))
    if (!stored || !stored.includes('w1-g')) {
      throw new Error(`${prefix}: task state was not persisted`)
    }
    await page.goto(`${baseUrl}/#/settings`, { waitUntil: 'networkidle' })
    const completedText = await page.locator('.stat-card').nth(0).textContent()
    if (!completedText?.includes('1')) {
      throw new Error(`${prefix}: dashboard completion did not update after check`)
    }

    if (errors.length) {
      throw new Error(`${prefix}: browser errors: ${errors.join(' | ')}`)
    }
    await context.close()
  }

  async function checkLightTheme() {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    await context.addInitScript(() => {
      localStorage.setItem(
        'learning-hub-v1',
        JSON.stringify({ version: 1, done: [], closed: [], softwareDone: [], theme: 'light', filter: 'all' }),
      )
    })
    const page = await context.newPage()
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))
    for (const route of routes) {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(200)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      if (overflow > 2) {
        throw new Error(`light ${route.path}: horizontal overflow ${overflow}px`)
      }
      const theme = await page.evaluate(() => document.documentElement.dataset.theme)
      if (theme !== 'light') {
        throw new Error(`light ${route.path}: theme did not apply`)
      }
      const bannerCount = await page.locator('.visual-banner').count()
      if (bannerCount > 0) {
        const bannerBg = await page
          .locator('.visual-banner')
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundImage)
        if (!bannerBg.includes('-light')) {
          throw new Error(`light ${route.path}: light mode loaded dark banner`)
        }
      }
      const spotCount = await page.locator('.spot-tile').count()
      if (spotCount > 0) {
        const spotBg = await page
          .locator('.spot-tile')
          .first()
          .evaluate((el) => getComputedStyle(el).backgroundImage)
        if (!spotBg.includes('-light')) {
          throw new Error(`light ${route.path}: light mode loaded dark spot`)
        }
      }
      const favicon = await page
        .locator('link[rel="icon"]')
        .getAttribute('href')
        .catch(() => '')
      if (!favicon?.includes('-light')) {
        throw new Error(`light: light mode loaded dark favicon`)
      }
    }
    if (errors.length) {
      throw new Error(`light theme errors: ${errors.join(' | ')}`)
    }
    await context.close()
  }

  await checkViewport(1440, 900, 'desktop')
  await checkViewport(390, 844, 'mobile')
  await checkLightTheme()
  await browser.close()
  console.log('PLAYWRIGHT OK')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
