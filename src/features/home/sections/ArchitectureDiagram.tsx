import { Reveal } from '../../../components/Reveal'
import { useLang } from '../../../i18n/LangProvider'

type Edge = 'sync' | 'grpc' | 'async'

function Link({ kind, label }: { kind: Edge; label: string }) {
	return (
		<span className={`arch-link arch-link-${kind}`} aria-hidden="true">
			<span className="arch-link-label">{label}</span>
		</span>
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

				<div className="arch-board" role="img" aria-label={d.ariaLabel}>
					<div className="arch-row">
						<div className="arch-node">{d.nodes.client}</div>
						<Link kind="sync" label="REST" />
						<div className="arch-node arch-node-main">{d.nodes.api}</div>
						<Link kind="grpc" label="gRPC" />
						<div className="arch-node">{d.nodes.domain}</div>
					</div>

					<div className="arch-row arch-row-branch">
						<div className="arch-branch">
							<Link kind="sync" label="cache" />
							<div className="arch-node arch-node-small">{d.nodes.cache}</div>
						</div>
						<div className="arch-branch">
							<Link kind="async" label="jobs" />
							<div className="arch-node arch-node-small">{d.nodes.queue}</div>
						</div>
					</div>

					<div className="arch-row">
						<div className="arch-node">{d.nodes.worker}</div>
						<Link kind="sync" label="SQL" />
						<div className="arch-node arch-node-main">{d.nodes.db}</div>
						<Link kind="async" label="webhooks" />
						<div className="arch-node">{d.nodes.external}</div>
					</div>
				</div>

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
