import { GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { links } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLang } from '../i18n/LangProvider'
import { scrollToSection } from '../lib/scroll'
import { LanguageToggle } from './LanguageToggle'

const NAV_IDS = ['cases', 'experience', 'skills', 'contact'] as const
const OBSERVED = ['about', ...NAV_IDS] as const

export function Header() {
	const { t } = useLang()
	const active = useActiveSection(OBSERVED)
	const [open, setOpen] = useState(false)
	const headerRef = useRef<HTMLElement>(null)
	const toggleRef = useRef<HTMLButtonElement>(null)

	const labels: Record<(typeof NAV_IDS)[number], string> = {
		cases: t.nav.cases,
		experience: t.nav.experience,
		skills: t.nav.stack,
		contact: t.nav.contact,
	}

	const go = (id: string) => {
		scrollToSection(id)
		setOpen(false)
	}

	useEffect(() => {
		if (!open) return
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false)
				toggleRef.current?.focus()
			}
		}
		const onPointer = (event: PointerEvent) => {
			if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
		}
		const media = window.matchMedia('(min-width: 880px)')
		const onMedia = () => {
			if (media.matches) setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		document.addEventListener('pointerdown', onPointer)
		media.addEventListener('change', onMedia)
		return () => {
			document.removeEventListener('keydown', onKey)
			document.removeEventListener('pointerdown', onPointer)
			media.removeEventListener('change', onMedia)
		}
	}, [open])

	const renderLink = (id: (typeof NAV_IDS)[number]) => (
		<a
			key={id}
			href={`#${id}`}
			className={active === id ? 'active' : undefined}
			aria-current={active === id ? 'location' : undefined}
			onClick={event => {
				event.preventDefault()
				go(id)
			}}
		>
			{labels[id]}
		</a>
	)

	return (
		<header className="site-header" ref={headerRef}>
			<div className="container header-shell">
				<a
					className="header-brand"
					href="#hero"
					aria-label={t.nav.home}
					onClick={event => {
						event.preventDefault()
						go('hero')
					}}
				>
					<img
						className="brand-mark"
						src="/brand/lucas-steffen/icon-192.png"
						alt=""
						width={40}
						height={40}
						decoding="async"
					/>
					<span className="brand-copy">
						<strong>Lucas Steffen</strong>
						<small>{t.hero.role}</small>
					</span>
				</a>

				<nav className="header-nav" aria-label={t.nav.main}>
					{NAV_IDS.map(renderLink)}
				</nav>

				<div className="header-actions">
					<a className="icon-btn" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<GithubLogoIcon size={20} aria-hidden="true" />
					</a>
					<LanguageToggle />
					<button
						ref={toggleRef}
						type="button"
						className="icon-btn menu-toggle"
						onClick={() => setOpen(value => !value)}
						aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
						aria-expanded={open}
						aria-controls="mobile-nav"
					>
						{open ? <XIcon size={22} aria-hidden="true" /> : <ListIcon size={22} aria-hidden="true" />}
					</button>
				</div>
			</div>

			<nav id="mobile-nav" className="mobile-nav" aria-label={t.nav.main} hidden={!open}>
				{NAV_IDS.map(renderLink)}
			</nav>
		</header>
	)
}
