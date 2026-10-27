// Generates placeholder art for Mega Madness: tinted sprites and portraits for pokemons without art,
// and item icons for Key Stone, Mega Shards and Mega Stones.
// Real sprites can later replace the generated files: they are only written when missing, unless --force is passed.
// Mega item icons larger than regular items (90x90) are shrunk to fit.
// Run with: cd gen && npx tsx generate-mega-assets.ts, then npm run assetpack
import fs from "fs"
import { Jimp } from "jimp"
import path from "path"
import {
  MegaCraftingItems,
  MegaEvolutions,
  MegaItemRecipe,
  MegaShards,
  MegaStones
} from "../app/config/game/megas"
import { getPokemonData } from "../app/models/precomputed/precomputed-pokemon-data"
import { Item } from "../app/types/enum/Item"
import { Pkm, PkmIndex } from "../app/types/enum/Pokemon"

const FORCE = process.argv.includes("--force")
const ASSETS = "../app/public/src/assets"
const SPRITES = `${ASSETS}/pokemons`
const PORTRAITS = `${ASSETS}/portraits`
const ITEMS = `${ASSETS}/item{tps}`
const UI = `${ASSETS}/ui`
const ITEM_ICON_SIZE = 90
const EMOTIONS_JSON =
  "../app/models/precomputed/emotions-per-pokemon-index.json"
const CREDITS_JSON = "../app/models/precomputed/credits.json"

type Filter = (r: number, g: number, b: number) => [number, number, number]

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return [h * 60, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = (((h % 360) + 360) % 360) / 360
  if (s === 0) return [l * 255, l * 255, l * 255]
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    hue2rgb(p, q, h + 1 / 3) * 255,
    hue2rgb(p, q, h) * 255,
    hue2rgb(p, q, h - 1 / 3) * 255
  ]
}

// mega energy: magenta wash so placeholder megas are recognizable at a glance
const megaTint: Filter = (r, g, b) => [
  Math.min(255, r * 0.7 + 210 * 0.3 + 10),
  Math.min(255, g * 0.7 + 90 * 0.3),
  Math.min(255, b * 0.7 + 255 * 0.3 + 10)
]

const hueShift =
  (degrees: number, saturation = 1, lightness = 1): Filter =>
  (r, g, b) => {
    const [h, s, l] = rgbToHsl(r, g, b)
    return hslToRgb(
      h + degrees,
      Math.min(1, s * saturation),
      Math.min(1, l * lightness)
    )
  }

const chain =
  (...filters: Filter[]): Filter =>
  (r, g, b) =>
    filters.reduce<[number, number, number]>((c, f) => f(...c), [r, g, b])

async function tintPng(source: string, target: string, filter: Filter) {
  const image = await Jimp.read(source)
  const data = image.bitmap.data
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    const [r, g, b] = filter(data[i], data[i + 1], data[i + 2])
    data[i] = Math.round(r)
    data[i + 1] = Math.round(g)
    data[i + 2] = Math.round(b)
  }
  fs.mkdirSync(path.dirname(target), { recursive: true })
  await image.write(target as `${string}.png`)
}

const shouldWrite = (file: string) => FORCE || !fs.existsSync(file)

function portraitDir(index: string) {
  return `${PORTRAITS}/${index.replace("-", "/")}`
}
function shinyPortraitDir(index: string) {
  return `${portraitDir(index)}/${index.length === 4 ? "0000/0001" : "0001"}`
}

const emotions = JSON.parse(fs.readFileSync(EMOTIONS_JSON, "utf8"))
const credits = JSON.parse(fs.readFileSync(CREDITS_JSON, "utf8"))

async function generatePokemonArt(
  source: string,
  target: string,
  filter: Filter
) {
  // sprite atlas: json + png, the json references the png by name
  const spriteJson = `${SPRITES}/${target}.json`
  if (shouldWrite(spriteJson)) {
    const json = fs
      .readFileSync(`${SPRITES}/${source}.json`, "utf8")
      .split(`"${source}.png"`)
      .join(`"${target}.png"`)
    fs.writeFileSync(spriteJson, json)
    await tintPng(
      `${SPRITES}/${source}.png`,
      `${SPRITES}/${target}.png`,
      filter
    )
  }

  // portraits: every emotion available for the source, normal and shiny
  for (const [fromDir, toDir] of [
    [portraitDir(source), portraitDir(target)],
    [shinyPortraitDir(source), shinyPortraitDir(target)]
  ]) {
    if (!fs.existsSync(fromDir)) continue
    for (const file of fs.readdirSync(fromDir)) {
      if (!file.endsWith(".png")) continue
      const to = `${toDir}/${file}`
      if (shouldWrite(to)) await tintPng(`${fromDir}/${file}`, to, filter)
    }
  }

  if (emotions[source] && !emotions[target]) emotions[target] = emotions[source]
  if (credits[source] && !credits[target]) credits[target] = credits[source]
  console.log(`${source} -> ${target}`)
}

const TagHue: Record<string, number> = {
  FIRE: 15,
  WATER: 210,
  GRASS: 110,
  FLORA: 110,
  BUG: 80,
  ELECTRIC: 55,
  ICE: 185,
  FAIRY: 330,
  PSYCHIC: 310,
  DARK: 265,
  GHOST: 280,
  POISON: 290,
  STEEL: 220,
  ROCK: 35,
  GROUND: 40,
  DRAGON: 250,
  FIGHTING: 5,
  FLYING: 200,
  NORMAL: 0
}

async function main() {
  // Litleo and Pyroar have no art at all: use Shinx and Luxray with a fire coloration
  const fireLion = hueShift(180, 1.1)
  await generatePokemonArt(PkmIndex[Pkm.SHINX], PkmIndex[Pkm.LITLEO], fireLion)
  await generatePokemonArt(PkmIndex[Pkm.LUXRAY], PkmIndex[Pkm.PYROAR], fireLion)

  for (const mega of MegaEvolutions) {
    if (!mega.placeholderSpriteSource) continue
    await generatePokemonArt(
      mega.placeholderSpriteSource,
      PkmIndex[mega.mega],
      megaTint
    )
  }

  fs.writeFileSync(EMOTIONS_JSON, JSON.stringify(emotions))
  fs.writeFileSync(CREDITS_JSON, JSON.stringify(credits))

  // item icons
  const icon = async (source: string, item: Item, filter: Filter) => {
    const target = `${ITEMS}/${item}.png`
    if (shouldWrite(target))
      await tintPng(`${ITEMS}/${source}.png`, target, filter)
  }
  await icon("SHINY_STONE", Item.KEY_STONE, chain(megaTint, megaTint))
  const shardHues: Record<string, [number, number, number]> = {
    VERDANT: [110, 1, 1],
    TIDAL: [210, 1, 1],
    HEART: [330, 1, 1.1],
    FROST: [185, 0.8, 1.2],
    BLAZE: [15, 1, 1],
    VOLT: [55, 1, 1.1],
    SHADOW: [270, 0.8, 0.7],
    MIND: [300, 1, 1],
    ANCIENT: [35, 0.5, 0.9],
    SILK: [0, 0.1, 1.3]
  }
  for (const shard of MegaShards) {
    const [hue, sat, light] = shardHues[shard.replace("_MEGA_SHARD", "")]
    await icon("FIRE_SHARD", shard, hueShift(hue - 15, sat, light))
  }
  // mega stones: orbs colored after the main synergy of the mega, slightly shifted so stones differ
  for (const mega of MegaEvolutions) {
    if (!mega.stone || !(mega.stone in MegaItemRecipe)) continue
    const tag =
      getPokemonData(mega.mega).types.find((t) => t in TagHue) ?? "NORMAL"
    const offset = ((mega.stone.length * 7) % 30) - 15
    await icon(
      "RED_ORB",
      mega.stone,
      hueShift((TagHue[tag] ?? 0) + offset, 1, 1.05)
    )
  }

  // item icons are drawn at their native size in game: shrink any replacement art to the size of regular items
  for (const item of [...MegaCraftingItems, ...MegaStones]) {
    const file = `${ITEMS}/${item}.png`
    if (!fs.existsSync(file)) continue
    const image = await Jimp.read(file)
    if (image.width <= ITEM_ICON_SIZE && image.height <= ITEM_ICON_SIZE)
      continue
    console.log(`resizing ${item} from ${image.width}x${image.height}`)
    image.contain({ w: ITEM_ICON_SIZE, h: ITEM_ICON_SIZE })
    await image.write(file as `${string}.png`)
  }

  // game mode icons
  for (const file of [
    `${UI}/mega_madness.png`,
    `${UI}/game_modes/mega_madness.png`
  ]) {
    if (shouldWrite(file))
      await tintPng(
        file.replace("mega_madness", "classic"),
        file,
        chain(megaTint, megaTint)
      )
  }
  console.log("done")
}

main()
