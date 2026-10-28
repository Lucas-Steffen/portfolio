import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { useLang } from '../../../i18n/LangProvider'

export function Experience() {
	const { t } = useLang()
	const { experience } = t

	return (
		<Section id="experience" index="03" title={experience.title}>
			<ol className="timeline">
				{experience.items.map((item, index) => (
					<li key={`${item.company}-${item.role}`}>
						<Reveal delay={index * 60}>
							<article className="card">
								<header className="exp-head">
									<div>
										<h3>{item.role}</h3>
										<p className="exp-company">
											{item.company} · {item.location}
										</p>
									</div>
									<p className="exp-period">{item.current ? (item.period ? `${item.period} — ${experience.present}` : experience.present) : item.period}</p>
								</header>
								<p>{item.description}</p>
								<ul className="check-list">
									{item.highlights.map(highlight => (
										<li key={highlight}>{highlight}</li>
									))}
								</ul>
								<ul className="tag-list">
									{item.tags.map(tag => (
										<li key={tag} className="tag">
											{tag}
										</li>
									))}
								</ul>
							</article>
						</Reveal>
					</li>
				))}
			</ol>
		</Section>
	)
}
