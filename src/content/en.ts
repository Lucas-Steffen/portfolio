import type { Content } from './types'

export const en: Content = {
	meta: {
		title: 'Lucas Steffen · Backend Software Engineer',
		description:
			'Backend Software Engineer in Sinop, Brazil. NestJS APIs, SAP and payment integrations, BullMQ/Redis queues and PostgreSQL in production.',
	},
	nav: {
		cases: 'Cases',
		experience: 'Experience',
		stack: 'Stack',
		contact: 'Contact',
		skip: 'Skip to content',
		main: 'Main navigation',
		menuOpen: 'Open menu',
		menuClose: 'Close menu',
		home: 'Home',
		switchLang: 'Mudar para Português',
		langShort: 'PT',
	},
	hero: {
		role: 'Backend Software Engineer',
		headline: 'Lucas Steffen',
		intro:
			'I build APIs, integrations, asynchronous processing and data layers that power real operations, with clear business rules and visible production behavior.',
		chips: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'gRPC'],
		ctaCases: 'See cases',
		ctaContact: 'Contact',
		location: 'Sinop, MT · Brazil',
		photoAlt: 'Lucas Steffen, backend software engineer',
		photoLabel: 'backend / vf par',
		socialLabel: 'Profiles',
	},
	proof: [
		{ value: 'VF PAR', label: 'Backend, mobility and internal systems' },
		{ value: 'NestJS · TypeORM', label: 'with PostgreSQL' },
		{ value: 'SAP and payments', label: 'enterprise integrations' },
		{ value: 'BullMQ · Redis', label: 'queues and async processing' },
	],
	about: {
		title: 'How I work',
		lead: 'Backend is more than shipping endpoints.',
		text: 'I connect business rules, data and external services into predictable, maintainable systems. I work from contracts and modeling through queues, authentication, logs, tests, migrations and deployment.',
		principles: [
			{
				title: 'Clear contracts',
				text: 'Validated DTOs, OpenAPI documentation and consistent responses for API consumers.',
			},
			{
				title: 'Reliable data',
				text: 'Relational modeling, migrations and transactions treated as core product concerns.',
			},
			{
				title: 'Visible operations',
				text: 'Structured logs, health checks, observable queues and failures that leave useful evidence.',
			},
		],
		photoAlt: 'Lucas Steffen with arms crossed',
	},
	diagram: {
		title: 'The architecture I usually build',
		disclaimer: 'Illustrative architecture: a working pattern, not a specific system.',
		ariaLabel:
			'Illustrative diagram: the client calls the NestJS API over REST; the API talks to the domain service over gRPC, uses Redis as a cache and publishes jobs to a BullMQ queue; the worker consumes the queue, writes to PostgreSQL and integrates with an external system, which answers through webhooks.',
		legendTitle: 'Legend',
		legend: { sync: 'REST (synchronous)', grpc: 'gRPC (synchronous)', async: 'Asynchronous' },
		nodes: {
			client: 'Client',
			api: 'NestJS API',
			domain: 'Domain service',
			cache: 'Redis (cache)',
			queue: 'BullMQ queue',
			worker: 'Worker',
			db: 'PostgreSQL',
			external: 'External integration (SAP / payments)',
		},
		flowTitle: 'Flow as text',
		flow: [
			'Client → NestJS API (REST)',
			'NestJS API ↔ Domain service (gRPC)',
			'NestJS API → Redis (cache)',
			'NestJS API → BullMQ queue → Worker (asynchronous)',
			'Worker → PostgreSQL',
			'Worker ↔ External integration, with webhooks coming back (asynchronous)',
		],
	},
	cases: {
		title: 'Work cases',
		intro: 'Kinds of problems I solve day to day, presented without exposing internal code or information.',
		labels: {
			context: 'Context',
			contribution: 'My contribution',
			decisions: 'Technologies and decisions',
			tradeoffs: 'Challenges and trade-offs',
			result: 'Result',
		},
		items: [
			{
				kind: 'Mobility platforms',
				title: 'Backends for mobility operations',
				context:
					'Vehicle, telemetry, inspection, maintenance, contract, notification and financial domains.',
				contribution:
					'Development and evolution of backend services: NestJS APIs, business rules and data persistence.',
				decisions: [
					'Business modules split by domain',
					'Microservices communicating over gRPC',
					'BullMQ/Redis queues for asynchronous routines',
				],
				tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'gRPC', 'BullMQ', 'Redis'],
				result: 'Complex rules turned into traceable, evolvable services.',
			},
			{
				kind: 'Enterprise integrations',
				title: 'SAP synchronization workflows',
				context: 'Asynchronous flows that carry documents from the system to SAP and back.',
				decisions: [
					'Document mapping through dedicated mappers',
					'Decoupled queues and processors, with request-rate control towards the ERP',
					'State persisted for every flow',
					'Structured logs to make failures observable',
				],
				tech: ['SAP B1', 'Service Layer', 'BullMQ', 'Redis', 'Pino'],
				result:
						'1,000+ documents per day processed with no manual intervention, removing manual entries and mismatches between systems.',
			},
			{
				kind: 'Payments',
				title: 'Asaas integration API',
				context: 'Pix and installment card charges, with customers and webhooks.',
				decisions: [
					'Authenticated, idempotent webhooks',
						'Append-only records for immutability and transaction traceability',
					'Contract documented with OpenAPI',
					'Sandbox environment to validate the flow',
				],
				tech: ['NestJS', 'Axios', 'Webhooks', 'OpenAPI', 'Jest'],
				result: 'A documented contract and a reproducible end-to-end certification flow.',
			},
			{
				kind: 'Product foundation',
				title: 'Reusable authentication and authorization',
				context: 'Modular base to start new services with authentication, roles and permissions ready.',
				decisions: [
					'JWT authentication',
					'Roles and permissions (RBAC)',
					'Queues, email and observability included in the base',
				],
				tech: ['JWT', 'RBAC', 'Redis', 'Swagger'],
				result: 'A consistent baseline to start backend services with less repeated work.',
			},
		],
	},
	experience: {
		title: 'Experience',
		present: 'current',
		items: [
			{
				role: 'Backend Software Engineer',
				company: 'VF PAR',
				location: 'Sinop, MT · Brazil',
				period: 'Mar 2026',
					current: true,
				description:
					'Development and evolution of backend services for mobility operations and internal systems. Working with NestJS APIs, business rules, external integrations, asynchronous processing, access control and data persistence.',
				highlights: [
					'End-to-end SAP Business One (Service Layer) integration: 1,000+ documents per day, no manual entry',
					'Asynchronous processing with BullMQ/Redis, rate-controlled to protect the ERP during peaks',
					'Pix and installment card charges via Asaas, with idempotent webhooks and append-only records',
						'PII encryption with AWS KMS (envelope encryption and key rotation), aligned with LGPD',
					'VPS-to-AWS migration (EC2, RDS, S3), with Docker and Prometheus/Grafana monitoring',
				],
				tags: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
			},
			{
				role: 'Q.A. Analyst',
				company: 'TopSapp',
				location: 'Sinop, MT · Brazil',
				period: 'Dec 2025 — Mar 2026',
				current: false,
				description:
					'Validated critical workflows and analyzed failures in web systems, experience that now shapes how I design contracts, error scenarios and backend tests.',
				highlights: [
						'Functional and regression testing before deploy, on Kanban',
						'Defect logging and retesting in Jira',
						'Build sign-off and requirement validation with the development team',
					],
				tags: ['Quality', 'Regression', 'Failure analysis'],
			},
			{
				role: 'Systems Implementation Analyst',
				company: 'Ecocentauro',
				location: 'Sinop, MT · Brazil',
				period: 'Jan 2024 — Dec 2025',
				current: false,
				description:
					'System implementation and business reporting using SQL queries, data processing and direct contact with customer requirements.',
				highlights: [
						'Crystal Reports and FastReports built on SQL queries',
						'PostgreSQL structure changes and legacy data migration',
						'User training and go-live follow-up',
					],
				tags: ['SQL', 'Data', 'Implementation'],
			},
		],
	},
	skills: {
		title: 'Stack by area',
		intro: 'Technologies I use day to day, grouped by the problem they solve.',
		all: 'All',
		groups: [
			{
				id: 'apis',
				label: 'APIs and contracts',
				application: 'Stable, validated and documented interfaces for consumers.',
				items: ['NestJS', 'Node.js', 'TypeScript', 'REST', 'OpenAPI / Swagger', 'DTO validation', 'gRPC'],
			},
			{
				id: 'data',
				label: 'Data',
				application: 'Relational modeling and transactional consistency.',
				items: ['PostgreSQL', 'TypeORM', 'Migrations', 'Transactions', 'MySQL', 'Firebird', 'SQL'],
			},
			{
				id: 'async',
				label: 'Communication and async',
				application: 'Decoupled flows with retries and events.',
				items: ['Microservices', 'gRPC', 'BullMQ', 'Redis', 'Webhooks', 'Events'],
			},
			{
				id: 'security',
				label: 'Security',
				application: 'Authentication and role-based access control.',
				items: ['JWT', 'RBAC', 'AWS KMS', 'LGPD'],
			},
			{
				id: 'ops',
				label: 'Operations',
				application: 'Deploy, logs and metrics to see the system in production.',
				items: ['Docker', 'AWS (EC2, RDS, S3)', 'Easypanel', 'Pino', 'Prometheus', 'Grafana'],
			},
			{
				id: 'quality',
				label: 'Quality',
				application: 'Tests that protect business rules from regressions.',
				items: ['Jest', 'Regression'],
			},
			{
				id: 'also',
				label: 'Also use',
				application: 'Backend support and automation.',
				items: ['React', 'Tailwind CSS', 'n8n', 'Git'],
			},
		],
	},
	projects: {
		title: 'Public projects',
		visit: 'Open',
		items: [
			{
				title: 'Conversy',
				status: 'ended',
				type: 'SaaS product · Founder',
				date: 'Feb 2024 — Jun 2026',
				description:
					'SaaS platform for customer-service automation and WhatsApp message broadcasting for small and mid-sized businesses. I conceived and built the product from concept to launch: backend, JWT authentication, plans and subscriptions, billing, web panel and multiple WhatsApp instances per customer.',
				tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'React'],
				url: 'https://conversy.up.railway.app/',
			},
		],
	},
	education: {
		title: 'Education',
		items: [
			{
				institution: 'Fasipe',
				period: 'Sep 2026 — Jan 2029',
				degree: 'Systems Analysis and Development',
				detail: 'Undergraduate degree in progress',
			},
		],
	},
	contact: {
		title: 'Contact',
		lead: 'Let’s talk.',
		text: 'For opportunities, projects or to trade ideas about backend, write by email or find me on social media.',
		email: 'Email',
		copy: 'Copy email',
		copied: 'Copied!',
		photoAlt: 'Lucas Steffen looking at the horizon',
		follow: 'Profile on',
	},
	footer: '© {year} · Lucas G. Amorim Steffen · Backend Software Engineer',
}
