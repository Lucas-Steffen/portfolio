import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { useLang } from '../../../i18n/LangProvider'

export function Projects() {
	const { t } = useLang()
	const { projects } = t

	return (
		<Section id="projects" index="05" title={projects.title}>
			<div className="cards-grid">
				{projects.items.map(item => (
					<Reveal key={item.title}>
						<article className="card">
							<p className="card-kind">
								{item.type} · {item.date}
							</p>
							<h3>{item.title}</h3>
							<p className="card-note">{item.status}</p>
							<p>{item.description}</p>
							<ul className="tag-list">
								{item.tags.map(tag => (
									<li key={tag} className="tag">
										{tag}
									</li>
								))}
							</ul>
						</article>
					</Reveal>
				))}
			</div>
		</Section>
	)
}

export function Education() {
	const { t } = useLang()
	const { education } = t

	return (
		<Section id="education" index="06" title={education.title}>
			<div className="cards-grid">
				{education.items.map(item => (
					<Reveal key={item.institution}>
						<article className="card">
							<p className="card-kind">{item.period}</p>
							<h3>{item.institution}</h3>
							<p>{item.degree}</p>
							<p className="card-note">{item.detail}</p>
						</article>
					</Reveal>
				))}
			</div>
		</Section>
	)
}
