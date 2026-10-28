// Gera os derivados otimizados em public/img/ a partir dos originais (que ficam intactos).
// Uso: npm run images
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'public', 'img')
await mkdir(out, { recursive: true })

async function writeSizes(input, name, widths) {
	for (const width of widths) {
		const base = sharp(input).resize({ width, withoutEnlargement: true })
		await base.clone().webp({ quality: 80 }).toFile(path.join(out, `${name}-${width}.webp`))
		await base.clone().avif({ quality: 55 }).toFile(path.join(out, `${name}-${width}.avif`))
	}
}

const src = (name) => path.join(root, 'public', 'lucas', 'sem-logo-sem-fundo', name)

// PNGs transparentes (sem logo, sem fundo): não há mais nada a ocultar.
await writeSizes(path.join(root, 'public', 'lucas-hoodie.png'), 'hero', [520, 960])
await writeSizes(src('OlhandoFoto.png'), 'about', [480, 800])
await writeSizes(src('OlhandoHorizonte.png'), 'contact', [400, 720])

console.log('imagens geradas em public/img')
