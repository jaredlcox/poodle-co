/**
 * Regenerates raster PNGs from app/icon.svg (footer + PWA manifest icons).
 * App Router favicons: app/favicon.ico, app/icon.svg, app/apple-icon.png
 */
import sharp from "sharp"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const svg = join(root, "app", "icon.svg")

async function main() {
  await sharp(svg).resize(512, 512).png().toFile(join(root, "public", "poodle-favicon.png"))
  await sharp(svg).resize(192, 192).png().toFile(join(root, "public", "web-app-manifest-192x192.png"))
  await sharp(svg).resize(512, 512).png().toFile(join(root, "public", "web-app-manifest-512x512.png"))
  console.log("Regenerated PNGs from app/icon.svg")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
