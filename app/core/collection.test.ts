import assert from "node:assert/strict"
import test from "node:test"
import { Emotion } from "../types"
import type { IPokemonCollectionItemMongo } from "../types/interfaces/UserMetadata"
import { CollectionUtils } from "./collection"

function createItem(
  emotions: Emotion[],
  shinyEmotions: Emotion[],
  selectedEmotion: Emotion | null = Emotion.NORMAL,
  selectedShiny = false
): IPokemonCollectionItemMongo {
  const unlocked = Buffer.alloc(5, 0)
  emotions.forEach((e) => CollectionUtils.unlockEmotion(unlocked, e, false))
  shinyEmotions.forEach((e) => CollectionUtils.unlockEmotion(unlocked, e, true))
  return {
    id: "0001",
    unlocked,
    dust: 0,
    played: 0,
    selectedEmotion,
    selectedShiny
  }
}

test("rarest emotion is the most expensive one", () => {
  const item = createItem([Emotion.NORMAL, Emotion.HAPPY, Emotion.SIGH], [])
  assert.deepEqual(CollectionUtils.getRarestEmotion(item), {
    emotion: Emotion.SIGH,
    shiny: false
  })
})

test("rarest emotion prioritizes shiny over more expensive normal ones", () => {
  const item = createItem([Emotion.SIGH], [Emotion.NORMAL])
  assert.deepEqual(CollectionUtils.getRarestEmotion(item), {
    emotion: Emotion.NORMAL,
    shiny: true
  })
})

test("rarest emotion keeps the current selection when tied", () => {
  const item = createItem(
    [Emotion.SPECIAL0, Emotion.SIGH],
    [],
    Emotion.SIGH,
    false
  )
  assert.deepEqual(CollectionUtils.getRarestEmotion(item), {
    emotion: Emotion.SIGH,
    shiny: false
  })
})

test("no rarest emotion when nothing is unlocked", () => {
  assert.equal(CollectionUtils.getRarestEmotion(createItem([], [])), null)
  assert.equal(
    CollectionUtils.getRarestEmotion({
      id: "0001"
    } as IPokemonCollectionItemMongo),
    null
  )
})
