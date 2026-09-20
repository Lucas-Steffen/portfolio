import { useLang } from '../../context/LangProvider'
import { GITHUB_USERNAME, T } from '../home/data'
import { useGitHubProfile } from '../home/hooks/useGitHubProfile'
import { HeroSection } from '../home/components/HeroSection'
import { AboutSection, BlogSection, EducationSection, ExperienceSection, ProjectsSection, SkillsSection } from '../home/components/ContentSections'
import { GridBackground, LanguageToggle } from '../home/components/PagePrimitives'

export function Home() {
    const { lang, toggle } = useLang()
    const copy = T[lang]
    const profile = useGitHubProfile(GITHUB_USERNAME)

    return <>
        <LanguageToggle lang={lang} onToggle={toggle} />
        <div style={{ position: 'relative', zIndex: 1 }}>
            <GridBackground />
            <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                <HeroSection lang={lang} copy={copy} profile={profile} />
                <AboutSection copy={copy} />
                <ExperienceSection copy={copy} />
                <ProjectsSection copy={copy} />
                <EducationSection copy={copy} />
                <SkillsSection copy={copy} />
                <BlogSection copy={copy} />
                <footer style={{ textAlign: 'center', paddingBottom: '48px', fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.06em' }}>
                    {copy.footer.replace('{year}', String(new Date().getFullYear()))}
                </footer>
            </div>
        </div>
    </>
}

