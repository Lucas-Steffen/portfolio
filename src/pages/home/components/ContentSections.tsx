import { useState } from 'react'
import { ArrowUpRightIcon, CheckCircleIcon, CodeIcon, DatabaseIcon, GithubLogoIcon, GitBranchIcon, InstagramLogoIcon, LinkedinLogoIcon, ShieldCheckIcon, TerminalIcon } from '@phosphor-icons/react'
import { STACK, type PortfolioCopy } from '../data'
import { Reveal, Section } from './PagePrimitives'

const principleIcons = [CodeIcon, DatabaseIcon, TerminalIcon]

export function AboutSection({ copy }: { copy: PortfolioCopy }) {
    return <Section id="about" title={copy.about}>
        <Reveal><div className="about-layout"><div><p className="section-kicker">{copy.aboutLead}</p><p className="body-copy">{copy.aboutText}</p></div><div className="principles">{copy.principles.map((item, index) => { const Icon = principleIcons[index]; return <article key={item.code} className="principle"><span>{item.code}</span><Icon size={22} /><h3>{item.title}</h3><p>{item.text}</p></article> })}</div></div></Reveal>
    </Section>
}

export function ExperienceSection({ copy }: { copy: PortfolioCopy }) {
    return <Section id="experience" title={copy.experience}><div className="timeline">{copy.experience_items.map((item, index) => <Reveal key={`${item.company}-${item.role}`} delay={index * 70}><article className="timeline-item"><div className="timeline-marker"/><div className="timeline-heading"><div><p className="overline">{item.company} · {item.location}</p><h3>{item.role}</h3></div><span>{item.current ? copy.present : item.period}</span></div><p className="body-copy">{item.description}</p><ul className="highlight-list">{item.highlights.map(highlight => <li key={highlight}><CheckCircleIcon size={15} />{highlight}</li>)}</ul><div className="tag-list">{item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div></article></Reveal>)}</div></Section>
}

export function WorkSection({ copy }: { copy: PortfolioCopy }) {
    return <Section id="work" title={copy.work}><p className="section-intro">{copy.workIntro}</p><div className="work-grid">{copy.work_items.map((item, index) => <Reveal key={item.index} delay={index * 60}><article className="work-card"><div className="work-index">{item.index}<span>{item.kind}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="architecture"><GitBranchIcon size={15} />{item.architecture.map(technology => <span key={technology}>{technology}</span>)}</div><div className="outcome"><ShieldCheckIcon size={17} /><span>{item.outcome}</span></div></article></Reveal>)}</div></Section>
}

export function ProjectsSection({ copy }: { copy: PortfolioCopy }) {
    return <Section id="projects" title={copy.publicProjects}><div className="project-grid">{copy.projects_items.map(project => <Reveal key={project.title}><article className="project-card"><div className="project-top"><div><p className="overline">{project.type} · {project.date}</p><h3>{project.title}</h3></div><span className="live-status"><i />{project.status}</span></div><p>{project.description}</p><div className="project-footer"><div className="tag-list">{project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer" aria-label={`${copy.primaryCta}: ${project.title}`}><ArrowUpRightIcon size={18} /></a></div></article></Reveal>)}</div></Section>
}

export function SkillsSection({ copy }: { copy: PortfolioCopy }) {
    const groups = Object.keys(copy.stackGroups) as Array<keyof typeof copy.stackGroups>
    const [active, setActive] = useState<(typeof groups)[number]>('all')
    const visible = STACK.filter(item => active === 'all' || item.group === active)
    return <Section id="skills" title={copy.skills}><p className="section-intro">{copy.stackIntro}</p><Reveal><div className="filter-row">{groups.map(group => <button key={group} className={`filter-btn${active === group ? ' active' : ''}`} onClick={() => setActive(group)}>{copy.stackGroups[group]}</button>)}</div><div className="stack-cloud">{visible.map(item => <div key={item.name} className="stack-chip"><div className="stack-icon"><b>{item.name.slice(0, 2).toUpperCase()}</b><img src={item.icon} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = 'none'; const fallback = event.currentTarget.previousElementSibling as HTMLElement | null; if (fallback) fallback.style.display = 'block' }} /></div><div className="stack-content"><div className="stack-heading"><span>{item.name}</span><strong>{item.level}<small>/10</small></strong></div><small>{copy.stackGroups[item.group]}</small><div className="skill-meter" aria-label={`${item.name}: ${item.level} ${copy.skillLevelLabel}`}><i style={{ width: `${item.level * 10}%` }} /></div></div></div>)}</div></Reveal></Section>
}

export function EducationSection({ copy }: { copy: PortfolioCopy }) {
    return <Section id="education" title={copy.education}>{copy.education_items.map(item => <Reveal key={item.institution}><article className="education-card"><div><p className="overline">{item.period}</p><h3>{item.degree}</h3><p>{item.institution}</p></div><span>{item.detail}</span></article></Reveal>)}</Section>
}

export function SocialSection({ copy }: { copy: PortfolioCopy }) {
    const links = [
        { name: 'LinkedIn', url: copy.linkedin, icon: LinkedinLogoIcon },
        { name: 'Instagram', url: copy.instagram, icon: InstagramLogoIcon },
        { name: 'GitHub', url: copy.github, icon: GithubLogoIcon },
    ]

    return <Reveal><section className="contact-card" aria-labelledby="social-title">
        <div className="contact-copy"><p className="overline">// {copy.socialLabel}</p><h2 id="social-title">{copy.socialTitle}</h2><p>{copy.socialText}</p></div>
        <div className="social-cta-list">{links.map(({ name, url, icon: Icon }) => <a key={name} href={url} target="_blank" rel="noreferrer"><Icon size={21} weight="duotone"/><span><small>{copy.socialFollow}</small>{name}</span><ArrowUpRightIcon size={16}/></a>)}</div>
    </section></Reveal>
}
