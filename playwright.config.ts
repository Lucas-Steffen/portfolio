import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	reporter: 'list',
	use: {
		locale: 'pt-BR',
		baseURL: 'http://localhost:4178',
		channel: 'chrome',
		trace: 'retain-on-failure',
	},
	webServer: {
		command: 'npm run build && npm run preview -- --strictPort',
		url: 'http://localhost:4178',
		reuseExistingServer: true,
		timeout: 180_000,
	},
})
