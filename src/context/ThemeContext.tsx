import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

// Definição da Tipagem

type Theme = "light" | "dark";

interface ThemeTokens {
	bg: string; // fundo da página
	surface: string; // cards, modalsfd
	surfaceAlt: string; // fundos secundários
	border: string; // bordas suaves (cards)
	borderMd: string; // bordas médias (inputs e separadores)
	text: string; // titulo / textos principais
	textSm: string; // texto secundário
	textXs: string; // texto terciário / placeholder
	shadow: string; // box-shadow rgba alpha
}

interface ThemeContextValue {
	theme: Theme;
	toggle: () => void;
	tokens: ThemeTokens;
}

// Tokens por tema

const LIGHT_TOKENS: ThemeTokens = {
	bg: "#f8fafc",
	surface: "#ffffff",
	surfaceAlt: "#f8fafc",
	border: "#f1f5f9",
	borderMd: "#e2e8f0",
	text: "#0f172a",
	textSm: "#64748b",
	textXs: "#94a3b8",
	shadow: "0.05",
};

const DARK_TOKENS: ThemeTokens = {
	bg: "#0f172a",
	surface: "#1e293b",
	surfaceAlt: "#162032",
	border: "#334155",
	borderMd: "#334155",
	text: "#f1f5f9",
	textSm: "#94a3b8",
	textXs: "#64748b",
	shadow: "0.25",
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored === "dark" || stored === "light") return stored;
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

	const tokens = theme === "dark" ? DARK_TOKENS : LIGHT_TOKENS;

	return (
		<ThemeContext.Provider value={{ theme, toggle, tokens }}>
			{children}
		</ThemeContext.Provider>
	);
}

// Hook

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx)
		throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
	return ctx;
}
