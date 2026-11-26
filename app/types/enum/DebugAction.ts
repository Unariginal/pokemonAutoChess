import type { Item } from "./Item"
import type { Pkm } from "./Pokemon"
import type { Synergy } from "./Synergy"

// Admin/debug tools for testing in a live game, see app/core/debug-tools.ts
export enum DebugAction {
  GIVE_GOLD = "GIVE_GOLD",
  GIVE_ITEM = "GIVE_ITEM",
  SPAWN_POKEMON = "SPAWN_POKEMON",
  SET_LEVEL = "SET_LEVEL",
  ADD_XP = "ADD_XP",
  REROLL_SHOP = "REROLL_SHOP",
  FILL_SHOP = "FILL_SHOP",
  SET_STAGE = "SET_STAGE",
  END_PHASE = "END_PHASE",
  SET_LIFE = "SET_LIFE",
  ADD_SYNERGY = "ADD_SYNERGY"
}

export type DebugMessage =
  | { action: DebugAction.GIVE_GOLD; amount: number }
  | { action: DebugAction.GIVE_ITEM; item: Item; quantity?: number }
  | { action: DebugAction.SPAWN_POKEMON; pkm: Pkm; stars: number }
  | { action: DebugAction.SET_LEVEL; level: number }
  | { action: DebugAction.ADD_XP; amount: number }
  | { action: DebugAction.REROLL_SHOP }
  | { action: DebugAction.FILL_SHOP; pkm: Pkm }
  | { action: DebugAction.SET_STAGE; stage: number }
  | { action: DebugAction.END_PHASE }
  | { action: DebugAction.SET_LIFE; life: number }
  | { action: DebugAction.ADD_SYNERGY; synergy: Synergy; delta: number }

// account stats an admin can edit from a player's profile, outside of games
export const EditableUserStats = [
  "level",
  "exp",
  "elo",
  "maxElo",
  "booster",
  "wins",
  "games",
  "eventPoints"
] as const
export type EditableUserStat = (typeof EditableUserStats)[number]
export type UserStatChanges = Partial<Record<EditableUserStat, number>>
