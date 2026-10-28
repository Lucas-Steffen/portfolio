import type { Content } from './types'

export const pt: Content = {
	meta: {
		title: 'Lucas Steffen · Engenheiro de Software Backend',
		description:
			'Engenheiro de Software Backend em Sinop, MT. Serviços NestJS e Java, integrações SAP, pagamentos e telemática, filas BullMQ/Redis e PostgreSQL em produção.',
	},
	nav: {
		cases: 'Projetos',
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
			'Desenvolvo sistemas e integrações que automatizam processos, conectam plataformas e tornam operações empresariais mais eficientes, seguras e escaláveis.',
		ctaCases: 'Ver projetos',
		ctaContact: 'Entrar em contato',
		location: 'Sinop, MT · Brasil',
		photoAlt: 'Lucas Steffen, engenheiro de software backend',
		photoLabel: 'backend / vf par',
		socialLabel: 'Perfis',
	},
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
			'Diagrama ilustrativo: o cliente chama a API NestJS por REST; a API fala com o microsserviço de domínio por REST, usa Redis como cache e publica tarefas numa fila BullMQ; o worker consome a fila, grava no PostgreSQL e integra com um sistema externo, que responde por webhooks.',
		legendTitle: 'Legenda',
		legend: { sync: 'REST (síncrono)', async: 'Assíncrono' },
		nodes: {
			client: 'Cliente',
			api: 'API NestJS',
			domain: 'Microsserviço de domínio',
			cache: 'Redis (cache)',
			queue: 'Fila BullMQ',
			worker: 'Worker',
			db: 'PostgreSQL',
			external: 'Integração externa (SAP / pagamentos)',
		},
		flowTitle: 'Fluxo em texto',
		flow: [
			'Cliente → API NestJS (REST)',
			'API NestJS ↔ Microsserviço de domínio (REST)',
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
			details: 'Detalhes técnicos',
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
					'Microsserviços integrados por REST, filas e webhooks',
					'Filas BullMQ/Redis e jobs agendados para rotinas assíncronas',
						'Autorização por políticas com CASL',
				],
				tech: ['NestJS', 'PostgreSQL', 'TypeORM', 'BullMQ', 'Redis', 'CASL'],
				result: 'Regras complexas transformadas em serviços rastreáveis e evolutivos.',
			},
			{
				kind: 'Integrações corporativas',
				title: 'Sincronização e fluxos com SAP',
				context: 'Módulo assíncrono que recebe as requisições dos sistemas internos, as enfileira e as executa no SAP por workers, devolvendo o resultado ao solicitante.',
				decisions: [
					'Mapeamento de documentos por mappers dedicados',
					'Workers de processamento com concorrência configurável, prioridade para requisições urgentes e controle de taxa de requisições ao ERP',
						'Resultado devolvido por webhook ao solicitante, com histórico dos jobs, reenvio de falhas e reconciliação de jobs travados',
					'Persistência do estado de cada fluxo',
					'Logs estruturados para tornar falhas observáveis',
						'Métricas do serviço acompanhadas em Prometheus e Grafana',
				],
				tech: ['SAP B1', 'Service Layer', 'BullMQ', 'Redis', 'Pino', 'Prometheus', 'Grafana'],
				result:
						'Mais de 1.000 baixas de documentos e mais de 4.000 lançamentos por dia (adiantamentos, faturamentos e baixas) processados sem intervenção manual, eliminando lançamentos manuais e divergências entre sistemas.',
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
					'Autenticação JWT com refresh token e recuperação de senha por código',
					'Papéis e permissões (RBAC) aplicados por políticas CASL (PoliciesGuard e @CheckPolicies)',
					'Filas, e-mail e observabilidade incluídos na base',
				],
				tech: ['JWT', 'CASL', 'Redis', 'Swagger'],
				result: 'Uma fundação consistente para iniciar novos backends com menos retrabalho.',
				},
				{
					kind: 'Integrações com terceiros',
					title: 'Pagamentos, assinatura eletrônica, KYC e mensageria',
					context:
						'Backends que consomem e expõem APIs de pagamentos, assinatura eletrônica, verificação de identidade, mensageria, telemática e automação.',
					contribution: 'Módulos de integração com clientes tipados, handlers de webhook e rotinas de reconciliação.',
					decisions: [
						'Webhooks validados por segredo compartilhado, com rotinas de reconciliação para estados que divergem entre sistemas',
						'Modo mock para desenvolver e testar sem depender do ambiente externo',
						'Estado das integrações e logs de requisições persistidos com correlation id',
						'Fluxos de automação conectados por webhooks do n8n',
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
					kind: 'Telemetria GPS',
					title: 'Traccar: novo protocolo, PostgreSQL e multi-tenancy',
					context:
						'Fork do Traccar, servidor open source de rastreamento GPS, estendido para receber um novo modelo de rastreador e atender vários tenants.',
					contribution:
						'Trabalho em Java no fork: decoder de protocolo, suporte a PostgreSQL, isolamento por tenant e testes. Um serviço NestJS sincroniza dispositivos e posições a partir dele.',
					decisions: [
						'Novo decoder do protocolo JT808 dentro do pipeline Netty',
						'Suporte a PostgreSQL com script de migração e configuração em Docker Compose',
						'Multi-tenancy nas camadas de storage e cache, com regras de acesso por tenant',
						'Testes JUnit de acesso por tenant e teste de integração com PostgreSQL',
						'Console web embutido removido por segurança; front-end próprio em React + Vite',
						'Serviço de sincronização em NestJS acionado por jobs BullMQ agendados',
					],
					tech: ['Java 21', 'Netty', 'Guice', 'Liquibase', 'PostgreSQL', 'JUnit', 'Docker', 'React', 'Vite'],
					links: [
						{ label: 'Servidor (fork)', url: 'https://github.com/VFPAR/traccar-server/tree/integration/micodus-mv730g' },
						{ label: 'Web (fork)', url: 'https://github.com/VFPAR/traccar-web/tree/feat/micodus-integration' },
					],
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
					'Integração ponta a ponta com o SAP Business One (Service Layer): mais de 1.000 baixas e 4.000 lançamentos por dia, sem lançamento manual',
					'Processamento assíncrono com workers BullMQ/Redis, limite de taxa e concorrência configuráveis, para proteger o ERP em picos de requisições',
					'Cobranças Pix e cartão parcelado via Asaas, com webhooks idempotentes e registros append-only',
					'Criptografia de PII com envelope encryption no AWS KMS, em aderência à LGPD',
					'Migração gradual de VPS para AWS (RDS, S3), com Docker',
					'Contribuições ao Traccar em Java: decoder de protocolo, suporte a PostgreSQL e multi-tenancy',
				],
				tags: ['TypeScript', 'Java', 'NestJS', 'PostgreSQL', 'Redis', 'AWS'],
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
						'Relatórios em Crystal Reports e FastReports sobre consultas SQL (PostgreSQL, MySQL e Firebird)',
						'Ajustes de estrutura no PostgreSQL e migração de dados de sistemas legados',
						'Treinamento de usuários e acompanhamento do go-live',
					],
				tags: ['SQL', 'MySQL', 'Firebird', 'Dados', 'Implantação'],
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
				label: 'APIs e back-end',
				application: 'Serviços estáveis, validados e documentados.',
				items: ['NestJS', 'TypeScript', 'Java', 'OpenAPI'],
			},
			{
				id: 'data',
				label: 'Dados',
				application: 'Modelagem relacional e isolamento por tenant.',
				items: ['PostgreSQL', 'TypeORM', 'Migrations', 'Multi-tenancy'],
			},
			{
				id: 'async',
				label: 'Assíncrono',
				application: 'Fluxos desacoplados, com retentativas e eventos.',
				items: ['BullMQ', 'Redis', 'Webhooks', 'Microsserviços'],
			},
			{
				id: 'integrations',
				label: 'Integrações',
				application: 'ERP, pagamentos e telemática conectados ao backend.',
				items: ['SAP B1 Service Layer', 'Asaas', 'DocuSign', 'WhatsApp', 'Traccar'],
			},
			{
				id: 'security',
				label: 'Segurança',
				application: 'Controle de acesso e proteção de dados pessoais.',
				items: ['RBAC com CASL', 'AWS KMS', 'LGPD'],
			},
			{
				id: 'ops',
				label: 'Operação',
				application: 'Deploy e métricas para enxergar o sistema em produção.',
				items: ['Docker', 'AWS (RDS, S3)', 'Prometheus', 'Grafana', 'GitHub Actions'],
			},
		],
	},
	projects: {
		title: 'Projetos públicos',
		items: [
			{
				title: 'Conversy',
				status: 'vendido',
				type: 'Produto SaaS · Fundador',
				date: 'Fev 2024 — Jun 2026',
				description:
					'Plataforma SaaS de automação de atendimento e disparo de mensagens via WhatsApp para pequenas e médias empresas. Idealizei e construí o produto da concepção ao lançamento: backend, autenticação JWT, planos e assinaturas, cobrança, painel web e gestão de múltiplas instâncias de WhatsApp por cliente.',
				tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'React'],
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
		text: 'Projetos, parcerias ou uma boa conversa sobre tecnologia: fale comigo por e-mail ou pelas redes.',
		email: 'E-mail',
		photoAlt: 'Lucas Steffen olhando para o horizonte',
		follow: 'Perfil no',
	},
	footer: '© {year} · Lucas G. Amorim Steffen · Engenheiro de Software Backend',
}
