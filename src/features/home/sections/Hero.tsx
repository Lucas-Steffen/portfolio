import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, MapPinIcon } from '@phosphor-icons/react'
import { ExternalLink } from '../../../components/ExternalLink'
import { links } from '../../../content'
import { useLang } from '../../../i18n/LangProvider'
import { scrollToSection } from '../../../lib/scroll'

export function Hero() {
	const { t } = useLang()
	const { hero } = t

	return (
		<section id="hero" className="hero" aria-labelledby="hero-title">
			<div className="container hero-grid">
				<div className="hero-copy">
					<h1 id="hero-title">{hero.headline}</h1>
					<p className="eyebrow hero-role">{hero.role}</p>
					<p className="hero-intro">{hero.intro}</p>

					<div className="hero-actions">
						<a
							className="btn btn-primary"
							href="#cases"
							onClick={event => {
								event.preventDefault()
								scrollToSection('cases')
							}}
						>
							{hero.ctaCases}
						</a>
						<a
							className="btn btn-ghost"
							href="#contact"
							onClick={event => {
								event.preventDefault()
								scrollToSection('contact')
							}}
						>
							{hero.ctaContact}
						</a>
					</div>
				</div>

				<div className="hero-visual">
					<div className="photo-frame">
						<span className="hero-watermark" aria-hidden="true">
							LS
						</span>
						<picture>
							<source
								type="image/avif"
								srcSet="/img/hero-520.avif 520w, /img/hero-960.avif 960w"
								sizes="(min-width: 880px) 40vw, 80vw"
							/>
							<source
								type="image/webp"
								srcSet="/img/hero-520.webp 520w, /img/hero-960.webp 960w"
								sizes="(min-width: 880px) 40vw, 80vw"
							/>
							<img
								src="/img/hero-960.webp"
								alt={hero.photoAlt}
								width="960"
								height="1280"
								fetchPriority="high"
								decoding="async"
							/>
						</picture>
						<span className="photo-label">{hero.photoLabel}</span>
					</div>
				</div>

				<ul className="social-row" aria-label={hero.socialLabel}>
					<li>
						<ExternalLink className="icon-btn" href={links.github} aria-label="GitHub">
							<GithubLogoIcon size={22} aria-hidden="true" />
						</ExternalLink>
					</li>
					<li>
						<ExternalLink className="icon-btn" href={links.linkedin} aria-label="LinkedIn">
							<LinkedinLogoIcon size={22} aria-hidden="true" />
						</ExternalLink>
					</li>
					<li>
						<ExternalLink className="icon-btn" href={links.instagram} aria-label="Instagram">
							<InstagramLogoIcon size={22} aria-hidden="true" />
						</ExternalLink>
					</li>
					<li className="hero-location">
						<MapPinIcon size={16} aria-hidden="true" /> {hero.location}
					</li>
				</ul>
			</div>
		</section>
	)
}
