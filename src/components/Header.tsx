import {
    HouseIcon,
    UserIcon,
    BriefcaseIcon,
    CodeIcon,
    GraduationCapIcon,
    WrenchIcon,
    ListIcon,
    XIcon
} from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { useLang } from '../context/LangProvider'

// ─── Translations ──────────────────────────────────────────────────────────────

const NAV_LABELS = {
    pt: {
        home:       'Início',
        about:      'Sobre',
        experience: 'Experiência',
        projects:   'Projetos',
        education:  'Educação',
        skills:     'Habilidades',
    },
    en: {
        home:       'Home',
        about:      'About',
        experience: 'Experience',
        projects:   'Projects',
        education:  'Education',
        skills:     'Skills',
    },
}

// ─── Nav items (sem Blog) ─────────────────────────────────────────────────────

const NAV_SECTIONS = [
    { key: 'home',       icon: HouseIcon,         section: 'hero'       },
    { key: 'about',      icon: UserIcon,          section: 'about'      },
    { key: 'experience', icon: BriefcaseIcon,     section: 'experience' },
    { key: 'projects',   icon: CodeIcon,          section: 'projects'   },
    { key: 'education',  icon: GraduationCapIcon, section: 'education'  },
    { key: 'skills',     icon: WrenchIcon,        section: 'skills'     },
] as const

// ─── Scroll helper ────────────────────────────────────────────────────────────

function scrollToSection(section: string) {
    if (section === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }
    const el = document.getElementById(section)
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
    }
}

// ─── Active section hook ──────────────────────────────────────────────────────

function useActiveSection() {
    const [active, setActive] = useState('hero')

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY < 80) setActive('hero')
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        const elements = NAV_SECTIONS
            .filter(i => i.section !== 'hero')
            .map(i => document.getElementById(i.section))
            .filter(Boolean) as HTMLElement[]

        const obs = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
                if (visible.length > 0 && window.scrollY >= 80) {
                    setActive(visible[0].target.id)
                }
            },
            { rootMargin: '-80px 0px -40% 0px', threshold: [0.1, 0.3, 0.5] }
        )

        elements.forEach(el => obs.observe(el))
        return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
    }, [])

    return active
}

// ─── HeaderButton ─────────────────────────────────────────────────────────────

function HeaderButton({
    icon: Icon, label, active = false, onClick, mobile = false,
}: {
    icon: React.ElementType
    label: string
    active?: boolean
    onClick?: () => void
    mobile?: boolean
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center',
                gap: mobile ? '10px' : '7px',
                padding: mobile ? '10px 16px' : '6px 14px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: mobile && (active || hovered) ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: active ? '#ffffff' : hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                transition: 'color 0.2s, background 0.2s',
                fontSize: mobile ? '15px' : '14px',
                fontWeight: active ? 500 : 400,
                letterSpacing: '0.01em',
                position: 'relative',
                width: mobile ? '100%' : 'auto',
            }}
        >
            <Icon size={mobile ? 18 : 16} weight={active ? 'fill' : 'regular'} style={{ flexShrink: 0 }} />
            {label}

            {active && !mobile && (
                <span style={{ position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
            )}
        </button>
    )
}

// ─── LangButton ───────────────────────────────────────────────────────────────



// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
    const { lang } = useLang()
    const labels = NAV_LABELS[lang]
    const activeSection = useActiveSection()
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const handleClick = (section: string) => {
        scrollToSection(section)
        setMenuOpen(false)
    }

    const navStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
    }

    const activeLabel = labels[NAV_SECTIONS.find(i => i.section === activeSection)?.key ?? 'home']

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '16px' }}>

            {/* Desktop */}
            {!isMobile && (
                <nav style={{ ...navStyle, display: 'flex', alignItems: 'center', gap: '2px', padding: '5px 8px' }}>
                    {NAV_SECTIONS.map(({ key, icon, section }) => (
                        <HeaderButton
                            key={section}
                            label={labels[key]}
                            icon={icon}
                            active={activeSection === section}
                            onClick={() => handleClick(section)}
                        />
                    ))}
                </nav>
            )}

            {/* Mobile */}
            {isMobile && (
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <nav style={{ ...navStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px' }}>
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, padding: '0 8px' }}>
                            {activeLabel}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                                onClick={() => setMenuOpen(prev => !prev)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}
                            >
                                {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
                            </button>
                        </div>
                    </nav>

                    {menuOpen && (
                        <div style={{ ...navStyle, marginTop: '8px', display: 'flex', flexDirection: 'column', padding: '6px', gap: '2px' }}>
                            {NAV_SECTIONS.map(({ key, icon, section }) => (
                                <HeaderButton
                                    key={section}
                                    label={labels[key]}
                                    icon={icon}
                                    active={activeSection === section}
                                    onClick={() => handleClick(section)}
                                    mobile
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}