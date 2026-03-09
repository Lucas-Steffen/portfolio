import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'

interface LangContextValue {
    lang: Lang
    toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        const stored = localStorage.getItem('portfolio-lang') as Lang | null
        if (stored === 'pt' || stored === 'en') return stored
        return navigator.language.startsWith('pt') ? 'pt' : 'en'
    })

    const toggle = () => {
        const next: Lang = lang === 'pt' ? 'en' : 'pt'
        setLang(next)
        localStorage.setItem('portfolio-lang', next)
    }

    return (
        <LangContext.Provider value={{ lang, toggle }}>
            {children}
        </LangContext.Provider>
    )
}

export function useLang() {
    const ctx = useContext(LangContext)
    if (!ctx) throw new Error('useLang deve ser usado dentro de <LangProvider>')
    return ctx
}