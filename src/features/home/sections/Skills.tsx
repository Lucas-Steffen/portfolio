import { useState } from 'react'
import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import type { SkillGroupId } from '../../../content'
import { useLang } from '../../../i18n/LangProvider'

type Filter = 'all' | SkillGroupId

export function Skills() {
	const { t } = useLang()
	const { skills } = t
	const [filter, setFilter] = useState<Filter>('all')
	const visible = skills.groups.filter(group => filter === 'all' || group.id === filter)

	return (
		<Section id="skills" index="02" title={skills.title} intro={skills.intro}>
			<div className="filter-bar" role="group" aria-label={skills.title}>
				<button type="button" className="filter-btn" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
					{skills.all}
				</button>
				{skills.groups.map(group => (
					<button
						key={group.id}
						type="button"
						className="filter-btn"
						aria-pressed={filter === group.id}
						onClick={() => setFilter(group.id)}
					>
						{group.label}
					</button>
				))}
			</div>

			<Reveal>
				<div className="cards-grid skills-grid">
					{visible.map(group => (
						<article key={group.id} className="card skill-card" data-group={group.id}>
							<h3>{group.label}</h3>
							<p className="card-note">{group.application}</p>
							<ul className="tag-list">
								{group.items.map(item => (
									<li key={item} className="tag">
										{item}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</Reveal>
		</Section>
	)
}
