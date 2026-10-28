# Portfólio · Lucas Steffen

Site de página única (React 19 + TypeScript + Vite) em português e inglês, com foco em backend: casos, diagrama de arquitetura, experiência e stack por área.

## Comandos

```bash
npm install
npm run dev          # http://localhost:5178
npm run build        # tsc -b + vite build
npm run preview      # http://localhost:4178 (usado pelos testes)
npm run lint
npm run test:e2e     # Playwright com o Chrome instalado (faz o build se o preview não estiver no ar)
npm run screenshots  # capturas em vários viewports, na pasta screenshots/ (ignorada pelo git)
npm run images       # regenera public/img a partir de public/lucas/sem-logo-sem-fundo
npm run og           # regenera public/og-image.png (1200x630)
```

## Estrutura

```
src/
  components/   Header, Footer, Section, Reveal, LanguageToggle, ExternalLink
  content/      textos pt/en tipados (types.ts garante a paridade), links em shared.ts
  features/home/ HomePage e sections/ (Hero, About, ArchitectureDiagram, Cases, ...)
  hooks/ lib/ i18n/  seção ativa, scroll, provider de idioma
  styles/       tokens.css, base.css, layout.css
scripts/        imagens, og-image, screenshots
tests/e2e/      testes Playwright
```

## Editando o conteúdo

Todo o texto fica em `src/content/pt.ts` e `src/content/en.ts`. O tipo `Content` obriga os dois idiomas a terem a mesma forma. E-mail e redes ficam em `src/content/shared.ts`.

## Imagens

Os originais em `public/lucas/` não são alterados. `npm run images` gera AVIF/WebP em `public/img/` a partir dos PNGs transparentes de `public/lucas/sem-logo-sem-fundo/` (Sobre: OlhandoFoto, Contato: OlhandoHorizonte). O Hero usa `public/lucas-hoodie.png`..

## Compartilhamento

A URL do site vem de `VITE_SITE_URL` (padrão `https://lucas-steffen.vercel.app`, em `.env`) e é usada em canonical e Open Graph. O site está em `lucas-steffen.vercel.app`. Ao registrar um domínio próprio, ajuste a variável (e a env var no Vercel) para que canonical e previews do LinkedIn/Instagram apontem para ele.

## Conteúdo a enriquecer

- Trade-offs reais em cada caso (o campo `tradeoffs` já é suportado).
- Métricas e resultados mensuráveis nos casos.
- Datas de início na VF PAR.
- Aprovar o tratamento das fotos.
