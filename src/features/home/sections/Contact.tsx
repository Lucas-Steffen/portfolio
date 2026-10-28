import { CheckIcon, CopyIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from '../../../components/ExternalLink'
import { Reveal } from '../../../components/Reveal'
import { Section } from '../../../components/Section'
import { links } from '../../../content'
import { useLang } from '../../../i18n/LangProvider'

export function Contact() {
	const { t } = useLang()
	const { contact } = t
	const [copied, setCopied] = useState(false)
	const timer = useRef<number>(undefined)

	useEffect(() => () => window.clearTimeout(timer.current), [])

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(links.email)
			setCopied(true)
			window.clearTimeout(timer.current)
			timer.current = window.setTimeout(() => setCopied(false), 2000)
		} catch {
			// Sem permissão de clipboard: o e-mail continua visível e clicável.
		}
	}

	return (
		<Section id="contact" index="07" title={contact.title}>
			<Reveal>
				<div className="contact-card">
					<div className="contact-copy">
						<p className="lead">{contact.lead}</p>
						<p>{contact.text}</p>

						<div className="contact-mail">
							<a className="mail-link" href={`mailto:${links.email}`}>
								{links.email}
							</a>
							<button type="button" className="btn btn-ghost" onClick={copy}>
								{copied ? <CheckIcon size={18} aria-hidden="true" /> : <CopyIcon size={18} aria-hidden="true" />}
								<span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
							</button>
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
