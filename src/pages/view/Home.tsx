import { useLang } from '../../context/LangProvider'
import { GITHUB_USERNAME, T } from '../home/data'
import { useGitHubProfile } from '../home/hooks/useGitHubProfile'
import { HeroSection } from '../home/components/HeroSection'
import { AboutSection, EducationSection, ExperienceSection, ProjectsSection, SkillsSection, SocialSection, WorkSection } from '../home/components/ContentSections'
import { GridBackground, LanguageToggle } from '../home/components/PagePrimitives'

export function Home() {
    const { lang, toggle } = useLang()
    const copy = T[lang]
    const profile = useGitHubProfile(GITHUB_USERNAME)

    return <>
        <LanguageToggle lang={lang} onToggle={toggle} />
        <div style={{ position: 'relative', zIndex: 1 }}>
            <GridBackground />
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(8px, 1.5vw, 20px)', position: 'relative', zIndex: 1 }}>
                <HeroSection lang={lang} copy={copy} profile={profile} />
                <AboutSection copy={copy} />
                <ExperienceSection copy={copy} />
                <WorkSection copy={copy} />
                <ProjectsSection copy={copy} />
                <SkillsSection copy={copy} />
                <EducationSection copy={copy} />
                <SocialSection copy={copy} />
                <footer style={{ textAlign: 'center', paddingBottom: '48px', fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.06em' }}>
                    {copy.footer.replace('{year}', String(new Date().getFullYear()))}
                </footer>
            </div>
        </div>
    </>
}
