import { About } from './sections/About'
import { Cases } from './sections/Cases'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Education, Projects } from './sections/ProjectsEducation'
import { Skills } from './sections/Skills'

export function HomePage() {
	return (
		<>
			<Hero />
			<Cases />
			<Skills />
			<Experience />
			<About />
			<Projects />
			<Education />
			<Contact />
		</>
	)
}
