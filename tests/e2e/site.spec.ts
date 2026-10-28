import { expect, test } from '@playwright/test'

test.describe('navegação e conteúdo', () => {
	test('sem erros de console nem requisições falhas', async ({ page }) => {
		const problems: string[] = []
		page.on('console', message => {
			if (message.type() === 'error') problems.push(`console: ${message.text()}`)
		})
		page.on('pageerror', error => problems.push(`pageerror: ${error.message}`))
		page.on('requestfailed', request => problems.push(`failed: ${request.url()}`))
		page.on('response', response => {
			if (response.status() >= 400) problems.push(`${response.status()}: ${response.url()}`)
		})
		await page.goto('/')
		await page.waitForLoadState('networkidle')
		expect(problems).toEqual([])
	})

	test('menu do header rola até a seção com o topo abaixo do header', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 })
		await page.goto('/')
		await page.locator('.header-nav').getByRole('link', { name: 'Experiência' }).click()
		await expect(page.locator('#experience')).toBeInViewport()
		await page.waitForFunction(() => {
			const header = document.querySelector('.site-header')!.getBoundingClientRect().bottom
			return document.querySelector('#experience')!.getBoundingClientRect().top >= header - 1
		})
		await expect(page).toHaveURL(/#experience$/)
	})

	test('menu mobile: teclado, Esc e foco', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 })
		await page.goto('/')
		const toggle = page.getByRole('button', { name: 'Abrir menu' })
		await expect(toggle).toHaveAttribute('aria-expanded', 'false')
		await expect(page.locator('#mobile-nav')).toBeHidden()
		await toggle.focus()
		await page.keyboard.press('Enter')
		await expect(page.locator('#mobile-nav')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true')
		await page.keyboard.press('Escape')
		await expect(page.locator('#mobile-nav')).toBeHidden()
		await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused()
		await page.getByRole('button', { name: 'Abrir menu' }).click()
		await page.locator('#mobile-nav').getByRole('link', { name: 'Contato' }).click()
		await expect(page.locator('#mobile-nav')).toBeHidden()
		await expect(page.locator('#contact')).toBeInViewport()
	})

	test('troca de idioma atualiza html[lang] e persiste', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
		await page.locator('.lang-toggle').click()
		await expect(page.locator('html')).toHaveAttribute('lang', 'en')
		await expect(page.locator('#cases-title')).toHaveText('Work cases')
		await page.reload()
		await expect(page.locator('html')).toHaveAttribute('lang', 'en')
	})

	test('filtro da stack', async ({ page }) => {
		await page.goto('/')
		const cards = page.locator('#skills .skill-card')
		const total = await cards.count()
		expect(total).toBeGreaterThan(1)
		const button = page.locator('#skills .filter-btn').nth(2)
		await button.click()
		await expect(button).toHaveAttribute('aria-pressed', 'true')
		await expect(cards).toHaveCount(1)
		await page.locator('#skills .filter-btn').first().click()
		await expect(cards).toHaveCount(total)
	})

	test('links sociais e mailto', async ({ page }) => {
		await page.goto('/')
		const contact = page.locator('#contact')
		await expect(contact.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:lucas.steffen.dev@gmail.com')
		for (const host of ['linkedin.com/in/lucasteffen', 'github.com/Lucas-Steffen', 'instagram.com/lucasg.dev']) {
			const link = contact.locator(`a[href*="${host}"]`)
			await expect(link).toHaveAttribute('target', '_blank')
			await expect(link).toHaveAttribute('rel', /noopener/)
		}
	})

	test('hierarquia: um h1 e h2 por seção', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('h1')).toHaveCount(1)
		await expect(page.locator('section.section h2')).toHaveCount(7)
	})

	test('diagrama tem rótulo acessível e texto equivalente', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('.arch-svg')).toHaveAttribute('role', 'img')
		await expect(page.locator('.arch-flow li')).toHaveCount(6)
	})
})

test.describe('movimento reduzido', () => {
	test.use({ reducedMotion: 'reduce' })

	test('todo o conteúdo fica visível', async ({ page }) => {
		await page.goto('/')
		await expect(page.locator('html')).not.toHaveClass(/js-reveal/)
		for (const el of await page.locator('.reveal').all()) {
			await expect(el).toHaveCSS('opacity', '1')
		}
	})
})

test.describe('sem overflow horizontal', () => {
	const sizes = [
		[320, 568],
		[390, 844],
		[844, 390],
		[768, 1024],
		[1024, 768],
		[1366, 768],
		[1920, 1080],
		[2560, 1440],
	]
	for (const [width, height] of sizes) {
		test(`${width}x${height}`, async ({ page }) => {
			await page.setViewportSize({ width, height })
			await page.goto('/')
			await page.waitForLoadState('networkidle')
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
			expect(overflow).toBeLessThanOrEqual(0)
		})
	}
})
