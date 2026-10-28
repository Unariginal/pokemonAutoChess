// Replaces the placeholder art of Mega Madness megas (and of Litleo and Pyroar) with the real art from a SpriteCollab clone.
// - megas with sprites in SpriteCollab switch to their SpriteCollab index (sprites + portraits)
// - megas without sprites keep their placeholder sprites, but get the SpriteCollab portraits
// TexturePacker is not needed: frames are trimmed, deduplicated and packed here.
// A sparse clone is enough: tracker.json, credit_names.txt and the sprite/ and portrait/ folders of the megas.
// Run with: cd edit && npx tsx import-mega-sprites.ts <SpriteCollab path>, then npm run assetpack
import { XMLParser } from "fast-xml-parser"
import fs from "fs"
import { Jimp } from "jimp"
import path from "path"
import { MegaEvolutions, MegaPkms } from "../app/config/game/megas"
import {
  DEFAULT_POKEMON_ANIMATION_CONFIG,
  PokemonAnimations
} from "../app/public/src/game/components/pokemon-animations"
import { Emotion } from "../app/types"
import { AnimationType } from "../app/types/Animation"
import { PokemonTint, SpriteType } from "../app/types/enum/Game"
import { Pkm, PkmIndex } from "../app/types/enum/Pokemon"
import { isIn } from "../app/utils/array"

const SPRITECOLLAB = process.argv[2]
if (!SPRITECOLLAB || !fs.existsSync(`${SPRITECOLLAB}/tracker.json`)) {
  console.error("Usage: npx tsx import-mega-sprites.ts <SpriteCollab path>")
  process.exit(1)
}

const ASSETS = "../app/public/src/assets"
const SPRITES = `${ASSETS}/pokemons`
const PORTRAITS = `${ASSETS}/portraits`
const DURATIONS_JSON = `${SPRITES}/durations.json`
const DELAYS_JSON = "../app/types/delays.json"
const EMOTIONS_JSON =
  "../app/models/precomputed/emotions-per-pokemon-index.json"
const CREDITS_JSON = "../app/models/precomputed/credits.json"
const REPORT_JSON = "./mega-sprites-import.json"

// SpriteCollab form name of the megas that are not simply named "Mega"
const FormNameByMega: { [key in Pkm]?: string } = {
  MEGA_CHARIZARD_X: "Mega_X",
  MEGA_CHARIZARD_Y: "Mega_Y",
  MEGA_MEWTWO_X: "Mega_X",
  MEGA_MEWTWO_Y: "Mega_Y",
  MEGA_RAICHU_X: "Mega_X",
  MEGA_RAICHU_Y: "Mega_Y",
  MEGA_ABSOL_Z: "Mega_Z",
  MEGA_GARCHOMP_Z: "Mega_Z",
  MEGA_LUCARIO_Z: "Mega_Z"
}

// pokemons other than megas without art of their own: Litleo and Pyroar use recolored Shinx and Luxray
const PlaceholderPokemons: Pkm[] = [Pkm.LITLEO, Pkm.PYROAR]

// animations tried in order when the mega sprite lacks the one used by its template
const ANIMATION_FALLBACKS: Record<string, AnimationType[]> = {
  idle: [AnimationType.Idle],
  walk: [AnimationType.Walk, AnimationType.Idle],
  attack: [
    AnimationType.Attack,
    AnimationType.Strike,
    AnimationType.Swing,
    AnimationType.Slam,
    AnimationType.Shoot,
    AnimationType.Charge,
    AnimationType.Idle
  ],
  ability: [
    AnimationType.SpAttack,
    AnimationType.Shoot,
    AnimationType.Charge,
    AnimationType.Attack,
    AnimationType.Idle
  ],
  emote: [
    AnimationType.Pose,
    AnimationType.Shoot,
    AnimationType.Charge,
    AnimationType.Idle
  ],
  hop: [AnimationType.Hop, AnimationType.Walk],
  hurt: [AnimationType.Hurt, AnimationType.Idle],
  sleep: [AnimationType.Sleep, AnimationType.Idle],
  eat: [AnimationType.Eat, AnimationType.Idle]
}
const ANIMATION_KEYS = Object.keys(ANIMATION_FALLBACKS)

type TrackerCredits = { primary: string; secondary: string[]; total: number }
type TrackerEntry = {
  name: string
  subgroups: Record<string, TrackerEntry>
  portrait_files?: Record<string, boolean>
  portrait_credit: TrackerCredits
  sprite_credit: TrackerCredits
}
type Anim = {
  Name: string
  CopyOf?: string
  FrameWidth?: number
  FrameHeight?: number
  HitFrame?: number
  Durations?: { Duration: number | number[] }
}

const tracker: Record<string, TrackerEntry> = readJson(
  `${SPRITECOLLAB}/tracker.json`
)
const durations: Record<string, number[]> = readJson(DURATIONS_JSON)
const delays: Record<string, { d: number; t: number }> = readJson(DELAYS_JSON)
const emotions: Record<string, number[]> = readJson(EMOTIONS_JSON)
const credits: Record<string, unknown> = readJson(CREDITS_JSON)

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(file, "utf8"))
}

function findMegaForm(mega: Pkm, dex: string) {
  const forms = Object.entries(tracker[dex]?.subgroups ?? {})
  const wanted = FormNameByMega[mega] ?? "Mega"
  return forms.find(([_, f]) => f.name === wanted)
}

function readAnims(dir: string): Map<string, Anim> | null {
  const file = `${dir}/AnimData.xml`
  if (!fs.existsSync(file)) return null
  const xml = new XMLParser().parse(fs.readFileSync(file))
  const anims: Anim[] = [xml.AnimData.Anims.Anim].flat()
  const byName = new Map(anims.map((a) => [a.Name, a]))
  // resolve copies and keep only animations with an image
  const resolved = new Map<string, Anim>()
  for (const anim of anims) {
    const source = anim.CopyOf ? byName.get(anim.CopyOf) : anim
    if (source && fs.existsSync(`${dir}/${source.Name}-Anim.png`)) {
      resolved.set(anim.Name, source)
    }
  }
  return resolved
}

function shadowSize(dir: string): number {
  const xml = new XMLParser().parse(fs.readFileSync(`${dir}/AnimData.xml`))
  return Number(xml.AnimData.ShadowSize)
}

type Frame = { name: string; img: Awaited<ReturnType<typeof Jimp.read>> }

async function splitFrames(
  dir: string,
  tint: PokemonTint,
  actions: Set<AnimationType>,
  anims: Map<string, Anim>,
  index: string,
  frames: Frame[]
) {
  const shadow = shadowSize(dir)
  for (const action of actions) {
    const anim = anims.get(action)!
    const durationList = [anim.Durations!.Duration].flat()
    for (const type of Object.values(SpriteType)) {
      const file = `${dir}/${anim.Name}-${type}.png`
      if (!fs.existsSync(file)) continue
      durations[`${index}/${tint}/${action}/${type}`] = durationList
      const sheet = await Jimp.read(file)
      if (type === SpriteType.SHADOW) {
        // keep the shadow parts matching the shadow size, in black, like add-pokemon.ts does
        const data = sheet.bitmap.data
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
          const blue = r === 0 && g === 0 && b !== 0
          const red = r !== 0 && g === 0 && b === 0
          if ((shadow <= 1 && blue) || (shadow === 0 && red)) data[i + 3] = 0
          if (data[i + 3] !== 0) data[i] = data[i + 1] = data[i + 2] = 0
        }
      }
      const w = anim.FrameWidth!
      const h = anim.FrameHeight!
      for (let x = 0; x < sheet.width / w; x++) {
        for (let y = 0; y < sheet.height / h; y++) {
          const img = sheet.clone()
          img.crop({ x: x * w, y: y * h, w, h })
          const n = String(x).padStart(4, "0")
          frames.push({ name: `${tint}/${action}/${type}/${y}/${n}`, img })
        }
      }
    }
  }
}

// trims, deduplicates and packs frames on a single texture, in the phaser multiatlas format
async function packFrames(frames: Frame[], index: string) {
  type Rect = { x: number; y: number; w: number; h: number }
  const unique = new Map<string, { img: Frame["img"]; rect: Rect }>()
  const entries = frames.map(({ name, img }) => {
    const { width, height, data } = img.bitmap
    let [minX, minY, maxX, maxY] = [width, height, -1, -1]
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] === 0) continue
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
    const trim =
      maxX < 0
        ? { x: 0, y: 0, w: 1, h: 1 }
        : { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
    const cropped = img.clone()
    cropped.crop(trim)
    const key = `${trim.w}x${trim.h}:${Buffer.from(cropped.bitmap.data).toString("base64")}`
    if (!unique.has(key)) {
      unique.set(key, {
        img: cropped,
        rect: { x: 0, y: 0, w: trim.w, h: trim.h }
      })
    }
    return { name, width, height, trim, key }
  })

  // shelf packing, tallest first
  const items = [...unique.values()].sort((a, b) => b.rect.h - a.rect.h)
  const area = items.reduce(
    (sum, i) => sum + (i.rect.w + 1) * (i.rect.h + 1),
    0
  )
  const maxWidth = Math.max(...items.map((i) => i.rect.w + 2))
  const sheetWidth = Math.max(maxWidth, Math.ceil(Math.sqrt(area) * 1.15))
  let [x, y, shelfHeight] = [1, 1, 0]
  for (const item of items) {
    if (x + item.rect.w + 1 > sheetWidth) {
      x = 1
      y += shelfHeight + 1
      shelfHeight = 0
    }
    item.rect.x = x
    item.rect.y = y
    x += item.rect.w + 1
    shelfHeight = Math.max(shelfHeight, item.rect.h)
  }
  const sheetHeight = y + shelfHeight + 1

  const texture = new Jimp({ width: sheetWidth, height: sheetHeight })
  for (const item of items)
    texture.composite(item.img, item.rect.x, item.rect.y)
  await texture.write(`${SPRITES}/${index}.png`)

  const json = {
    textures: [
      {
        image: `${index}.png`,
        format: "RGBA8888",
        size: { w: sheetWidth, h: sheetHeight },
        scale: 1,
        frames: entries.map(({ name, width, height, trim, key }) => ({
          filename: name,
          rotated: false,
          trimmed: true,
          sourceSize: { w: width, h: height },
          spriteSourceSize: trim,
          frame: unique.get(key)!.rect
        }))
      }
    ]
  }
  fs.writeFileSync(`${SPRITES}/${index}.json`, JSON.stringify(json))
}

function copyPortraits(fromDir: string, toDir: string) {
  fs.mkdirSync(toDir, { recursive: true })
  for (const file of fs.readdirSync(toDir)) {
    if (file.endsWith(".png")) fs.rmSync(`${toDir}/${file}`)
  }
  for (const file of fs.readdirSync(fromDir)) {
    if (file.endsWith(".png") || file === "credits.txt") {
      fs.copyFileSync(`${fromDir}/${file}`, `${toDir}/${file}`)
    }
  }
}

function emotionsOf(entry: TrackerEntry) {
  return Object.values(Emotion).map((e) =>
    e in (entry.portrait_files ?? {}) ? 1 : 0
  )
}

// shiny art is in a subfolder: 0000/0001 for base forms like "0667", 0001 for forms like "0006/0001"
function shinyPath(collabPath: string) {
  return collabPath.includes("/") ? "0001" : "0000/0001"
}

function shinyEntryOf(entry: TrackerEntry, collabPath: string) {
  return shinyPath(collabPath)
    .split("/")
    .reduce<TrackerEntry | undefined>((e, key) => e?.subgroups?.[key], entry)
}

// portraits of the SpriteCollab form, given to the pokemon index; shiny portraits fall back to the normal ones
function importPortraits(
  collabPath: string,
  entry: TrackerEntry,
  index: string,
  spriteCredit: unknown
) {
  const fromDir = `${SPRITECOLLAB}/portrait/${collabPath}`
  if (!fs.existsSync(`${fromDir}/Normal.png`)) return false
  const toDir = `${PORTRAITS}/${index.replace("-", "/")}`
  copyPortraits(fromDir, toDir)
  const shiny = shinyPath(collabPath)
  const shinyEntry = shinyEntryOf(entry, collabPath)
  const shinyFromDir = fs.existsSync(`${fromDir}/${shiny}/Normal.png`)
    ? `${fromDir}/${shiny}`
    : fromDir
  copyPortraits(shinyFromDir, `${toDir}/${shiny}`)
  emotions[index] = emotionsOf(entry)
  emotions[`${index}-${shiny.replace("/", "-")}`] =
    shinyFromDir === fromDir || !shinyEntry
      ? emotionsOf(entry)
      : emotionsOf(shinyEntry)
  credits[index] = {
    portrait_credit: entry.portrait_credit,
    sprite_credit: spriteCredit
  }
  return true
}

type ImportResult = {
  index: string
  sprites: boolean
  portraits: boolean
  animationOverrides?: Record<string, unknown>
}

// imports the art at collabPath (like "0006/0001" or "0667") for the pokemon currently using placeholder art at currentIndex
async function importArt(
  pkm: Pkm,
  collabPath: string,
  entry: TrackerEntry,
  currentIndex: string
): Promise<ImportResult> {
  const realIndex = collabPath.replace("/", "-")
  const spriteDir = `${SPRITECOLLAB}/sprite/${collabPath}`
  const anims = readAnims(spriteDir)
  const conf = {
    ...DEFAULT_POKEMON_ANIMATION_CONFIG,
    ...PokemonAnimations[pkm]
  }

  // pick the animation for each use, falling back when the sprite lacks the one of the config
  const overrides: Record<string, unknown> = {}
  const actions = new Set<AnimationType>()
  let hasSprites = anims !== null && anims.has(AnimationType.Idle)
  if (anims && hasSprites) {
    for (const key of ANIMATION_KEYS) {
      const wanted = conf[key] as AnimationType
      const action = [wanted, ...ANIMATION_FALLBACKS[key]].find((a) =>
        anims.has(a)
      )
      if (!action) {
        hasSprites = false
        break
      }
      if (action !== wanted) overrides[key] = action
      actions.add(action)
    }
    // a sprite attacking with its idle animation looks broken: keep the placeholder instead
    if (overrides.attack === AnimationType.Idle) hasSprites = false
  }

  if (!hasSprites || !anims) {
    // keep the placeholder sprite, only replace its portraits
    const portraits = importPortraits(
      collabPath,
      entry,
      currentIndex,
      (credits[currentIndex] as { sprite_credit?: unknown })?.sprite_credit
    )
    console.log(`${pkm}: portraits ${portraits ? "imported" : "missing"}`)
    return { index: currentIndex, sprites: false, portraits }
  }

  const shinyDir = `${spriteDir}/${shinyPath(collabPath)}`
  const shinyAnims = readAnims(shinyDir)
  const hasShiny =
    shinyAnims !== null && [...actions].every((a) => shinyAnims.has(a))
  if (!hasShiny) overrides.shinyUnavailable = true

  const frames: Frame[] = []
  await splitFrames(
    spriteDir,
    PokemonTint.NORMAL,
    actions,
    anims,
    realIndex,
    frames
  )
  if (shinyAnims && hasShiny) {
    await splitFrames(
      shinyDir,
      PokemonTint.SHINY,
      actions,
      shinyAnims,
      realIndex,
      frames
    )
  }
  await packFrames(frames, realIndex)

  const attack = anims.get((overrides.attack as AnimationType) ?? conf.attack)!
  const attackDurations = [attack.Durations!.Duration].flat()
  delays[realIndex] = {
    d: attackDurations.slice(0, attack.HitFrame).reduce((a, b) => a + b, 0),
    t: attackDurations.reduce((a, b) => a + b, 0)
  }

  const portraits = importPortraits(
    collabPath,
    entry,
    realIndex,
    entry.sprite_credit
  )

  // remove the placeholder art that is replaced
  if (currentIndex !== realIndex) {
    for (const ext of ["json", "png"]) {
      fs.rmSync(`${SPRITES}/${currentIndex}.${ext}`, { force: true })
    }
    const placeholderPortraits = `${PORTRAITS}/${currentIndex.replace("-", "/")}`
    if (portraits) {
      fs.rmSync(placeholderPortraits, { recursive: true, force: true })
    } else {
      // no complete portraits in SpriteCollab: keep the placeholder ones
      fs.renameSync(
        placeholderPortraits,
        `${PORTRAITS}/${realIndex.replace("-", "/")}`
      )
      emotions[realIndex] = emotions[currentIndex]
      emotions[`${realIndex}-0001`] = emotions[`${currentIndex}-0001`]
      credits[realIndex] = {
        ...(credits[currentIndex] as object),
        sprite_credit: entry.sprite_credit
      }
    }
    for (const key of Object.keys(durations)) {
      if (key.startsWith(`${currentIndex}/`)) delete durations[key]
    }
    delete delays[currentIndex]
    delete emotions[currentIndex]
    delete emotions[`${currentIndex}-0001`]
    delete credits[currentIndex]
  } else if (!portraits) {
    credits[realIndex] = {
      ...(credits[realIndex] as object),
      sprite_credit: entry.sprite_credit
    }
  }

  console.log(
    `${pkm}: sprites ${realIndex} (${frames.length} frames${hasShiny ? "" : ", no shiny"})`
  )
  return {
    index: realIndex,
    sprites: true,
    portraits,
    animationOverrides: Object.keys(overrides).length ? overrides : undefined
  }
}

async function main() {
  const report: Record<string, ImportResult> = {}

  for (const mega of MegaEvolutions) {
    const currentIndex = PkmIndex[mega.mega]
    // only placeholders (9xxx forms) are replaced, megas like Mega Sableye already have their art
    if (!isIn(MegaPkms, mega.mega) || !/-9\d{3}$/.test(currentIndex)) continue
    const dex = currentIndex.slice(0, 4)
    const found = findMegaForm(mega.mega, dex)
    if (!found) {
      console.warn(`${mega.mega}: no mega form in SpriteCollab`)
      continue
    }
    const [form, entry] = found
    report[mega.mega] = await importArt(
      mega.mega,
      `${dex}/${form}`,
      entry,
      currentIndex
    )
  }

  // pokemons other than megas that use placeholder art (see gen/generate-mega-assets.ts)
  for (const pkm of PlaceholderPokemons) {
    const index = PkmIndex[pkm]
    report[pkm] = await importArt(pkm, index, tracker[index], index)
  }

  fs.writeFileSync(DURATIONS_JSON, JSON.stringify(durations))
  fs.writeFileSync(DELAYS_JSON, JSON.stringify(delays))
  fs.writeFileSync(EMOTIONS_JSON, JSON.stringify(emotions))
  fs.writeFileSync(CREDITS_JSON, JSON.stringify(credits))
  fs.writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2))
  console.log(`Report written to ${path.resolve(REPORT_JSON)}`)
}

main()
