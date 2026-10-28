import type { Content } from './types'

export const pt: Content = {
	meta: {
		title: 'Lucas Steffen · Engenheiro de Software Backend',
		description:
			'Engenheiro de Software Backend em Sinop, MT. APIs NestJS, integrações SAP e pagamentos, filas BullMQ/Redis e PostgreSQL em produção.',
	},
	nav: {
		cases: 'Casos',
		experience: 'Experiência',
		stack: 'Stack',
		contact: 'Contato',
		skip: 'Ir para o conteúdo',
		main: 'Navegação principal',
		menuOpen: 'Abrir menu',
		menuClose: 'Fechar menu',
		home: 'Início',
		switchLang: 'Mudar para English',
		langShort: 'EN',
	},
	hero: {
		role: 'Engenheiro de Software Backend',
		headline: 'Lucas Steffen',
		intro:
			'Construo APIs, integrações, processamento assíncrono e camadas de dados que sustentam operações reais, com regras de negócio claras e operação visível em produção.',
		chips: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'gRPC'],
		ctaCases: 'Ver casos',
		ctaContact: 'Contato',
		location: 'Sinop, MT · Brasil',
		photoAlt: 'Lucas Steffen, engenheiro de software backend',
		photoLabel: 'backend / vf par',
		socialLabel: 'Perfis',
	},
	proof: [
		{ value: 'VF PAR', label: 'Backend, mobilidade e sistemas internos' },
		{ value: 'NestJS · TypeORM', label: 'com PostgreSQL' },
		{ value: 'SAP e pagamentos', label: 'integrações corporativas' },
		{ value: 'BullMQ · Redis', label: 'filas e processamento assíncrono' },
	],
	about: {
		title: 'Como trabalho',
		lead: 'Backend não é apenas entregar endpoints.',
		text: 'Conecto regras de negócio, dados e serviços externos em sistemas previsíveis e fáceis de manter. Atuo do desenho do contrato e da modelagem até filas, autenticação, logs, testes, migrations e deploy.',
		principles: [
			{
				title: 'Contratos claros',
				text: 'DTOs validados, documentação OpenAPI e respostas consistentes para quem consome a API.',
			},
			{
				title: 'Dados confiáveis',
				text: 'Modelagem relacional, migrations e transações tratadas como parte central do produto.',
			},
			{
				title: 'Operação visível',
				text: 'Logs estruturados, health checks, filas monitoráveis e falhas que deixam pistas úteis.',
			},
		],
		photoAlt: 'Lucas Steffen de braços cruzados',
	},
	diagram: {
		title: 'Arquitetura que costumo montar',
		disclaimer: 'Arquitetura ilustrativa: padrão de trabalho, não um sistema específico.',
		ariaLabel:
			'Diagrama ilustrativo: o cliente chama a API NestJS por REST; a API fala com o serviço de domínio por gRPC, usa Redis como cache e publica tarefas numa fila BullMQ; o worker consome a fila, grava no PostgreSQL e integra com um sistema externo, que responde por webhooks.',
		legendTitle: 'Legenda',
		legend: { sync: 'REST (síncrono)', grpc: 'gRPC (síncrono)', async: 'Assíncrono' },
		nodes: {
			client: 'Cliente',
			api: 'API NestJS',
			domain: 'Serviço de domínio',
			cache: 'Redis (cache)',
			queue: 'Fila BullMQ',
			worker: 'Worker',
			db: 'PostgreSQL',
			external: 'Integração externa (SAP / pagamentos)',
		},
		flowTitle: 'Fluxo em texto',
		flow: [
			'Cliente → API NestJS (REST)',
			'API NestJS ↔ Serviço de domínio (gRPC)',
			'API NestJS → Redis (cache)',
			'API NestJS → Fila BullMQ → Worker (assíncrono)',
			'Worker → PostgreSQL',
			'Worker ↔ Integração externa, com webhooks de volta (assíncrono)',
		],
	},
	cases: {
		title: 'Casos de trabalho',
		intro: 'Tipos de problema que resolvo no dia a dia, apresentados sem expor código ou informações internas.',
		labels: {
			context: 'Contexto',
			contribution: 'Minha contribuição',
			decisions: 'Tecnologias e decisões',
			tradeoffs: 'Desafios e trade-offs',
			result: 'Resultado',
		},
		items: [
			{
				kind: 'Plataformas de mobilidade',
				title: 'Backends para operações de mobilidade',
				context:
					'Domínios com veículos, telemetria, vistorias, manutenção, contratos, notificações e rotinas financeiras.',
				contribution:
					'Desenvolvimento e evolução de serviços backend: APIs NestJS, regras de negócio e persistência de dados.',
				decisions: [
					'Módulos de negócio separados por domínio',
					'Microsserviços que se comunicam por gRPC',
					'Filas BullMQ/Redis para rotinas assíncronas',
				],
				tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'gRPC', 'BullMQ', 'Redis'],
				result: 'Regras complexas transformadas em serviços rastreáveis e evolutivos.',
			},
			{
				kind: 'Integrações corporativas',
				title: 'Sincronização e fluxos com SAP',
				context: 'Fluxos assíncronos que levam documentos do sistema para o SAP e de volta.',
				decisions: [
					'Mapeamento de documentos por mappers dedicados',
					'Filas e processadores desacoplados, com controle de taxa de requisições ao ERP',
					'Persistência do estado de cada fluxo',
					'Logs estruturados para tornar falhas observáveis',
				],
				tech: ['SAP B1', 'Service Layer', 'BullMQ', 'Redis', 'Pino'],
				result:
						'Mais de 1.000 documentos por dia processados sem intervenção manual, eliminando lançamentos manuais e divergências entre sistemas.',
			},
			{
				kind: 'Pagamentos',
				title: 'API de integração com Asaas',
				context: 'Cobranças via Pix e cartão parcelado, com clientes e webhooks.',
				decisions: [
					'Webhooks autenticados e idempotentes',
						'Registros append-only para imutabilidade e rastreabilidade das transações',
					'Contrato documentado com OpenAPI',
					'Ambiente de homologação para validar o fluxo',
				],
				tech: ['NestJS', 'Axios', 'Webhooks', 'OpenAPI', 'Jest'],
				result: 'Contrato documentado e fluxo de homologação reproduzível de ponta a ponta.',
			},
			{
				kind: 'Fundação de produto',
				title: 'Autenticação e autorização reutilizáveis',
				context: 'Base modular para iniciar novos serviços com autenticação, papéis e permissões prontos.',
				decisions: [
					'Autenticação JWT',
					'Papéis e permissões (RBAC)',
					'Filas, e-mail e observabilidade incluídos na base',
				],
				tech: ['JWT', 'RBAC', 'Redis', 'Swagger'],
				result: 'Uma fundação consistente para iniciar novos backends com menos retrabalho.',
			},
		],
	},
	experience: {
		title: 'Experiência',
		present: 'atual',
		items: [
			{
				role: 'Engenheiro de Software Backend',
				company: 'VF PAR',
				location: 'Sinop, MT · Brasil',
				period: 'Mar 2026',
					current: true,
				description:
					'Desenvolvimento e evolução de serviços backend para operações de mobilidade e sistemas internos. Atuação em APIs NestJS, regras de negócio, integrações externas, processamento assíncrono, controle de acesso e persistência de dados.',
				highlights: [
					'Integração ponta a ponta com o SAP Business One (Service Layer): mais de 1.000 documentos por dia, sem lançamento manual',
					'Processamento assíncrono com BullMQ/Redis, com controle de taxa para proteger o ERP em picos',
					'Cobranças Pix e cartão parcelado via Asaas, com webhooks idempotentes e registros append-only',
						'Criptografia de PII com AWS KMS (envelope encryption e rotação de chaves), em aderência à LGPD',
					'Migração de VPS para AWS (EC2, RDS, S3), com Docker e monitoramento via Prometheus e Grafana',
				],
				tags: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
			},
			{
				role: 'Analista de Q.A.',
				company: 'TopSapp',
				location: 'Sinop, MT · Brasil',
				period: 'Dez 2025 — Mar 2026',
				current: false,
				description:
					'Validação de fluxos críticos e análise de falhas em sistemas web, experiência que hoje influencia a forma como desenho contratos, cenários de erro e testes de backend.',
				highlights: [
						'Testes funcionais e de regressão antes do deploy, em Kanban',
						'Registro e retestagem de defeitos no Jira',
						'Homologação de builds e validação de requisitos com o time de desenvolvimento',
					],
				tags: ['Qualidade', 'Regressão', 'Análise de falhas'],
			},
			{
				role: 'Analista de Implantação de Sistemas',
				company: 'Ecocentauro',
				location: 'Sinop, MT · Brasil',
				period: 'Jan 2024 — Dez 2025',
				current: false,
				description:
					'Implantação de sistemas e criação de relatórios orientados ao negócio, com consultas SQL, tratamento de dados e contato direto com requisitos de clientes.',
				highlights: [
						'Relatórios em Crystal Reports e FastReports sobre consultas SQL',
						'Ajustes de estrutura no PostgreSQL e migração de dados de sistemas legados',
						'Treinamento de usuários e acompanhamento do go-live',
					],
				tags: ['SQL', 'Dados', 'Implantação'],
			},
		],
	},
	skills: {
		title: 'Stack por área',
		intro: 'Tecnologias que uso no dia a dia, agrupadas pelo problema que resolvem.',
		all: 'Todas',
		groups: [
			{
				id: 'apis',
				label: 'APIs e contratos',
				application: 'Interfaces estáveis, validadas e documentadas para quem consome.',
				items: ['NestJS', 'Node.js', 'TypeScript', 'REST', 'OpenAPI / Swagger', 'Validação de DTO', 'gRPC'],
			},
			{
				id: 'data',
				label: 'Dados',
				application: 'Modelagem relacional e consistência em transações.',
				items: ['PostgreSQL', 'TypeORM', 'Migrations', 'Transações', 'MySQL', 'Firebird', 'SQL'],
			},
			{
				id: 'async',
				label: 'Comunicação e assíncrono',
				application: 'Fluxos desacoplados, com retentativas e eventos.',
				items: ['Microsserviços', 'gRPC', 'BullMQ', 'Redis', 'Webhooks', 'Eventos'],
			},
			{
				id: 'security',
				label: 'Segurança',
				application: 'Autenticação e controle de acesso por papéis.',
				items: ['JWT', 'RBAC', 'AWS KMS', 'LGPD'],
			},
			{
				id: 'ops',
				label: 'Operação',
				application: 'Deploy, logs e métricas para enxergar o sistema em produção.',
				items: ['Docker', 'AWS (EC2, RDS, S3)', 'Easypanel', 'Pino', 'Prometheus', 'Grafana'],
			},
			{
				id: 'quality',
				label: 'Qualidade',
				application: 'Testes que protegem regras de negócio contra regressões.',
				items: ['Jest', 'Regressão'],
			},
			{
				id: 'also',
				label: 'Também uso',
				application: 'Apoio ao backend e automações.',
				items: ['React', 'Tailwind CSS', 'n8n', 'Git'],
			},
		],
	},
	projects: {
		title: 'Projetos públicos',
		visit: 'Abrir',
		items: [
			{
				title: 'Conversy',
				status: 'encerrado',
				type: 'Produto SaaS · Fundador',
				date: 'Fev 2024 — Jun 2026',
				description:
					'Plataforma SaaS de automação de atendimento e disparo de mensagens via WhatsApp para pequenas e médias empresas. Idealizei e construí o produto da concepção ao lançamento: backend, autenticação JWT, planos e assinaturas, cobrança, painel web e gestão de múltiplas instâncias de WhatsApp por cliente.',
				tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'React'],
				url: 'https://conversy.up.railway.app/',
			},
		],
	},
	education: {
		title: 'Formação',
		items: [
			{
				institution: 'Fasipe',
				period: 'Set 2026 — Jan 2029',
				degree: 'Análise e Desenvolvimento de Sistemas',
				detail: 'Graduação em andamento',
			},
		],
	},
	contact: {
		title: 'Contato',
		lead: 'Vamos conversar.',
		text: 'Para oportunidades, projetos ou trocar ideias sobre backend, escreva por e-mail ou procure nas redes.',
		email: 'E-mail',
		copy: 'Copiar e-mail',
		copied: 'Copiado!',
		photoAlt: 'Lucas Steffen olhando para o horizonte',
		follow: 'Perfil no',
	},
	footer: '© {year} · Lucas G. Amorim Steffen · Engenheiro de Software Backend',
}
