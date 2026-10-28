import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './features/home/HomePage'
import { useLang } from './i18n/LangProvider'

export function App() {
	const { t } = useLang()
	return (
		<>
			<a className="skip-link" href="#main">
				{t.nav.skip}
			</a>
			<Header />
			<main id="main" tabIndex={-1}>
				<HomePage />
			</main>
			<Footer />
		</>
	)
}
