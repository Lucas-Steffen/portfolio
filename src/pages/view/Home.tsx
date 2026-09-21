import { useLang } from '../../context/LangProvider'
import { T } from '../home/data'
import { HeroSection } from '../home/components/HeroSection'
import { AboutSection, EducationSection, ExperienceSection, ProjectsSection, SkillsSection, SocialSection, WorkSection } from '../home/components/ContentSections'
import { LanguageToggle } from '../home/components/PagePrimitives'

export function Home() {
    const { lang, toggle } = useLang()
    const copy = T[lang]
    return <div className="portfolio-page">
        <LanguageToggle lang={lang} onToggle={toggle} />
            <div className="page-container">
                <HeroSection lang={lang} copy={copy} />
                <AboutSection copy={copy} />
                <ExperienceSection copy={copy} />
                <WorkSection copy={copy} />
                <ProjectsSection copy={copy} />
                <SkillsSection copy={copy} />
                <EducationSection copy={copy} />
                <SocialSection copy={copy} />
                <footer className="site-footer">
                    {copy.footer.replace('{year}', String(new Date().getFullYear()))}
                </footer>
            </div>
    </div>
}
