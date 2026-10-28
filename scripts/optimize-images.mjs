// Gera os derivados otimizados em public/img/ a partir dos originais (que ficam intactos).
// Uso: npm run images
import { mkdir, readFile } from 'node:fs/promises'
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

// Mantém só a pessoa nítida: o resto da imagem (quadro com anotações internas) é
// desfocado e escurecido ao ponto de nada ficar legível.
async function privacyTreat(file, svgMask, size) {
	const { width, height } = size
	// Normaliza o tamanho para que a máscara (em coordenadas width×height) case com a imagem.
	const original = await sharp(file).rotate().resize(width, height, { fit: 'cover' }).removeAlpha().png().toBuffer()
	const hidden = await sharp(original).blur(38).modulate({ brightness: 0.22, saturation: 0.6 }).png().toBuffer()
	const mask = await sharp(Buffer.from(svgMask)).resize(width, height).blur(7).extractChannel(0).raw().toBuffer({ resolveWithObject: true })
	const personRaw = await sharp(original).raw().toBuffer({ resolveWithObject: true })
	const person = await sharp(personRaw.data, { raw: personRaw.info })
		.joinChannel(mask.data, { raw: { width, height, channels: 1 } })
		.png()
		.toBuffer()
	return sharp(hidden).composite([{ input: person }]).png().toBuffer()
}

// Hero: PNG transparente de 1,6 MB
await writeSizes(path.join(root, 'public', 'lucas-hoodie.png'), 'hero', [520, 960])

// Foto "Como trabalho"
const front = path.join(root, 'public', 'lucas', 'FrenteOlhandoFoto.jpeg')
const frontMask = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1280"><rect width="960" height="1280" fill="black"/>
<g fill="white"><ellipse cx="470" cy="445" rx="118" ry="170"/>
<polygon points="395,570 545,570 700,640 775,760 790,1280 175,1280 168,780 240,650"/></g></svg>`
const frontTreated = await privacyTreat(front, frontMask, { width: 960, height: 1280 })
await writeSizes(frontTreated, 'about', [480, 800])

// Foto do contato
const horizon = path.join(root, 'public', 'lucas', 'OlhandoHorizonte.jpeg')
const horizonMask = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="1280"><rect width="960" height="1280" fill="black"/>
<g fill="white"><ellipse cx="452" cy="415" rx="118" ry="172"/>
<polygon points="370,570 540,570 690,640 755,760 745,1280 120,1280 105,800 220,640"/></g></svg>`
const horizonTreated = await privacyTreat(horizon, horizonMask, { width: 960, height: 1280 })
await writeSizes(horizonTreated, 'contact', [400, 720])

console.log('imagens geradas em public/img')
