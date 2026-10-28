export type Lang = 'pt' | 'en'

export type SkillGroupId =
	| 'apis'
	| 'data'
	| 'async'
	| 'integrations'
	| 'security'
	| 'ops'
	| 'cicd'
	| 'quality'
	| 'also'

export interface SkillGroup {
	id: SkillGroupId
	label: string
	application: string
	items: string[]
}

export interface CaseStudy {
	kind: string
	title: string
	context: string
	contribution?: string
	decisions: string[]
	tech: string[]
	tradeoffs?: string
	result?: string
}

export interface ExperienceItem {
	role: string
	company: string
	location: string
	period?: string
	current: boolean
	description: string
	highlights: string[]
	tags: string[]
}

export interface Content {
	meta: { title: string; description: string }
	nav: {
		cases: string
		experience: string
		stack: string
		contact: string
		skip: string
		main: string
		menuOpen: string
		menuClose: string
		home: string
		switchLang: string
		langShort: string
	}
	hero: {
		role: string
		headline: string
		intro: string
		ctaCases: string
		ctaContact: string
		location: string
		photoAlt: string
		photoLabel: string
		socialLabel: string
	}
	proof: { value: string; label: string }[]
	about: {
		title: string
		lead: string
		text: string
		principles: { title: string; text: string }[]
		photoAlt: string
	}
	diagram: {
		title: string
		disclaimer: string
		ariaLabel: string
		legendTitle: string
		legend: { sync: string; async: string }
		nodes: {
			client: string
			api: string
			domain: string
			cache: string
			queue: string
			worker: string
			db: string
			external: string
		}
		flowTitle: string
		flow: string[]
	}
	cases: {
		title: string
		intro: string
		labels: { details: string; context: string; contribution: string; decisions: string; tradeoffs: string; result: string }
		items: CaseStudy[]
	}
	experience: { title: string; present: string; items: ExperienceItem[] }
	skills: {
		title: string
		intro: string
		all: string
		groups: SkillGroup[]
	}
	projects: {
		title: string
		visit: string
		items: {
			title: string
			status: string
			type: string
			date: string
			description: string
			tags: string[]
			url: string
		}[]
	}
	education: {
		title: string
		items: { institution: string; period: string; degree: string; detail: string }[]
	}
	contact: {
		title: string
		lead: string
		text: string
		email: string
		copy: string
		copied: string
		photoAlt: string
		follow: string
	}
	footer: string
}
