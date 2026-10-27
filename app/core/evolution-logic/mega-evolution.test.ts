import assert from "node:assert/strict"
import test from "node:test"
import {
  MEGA_MADNESS_SILK_SCARVES_PER_CAROUSEL,
  MEGA_STARS,
  MegaCraftingItems,
  MegaEvolutions,
  MegaItemRecipe,
  MegaMadnessKeyStoneTownStages,
  MegaMadnessSilkScarfCarouselStages,
  MegaPkms,
  MegaStatBoosts,
  MegaStones,
  MegaTemplateByPkm
} from "../../config/game/megas"
import Player from "../../models/colyseus-models/player"
import { PokemonClasses } from "../../models/colyseus-models/pokemon"
import PokemonFactory from "../../models/pokemon-factory"
import { getPokemonData } from "../../models/precomputed/precomputed-pokemon-data"
import { getSellPrice } from "../../models/shop"
import type GameRoom from "../../rooms/game-room"
import GameState from "../../rooms/states/game-state"
import { Role } from "../../types"
import { Ability } from "../../types/enum/Ability"
import { GameMode } from "../../types/enum/Game"
import { Item, ItemComponents, ItemRecipe } from "../../types/enum/Item"
import { Pkm, PkmIndex } from "../../types/enum/Pokemon"
import { TownEncounters } from "../../types/enum/TownEncounter"
import { MiniGame } from "../mini-game"
import { tryMegaEvolve } from "./mega-evolution"

function createPlayer() {
  const state = new GameState(
    "prep",
    "test",
    true,
    GameMode.MEGA_MADNESS,
    null,
    null,
    null
  )
  return new Player(
    "player",
    "Player",
    1000,
    0,
    "0006/Normal",
    false,
    1,
    new Map(),
    "",
    Role.BASIC,
    state
  )
}

test("every mega stone has a unique recipe made of combinable items", () => {
  const seen = new Set<string>()
  for (const stone of MegaStones) {
    const recipe = MegaItemRecipe[stone]
    assert.ok(recipe, `${stone} has no recipe`)
    assert.ok(
      MegaCraftingItems.includes(recipe[0]),
      `${stone} first ingredient`
    )
    assert.ok(ItemComponents.includes(recipe[1]), `${stone} second ingredient`)
    const key = [...recipe].sort().join("+")
    assert.ok(!seen.has(key), `duplicate recipe ${key}`)
    seen.add(key)
  }
  // mega items must not leak into the regular crafting recipes
  for (const item of [...MegaStones, ...MegaCraftingItems]) {
    assert.equal(item in ItemRecipe, false, `${item} is in ItemRecipe`)
  }
})

test("every mega has a class, a unique index and the ability of its template", () => {
  const indexes = new Set<string>()
  for (const mega of MegaEvolutions) {
    assert.ok(PokemonClasses[mega.mega], `${mega.mega} has no class`)
    const pokemon = PokemonFactory.createPokemonFromName(mega.mega)
    assert.notEqual(
      pokemon.skill,
      Ability.DEFAULT,
      `${mega.mega} has no ability`
    )
    assert.equal(pokemon.evolution, Pkm.DEFAULT)
    assert.ok(!indexes.has(PkmIndex[mega.mega]), `${mega.mega} index collision`)
    indexes.add(PkmIndex[mega.mega])
    for (const base of mega.bases) {
      assert.notEqual(getPokemonData(base).skill, Ability.DEFAULT, `${base}`)
    }
  }
})

test("a mega stone makes the matching pokemon mega evolve and stays held", () => {
  const player = createPlayer()
  const charizard = PokemonFactory.createPokemonFromName(Pkm.CHARIZARD)
  charizard.positionX = 3
  charizard.positionY = 2
  player.board.set(charizard.id, charizard)
  player.items.push(Item.CHARIZARDITE_X)

  const mega = tryMegaEvolve(charizard, player, Item.CHARIZARDITE_X)

  assert.ok(mega)
  assert.equal(mega.name, Pkm.MEGA_CHARIZARD_X)
  assert.equal(player.board.has(charizard.id), false)
  assert.equal(player.board.get(mega.id)?.positionX, 3)
  assert.equal(player.items.includes(Item.CHARIZARDITE_X), false)
  assert.equal(mega.items.has(Item.CHARIZARDITE_X), true)
  assert.ok(mega.hp > charizard.hp)
})

test("a mega stone can't be given to a pokemon with no free item slot", () => {
  const player = createPlayer()
  const charizard = PokemonFactory.createPokemonFromName(Pkm.CHARIZARD)
  charizard.items.add(Item.CHARCOAL)
  charizard.items.add(Item.MAGNET)
  charizard.items.add(Item.MYSTIC_WATER)
  player.board.set(charizard.id, charizard)
  player.items.push(Item.CHARIZARDITE_Y)

  assert.equal(tryMegaEvolve(charizard, player, Item.CHARIZARDITE_Y), null)
  assert.equal(player.items.includes(Item.CHARIZARDITE_Y), true)
})

test("a mega stone does nothing on a pokemon that doesn't match", () => {
  const player = createPlayer()
  const blastoise = PokemonFactory.createPokemonFromName(Pkm.BLASTOISE)
  player.board.set(blastoise.id, blastoise)
  player.items.push(Item.CHARIZARDITE_Y)

  assert.equal(tryMegaEvolve(blastoise, player, Item.CHARIZARDITE_Y), null)
  assert.equal(player.board.has(blastoise.id), true)
  assert.equal(player.items.includes(Item.CHARIZARDITE_Y), true)
})

test("Lucario's town carousel is mostly Key Stones with a few components", () => {
  for (const stageLevel of MegaMadnessKeyStoneTownStages) {
    const miniGame = new MiniGame({} as GameRoom)
    miniGame.alivePlayers = Array.from({ length: 8 }, () => createPlayer())
    const state = new GameState(
      "prep",
      "test",
      true,
      GameMode.MEGA_MADNESS,
      null,
      null,
      null
    )
    state.stageLevel = stageLevel
    state.townEncounter = TownEncounters.LUCARIO
    const items = miniGame.pickRandomItems(state)
    const keyStones = items.filter((i) => i === Item.KEY_STONE).length
    assert.equal(keyStones, 8)
    assert.ok(keyStones > items.length / 2)
    for (const item of items) {
      assert.ok(item === Item.KEY_STONE || ItemComponents.includes(item), item)
    }
  }
})

test("Mega Madness carousels of some stages may offer Silk Scarves", () => {
  for (const stageLevel of [4, 12, 17, 22]) {
    const miniGame = new MiniGame({} as GameRoom)
    miniGame.alivePlayers = Array.from({ length: 8 }, () => createPlayer())
    for (const gameMode of [GameMode.MEGA_MADNESS, GameMode.CLASSIC]) {
      const canHaveScarves =
        gameMode === GameMode.MEGA_MADNESS &&
        MegaMadnessSilkScarfCarouselStages.includes(stageLevel)
      const counts = new Set<number>()
      for (let run = 0; run < 50; run++) {
        const state = new GameState(
          "prep",
          "test",
          true,
          gameMode,
          null,
          null,
          null
        )
        state.stageLevel = stageLevel
        counts.add(
          miniGame.pickRandomItems(state).filter((i) => i === Item.SILK_SCARF)
            .length
        )
      }
      assert.deepEqual(
        [...counts].sort(),
        canHaveScarves ? [0, MEGA_MADNESS_SILK_SCARVES_PER_CAROUSEL] : [0],
        `${gameMode} stage ${stageLevel}`
      )
    }
  }
})

test("megas get the mega stat boosts over their template", () => {
  const template = PokemonFactory.createPokemonFromName(Pkm.CHARIZARD)
  const mega = PokemonFactory.createPokemonFromName(Pkm.MEGA_CHARIZARD_X)
  assert.equal(
    mega.hp,
    Math.round(template.hp * (1 + MegaStatBoosts.hpPercent / 100))
  )
  assert.equal(
    mega.atk,
    Math.round(template.atk * (1 + MegaStatBoosts.atkPercent / 100))
  )
  assert.equal(mega.def, template.def + MegaStatBoosts.def)
  assert.equal(mega.speDef, template.speDef + MegaStatBoosts.speDef)
  assert.equal(mega.speed, template.speed + MegaStatBoosts.speed)
  assert.equal(mega.ap, template.ap + MegaStatBoosts.ap)
})

test("megas use their max ability tier but sell like their template", () => {
  for (const pkm of MegaPkms) {
    const mega = PokemonFactory.createPokemonFromName(pkm)
    assert.equal(mega.stars, MEGA_STARS, pkm)
    const template = PokemonFactory.createPokemonFromName(
      MegaTemplateByPkm[pkm]!
    )
    assert.equal(getSellPrice(mega), getSellPrice(template), pkm)
  }
})

test("pokemons with several forms can all mega evolve", () => {
  for (const base of [Pkm.MEOWSTIC_MALE, Pkm.MEOWSTIC_FEMALE]) {
    const player = createPlayer()
    const meowstic = PokemonFactory.createPokemonFromName(base)
    player.board.set(meowstic.id, meowstic)
    player.items.push(Item.MEOWSTICITE)
    assert.equal(
      tryMegaEvolve(meowstic, player, Item.MEOWSTICITE)?.name,
      Pkm.MEGA_MEOWSTIC
    )
  }
})
