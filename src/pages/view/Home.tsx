import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import {
    EnvelopeIcon,
    LinkedinLogoIcon,
    GithubLogoIcon,
    MapPinIcon,
    BriefcaseIcon,
    ArrowSquareOutIcon,
    CalendarIcon,
    TagIcon,
    ArrowRightIcon,
    TranslateIcon,
} from '@phosphor-icons/react'
import { useLang } from '../../context/LangProvider'

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubProfile {
    avatar_url: string
    name: string
    bio: string
    public_repos: number
    followers: number
    following: number
}

type Lang = 'pt' | 'en'

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
    pt: {
        openToWork: 'Aberto a oportunidades',
        roles: ['Desenvolvedor Web Full-Stack', 'Engenheiro de Software'],
        location: 'Sinop, Mato Grosso – Brasil',
        repos: 'Repositórios',
        followers: 'Seguidores',
        following: 'Seguindo',
        about: 'Sobre',
        aboutText: 'Desenvolvedor Web Full-Stack com experiência prática adquirida por meio de projetos próprios, desenvolvimento de APIs e soluções aplicadas ao uso real no dia a dia. Tenho sólida base em desenvolvimento front-end e back-end, com foco em organização, clareza de código, desempenho e escalabilidade. Atualmente curso Engenharia de Software.',
        experience: 'Experiência',
        projects: 'Projetos',
        education: 'Educação',
        skills: 'Habilidades',
        blog: 'Blog',
        present: 'Atual',
        website: 'Site',
        footer: '© {year} Lucas G. Amorim Steffen',
        experience_items: [
            { role: 'Desenvolvedor Full-Stack Jr', company: 'VF PAR', description: 'Atuação no desenvolvimento dos sistemas da empresa', current: true },
            { role: 'Analista de Q.A', company: 'TopSapp', location: 'Sinop, MT – Brasil', period: 'Dezembro 2025 – Março 2026', description: 'Atuação em testes funcionais, regressão e validação de fluxos críticos em sistemas web, assegurando estabilidade antes e após deploy.', current: false },
            { role: 'Analista de Implantação a Sistemas', company: 'Ecocentauro', location: 'Sinop, MT – Brasil', period: 'Janeiro 2024 – Dezembro 2025', description: 'Desenvolvimento de relatórios detalhados utilizando Crystal Reports e FastReports, com uso de SQL para extrair e formatar dados conforme requisitos específicos.', current: false },
            { role: 'Assistente Administrativo', company: 'Autoescola Meridional', location: 'Sinop, MT – Brasil', period: 'Fevereiro 2023 – Janeiro 2024', description: 'Agendamento de aulas, envio de aulas, arquivamento e montagem de processos de CNH.', current: false },
        ],
        education_items: [
            { institution: 'Estácio', period: '2025 – 2029', degree: 'Bacharelado em Engenharia de Software (Em andamento)', detail: 'Previsão de conclusão: 2029 · 2º Semestre' },
        ],
        projects_items: [
            { title: 'Conversy', status: 'Ao vivo', type: 'Sistema de gestão de SDRs', date: '2026', description: 'Sistema desenvolvido com React, Typescript, Tailwind CSS e backend com Node.Js, Express.Js e PostgreSQL.', tags: ['React', 'Typescript', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'], url: 'https://conversy.up.railway.app/', statusColor: '#22c55e' },
            { title: 'Portfólio Pessoal', status: 'Ao vivo', type: 'Projeto pessoal', date: '2026', description: 'Portfólio desenvolvido com React, TypeScript e Tailwind CSS, com integração à API do GitHub e sistema de internacionalização PT/EN.', tags: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub API'], url: '#', statusColor: '#22c55e' },
        ],
        blog_items: [] as { title: string; excerpt: string; date: string }[],
        skillCategories: {
            all: 'Todos',
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Banco de Dados',
            tools: 'Ferramentas',
        },
    },
    en: {
        openToWork: 'Open to work',
        roles: ['Full-Stack Web Developer', 'Software Engineer'],
        location: 'Sinop, Mato Grosso – Brazil',
        repos: 'Repos',
        followers: 'Followers',
        following: 'Following',
        about: 'About',
        aboutText: 'Full-Stack Web Developer with practical experience gained through personal projects, API development, and real-world solutions. I have a solid foundation in front-end and back-end development, focusing on code organization, clarity, performance, and scalability. Currently studying Software Engineering.',
        experience: 'Experience',
        projects: 'Projects',
        education: 'Education',
        skills: 'Skills',
        blog: 'Blog',
        present: 'Current',
        website: 'Website',
        footer: '© {year} Lucas G. Amorim Steffen',
        experience_items: [
            { role: 'Junior Full-Stack Developer', company: 'VF PAR', description: 'Involvement in the development of the company systems.', current: true },
            { role: 'Q.A. Analyst', company: 'TopSapp', location: 'Sinop, MT – Brazil', period: 'December 2025 – March 2026', description: 'Performed functional testing, regression, and validation of critical workflows in web systems, ensuring stability before and after deployments.', current: false },
            { role: 'Systems Implementation Analyst', company: 'Ecocentauro', location: 'Sinop, MT – Brazil', period: 'January 2024 – December 2025', description: 'Assisted in creating detailed reports using Crystal Reports and FastReports, leveraging SQL to extract and format data according to specific requirements.', current: false },
            { role: 'Administrative Assistant', company: 'Autoescola Meridional', location: 'Sinop, MT – Brazil', period: 'February 2023 – January 2024', description: 'Managed class scheduling, lesson delivery, archiving CNH processes, and assembling CNH documentation.', current: false },
        ],
        education_items: [
            { institution: 'Estácio', period: '2025 – 2029', degree: "Bachelor's in Software Engineering (Ongoing)", detail: 'Expected graduation: 2029 · 2st Semester' },
        ],
        projects_items: [
            { title: 'Conversy', status: 'Live', type: 'SDR management system', date: '2026', description: 'System developed with React, Typescript, Tailwind CSS and backend with Node.Js, Express.Js and PostgreSQL.', tags: ['React', 'Typescript', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'], url: 'https://conversy.up.railway.app/', statusColor: '#22c55e' },
            { title: 'Personal Portfolio', status: 'Live', type: 'Personal project', date: '2026', description: 'Portfolio built with React, TypeScript and Tailwind CSS, featuring GitHub API integration and a PT/EN internationalization system.', tags: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub API'], url: '#', statusColor: '#22c55e' },
        ],
        blog_items: [] as { title: string; excerpt: string; date: string }[],
        skillCategories: {
            all: 'All',
            frontend: 'Frontend',
            backend: 'Backend',
            database: 'Database',
            tools: 'Tools',
        },
    },
}

const GITHUB_USERNAME = 'Lucas-Steffen'

const SKILLS = {
    frontend: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
    backend: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
    database: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'Firebird', icon: null }, // sem ícone oficial no devicons
    ],
    tools: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Agile/Kanban', icon: null },
        { name: 'Scrum', icon: null },
    ],
}

const SOCIAL = (lang: Lang) => [
    { label: lang === 'pt' ? 'E-mail' : 'Email', icon: EnvelopeIcon, href: 'mailto:lucasgabriel.programador@gmail.com' },
    { label: 'LinkedIn', icon: LinkedinLogoIcon, href: 'https://linkedin.com/in/lucasteffen' },
    { label: 'GitHub', icon: GithubLogoIcon, href: `https://github.com/${GITHUB_USERNAME}` },
]

// ─── Global CSS ───────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@keyframes blobMove {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -20px) scale(1.05); }
    66%       { transform: translate(-20px, 15px) scale(0.97); }
}
@keyframes shimmerRing {
    0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0), 0 0 20px 4px rgba(99,102,241,0.15); }
    50%  { box-shadow: 0 0 0 6px rgba(99,102,241,0.08), 0 0 32px 8px rgba(99,102,241,0.25); }
    100% { box-shadow: 0 0 0 0 rgba(99,102,241,0), 0 0 20px 4px rgba(99,102,241,0.15); }
}
@keyframes cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}
@keyframes skillPop {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
}
.reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
.card-hover {
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}
.card-hover:hover {
    border-color: rgba(99,102,241,0.35) !important;
    box-shadow: 0 0 24px rgba(99,102,241,0.08);
    transform: translateY(-2px);
}
.social-link {
    transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s !important;
}
.social-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99,102,241,0.15) !important;
}
`

// ─── Stars background ─────────────────────────────────────────────────────────

function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        let animId: number
        const resize = () => { canvas.width = window.innerWidth; canvas.height = document.body.scrollHeight }
        const stars = Array.from({ length: 180 }, () => ({
            x: Math.random(), y: Math.random(),
            r: Math.random() * 1.2 + 0.3,
            alpha: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 0.003 + 0.001,
            phase: Math.random() * Math.PI * 2,
        }))
        let t = 0
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach(s => {
                const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.phase))
                ctx.beginPath()
                ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(147,210,255,${a})`
                ctx.fill()
            })
            t += 0.016
            animId = requestAnimationFrame(draw)
        }
        resize(); draw()
        window.addEventListener('resize', resize)
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
    }, [])
    return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

// ─── Typing effect ────────────────────────────────────────────────────────────

function TypedRole({ roles }: { roles: string[] }) {
    const [display, setDisplay] = useState('')
    const [roleIdx, setRoleIdx] = useState(0)
    const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')

    useEffect(() => {
        const target = roles[roleIdx]
        let timeout: ReturnType<typeof setTimeout>

        if (phase === 'typing') {
            if (display.length < target.length) {
                timeout = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 60)
            } else {
                timeout = setTimeout(() => setPhase('pause'), 1800)
            }
        } else if (phase === 'pause') {
            timeout = setTimeout(() => setPhase('erasing'), 400)
        } else {
            if (display.length > 0) {
                timeout = setTimeout(() => setDisplay(d => d.slice(0, -1)), 35)
            } else {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setRoleIdx(i => (i + 1) % roles.length)
                setPhase('typing')
            }
        }
        return () => clearTimeout(timeout)
    }, [display, phase, roleIdx, roles])

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '6px 16px', marginBottom: '10px', minWidth: '260px', justifyContent: 'center' }}>
            <BriefcaseIcon size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
            <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
                {display}
                <span style={{ animation: 'cursor 1s step-end infinite', color: '#6366f1', marginLeft: '1px' }}>|</span>
            </span>
        </div>
    )
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.style.transitionDelay = `${delay}ms`
                el.classList.add('visible')
                obs.disconnect()
            }
        }, { threshold: 0.12 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [delay])
    return <div ref={ref} className="reveal">{children}</div>
}

// ─── Glow Hero Blob ───────────────────────────────────────────────────────────

function HeroBlob() {
    return (
        <div style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'blobMove 10s ease-in-out infinite',
            zIndex: 0,
        }} />
    )
}

// ─── Lang Toggle ──────────────────────────────────────────────────────────────

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={onToggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            style={{
                position: 'fixed', bottom: '24px', right: '24px', zIndex: 100,
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '8px 14px', borderRadius: '99px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: hovered ? 'rgba(99,102,241,0.25)' : 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(12px)',
                color: hovered ? '#fff' : '#94a3b8',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s', letterSpacing: '0.04em',
                boxShadow: hovered ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
            }}
        >
            <TranslateIcon size={16} />
            {lang === 'pt' ? 'EN' : 'PT'}
        </button>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} style={{ marginBottom: '80px' }}>
            <RevealSection>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                    <h2 style={{ color: '#f1f5f9', fontSize: '22px', fontWeight: 700, fontFamily: "'Sora', sans-serif", whiteSpace: 'nowrap' }}>
                        {title}
                    </h2>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(99,102,241,0.4), rgba(255,255,255,0.05))' }} />
                </div>
            </RevealSection>
            {children}
        </section>
    )
}

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number,
    r: number,
) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
}

function formatDate(dateStr: string, lang: Lang): string {
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

interface ContributionDay {
    date: string
    count: number
    level: number
}

interface TooltipState {
    visible: boolean
    x: number
    y: number
    date: string
    count: number
}

function GitHubContributionSnake({ username, lang }: { username: string; lang: Lang }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [stats, setStats] = useState<{ last30: number; lastYear: number } | null>(null)
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, date: '', count: 0 })

    const gridRef = useRef<number[][]>([])
    const dateGridRef = useRef<ContributionDay[][]>([])

    const pathIdxRef = useRef(0)
    const eatenRef = useRef<Set<string>>(new Set())
    const snakeRef = useRef<[number, number][]>([])
    const animRef = useRef(0)
    const lastStepRef = useRef(0)

    const WEEKS = 52
    const DAYS = 7
    const CELL = 10
    const GAP = 2
    const STEP = CELL + GAP
    const W = WEEKS * STEP - GAP
    const H = DAYS * STEP - GAP
    const SNAKE_LEN = 7
    const SPEED_MS = 55

    const path = useMemo<[number, number][]>(() => {
        const p: [number, number][] = []
        for (let row = 0; row < DAYS; row++) {
            for (let i = 0; i < WEEKS; i++) {
                const col = row % 2 === 0 ? i : WEEKS - 1 - i
                p.push([col, row])
            }
        }
        return p
    }, [])

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
            .then(r => r.json())
            .then(({ contributions }: { contributions: ContributionDay[]; total: Record<string, number> }) => {
                const now = new Date()
                const cutoff365 = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
                const cutoff52w = new Date(now.getTime() - 52 * 7 * 24 * 60 * 60 * 1000)
                const cutoff30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

                const grid: number[][] = Array.from({ length: WEEKS }, () => Array(DAYS).fill(0))
                const dateGrid: ContributionDay[][] = Array.from({ length: WEEKS }, () =>
                    Array(DAYS).fill(null).map(() => ({ date: '', count: 0, level: 0 }))
                )

                let last30 = 0
                let lastYear = 0

                contributions.forEach(c => {
                    const d = new Date(c.date + 'T12:00:00')

                    if (d >= cutoff52w) {
                        const diffDays = Math.floor((d.getTime() - cutoff52w.getTime()) / 86400000)
                        const col = Math.floor(diffDays / 7)
                        const row = diffDays % 7
                        if (col >= 0 && col < WEEKS) {
                            grid[col][row] = c.level
                            dateGrid[col][row] = c
                        }
                    }

                    // Contadores (365 dias e 30 dias)
                    if (d >= cutoff365) lastYear += c.count
                    if (d >= cutoff30) last30 += c.count
                })

                gridRef.current = grid
                dateGridRef.current = dateGrid
                setStats({ last30, lastYear })
            })
            .catch(() => { })
    }, [username])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!

        const LEVEL_COLORS = [
            'rgba(255,255,255,0.06)',
            'rgba(99,102,241,0.28)',
            'rgba(99,102,241,0.50)',
            'rgba(99,102,241,0.74)',
            'rgba(99,102,241,1.00)',
        ]
        const EATEN_COLOR = 'rgba(255,255,255,0.03)'

        snakeRef.current = [path[0]]
        pathIdxRef.current = 0
        eatenRef.current = new Set()

        const draw = (ts: number) => {
            if (ts - lastStepRef.current >= SPEED_MS) {
                lastStepRef.current = ts
                const nextIdx = (pathIdxRef.current + 1) % path.length
                pathIdxRef.current = nextIdx
                const head = path[nextIdx]
                snakeRef.current = [head, ...snakeRef.current.slice(0, SNAKE_LEN - 1)]
                eatenRef.current.add(`${head[0]},${head[1]}`)
                if (nextIdx === 0) eatenRef.current = new Set()
            }

            ctx.clearRect(0, 0, W, H)

            const grid = gridRef.current
            const snake = snakeRef.current
            const eaten = eatenRef.current

            const snakeMap = new Map<string, number>()
            snake.forEach(([c, r], i) => snakeMap.set(`${c},${r}`, i))

            for (let col = 0; col < WEEKS; col++) {
                for (let row = 0; row < DAYS; row++) {
                    const x = col * STEP
                    const y = row * STEP
                    const key = `${col},${row}`
                    const sIdx = snakeMap.get(key)

                    ctx.shadowBlur = 0

                    if (sIdx !== undefined) {
                        if (sIdx === 0) {
                            ctx.shadowBlur = 14
                            ctx.shadowColor = '#22c55e'
                            ctx.fillStyle = '#22c55e'
                        } else {
                            const t = 1 - sIdx / SNAKE_LEN
                            const a = t * 0.85 + 0.15
                            ctx.shadowBlur = 6 * t
                            ctx.shadowColor = `rgba(34,197,94,${a})`
                            ctx.fillStyle = `rgba(34,197,94,${a})`
                        }
                    } else if (eaten.has(key)) {
                        ctx.fillStyle = EATEN_COLOR
                    } else {
                        const level = grid[col]?.[row] ?? 0
                        ctx.fillStyle = LEVEL_COLORS[Math.min(level, 4)]
                    }

                    roundRect(ctx, x, y, CELL, CELL, 2)
                    ctx.fill()
                    ctx.shadowBlur = 0
                }
            }

            animRef.current = requestAnimationFrame(draw)
        }

        animRef.current = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animRef.current)
    }, [H, STEP, W, path])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const scaleX = W / rect.width
        const scaleY = H / rect.height
        const mx = (e.clientX - rect.left) * scaleX
        const my = (e.clientY - rect.top) * scaleY

        const col = Math.floor(mx / STEP)
        const row = Math.floor(my / STEP)
        const cellX = col * STEP
        const cellY = row * STEP
        const insideCell = mx >= cellX && mx <= cellX + CELL && my >= cellY && my <= cellY + CELL

        if (col >= 0 && col < WEEKS && row >= 0 && row < DAYS && insideCell) {
            const day = dateGridRef.current[col]?.[row]
            if (day && day.date) {
                const wRect = wrapperRef.current?.getBoundingClientRect()
                const tx = e.clientX - (wRect?.left ?? 0)
                const ty = e.clientY - (wRect?.top ?? 0)
                setTooltip({ visible: true, x: tx, y: ty, date: day.date, count: day.count })
                return
            }
        }
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev)
    }, [WEEKS, STEP, CELL, W, H])

    const handleMouseLeave = useCallback(() => {
        setTooltip(prev => ({ ...prev, visible: false }))
    }, [])

    const labels = {
        pt: {
            d30: 'commits nos últimos 30 dias',
            yr: 'commits no último ano',
            noCommits: 'Nenhum commit em',
            oneCommit: 'commit em',
            manyCommits: 'commits em',
        },
        en: {
            d30: 'commits in the last 30 days',
            yr: 'commits in the last year',
            noCommits: 'No commits on',
            oneCommit: 'commit on',
            manyCommits: 'commits on',
        },
    }[lang]

    const tooltipText = tooltip.count === 0
        ? `${labels.noCommits} ${formatDate(tooltip.date, lang)}`
        : `${tooltip.count} ${tooltip.count === 1 ? labels.oneCommit : labels.manyCommits} ${formatDate(tooltip.date, lang)}`

    return (
        <div
            ref={wrapperRef}
            style={{
                width: '100%',
                marginTop: '28px',
                marginBottom: '4px',
                animation: 'fadeUp 0.7s ease 0.5s both',
                position: 'relative',
            }}
        >
            {/* Grid */}
            <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                <canvas
                    ref={canvasRef}
                    width={W}
                    height={H}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        borderRadius: '6px',
                        cursor: 'crosshair',
                    }}
                />
            </div>

            {/* Tooltip */}
            {tooltip.visible && tooltip.date && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.x,
                        top: tooltip.y - 48,
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none',
                        zIndex: 50,
                        background: 'rgba(15,23,42,0.96)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
                        fontSize: '12px',
                        color: '#cbd5e1',
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: 1.4,
                    }}
                >
                    <span style={{
                        display: 'inline-block',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: tooltip.count > 0 ? '#6366f1' : 'rgba(255,255,255,0.15)',
                        marginRight: '6px',
                        verticalAlign: 'middle',
                        boxShadow: tooltip.count > 0 ? '0 0 6px rgba(99,102,241,0.6)' : 'none',
                    }} />
                    <span style={{ color: tooltip.count > 0 ? '#f1f5f9' : '#64748b' }}>
                        {tooltipText}
                    </span>
                    <div style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)',
                        width: '8px',
                        height: '8px',
                        background: 'rgba(15,23,42,0.96)',
                        borderRight: '1px solid rgba(255,255,255,0.10)',
                        borderBottom: '1px solid rgba(255,255,255,0.10)',
                    }} />
                </div>
            )}

            {/* Stats */}
            {stats && (
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    marginTop: '10px',
                    flexWrap: 'wrap',
                }}>
                    {[
                        { value: stats.last30, label: labels.d30 },
                        { value: stats.lastYear, label: labels.yr },
                    ].map(({ value, label }) => (
                        <span key={label} style={{ color: '#64748b', fontSize: '12px' }}>
                            <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '13px' }}>
                                {value.toLocaleString()}
                            </span>
                            {' '}{label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export function Home() {
    const [github, setGithub] = useState<GitHubProfile | null>(null)
    const [imgError, setImgError] = useState(false)
    const { lang, toggle: toggleLang } = useLang()
    const [activeSkillFilter, setActiveSkillFilter] = useState<'all' | keyof typeof SKILLS>('all')

    const t = T[lang]

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
            .then(r => r.json()).then(d => setGithub(d)).catch(() => null)
    }, [])

    const avatarUrl = !imgError && github?.avatar_url
        ? github.avatar_url
        : `https://ui-avatars.com/api/?name=Lucas+Steffen&background=1e293b&color=94a3b8&size=200`

    return (
        <>
            <style>{GLOBAL_CSS}</style>
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

            <LangToggle lang={lang} onToggle={toggleLang} />

            <div style={{ position: 'relative', zIndex: 1, fontFamily: "'DM Sans', sans-serif" }}>
                <StarField />

                <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

                    {/* ── Hero ── */}
                    <div id="hero" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '48px', paddingBottom: '72px' }}>
                        <HeroBlob />

                        {/* Avatar with shimmer ring */}
                        <div style={{ position: 'relative', marginBottom: '24px', zIndex: 1, animation: 'fadeIn 0.8s ease' }}>
                            <div style={{
                                width: '112px', height: '112px', borderRadius: '50%', padding: '3px',
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.7), rgba(139,92,246,0.4))',
                                animation: 'shimmerRing 3s ease-in-out infinite',
                            }}>
                                <img
                                    src={avatarUrl}
                                    onError={() => setImgError(true)}
                                    alt="Avatar"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'block', flexShrink: 0, boxShadow: '0 0 6px #22c55e' }} />
                                <span style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 500 }}>{t.openToWork}</span>
                            </div>
                        </div>

                        {/* GitHub stats */}
                        {github && (
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.6s ease 0.1s both' }}>
                                {([
                                    { label: t.repos, value: github.public_repos },
                                    { label: t.followers, value: github.followers },
                                    { label: t.following, value: github.following },
                                ] as { label: string; value: number }[]).map(({ label, value }) => (
                                    <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', padding: '3px 12px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{value}</span>
                                        <span style={{ color: '#64748b', fontSize: '12px' }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Name */}
                        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, fontFamily: "'Sora', sans-serif", lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em', animation: 'fadeUp 0.7s ease 0.2s both', zIndex: 1 }}>
                            Lucas G. Amorim Steffen
                        </h1>

                        {/* Typed role */}
                        <div style={{ animation: 'fadeUp 0.7s ease 0.35s both', zIndex: 1 }}>
                            <TypedRole roles={t.roles} />
                        </div>

                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', animation: 'fadeUp 0.7s ease 0.45s both' }}>
                            <MapPinIcon size={14} style={{ color: '#64748b' }} />
                            <span style={{ color: '#64748b', fontSize: '14px' }}>{t.location}</span>
                        </div>
                        <GitHubContributionSnake username={GITHUB_USERNAME} lang={lang} />

                        {/* Social */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.7s ease 0.55s both' }}>
                            {SOCIAL(lang).map(({ label, icon: Icon, href }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer"
                                    className="social-link"
                                    style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '8px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(99,102,241,0.5)' }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
                                >
                                    <Icon size={16} />{label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── About ── */}
                    <Section id="about" title={t.about}>
                        <RevealSection delay={50}>
                            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '15px' }}>{t.aboutText}</p>
                        </RevealSection>
                    </Section>

                    {/* ── Experience ── */}
                    <Section id="experience" title={t.experience}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {t.experience_items.map((exp, i) => (
                                <RevealSection key={i} delay={i * 80}>
                                    <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                            <div>
                                                <h3 style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 600, marginBottom: '2px' }}>{exp.role}</h3>
                                                <span style={{ color: '#6366f1', fontSize: '13px', fontWeight: 500 }}>{exp.company}</span>
                                                <span style={{ color: '#475569', fontSize: '12px', marginLeft: '8px' }}>· {exp.location}</span>
                                            </div>
                                            <span style={{ fontSize: '12px', color: exp.current ? '#22c55e' : '#64748b', background: exp.current ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${exp.current ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '99px', padding: '2px 10px', whiteSpace: 'nowrap' }}>
                                                {exp.current ? t.present : exp.period}
                                            </span>
                                        </div>
                                        {!exp.current && <p style={{ color: '#475569', fontSize: '12px', marginBottom: '6px' }}>{exp.period}</p>}
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, marginTop: '8px' }}>{exp.description}</p>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </Section>

                    {/* ── Projects ── */}
                    <Section id="projects" title={`${t.projects} (${t.projects_items.length})`}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {t.projects_items.map((p, i) => (
                                <RevealSection key={i} delay={i * 80}>
                                    <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                            <h3 style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 600 }}>{p.title}</h3>
                                            <span style={{ fontSize: '12px', color: p.statusColor, background: `${p.statusColor}18`, border: `1px solid ${p.statusColor}33`, borderRadius: '99px', padding: '2px 10px' }}>{p.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}><TagIcon size={12} />{p.type}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}><CalendarIcon size={12} />{p.date}</span>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, marginBottom: '14px' }}>{p.description}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                {p.tags.map(tag => (
                                                    <span key={tag} style={{ fontSize: '11px', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px' }}>{tag}</span>
                                                ))}
                                            </div>
                                            <a href={p.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6366f1', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>
                                                <ArrowSquareOutIcon size={14} />{t.website}
                                            </a>
                                        </div>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </Section>

                    {/* ── Education ── */}
                    <Section id="education" title={t.education}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {t.education_items.map((e, i) => (
                                <RevealSection key={i} delay={i * 80}>
                                    <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                            <h3 style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 600 }}>{e.institution}</h3>
                                            <span style={{ color: '#64748b', fontSize: '12px' }}>{e.period}</span>
                                        </div>
                                        <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>{e.degree}</p>
                                        {e.detail && <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>{e.detail}</p>}
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </Section>

                    {/* ── Skills ── */}
                    <Section id="skills" title={t.skills}>
                        <RevealSection>
                            {/* Filter tabs */}
                            <div style={{
                                display: 'flex', gap: '8px', flexWrap: 'wrap',
                                justifyContent: 'center', marginBottom: '32px',
                            }}>
                                {(['all', 'frontend', 'backend', 'database', 'tools'] as const).map(cat => {
                                    const isActive = activeSkillFilter === cat
                                    return (
                                        <button
                                            key={cat}
                                            className="filter-btn"
                                            onClick={() => setActiveSkillFilter(cat)}
                                            style={{
                                                padding: '7px 18px', borderRadius: '99px', cursor: 'pointer',
                                                fontSize: '13px', fontWeight: 600, border: '1px solid',
                                                borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.1)',
                                                background: isActive
                                                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                                    : 'rgba(255,255,255,0.04)',
                                                color: isActive ? '#fff' : '#94a3b8',
                                                boxShadow: isActive ? '0 0 18px rgba(99,102,241,0.35)' : 'none',
                                            }}
                                        >
                                            {t.skillCategories[cat]}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Cards grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                                gap: '12px',
                            }}>
                                {(Object.entries(SKILLS) as [keyof typeof SKILLS, typeof SKILLS.frontend][])
                                    .filter(([cat]) => activeSkillFilter === 'all' || cat === activeSkillFilter)
                                    .flatMap(([, items]) => items)
                                    .map((skill, i) => (
                                        <div
                                            key={skill.name}
                                            className="skill-card"
                                            style={{
                                                display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', justifyContent: 'center',
                                                gap: '12px', padding: '22px 12px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.07)',
                                                borderRadius: '16px', cursor: 'default',
                                                animation: `cardPop 0.35s ease ${i * 40}ms both`,
                                            }}
                                        >
                                            {skill.icon ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    width={42}
                                                    height={42}
                                                    style={{
                                                        objectFit: 'contain',
                                                        filter: skill.name === 'Express.js' ? 'invert(1) opacity(0.85)' : 'none',
                                                        flexShrink: 0,
                                                    }}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '42px', height: '42px', borderRadius: '10px',
                                                    background: 'rgba(99,102,241,0.2)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '18px', fontWeight: 800, color: '#a5b4fc',
                                                }}>
                                                    {skill.name[0]}
                                                </div>
                                            )}
                                            <span style={{
                                                color: '#94a3b8', fontSize: '12px',
                                                fontWeight: 500, textAlign: 'center',
                                                lineHeight: 1.3,
                                            }}>
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </RevealSection>
                    </Section>

                    {/* ── Blog ── */}
                    {t.blog_items.length > 0 && (
                        <Section id="blog" title={t.blog}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {t.blog_items.map((post, i) => (
                                    <RevealSection key={i} delay={i * 80}>
                                        <a href="#"
                                            className="card-hover"
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px 24px', textDecoration: 'none' }}
                                        >
                                            <div>
                                                <h3 style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{post.title}</h3>
                                                <p style={{ color: '#64748b', fontSize: '13px' }}>{post.excerpt}</p>
                                            </div>
                                            <ArrowRightIcon size={18} style={{ color: '#6366f1', flexShrink: 0 }} />
                                        </a>
                                    </RevealSection>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Footer */}
                    <div style={{ textAlign: 'center', paddingBottom: '48px', color: '#334155', fontSize: '13px' }}>
                        {t.footer.replace('{year}', String(new Date().getFullYear()))}
                    </div>
                </div>
            </div>
        </>
    )
}