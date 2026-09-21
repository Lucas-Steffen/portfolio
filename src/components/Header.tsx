import { GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useLang } from '../context/LangProvider'

const LABELS = {
    pt: { role: 'Engenheiro de Software Backend', home: 'Início', work: 'Atuação', experience: 'Experiência', skills: 'Stack', mainNav: 'Navegação principal', mobileNav: 'Navegação mobile', openMenu: 'Abrir menu', closeMenu: 'Fechar menu' },
    en: { role: 'Backend Software Engineer', home: 'Home', work: 'Work', experience: 'Experience', skills: 'Stack', mainNav: 'Main navigation', mobileNav: 'Mobile navigation', openMenu: 'Open menu', closeMenu: 'Close menu' },
}

const SECTIONS = ['hero', 'work', 'experience', 'skills'] as const
type SectionId = (typeof SECTIONS)[number]

function scrollTo(section: SectionId) {
    if (section === 'hero') return window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function useActiveSection() {
    const [active, setActive] = useState<SectionId>('hero')

    useEffect(() => {
        const elements = SECTIONS.slice(1).map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
            if (visible[0]) setActive(visible[0].target.id as SectionId)
        }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, .2, .5] })
        elements.forEach(element => observer.observe(element))
        const onScroll = () => { if (window.scrollY < 160) setActive('hero') }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
    }, [])

    return active
}

export function Header() {
    const { lang } = useLang()
    const labels = LABELS[lang]
    const active = useActiveSection()
    const [open, setOpen] = useState(false)
    const nav = [
        { id: 'work' as const, label: labels.work },
        { id: 'experience' as const, label: labels.experience },
        { id: 'skills' as const, label: labels.skills },
    ]

    const navigate = (id: SectionId) => { scrollTo(id); setOpen(false) }

    return <header className="site-header">
        <div className="header-shell">
            <button className="header-brand" onClick={() => navigate('hero')} aria-label={labels.home}>
                <span className="brand-mark">LS<span>.</span></span>
                <span className="brand-copy"><strong>Lucas Steffen</strong><small>{labels.role}</small></span>
            </button>

            <nav className="header-nav" aria-label={labels.mainNav}>
                {nav.map(item => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>{item.label}</button>)}
            </nav>

            <div className="header-actions">
                <a className="header-github" href="https://github.com/Lucas-Steffen" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogoIcon size={18} /></a>
                <button className="menu-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? labels.closeMenu : labels.openMenu} aria-expanded={open}>{open ? <XIcon size={20} /> : <ListIcon size={20} />}</button>
            </div>
        </div>

        {open && <nav className="mobile-nav" aria-label={labels.mobileNav}>
            {nav.map(item => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span>0{nav.indexOf(item) + 1}</span>{item.label}</button>)}
        </nav>}
    </header>
}
