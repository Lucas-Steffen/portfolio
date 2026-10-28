import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { ExternalLink } from '../../../components/ExternalLink'
import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { useLang } from '../../../i18n/LangProvider'

export function Cases() {
	const { t } = useLang()
	const { cases } = t
	const { labels } = cases

	return (
		<Section id="cases" index="01" title={cases.title} intro={cases.intro} wide>
			<div className="cards-grid cases-grid">
				{cases.items.map((item, index) => (
					<Reveal key={item.title} delay={index * 60}>
						<article className="card case-card">
							<p className="card-kind">{item.kind}</p>
							<h3>{item.title}</h3>
							<dl>
								<dt>{labels.context}</dt>
								<dd>{item.context}</dd>
								{item.result && (
									<>
										<dt>{labels.result}</dt>
										<dd>{item.result}</dd>
									</>
								)}
							</dl>
							<details className="case-details">
								<summary>{labels.details}</summary>
								<dl>
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
								</dl>
							</details>
							<ul className="tag-list">
								{item.tech.map(tag => (
									<li key={tag} className="tag">
										{tag}
									</li>
								))}
							</ul>
							{item.links && (
								<ul className="case-links">
									{item.links.map(link => (
										<li key={link.url}>
											<ExternalLink className="case-link" href={link.url}>
												<GithubLogoIcon size={18} aria-hidden="true" />
													{link.label}
													<ArrowUpRightIcon className="case-link-arrow" size={14} aria-hidden="true" />
											</ExternalLink>
										</li>
									))}
								</ul>
							)}
						</article>
					</Reveal>
				))}
			</div>
		</Section>
	)
}
