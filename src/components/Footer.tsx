import { useLang } from '../i18n/LangProvider'

export function Footer() {
	const { t } = useLang()
	return (
		<footer className="site-footer">
			<div className="container">{t.footer.replace('{year}', String(new Date().getFullYear()))}</div>
		</footer>
	)
}
