import { getMegaEvolution } from "../../config/game/megas"
import type Player from "../../models/colyseus-models/player"
import type { Pokemon } from "../../models/colyseus-models/pokemon"
import { Item } from "../../types/enum/Item"
import { removeInArray } from "../../utils/array"
import { EvolutionManager } from "./evolution-manager"

// mega evolves the pokemon if the stone matches it. Like Primal Groudon with the Red Orb,
// the stone is moved from the player inventory to the pokemon and stays held by the mega
export function tryMegaEvolve(
  pokemon: Pokemon,
  player: Player,
  stone: Item
): Pokemon | null {
  const megaEvolution = getMegaEvolution(pokemon.name, stone)
  if (!megaEvolution) return null
  if (pokemon.items.size >= 3 || pokemon.items.has(Item.EVIOLITE)) return null
  removeInArray(player.items, stone)
  pokemon.items.add(stone)
  const pokemonEvolved = player.transformPokemon(pokemon, megaEvolution.mega)
  EvolutionManager.afterEvolve(pokemonEvolved, pokemon, player)
  return pokemonEvolved
}
