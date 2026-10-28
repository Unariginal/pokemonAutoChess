import { MegaEvolutions } from "../../config/game/megas"
import { type Pkm, PkmFamily } from "../../types/enum/Pokemon"
import { getPokemonData } from "./precomputed-pokemon-data"

// Mega Madness: families of pokemons that can mega evolve
const megaBaseFamilies: Pkm[] = [
  ...new Set(
    MegaEvolutions.flatMap((mega) => mega.bases).map((base) => PkmFamily[base])
  )
].filter((pkm) => getPokemonData(pkm).stars === 1)

// normally only found as additional picks, they are added to the shop from the start
export const MegaMadnessAdditionalPokemons = megaBaseFamilies.filter((pkm) => {
  const { additional, regional } = getPokemonData(pkm)
  return additional && !regional
})

// normally only found in some regions, they are in the shop whatever the region
export const MegaMadnessRegionalPokemons = megaBaseFamilies.filter(
  (pkm) => getPokemonData(pkm).regional
)
