import { useEffect, useRef, type ReactNode } from 'react'

// Só esconde o conteúdo se o <html> tiver `js-reveal` (definido em main.tsx quando há
// IntersectionObserver e movimento é permitido). Sem isso, tudo fica visível.
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el || !('IntersectionObserver' in window)) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.style.transitionDelay = `${delay}ms`
					el.classList.add('visible')
					observer.disconnect()
				}
			},
			{ threshold: 0.08 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [delay])

	return (
		<div ref={ref} className="reveal">
			{children}
		</div>
	)
}
