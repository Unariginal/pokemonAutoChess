import assert from "node:assert/strict"
import test from "node:test"
import Player from "../models/colyseus-models/player"
import GameState from "../rooms/states/game-state"
import { Role } from "../types"
import { DebugAction, type DebugMessage } from "../types/enum/DebugAction"
import { GameMode } from "../types/enum/Game"
import { Item } from "../types/enum/Item"
import { Pkm } from "../types/enum/Pokemon"
import { Synergy } from "../types/enum/Synergy"
import { schemaValues } from "../utils/schemas"
import {
  applyUserStatChanges,
  canUseDebugTools,
  type DebugRoom,
  executeDebugAction,
  getPkmAtStars,
  parseDebugAllowlist,
  sanitizeUserStatChanges
} from "./debug-tools"

function setup() {
  const state = new GameState(
    "prep",
    "test",
    true,
    GameMode.MEGA_MADNESS,
    null,
    null,
    null
  )
  const player = new Player(
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
  state.players.set(player.id, player)
  const room = {
    state,
    metadata: {} as unknown,
    setMetadata(metadata: unknown) {
      room.metadata = metadata
    },
    checkEvolutionsAfterPokemonAcquired: () => false
  }
  return { room: room as unknown as DebugRoom, player, state }
}

test("debug tools are allowed for admins and allowlisted accounts only", () => {
  const allowlist = parseDebugAllowlist(" uid-123 , Owner@Example.com,, ")
  assert.equal(canUseDebugTools({ role: Role.ADMIN }, new Set()), true)
  assert.equal(
    canUseDebugTools({ role: Role.BASIC, uid: "uid-123" }, allowlist),
    true
  )
  assert.equal(
    canUseDebugTools(
      { role: Role.BASIC, uid: "x", email: "owner@example.com" },
      allowlist
    ),
    true
  )
  for (const role of [Role.BASIC, Role.MODERATOR, Role.BOT, Role.BOT_MANAGER]) {
    assert.equal(
      canUseDebugTools({ role, uid: "other", email: "a@b.c" }, allowlist),
      false
    )
  }
  assert.equal(
    canUseDebugTools({ uid: "", email: "" }, parseDebugAllowlist("")),
    false
  )
  assert.equal(parseDebugAllowlist(undefined).size, 0)
})

test("give gold and items, including mega madness items", () => {
  const { room, player } = setup()
  player.money = 5
  assert.ok(
    executeDebugAction(room, player, {
      action: DebugAction.GIVE_GOLD,
      amount: 95
    })
  )
  assert.equal(player.money, 100)
  executeDebugAction(room, player, {
    action: DebugAction.GIVE_GOLD,
    amount: -500
  })
  assert.equal(player.money, 0)

  for (const item of [
    Item.KEY_STONE,
    Item.BLAZE_MEGA_SHARD,
    Item.CHARIZARDITE_X
  ]) {
    assert.ok(
      executeDebugAction(room, player, { action: DebugAction.GIVE_ITEM, item })
    )
    assert.ok(player.items.includes(item))
  }
  assert.equal(
    executeDebugAction(room, player, {
      action: DebugAction.GIVE_ITEM,
      item: "NOT_AN_ITEM"
    } as unknown as DebugMessage),
    false
  )
})

test("spawn a pokemon on the bench at the chosen star level", () => {
  const { room, player } = setup()
  assert.equal(getPkmAtStars(Pkm.CHARMANDER, 3), Pkm.CHARIZARD)
  assert.ok(
    executeDebugAction(room, player, {
      action: DebugAction.SPAWN_POKEMON,
      pkm: Pkm.CHARMANDER,
      stars: 2
    })
  )
  const spawned = schemaValues(player.board)
  assert.equal(spawned.length, 1)
  assert.equal(spawned[0].name, Pkm.CHARMELEON)
  assert.equal(spawned[0].positionY, 0)
  assert.equal(
    executeDebugAction(room, player, {
      action: DebugAction.SPAWN_POKEMON,
      pkm: Pkm.DEFAULT,
      stars: 1
    }),
    false
  )
})

test("set level, fill shop, set stage, set life and add synergy", () => {
  const { room, player, state } = setup()
  executeDebugAction(room, player, { action: DebugAction.SET_LEVEL, level: 7 })
  assert.equal(player.experienceManager.level, 7)
  executeDebugAction(room, player, { action: DebugAction.SET_LEVEL, level: 99 })
  assert.equal(
    player.experienceManager.level,
    player.experienceManager.maxLevel
  )

  state.shop.assignShop(player, true, state)
  executeDebugAction(room, player, {
    action: DebugAction.FILL_SHOP,
    pkm: Pkm.DRATINI
  })
  assert.ok(player.shop.length > 0)
  assert.ok(player.shop.every((p) => p === Pkm.DRATINI))

  executeDebugAction(room, player, { action: DebugAction.SET_STAGE, stage: 20 })
  assert.equal(state.stageLevel, 20)
  assert.equal((room.metadata as { stageLevel: number }).stageLevel, 20)

  executeDebugAction(room, player, { action: DebugAction.SET_LIFE, life: 0 })
  assert.equal(player.life, 1)

  executeDebugAction(room, player, {
    action: DebugAction.ADD_SYNERGY,
    synergy: Synergy.FIRE,
    delta: 3
  })
  assert.equal(player.synergies.get(Synergy.FIRE), 3)
})

test("user stat changes are validated, clamped and applied", () => {
  const changes = sanitizeUserStatChanges({
    level: 12.6,
    elo: 99999,
    booster: -5,
    exp: 5000,
    wins: "10",
    role: "ADMIN",
    games: Number.NaN
  })
  assert.deepEqual(changes, { level: 13, elo: 5000, booster: 0, exp: 999 })
  assert.deepEqual(sanitizeUserStatChanges(null), {})

  const user = {
    level: 1,
    exp: 0,
    elo: 1000,
    maxElo: 1200,
    booster: 2,
    wins: 0,
    games: 0,
    eventPoints: 0
  }
  applyUserStatChanges(user, { elo: 1500, booster: 10 })
  assert.equal(user.elo, 1500)
  assert.equal(user.maxElo, 1500)
  assert.equal(user.booster, 10)
  applyUserStatChanges(user, { elo: 900 })
  assert.equal(user.maxElo, 1500)
  applyUserStatChanges(user, { elo: 1100, maxElo: 1100 })
  assert.equal(user.maxElo, 1100)
})
