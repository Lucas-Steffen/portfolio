// Capturas full-page em vários viewports (emulados) para revisão visual.
// Uso: npm run build && npm run preview (porta 4178) e depois npm run screenshots
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const base = process.env.BASE_URL ?? 'http://localhost:4178'
const out = path.resolve(import.meta.dirname, '..', 'screenshots')
await mkdir(out, { recursive: true })

const viewports = [
	[320, 568, 1],
	[390, 844, 1],
	[480, 800, 1],
	[600, 900, 1],
	[844, 390, 1],
	[768, 1024, 1],
	[900, 800, 1],
	[1024, 768, 1],
	[1180, 820, 1],
	[1366, 768, 1],
	[1600, 900, 1],
	[1920, 1080, 1],
	[2560, 1440, 1],
	[3840, 2160, 1],
	[683, 384, 2], // emula zoom de 200% em 1366x768
]

const browser = await chromium.launch({ channel: 'chrome' })
for (const [width, height, dpr] of viewports) {
	const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr, reducedMotion: 'reduce' })
	const page = await context.newPage()
	await page.goto(base)
	await page.waitForLoadState('networkidle')
	await page.screenshot({ path: path.join(out, `${width}x${height}@${dpr}-fold.png`) })
	await page.screenshot({ path: path.join(out, `${width}x${height}@${dpr}-full.png`), fullPage: true })
	await context.close()
}
await browser.close()
console.log(`capturas em ${out}`)
