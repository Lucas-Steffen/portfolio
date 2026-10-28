import { TranslateIcon } from '@phosphor-icons/react'
import { useLang } from '../i18n/LangProvider'

export function LanguageToggle() {
	const { t, toggle } = useLang()
	return (
		<button type="button" className="lang-toggle" onClick={toggle} aria-label={t.nav.switchLang}>
			<TranslateIcon size={18} aria-hidden="true" />
			<span aria-hidden="true">{t.nav.langShort}</span>
		</button>
	)
}
