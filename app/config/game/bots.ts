import { BotDifficulty } from "../../types/enum/Game"

// empty lobby slots are filled with bots when a game starts.
// In lobbies without an owner, the game auto-starts this many seconds after the last player joined
export const AUTO_FILL_BOTS = true
export const AUTO_FILL_BOTS_DELAY_IN_SECONDS = 60

export const BotDifficultiesEloCaps = [850, 1000, 1150, 1300, 1450]
export const BotDifficulties = [
  BotDifficulty.BEGINNER,
  BotDifficulty.EASY,
  BotDifficulty.MEDIUM,
  BotDifficulty.HARD,
  BotDifficulty.EXTREME,
  BotDifficulty.MASTER
]

export function getBotDifficultyByElo(elo: number): BotDifficulty {
  for (let i = 0; i < BotDifficultiesEloCaps.length; i++) {
    if (elo < BotDifficultiesEloCaps[i]) {
      return BotDifficulties[i]
    }
  }
  return BotDifficulties[BotDifficulties.length - 1]
}

export function getEloRangeByBotDifficulty(
  difficulty: BotDifficulty
): [number, number | undefined] {
  const index = BotDifficulties.indexOf(difficulty)
  if (index === -1) {
    throw new Error(`Invalid bot difficulty: ${difficulty}`)
  }
  const minElo = index === 0 ? 0 : BotDifficultiesEloCaps[index - 1]
  const maxElo = BotDifficultiesEloCaps[index]
  return [minElo, maxElo]
}
