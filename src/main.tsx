import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import { App } from './App'
import { prefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { LangProvider } from './i18n/LangProvider'

// Animação de entrada só quando é seguro: com IntersectionObserver e sem reduced-motion.
// O timeout garante que nada fique invisível se o observer nunca disparar.
const root = document.documentElement
if ('IntersectionObserver' in window && !prefersReducedMotion()) {
	root.classList.add('js-reveal')
	window.setTimeout(() => root.classList.remove('js-reveal'), 6000)
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<LangProvider>
			<App />
		</LangProvider>
	</StrictMode>,
)
