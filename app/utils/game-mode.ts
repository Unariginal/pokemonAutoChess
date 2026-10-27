import { GameMode } from "../types/enum/Game"

// Scribble Double Up combines both modes: teams of 2 plus a random special rule
export function isDoubleUpMode(
  gameMode: GameMode | string | null | undefined
): boolean {
  return (
    gameMode === GameMode.DOUBLE_UP || gameMode === GameMode.SCRIBBLE_DOUBLE_UP
  )
}

export function isScribbleMode(
  gameMode: GameMode | string | null | undefined
): boolean {
  return (
    gameMode === GameMode.SCRIBBLE || gameMode === GameMode.SCRIBBLE_DOUBLE_UP
  )
}
