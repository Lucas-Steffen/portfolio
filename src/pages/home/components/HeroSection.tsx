import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon, MapPinIcon } from '@phosphor-icons/react'
import type { PortfolioCopy } from '../data'
import type { Lang } from '../types'

interface HeroSectionProps { lang: Lang; copy: PortfolioCopy }

function scrollToWork() {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
}

function RuntimePanel({ copy }: { copy: PortfolioCopy }) {
    const services = [
        ['api', 'node:22-alpine', ':3000'],
        ['worker', 'nestjs/worker', 'internal'],
        ['database', 'postgres:17', ':5432'],
        ['cache', 'redis:7-alpine', ':6379'],
    ]

    return <section className="runtime" aria-label={copy.architecturePanel.ariaLabel}>
        <div className="runtime-titlebar"><span/><span/><span/><code>lucas@backend:~/portfolio</code><strong>docker compose ps</strong></div>
        <div className="runtime-body">
            <div className="runtime-command"><b>$</b> docker compose up -d <em>--build</em></div>
            <div className="service-table">
                <div className="service-row service-head"><span>SERVICE</span><span>IMAGE</span><span>STATUS</span><span>PORT</span></div>
                {services.map(([name, image, port]) => <div className="service-row" key={name}><strong>{name}</strong><code>{image}</code><span className="service-health"><i/>healthy</span><small>{port}</small></div>)}
            </div>
            <div className="runtime-flow"><span>REST API</span><i>→</i><span>NestJS</span><i>→</i><span>BullMQ</span><i>→</i><span>PostgreSQL</span></div>
            <div className="runtime-log"><span><b>INFO</b> request completed <em>201</em></span><span><b>QUEUE</b> job dispatched <em>waiting</em></span><span><b>AUTH</b> permission verified <em>allowed</em></span></div>
        </div>
    </section>
}

export function HeroSection({ lang, copy }: HeroSectionProps) {
    const specialties = lang === 'pt'
        ? ['Engenharia Backend', 'APIs e integrações', 'Sistemas distribuídos']
        : ['Backend engineering', 'APIs & integrations', 'Distributed systems']

    return <section id="hero" className="hero">
        <div className="hero-cover">
            <div className="hero-specialties">{specialties.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
            <div className="hero-place"><MapPinIcon size={13}/>{copy.location}</div>
            <div className="hero-name" aria-hidden="true"><span>LUCAS</span><span>STEFFEN</span></div>
            <img className="hero-photo" src="/lucas-hoodie.png" alt="Lucas G. Amorim Steffen" />
            <div className="hero-copy">
                <p>{copy.eyebrow}</p>
                <h1>{copy.headline}</h1>
                <span>{copy.intro}</span>
                <button onClick={scrollToWork}>{copy.primaryCta}<ArrowDownIcon size={15}/></button>
            </div>
            <div className="hero-role"><small>PROFILE / 01</small><strong>{copy.portraitRole.split('\n').map(line => <span key={line}>{line}</span>)}</strong></div>
        </div>
        <div className="hero-proof">{copy.proof.map(item => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
        <RuntimePanel copy={copy}/>
        <div className="hero-social"><a href={copy.linkedin} target="_blank" rel="noreferrer"><LinkedinLogoIcon size={17}/>LinkedIn</a><a href={copy.github} target="_blank" rel="noreferrer"><GithubLogoIcon size={17}/>GitHub</a></div>
    </section>
}
