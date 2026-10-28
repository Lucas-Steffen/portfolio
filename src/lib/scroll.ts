import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function scrollToSection(id: string) {
	const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth'
	if (id === 'hero') {
		window.scrollTo({ top: 0, behavior })
		history.replaceState(null, '', window.location.pathname)
		return
	}
	// o offset do header vem de `scroll-margin-top` nas seções
	document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
	history.replaceState(null, '', `#${id}`)
}
