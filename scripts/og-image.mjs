// Gera public/og-image.png (1200x630) renderizando HTML com o Chrome via Playwright.
// Uso: npm run og
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const root = path.resolve(import.meta.dirname, '..')
const photo = (await readFile(path.join(root, 'public', 'img', 'hero-960.webp'))).toString('base64')

const html = `<!doctype html><html><head><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0c0f12;color:#e8eef2;font-family:'Segoe UI',Arial,sans-serif;display:flex;align-items:center;position:relative;overflow:hidden;
background-image:linear-gradient(#26313b 1px,transparent 1px),linear-gradient(90deg,#26313b 1px,transparent 1px);background-size:48px 48px}
.copy{padding:0 0 0 80px;width:740px;position:relative;z-index:1}
.eyebrow{font-family:Consolas,monospace;font-size:24px;color:#38e3a2;letter-spacing:.1em;text-transform:uppercase;margin-bottom:20px}
h1{font-size:96px;line-height:1;letter-spacing:-.03em;margin-bottom:28px}
.chips{display:flex;gap:12px;flex-wrap:wrap}
.chips span{border:2px solid #36444f;border-radius:999px;padding:8px 20px;font-family:Consolas,monospace;font-size:24px;background:#12171c}
.photo{position:absolute;right:50px;bottom:0;width:420px;height:560px;border:2px solid #36444f;border-radius:14px;background:linear-gradient(160deg,#2c3b49,#131b23);overflow:hidden;margin-bottom:35px}
.photo img{width:100%;height:100%;object-fit:cover}
</style></head><body>
<div class="copy"><p class="eyebrow">Engenheiro de Software Backend</p><h1>Lucas Steffen</h1>
<div class="chips"><span>NestJS</span><span>TypeORM</span><span>PostgreSQL</span><span>Redis</span><span>Java</span></div></div>
<div class="photo"><img src="data:image/webp;base64,${photo}" /></div>
</body></html>`

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.screenshot({ path: path.join(root, 'public', 'og-image.png') })
await browser.close()
console.log('public/og-image.png gerado')
