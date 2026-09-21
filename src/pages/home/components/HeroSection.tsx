import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon, MapPinIcon } from '@phosphor-icons/react'
import { GITHUB_USERNAME, type PortfolioCopy } from '../data'
import type { GitHubProfile, Lang } from '../types'
import { GitHubContributionSnake } from './GitHubContributionSnake'

interface HeroSectionProps { lang: Lang; copy: PortfolioCopy; profile: GitHubProfile | null }

function scrollToWork() { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }

export function HeroSection({ lang, copy, profile }: HeroSectionProps) {
    const stats = profile ? [
        { label: copy.repos, value: profile.public_repos },
        { label: copy.followers, value: profile.followers },
        { label: copy.following, value: profile.following },
    ] : []

    return <section id="hero" className="hero">
        <div className="hero-main">
            <div className="hero-copy">
                <p className="hero-eyebrow">{copy.eyebrow}</p>
                <p className="hero-name">Lucas G. Amorim Steffen</p>
                <h1>{copy.headline}</h1>
                <p className="hero-intro">{copy.intro}</p>

                <div className="hero-actions">
                    <button className="button button-primary" onClick={scrollToWork}>{copy.primaryCta}<ArrowDownIcon size={16} /></button>
                </div>

                <div className="hero-meta"><span><MapPinIcon size={14} />{copy.location}</span><span>github.com/{GITHUB_USERNAME}</span></div>
            </div>
            <div className="hero-portrait">
                <div className="portrait-label"><span>01</span><strong>{copy.portraitRole.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</strong></div>
                <img src="/lucas-hoodie.png" alt="Lucas G. Amorim Steffen" />
                <div className="portrait-stack">NESTJS<br />POSTGRESQL<br />REDIS</div>
            </div>
        </div>

        <div className="proof-grid">{copy.proof.map(item => <div key={item.label} className="proof-item"><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>

        <div className="backend-console" aria-label={copy.architecturePanel.ariaLabel}>
            <div className="console-bar"><span /><span /><span /><code>lucas@backend: ~/portfolio</code><b>docker compose ps</b></div>
            <div className="console-body">
                <div className="runtime-panel">
                    <div className="terminal-command"><span>$</span> docker compose up -d <i>--build</i></div>
                    <div className="container-list">
                        <div className="container-head"><span>CONTAINER</span><span>IMAGE</span><span>STATUS</span><span>PORT</span></div>
                        <div><strong>portfolio-api</strong><code>node:22-alpine</code><em><i />healthy</em><small>:3000</small></div>
                        <div><strong>portfolio-worker</strong><code>nestjs/worker</code><em><i />running</em><small>internal</small></div>
                        <div><strong>portfolio-db</strong><code>postgres:17</code><em><i />healthy</em><small>:5432</small></div>
                        <div><strong>portfolio-cache</strong><code>redis:7-alpine</code><em><i />healthy</em><small>:6379</small></div>
                    </div>
                </div>
                <div className="topology-label"><span>{copy.architecturePanel.file}</span><code>4 services · 1 network · 0 failures</code></div>
                <div className="request-flow">
                    <div><small>{copy.architecturePanel.request}</small><strong>REST API</strong><code>{copy.architecturePanel.endpoint}</code></div>
                    <i>→</i>
                    <div><small>{copy.architecturePanel.application}</small><strong>NestJS</strong><code>{copy.architecturePanel.appDetail}</code></div>
                    <i>→</i>
                    <div><small>{copy.architecturePanel.async}</small><strong>BullMQ</strong><code>{copy.architecturePanel.asyncDetail}</code></div>
                    <i>→</i>
                    <div><small>{copy.architecturePanel.data}</small><strong>PostgreSQL</strong><code>{copy.architecturePanel.dataDetail}</code></div>
                </div>
                <div className="console-log">
                    <span><b>{copy.architecturePanel.info}</b> {copy.architecturePanel.requestDone} <em>201</em></span>
                    <span><b>{copy.architecturePanel.queue}</b> {copy.architecturePanel.jobSent} <em>{copy.architecturePanel.waiting}</em></span>
                    <span><b>{copy.architecturePanel.auth}</b> {copy.architecturePanel.permissionChecked} <em>{copy.architecturePanel.allowed}</em></span>
                </div>
            </div>
        </div>

        <GitHubContributionSnake username={GITHUB_USERNAME} lang={lang} />

        <div className="hero-links">
            <a href={copy.github} target="_blank" rel="noreferrer"><GithubLogoIcon size={16} />GitHub</a>
            <a href={copy.linkedin} target="_blank" rel="noreferrer"><LinkedinLogoIcon size={16} />LinkedIn</a>
            {stats.map(item => <span key={item.label}><strong>{item.value}</strong> {item.label}</span>)}
        </div>
    </section>
}
