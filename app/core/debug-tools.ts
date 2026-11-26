import { ExpTable, ExpThreshold } from "../config"
import type Player from "../models/colyseus-models/player"
import PokemonFactory from "../models/pokemon-factory"
import { getPokemonData } from "../models/precomputed/precomputed-pokemon-data"
import type GameRoom from "../rooms/game-room"
import { Role } from "../types"
import {
  DebugAction,
  type DebugMessage,
  type EditableUserStat,
  EditableUserStats,
  type UserStatChanges
} from "../types/enum/DebugAction"
import { Item } from "../types/enum/Item"
import { Pkm } from "../types/enum/Pokemon"
import { Synergy } from "../types/enum/Synergy"
import { isIn } from "../utils/array"
import { getFirstAvailablePositionInBench } from "../utils/board"
import { clamp } from "../utils/number"

/*
Debug tools are allowed for accounts with the ADMIN role (set in the user metadata collection),
and for the Firebase uids or emails listed in the DEBUG_TOOLS_ALLOWLIST env var (comma separated).
*/
export function parseDebugAllowlist(
  raw: string | undefined = process.env.DEBUG_TOOLS_ALLOWLIST
): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0)
  )
}

export function canUseDebugTools(
  user: { role?: Role | null; uid?: string | null; email?: string | null },
  allowlist: Set<string> = parseDebugAllowlist()
): boolean {
  if (user.role === Role.ADMIN) return true
  if (user.uid && allowlist.has(user.uid.toLowerCase())) return true
  if (user.email && allowlist.has(user.email.toLowerCase())) return true
  return false
}

export type DebugRoom = Pick<
  GameRoom,
  "state" | "metadata" | "setMetadata" | "checkEvolutionsAfterPokemonAcquired"
>

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value)

const isValidPkm = (pkm: unknown): pkm is Pkm =>
  typeof pkm === "string" &&
  pkm !== Pkm.DEFAULT &&
  isIn(Object.values(Pkm), pkm)

// follow the evolution line from the given pokemon until it reaches the wanted star level
export function getPkmAtStars(pkm: Pkm, stars: number): Pkm {
  let name = pkm
  for (let i = 0; i < 4; i++) {
    const data = getPokemonData(name)
    if (data.stars >= stars) break
    const next = data.evolution ?? data.evolutions?.[0]
    if (!next || next === Pkm.DEFAULT) break
    name = next
  }
  return name
}

// returns true if the action was applied
export function executeDebugAction(
  room: DebugRoom,
  player: Player,
  message: DebugMessage
): boolean {
  const state = room.state
  switch (message?.action) {
    case DebugAction.GIVE_GOLD: {
      if (!isFiniteNumber(message.amount)) return false
      player.money = clamp(player.money + Math.round(message.amount), 0, 65535)
      return true
    }
    case DebugAction.GIVE_ITEM: {
      if (!isIn(Object.values(Item), message.item)) return false
      const quantity = clamp(Math.round(message.quantity ?? 1) || 1, 1, 10)
      for (let i = 0; i < quantity; i++) player.items.push(message.item)
      return true
    }
    case DebugAction.SPAWN_POKEMON: {
      if (!isValidPkm(message.pkm) || !isFiniteNumber(message.stars))
        return false
      const x = getFirstAvailablePositionInBench(player.board)
      if (x === null) return false
      const name = getPkmAtStars(message.pkm, clamp(message.stars, 1, 4))
      const pokemon = PokemonFactory.createPokemonFromName(name, player)
      pokemon.positionX = x
      pokemon.positionY = 0
      player.board.set(pokemon.id, pokemon)
      pokemon.onAcquired(player)
      room.checkEvolutionsAfterPokemonAcquired(player.id)
      return true
    }
    case DebugAction.SET_LEVEL: {
      if (!isFiniteNumber(message.level)) return false
      const xp = player.experienceManager
      xp.level = clamp(Math.round(message.level), 1, xp.maxLevel)
      xp.experience = 0
      xp.expNeeded = ExpTable[xp.level] ?? 255
      return true
    }
    case DebugAction.ADD_XP: {
      if (!isFiniteNumber(message.amount) || message.amount <= 0) return false
      player.addExperience(clamp(Math.round(message.amount), 1, 255))
      return true
    }
    case DebugAction.REROLL_SHOP: {
      state.shop.assignShop(player, true, state)
      return true
    }
    case DebugAction.FILL_SHOP: {
      if (!isValidPkm(message.pkm)) return false
      for (let i = 0; i < player.shop.length; i++) {
        player.shop[i] = message.pkm
      }
      return true
    }
    case DebugAction.SET_STAGE: {
      if (!isFiniteNumber(message.stage)) return false
      state.stageLevel = clamp(Math.round(message.stage), 0, 255)
      room.setMetadata({ ...room.metadata, stageLevel: state.stageLevel })
      return true
    }
    case DebugAction.END_PHASE: {
      state.time = 0
      return true
    }
    case DebugAction.SET_LIFE: {
      if (!isFiniteNumber(message.life)) return false
      player.life = clamp(Math.round(message.life), 1, 999)
      return true
    }
    case DebugAction.ADD_SYNERGY: {
      if (
        !isIn(Object.values(Synergy), message.synergy) ||
        !isFiniteNumber(message.delta)
      )
        return false
      const value =
        (player.bonusSynergies.get(message.synergy) ?? 0) +
        Math.round(message.delta)
      player.bonusSynergies.set(message.synergy, clamp(value, 0, 20))
      player.updateSynergies()
      return true
    }
    default:
      return false
  }
}

const UserStatBounds: Record<EditableUserStat, [number, number]> = {
  level: [0, 10000],
  exp: [0, ExpThreshold - 1],
  elo: [0, 5000],
  maxElo: [0, 5000],
  booster: [0, 100000],
  wins: [0, 1000000],
  games: [0, 1000000],
  eventPoints: [0, 1000000]
}

// keeps only known stats with finite values, rounded and clamped to sane bounds
export function sanitizeUserStatChanges(changes: unknown): UserStatChanges {
  const sanitized: UserStatChanges = {}
  if (!changes || typeof changes !== "object") return sanitized
  for (const stat of EditableUserStats) {
    const value = (changes as Record<string, unknown>)[stat]
    if (!isFiniteNumber(value)) continue
    const [lower, upper] = UserStatBounds[stat]
    sanitized[stat] = clamp(Math.round(value), lower, upper)
  }
  return sanitized
}

export function applyUserStatChanges(
  user: Record<EditableUserStat, number>,
  changes: UserStatChanges
) {
  for (const stat of EditableUserStats) {
    const value = changes[stat]
    if (value !== undefined) user[stat] = value
  }
  if (changes.elo !== undefined && changes.maxElo === undefined) {
    user.maxElo = Math.max(user.maxElo ?? 0, changes.elo)
  }
}
