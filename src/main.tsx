import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import './global.css'
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LangProvider } from "./context/LangProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<LangProvider>
				<App />
			</LangProvider>
		</ThemeProvider>
	</StrictMode>,
);
