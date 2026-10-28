import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[]) {
	const [active, setActive] = useState<string>('hero')

	useEffect(() => {
		const elements = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
		if (!('IntersectionObserver' in window)) return
		const observer = new IntersectionObserver(
			entries => {
				const visible = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
				if (visible[0]) setActive(visible[0].target.id)
			},
			{ rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.2, 0.5] },
		)
		elements.forEach(element => observer.observe(element))
		const onScroll = () => {
			if (window.scrollY < 160) setActive('hero')
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			observer.disconnect()
			window.removeEventListener('scroll', onScroll)
		}
	}, [ids])

	return active
}
