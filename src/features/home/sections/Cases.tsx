import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { useLang } from '../../../i18n/LangProvider'

export function Cases() {
	const { t } = useLang()
	const { cases } = t
	const { labels } = cases

	return (
		<Section id="cases" index="02" title={cases.title} intro={cases.intro} wide>
			<div className="cards-grid cases-grid">
				{cases.items.map((item, index) => (
					<Reveal key={item.title} delay={index * 60}>
						<article className="card case-card">
							<p className="card-kind">{item.kind}</p>
							<h3>{item.title}</h3>
							<dl>
								<dt>{labels.context}</dt>
								<dd>{item.context}</dd>
								{item.contribution && (
									<>
										<dt>{labels.contribution}</dt>
										<dd>{item.contribution}</dd>
									</>
								)}
								<dt>{labels.decisions}</dt>
								<dd>
									<ul>
										{item.decisions.map(decision => (
											<li key={decision}>{decision}</li>
										))}
									</ul>
								</dd>
								{item.tradeoffs && (
									<>
										<dt>{labels.tradeoffs}</dt>
										<dd>{item.tradeoffs}</dd>
									</>
								)}
								{item.result && (
									<>
										<dt>{labels.result}</dt>
										<dd>{item.result}</dd>
									</>
								)}
							</dl>
							<ul className="tag-list">
								{item.tech.map(tag => (
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
