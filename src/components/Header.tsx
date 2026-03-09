import {
    HouseIcon,
    UserIcon,
    BriefcaseIcon,
    CodeIcon,
    GraduationCapIcon,
    WrenchIcon,
    ArticleIcon,
    ListIcon,
    XIcon,
} from '@phosphor-icons/react'
import { useLocation, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
    { label: 'Home',       icon: HouseIcon,         path: '/'           },
    { label: 'About',      icon: UserIcon,           path: '/about'      },
    { label: 'Experience', icon: BriefcaseIcon,      path: '/experience' },
    { label: 'Projects',   icon: CodeIcon,           path: '/projects'   },
    { label: 'Education',  icon: GraduationCapIcon,  path: '/education'  },
    { label: 'Skills',     icon: WrenchIcon,         path: '/skills'     },
    { label: 'Blog',       icon: ArticleIcon,        path: '/blog'       },
]

function HeaderButton({
    icon: Icon,
    label,
    active = false,
    onClick,
    mobile = false,
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
                display: 'flex',
                alignItems: 'center',
                gap: mobile ? '10px' : '7px',
                padding: mobile ? '10px 16px' : '6px 14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: mobile && (active || hovered)
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
                color: active
                    ? '#ffffff'
                    : hovered
                    ? 'rgba(255,255,255,0.85)'
                    : 'rgba(255,255,255,0.5)',
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

            {/* Dot indicator - só no desktop */}
            {active && !mobile && (
                <span
                    style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.6)',
                    }}
                />
            )}
        </button>
    )
}

export function Header() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    // Fecha o menu ao navegar
    const handleNavigate = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    const navStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
    }

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
            }}
        >
            {/* Desktop */}
            {!isMobile && (
                <nav style={{ ...navStyle, display: 'flex', alignItems: 'center', gap: '2px', padding: '5px 8px' }}>
                    {NAV_ITEMS.map(({ label, icon, path }) => (
                        <HeaderButton
                            key={label}
                            label={label}
                            icon={icon}
                            active={pathname === path}
                            onClick={() => handleNavigate(path)}
                        />
                    ))}
                </nav>
            )}

            {/* Mobile */}
            {isMobile && (
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    {/* Pill com item ativo + botão hamburguer */}
                    <nav style={{ ...navStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 8px' }}>
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, padding: '0 8px' }}>
                            {NAV_ITEMS.find(i => i.path === pathname)?.label ?? 'Menu'}
                        </span>

                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.7)',
                            }}
                        >
                            {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
                        </button>
                    </nav>

                    {/* Dropdown mobile */}
                    {menuOpen && (
                        <div
                            style={{
                                ...navStyle,
                                marginTop: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '6px',
                                gap: '2px',
                            }}
                        >
                            {NAV_ITEMS.map(({ label, icon, path }) => (
                                <HeaderButton
                                    key={label}
                                    label={label}
                                    icon={icon}
                                    active={pathname === path}
                                    onClick={() => handleNavigate(path)}
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