import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
	id: string
	title: string
	index: string
	intro?: string
	children: ReactNode
}

export function Section({ id, title, index, intro, children }: SectionProps) {
	return (
		<section id={id} className="section" aria-labelledby={`${id}-title`}>
			<div className="container">
				<Reveal>
					<div className="section-heading">
						<span className="section-index" aria-hidden="true">
							{index}
						</span>
						<h2 id={`${id}-title`}>{title}</h2>
					</div>
					{intro && <p className="section-intro">{intro}</p>}
				</Reveal>
				{children}
			</div>
		</section>
	)
}
