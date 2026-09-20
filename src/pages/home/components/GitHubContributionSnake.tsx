import { useCallback,useEffect,useMemo,useRef,useState } from 'react'
import type { Lang } from '../types'
import { GITHUB_USERNAME } from '../data'
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    })
}

interface ContributionDay { date: string; count: number; level: number }
interface TooltipState { visible: boolean; x: number; y: number; date: string; count: number }

export function GitHubContributionSnake({ username, lang }: { username: string; lang: Lang }) {
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

    const WEEKS = 52, DAYS = 7, CELL = 10, GAP = 2
    const STEP = CELL + GAP
    const W = WEEKS * STEP - GAP
    const H = DAYS * STEP - GAP
    const SNAKE_LEN = 7, SPEED_MS = 55

    const path = useMemo<[number, number][]>(() => {
        const p: [number, number][] = []
        for (let row = 0; row < DAYS; row++)
            for (let i = 0; i < WEEKS; i++)
                p.push([row % 2 === 0 ? i : WEEKS - 1 - i, row])
        return p
    }, [])

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
            .then(r => r.json())
            .then(({ contributions }: { contributions: ContributionDay[] }) => {
                const now = new Date()
                const cutoff52w = new Date(now.getTime() - 52 * 7 * 24 * 60 * 60 * 1000)
                const cutoff365 = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
                const cutoff30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                const grid: number[][] = Array.from({ length: WEEKS }, () => Array(DAYS).fill(0))
                const dateGrid: ContributionDay[][] = Array.from({ length: WEEKS }, () =>
                    Array(DAYS).fill(null).map(() => ({ date: '', count: 0, level: 0 })))
                let last30 = 0, lastYear = 0
                contributions.forEach(c => {
                    const d = new Date(c.date + 'T12:00:00')
                    if (d >= cutoff52w) {
                        const diff = Math.floor((d.getTime() - cutoff52w.getTime()) / 86400000)
                        const col = Math.floor(diff / 7), row = diff % 7
                        if (col >= 0 && col < WEEKS) { grid[col][row] = c.level; dateGrid[col][row] = c }
                    }
                    if (d >= cutoff365) lastYear += c.count
                    if (d >= cutoff30) last30 += c.count
                })
                gridRef.current = grid; dateGridRef.current = dateGrid
                setStats({ last30, lastYear })
            }).catch(() => { })
    }, [username])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        const LEVEL_COLORS = [
            'rgba(255,255,255,0.04)',
            'rgba(52,211,153,0.2)',
            'rgba(52,211,153,0.42)',
            'rgba(52,211,153,0.68)',
            'rgba(52,211,153,0.95)',
        ]
        snakeRef.current = [path[0]]; pathIdxRef.current = 0; eatenRef.current = new Set()

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
            const grid = gridRef.current, snake = snakeRef.current, eaten = eatenRef.current
            const snakeMap = new Map<string, number>()
            snake.forEach(([c, r], i) => snakeMap.set(`${c},${r}`, i))

            for (let col = 0; col < WEEKS; col++) {
                for (let row = 0; row < DAYS; row++) {
                    const x = col * STEP, y = row * STEP, key = `${col},${row}`
                    const sIdx = snakeMap.get(key)
                    ctx.shadowBlur = 0
                    if (sIdx !== undefined) {
                        if (sIdx === 0) { ctx.shadowBlur = 10; ctx.shadowColor = '#34d399'; ctx.fillStyle = '#34d399' }
                        else { const t = 1 - sIdx / SNAKE_LEN; ctx.shadowBlur = 5 * t; ctx.shadowColor = `rgba(52,211,153,${t})`; ctx.fillStyle = `rgba(52,211,153,${t * 0.9 + 0.1})` }
                    } else if (eaten.has(key)) {
                        ctx.fillStyle = 'rgba(255,255,255,0.02)'
                    } else {
                        ctx.fillStyle = LEVEL_COLORS[Math.min(grid[col]?.[row] ?? 0, 4)]
                    }
                    roundRect(ctx, x, y, CELL, CELL, 2); ctx.fill(); ctx.shadowBlur = 0
                }
            }
            animRef.current = requestAnimationFrame(draw)
        }
        animRef.current = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animRef.current)
    }, [H, STEP, W, path])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current; if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const mx = (e.clientX - rect.left) * (W / rect.width)
        const my = (e.clientY - rect.top) * (H / rect.height)
        const col = Math.floor(mx / STEP), row = Math.floor(my / STEP)
        const insideCell = mx >= col * STEP && mx <= col * STEP + CELL && my >= row * STEP && my <= row * STEP + CELL
        if (col >= 0 && col < WEEKS && row >= 0 && row < DAYS && insideCell) {
            const day = dateGridRef.current[col]?.[row]
            if (day && day.date) {
                const wRect = wrapperRef.current?.getBoundingClientRect()
                setTooltip({ visible: true, x: e.clientX - (wRect?.left ?? 0), y: e.clientY - (wRect?.top ?? 0), date: day.date, count: day.count })
                return
            }
        }
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev)
    }, [WEEKS, STEP, CELL, W, H])

    const handleMouseLeave = useCallback(() => setTooltip(prev => ({ ...prev, visible: false })), [])

    const labels = lang === 'pt'
        ? { d30: 'commits · 30 dias', yr: 'commits · 1 ano', noCommits: 'sem commits em', oneCommit: 'commit em', many: 'commits em' }
        : { d30: 'commits · 30 days', yr: 'commits · 1 year', noCommits: 'no commits on', oneCommit: 'commit on', many: 'commits on' }

    const tooltipText = tooltip.count === 0
        ? `${labels.noCommits} ${formatDate(tooltip.date, lang)}`
        : `${tooltip.count} ${tooltip.count === 1 ? labels.oneCommit : labels.many} ${formatDate(tooltip.date, lang)}`

    return (
        <div ref={wrapperRef} style={{ width: '100%', marginTop: '32px', marginBottom: '8px', position: 'relative', animation: 'fadeUp 0.7s ease 0.5s both' }}>
            {/* Terminal chrome */}
            <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border2)',
                borderRadius: '8px',
                overflow: 'hidden',
            }}>
                <div style={{
                    padding: '8px 14px',
                    borderBottom: '1px solid var(--border2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(0,0,0,0.2)',
                }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                        <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                    ))}
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', marginLeft: '8px', letterSpacing: '0.05em' }}>
                        github contributions — {GITHUB_USERNAME}
                    </span>
                </div>
                <div style={{ padding: '16px', overflowX: 'auto' }}>
                    <canvas
                        ref={canvasRef}
                        width={W} height={H}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ display: 'block', margin: '0 auto', cursor: 'crosshair' }}
                    />
                </div>
                {stats && (
                    <div style={{
                        padding: '8px 16px 12px',
                        display: 'flex',
                        gap: '24px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {[
                            { value: stats.last30, label: labels.d30 },
                            { value: stats.lastYear, label: labels.yr },
                        ].map(({ value, label }) => (
                            <span key={label} style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
                                <span style={{ color: 'var(--green)', fontWeight: 600 }}>{value.toLocaleString()}</span>
                                {' '}{label}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {tooltip.visible && tooltip.date && (
                <div style={{
                    position: 'absolute', left: tooltip.x, top: tooltip.y - 52,
                    transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 50,
                    background: 'rgba(8,12,16,0.97)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '6px 12px', whiteSpace: 'nowrap',
                    backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)',
                }}>
                    <span style={{
                        display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
                        background: tooltip.count > 0 ? 'var(--green)' : 'var(--text-dim)',
                        marginRight: '6px', verticalAlign: 'middle',
                        boxShadow: tooltip.count > 0 ? '0 0 6px var(--green)' : 'none',
                    }} />
                    <span style={{ color: tooltip.count > 0 ? 'var(--text)' : 'var(--text-dim)' }}>{tooltipText}</span>
                </div>
            )}
        </div>
    )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

