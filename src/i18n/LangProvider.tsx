import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from '../content'

interface LangContextValue {
	lang: Lang
	t: Content
	toggle: () => void
}

const STORAGE_KEY = 'portfolio-lang'

const LangContext = createContext<LangContextValue | null>(null)

function readInitialLang(): Lang {
	try {
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored === 'pt' || stored === 'en') return stored
	} catch {
		// storage indisponível (modo privado, in-app browsers): segue para o idioma do navegador
	}
	return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'pt'
}

export function LangProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Lang>(readInitialLang)
	const t = content[lang]

	useEffect(() => {
		document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
		document.title = t.meta.title
		document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
		document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title)
		document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description)
		document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'pt' ? 'pt_BR' : 'en_US')
	}, [lang, t])

	const value = useMemo<LangContextValue>(
		() => ({
			lang,
			t,
			toggle: () => {
				const next: Lang = lang === 'pt' ? 'en' : 'pt'
				setLang(next)
				try {
					localStorage.setItem(STORAGE_KEY, next)
				} catch {
					// sem persistência, o idioma vale só para esta sessão
				}
			},
		}),
		[lang, t],
	)

	return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
	const ctx = useContext(LangContext)
	if (!ctx) throw new Error('useLang deve ser usado dentro de <LangProvider>')
	return ctx
}
