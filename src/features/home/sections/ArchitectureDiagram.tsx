import { Reveal } from '../../../components/Reveal'
import { useLang } from '../../../i18n/LangProvider'

type Edge = 'sync' | 'grpc' | 'async'

const NODE_W = 190
const NODE_H = 64

// Mesma ordem de `diagram.flow`, para colorir cada passo da lista no mobile.
const flowKinds: Edge[] = ['sync', 'grpc', 'sync', 'async', 'sync', 'async']

type NodeProps = { x: number; y: number; label: string; main?: boolean; mono?: boolean }

function Node({ x, y, label, main, mono }: NodeProps) {
	const [first, ...rest] = label.split(' (')
	const lines = rest.length ? [first, `(${rest.join(' (')}`] : [first]
	const cx = x + NODE_W / 2
	const cy = y + NODE_H / 2
	return (
		<g>
			<rect className={`arch-rect${main ? ' arch-rect-main' : ''}`} x={x} y={y} width={NODE_W} height={NODE_H} rx={12} />
			<text className={`arch-text${mono ? ' arch-text-mono' : ''}`} x={cx} y={cy} textAnchor="middle">
				{lines.map((line, i) => (
					<tspan key={line} x={cx} y={cy + (i - (lines.length - 1) / 2) * 20} dominantBaseline="central">
						{line}
					</tspan>
				))}
			</text>
		</g>
	)
}

type EdgeProps = {
	kind: Edge
	d: string
	label: string
	lx: number
	ly: number
	anchor?: 'start' | 'middle'
	both?: boolean
	vertical?: boolean
}

function EdgeLine({ kind, d, label, lx, ly, anchor = 'middle', both, vertical }: EdgeProps) {
	return (
		<g className={`arch-edge arch-edge-${kind}`}>
			<path d={d} markerEnd={`url(#arch-arrow-${kind})`} markerStart={both ? `url(#arch-arrow-${kind})` : undefined} />
			<text
				x={lx}
				y={ly}
				textAnchor={anchor}
				transform={vertical ? `rotate(-90 ${lx} ${ly})` : undefined}
			>
				{label}
			</text>
		</g>
	)
}

export function ArchitectureDiagram() {
	const { t } = useLang()
	const d = t.diagram

	return (
		<Reveal>
			<figure className="arch">
				<figcaption className="arch-head">
					<h3>{d.title}</h3>
					<p>{d.disclaimer}</p>
				</figcaption>

				<svg className="arch-svg" viewBox="0 0 1060 384" role="img" aria-label={d.ariaLabel}>
					<defs>
						{(['sync', 'grpc', 'async'] as const).map(kind => (
							<marker
								key={kind}
								id={`arch-arrow-${kind}`}
								className={`arch-arrow arch-arrow-${kind}`}
								viewBox="0 0 10 10"
								refX="9"
								refY="5"
								markerWidth="8"
								markerHeight="8"
								orient="auto-start-reverse"
							>
								<path d="M0,0 L10,5 L0,10 z" />
							</marker>
						))}
					</defs>

					<EdgeLine kind="sync" d="M200,192 H266" label="REST" lx={233} ly={176} />
					<EdgeLine kind="grpc" d="M365,160 V62 H526" label="gRPC" lx={446} ly={46} />
					<EdgeLine kind="sync" d="M460,192 H526" label="cache" lx={493} ly={176} />
					<EdgeLine kind="async" d="M365,224 V322 H526" label="jobs" lx={446} ly={306} />
					<EdgeLine kind="async" d="M720,322 H786" label="consume" lx={753} ly={306} />
					<EdgeLine kind="sync" d="M885,290 V226" label="SQL" lx={899} ly={262} anchor="start" />
					<EdgeLine kind="async" d="M982,322 H1030 V62 H982" label="webhooks" lx={1048} ly={192} both vertical />

					<Node x={10} y={160} label={d.nodes.client} />
					<Node x={270} y={160} label={d.nodes.api} main />
					<Node x={530} y={30} label={d.nodes.domain} />
					<Node x={530} y={160} label={d.nodes.cache} mono />
					<Node x={530} y={290} label={d.nodes.queue} mono />
					<Node x={790} y={290} label={d.nodes.worker} />
					<Node x={790} y={160} label={d.nodes.db} main />
					<Node x={790} y={30} label={d.nodes.external} />
				</svg>

				<ol className="arch-steps">
					{d.flow.map((step, i) => (
						<li key={step} className={`arch-step arch-step-${flowKinds[i] ?? 'sync'}`}>
							{step}
						</li>
					))}
				</ol>

				<div className="arch-meta">
					<ul className="arch-legend" aria-label={d.legendTitle}>
						<li>
							<span className="swatch swatch-sync" aria-hidden="true" /> {d.legend.sync}
						</li>
						<li>
							<span className="swatch swatch-grpc" aria-hidden="true" /> {d.legend.grpc}
						</li>
						<li>
							<span className="swatch swatch-async" aria-hidden="true" /> {d.legend.async}
						</li>
					</ul>
					<details className="arch-flow">
						<summary>{d.flowTitle}</summary>
						<ol>
							{d.flow.map(step => (
								<li key={step}>{step}</li>
							))}
						</ol>
					</details>
				</div>
			</figure>
		</Reveal>
	)
}
