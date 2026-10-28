import { ArrowUpRightIcon, EnvelopeSimpleIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { ExternalLink } from '../../../components/ExternalLink'
import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { links } from '../../../content'
import { useLang } from '../../../i18n/LangProvider'

export function Contact() {
	const { t } = useLang()
	const { contact } = t
	return (
		<Section id="contact" index="07" title={contact.title}>
			<Reveal>
				<div className="contact-card">
					<div className="contact-copy">
						<p className="lead">{contact.lead}</p>
						<p>{contact.text}</p>

						<div className="contact-mail">
							<a className="mail-link" href={`mailto:${links.email}`}>
								<EnvelopeSimpleIcon size={22} aria-hidden="true" />
								<span>{links.email}</span>
								<ArrowUpRightIcon className="mail-arrow" size={18} aria-hidden="true" />
							</a>
						</div>

						<ul className="contact-links">
							<li>
								<ExternalLink className="btn btn-ghost" href={links.linkedin}>
									<LinkedinLogoIcon size={20} aria-hidden="true" /> LinkedIn
								</ExternalLink>
							</li>
							<li>
								<ExternalLink className="btn btn-ghost" href={links.github}>
									<GithubLogoIcon size={20} aria-hidden="true" /> GitHub
								</ExternalLink>
							</li>
							<li>
								<ExternalLink className="btn btn-ghost" href={links.instagram}>
									<InstagramLogoIcon size={20} aria-hidden="true" /> Instagram
								</ExternalLink>
							</li>
						</ul>
					</div>

					<div className="photo-frame photo-frame-flat contact-photo">
						<picture>
							<source
								type="image/avif"
								srcSet="/img/contact-400.avif 400w, /img/contact-720.avif 720w"
								sizes="(min-width: 880px) 28vw, 80vw"
							/>
							<source
								type="image/webp"
								srcSet="/img/contact-400.webp 400w, /img/contact-720.webp 720w"
								sizes="(min-width: 880px) 28vw, 80vw"
							/>
							<img
								src="/img/contact-720.webp"
								alt={contact.photoAlt}
								width="720"
								height="960"
								loading="lazy"
								decoding="async"
							/>
						</picture>
					</div>
				</div>
			</Reveal>
		</Section>
	)
}
