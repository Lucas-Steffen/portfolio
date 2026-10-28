import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { useLang } from '../../../i18n/LangProvider'
import { ArchitectureDiagram } from './ArchitectureDiagram'

export function About() {
	const { t } = useLang()
	const { about, proof } = t

	return (
		<>
			<div className="container">
				<ul className="proof-strip">
					{proof.map(item => (
						<li key={item.value}>
							<strong>{item.value}</strong>
							<span>{item.label}</span>
						</li>
					))}
				</ul>
			</div>

			<Section id="about" index="01" title={about.title}>
				<div className="about-grid">
					<Reveal>
						<div className="about-copy">
							<p className="lead">{about.lead}</p>
							<p>{about.text}</p>
							<ul className="principles">
								{about.principles.map(item => (
									<li key={item.title}>
										<h3>{item.title}</h3>
										<p>{item.text}</p>
									</li>
								))}
							</ul>
						</div>
					</Reveal>
					<Reveal delay={80}>
						<div className="photo-frame photo-frame-flat">
							<picture>
								<source
									type="image/avif"
									srcSet="/img/about-480.avif 480w, /img/about-800.avif 800w"
									sizes="(min-width: 880px) 36vw, 90vw"
								/>
								<source
									type="image/webp"
									srcSet="/img/about-480.webp 480w, /img/about-800.webp 800w"
									sizes="(min-width: 880px) 36vw, 90vw"
								/>
								<img
									src="/img/about-800.webp"
									alt={about.photoAlt}
									width="800"
									height="1067"
									loading="lazy"
									decoding="async"
								/>
							</picture>
						</div>
					</Reveal>
				</div>
				<ArchitectureDiagram />
			</Section>
		</>
	)
}
