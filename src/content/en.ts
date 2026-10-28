import type { Content } from './types'

export const en: Content = {
	meta: {
		title: 'Lucas Steffen · Backend Software Engineer',
		description:
			'Backend Software Engineer in Sinop, Brazil. NestJS and Java services, SAP, payment and telematics integrations, BullMQ/Redis queues and PostgreSQL in production.',
	},
	nav: {
		cases: 'Projects',
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
			'I build systems and integrations that automate processes, connect platforms and make business operations more efficient, secure and scalable.',
		ctaCases: 'See projects',
		ctaContact: 'Get in touch',
		location: 'Sinop, MT · Brazil',
		photoAlt: 'Lucas Steffen, backend software engineer',
		photoLabel: 'backend / vf par',
		socialLabel: 'Profiles',
	},
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
			'Illustrative diagram: the client calls the NestJS API over REST; the API talks to the domain microservice over REST, uses Redis as a cache and publishes jobs to a BullMQ queue; the worker consumes the queue, writes to PostgreSQL and integrates with an external system, which answers through webhooks.',
		legendTitle: 'Legend',
		legend: { sync: 'REST (synchronous)', async: 'Asynchronous' },
		nodes: {
			client: 'Client',
			api: 'NestJS API',
			domain: 'Domain microservice',
			cache: 'Redis (cache)',
			queue: 'BullMQ queue',
			worker: 'Worker',
			db: 'PostgreSQL',
			external: 'External integration (SAP / payments)',
		},
		flowTitle: 'Flow as text',
		flow: [
			'Client → NestJS API (REST)',
			'NestJS API ↔ Domain microservice (REST)',
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
			details: 'Technical details',
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
					'Microservices integrated through REST, queues and webhooks',
					'BullMQ/Redis queues and scheduled jobs for asynchronous routines',
						'Policy-based authorization with CASL',
				],
				tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'BullMQ', 'Redis', 'CASL'],
				result: 'Complex rules turned into traceable, evolvable services.',
			},
			{
				kind: 'Enterprise integrations',
				title: 'SAP synchronization workflows',
				context: 'Asynchronous module that receives requests from internal systems, queues them and runs them against SAP through workers, returning the result to the caller.',
				decisions: [
					'Document mapping through dedicated mappers',
					'Processing workers with configurable concurrency, priority for urgent requests and request-rate control towards the ERP',
					'Result returned to the caller by webhook, with job history, retry of failures and reconciliation of stuck jobs',
					'State persisted for every flow',
					'Structured logs to make failures observable',
						'Service metrics tracked in Prometheus and Grafana',
				],
				tech: ['SAP B1', 'Service Layer', 'BullMQ', 'Redis', 'Pino', 'Prometheus', 'Grafana'],
				result:
						'1,000+ document settlements and 4,000+ postings per day (advances, invoicing and settlements) processed with no manual intervention, removing manual entries and mismatches between systems.',
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
					'JWT authentication with refresh tokens and code-based password reset',
					'Roles and permissions (RBAC) enforced through CASL policies (PoliciesGuard and @CheckPolicies)',
					'Queues, email and observability included in the base',
				],
				tech: ['JWT', 'CASL', 'Redis', 'Swagger'],
				result: 'A consistent baseline to start backend services with less repeated work.',
				},
				{
					kind: 'Third-party integrations',
					title: 'Payments, e-signature, KYC and messaging',
					context:
						'Backends that consume and expose APIs for payments, electronic signature, identity checks, messaging, telematics and automation.',
					contribution: 'Integration modules with typed clients, webhook handlers and reconciliation routines.',
					decisions: [
						'Webhooks validated by shared secret, with reconciliation routines for states that drift between systems',
						'Mock mode to develop and test without depending on the external environment',
						'Integration state and request logs persisted with a correlation id',
						'Automation flows connected through n8n webhooks',
					],
					tech: [
						'Asaas',
						'DocuSign',
						'Brick',
						'WhatsApp (Meta Cloud / Evolution)',
						'Chatwoot',
						'Ituran',
						'BYD',
						'API Brasil',
						'Move',
						'OpenAI',
						'n8n',
					],
				},
				{
					kind: 'GPS telemetry',
					title: 'Traccar: new protocol, PostgreSQL and multi-tenancy',
					context:
						'Fork of Traccar, the open-source GPS tracking server, extended to receive a new tracker model and serve multiple tenants.',
					contribution:
						'Java work on the fork: protocol decoder, PostgreSQL support, tenant isolation and tests. A NestJS service syncs devices and positions from it.',
					decisions: [
						'New decoder for the JT808 protocol inside the Netty pipeline',
						'PostgreSQL support with a migration script and Docker Compose setup',
						'Multi-tenancy across the storage and cache layers, with tenant access rules',
						'JUnit tests for tenant access and a PostgreSQL integration test',
						'Embedded web console removed for security; separate React + Vite front end',
						'NestJS sync service driven by scheduled BullMQ jobs',
					],
					tech: ['Java 21', 'Netty', 'Guice', 'Liquibase', 'PostgreSQL', 'JUnit', 'Docker', 'React', 'Vite'],
					links: [
						{ label: 'Server (fork)', url: 'https://github.com/VFPAR/traccar-server/tree/integration/micodus-mv730g' },
						{ label: 'Web (fork)', url: 'https://github.com/VFPAR/traccar-web/tree/feat/micodus-integration' },
					],
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
					'End-to-end SAP Business One (Service Layer) integration: 1,000+ settlements and 4,000+ postings per day, no manual entry',
					'Asynchronous processing with BullMQ/Redis workers, configurable rate limit and concurrency, to protect the ERP during request peaks',
					'Pix and installment card charges via Asaas, with idempotent webhooks and append-only records',
					'PII encryption with AWS KMS envelope encryption, aligned with LGPD',
					'Gradual VPS-to-AWS migration (RDS, S3), with Docker',
					'Contributions to Traccar in Java: protocol decoder, PostgreSQL support and multi-tenancy',
				],
				tags: ['TypeScript', 'Java', 'NestJS', 'PostgreSQL', 'Redis', 'AWS'],
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
						'Crystal Reports and FastReports built on SQL queries (PostgreSQL, MySQL and Firebird)',
						'PostgreSQL structure changes and legacy data migration',
						'User training and go-live follow-up',
					],
				tags: ['SQL', 'MySQL', 'Firebird', 'Data', 'Implementation'],
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
				label: 'APIs and back end',
				application: 'Stable, validated and documented services.',
				items: ['NestJS', 'TypeScript', 'Java', 'OpenAPI'],
			},
			{
				id: 'data',
				label: 'Data',
				application: 'Relational modeling and tenant isolation.',
				items: ['PostgreSQL', 'TypeORM', 'Migrations', 'Multi-tenancy'],
			},
			{
				id: 'async',
				label: 'Async',
				application: 'Decoupled flows, with retries and events.',
				items: ['BullMQ', 'Redis', 'Webhooks', 'Microservices'],
			},
			{
				id: 'integrations',
				label: 'Integrations',
				application: 'ERP, payments and telematics connected to the backend.',
				items: ['SAP B1 Service Layer', 'Asaas', 'DocuSign', 'WhatsApp', 'Traccar'],
			},
			{
				id: 'security',
				label: 'Security',
				application: 'Access control and personal data protection.',
				items: ['CASL RBAC', 'AWS KMS', 'LGPD'],
			},
			{
				id: 'ops',
				label: 'Operations',
				application: 'Deploy and metrics to see the system in production.',
				items: ['Docker', 'AWS (RDS, S3)', 'Prometheus', 'Grafana', 'GitHub Actions'],
			},
		],
	},
	projects: {
		title: 'Public projects',
		items: [
			{
				title: 'Conversy',
				status: 'sold',
				type: 'SaaS product · Founder',
				date: 'Feb 2024 — Jun 2026',
				description:
					'SaaS platform for customer-service automation and WhatsApp message broadcasting for small and mid-sized businesses. I conceived and built the product from concept to launch: backend, JWT authentication, plans and subscriptions, billing, web panel and multiple WhatsApp instances per customer.',
				tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'React'],
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
		text: 'Projects, partnerships or a good conversation about technology: reach me by email or on social media.',
		email: 'Email',
		photoAlt: 'Lucas Steffen looking at the horizon',
		follow: 'Profile on',
	},
	footer: '© {year} · Lucas G. Amorim Steffen · Backend Software Engineer',
}
