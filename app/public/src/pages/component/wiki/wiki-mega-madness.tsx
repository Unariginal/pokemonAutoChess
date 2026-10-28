import { useTranslation } from "react-i18next"
import {
  MEGA_MADNESS_KEY_STONE_PVE_STAGE,
  MEGA_MADNESS_KEY_STONE_TOWN_CHANCE,
  MEGA_MADNESS_SILK_SCARF_CAROUSEL_CHANCE,
  MEGA_MADNESS_SILK_SCARF_PVE_STAGE,
  MEGA_MADNESS_SILK_SCARVES_PER_CAROUSEL,
  MegaEvolutions,
  MegaFormOverrides,
  MegaItemRecipe,
  MegaMadnessKeyStoneTownStages,
  MegaMadnessSilkScarfCarouselStages,
  MegaShards,
  MegaStatBoosts
} from "../../../../../config/game/megas"
import { getPokemonData } from "../../../../../models/precomputed/precomputed-pokemon-data"
import { Emotion } from "../../../../../types"
import type { Item } from "../../../../../types/enum/Item"
import { type Pkm, PkmIndex } from "../../../../../types/enum/Pokemon"
import { ItemDetailTooltip } from "../../../game/components/item-detail"
import { addIconsToDescription } from "../../utils/descriptions"
import { GamePokemonDetailTooltip } from "../game/game-pokemon-detail"
import SynergyIcon from "../icons/synergy-icon"
import PokemonPortrait from "../pokemon-portrait"

function ItemIcon({ item }: { item: Item }) {
  const { t } = useTranslation()
  return (
    <img
      className="item"
      src={`assets/item/${item}.png`}
      alt={t(`item.${item}`)}
      data-tooltip-id="item-detail-tooltip"
      data-tooltip-content={item}
    />
  )
}

function Portrait({ pkm }: { pkm: Pkm }) {
  return (
    <PokemonPortrait
      portrait={{ index: PkmIndex[pkm], emotion: Emotion.NORMAL, shiny: false }}
      data-tooltip-id="game-pokemon-detail-tooltip"
      data-tooltip-content={pkm}
    />
  )
}

export default function WikiMegaMadness() {
  const { t } = useTranslation()
  const params = {
    townStages: MegaMadnessKeyStoneTownStages.join(", "),
    townChance: Math.round(MEGA_MADNESS_KEY_STONE_TOWN_CHANCE * 100),
    pveStage: MEGA_MADNESS_KEY_STONE_PVE_STAGE,
    silkScarves: MEGA_MADNESS_SILK_SCARVES_PER_CAROUSEL,
    silkScarfStages: MegaMadnessSilkScarfCarouselStages.join(", "),
    silkScarfChance: Math.round(MEGA_MADNESS_SILK_SCARF_CAROUSEL_CHANCE * 100),
    silkScarfPveStage: MEGA_MADNESS_SILK_SCARF_PVE_STAGE,
    ...MegaStatBoosts
  }

  return (
    <div id="wiki-mega-madness">
      <article className="my-box">
        <h2>{t("game_modes.MEGA_MADNESS")}</h2>
        <ul className="rules">
          {(
            [
              "rule_key_stones_town",
              "rule_key_stones_pve",
              "rule_crafting",
              "rule_mega_evolve",
              "rule_held",
              "rule_stats",
              "rule_forms",
              "rule_shop",
              "rule_special_sources",
              "rule_silk_scarf"
            ] as const
          ).map((rule) => (
            <li key={rule}>
              {addIconsToDescription(t(`wiki.mega_madness.${rule}`, params))}
            </li>
          ))}
        </ul>
      </article>

      <article className="my-box">
        <h2>{t("wiki.mega_madness.shards")}</h2>
        <ul className="recipes shards">
          {MegaShards.map((shard) => {
            const [a, b] = MegaItemRecipe[shard]!
            return (
              <li key={shard} className="recipe">
                <ItemIcon item={a} />+<ItemIcon item={b} />=
                <ItemIcon item={shard} />
                <span>{t(`item.${shard}`)}</span>
              </li>
            )
          })}
        </ul>
      </article>

      <article className="my-box">
        <h2>{t("wiki.mega_madness.mega_evolutions")}</h2>
        <p>{t("wiki.mega_madness.mega_evolutions_hint")}</p>
        <ul className="megas">
          {[...MegaEvolutions]
            .sort((a, b) =>
              t(`pkm.${a.mega}`).localeCompare(t(`pkm.${b.mega}`))
            )
            .map((mega) => {
              const recipe = mega.stone ? MegaItemRecipe[mega.stone] : undefined
              return (
                <li key={mega.mega} className="mega my-box">
                  <header>
                    <span className="portraits">
                      <Portrait pkm={mega.bases[0]} />
                      <span className="arrow">➜</span>
                      <Portrait pkm={mega.mega} />
                    </span>
                    <span className="name">
                      {t(`pkm.${mega.mega}`)}
                      <span className="types">
                        {[...getPokemonData(mega.mega).types].map((type) => (
                          <SynergyIcon key={type} type={type} size="24px" />
                        ))}
                      </span>
                    </span>
                  </header>
                  {mega.stone && recipe ? (
                    <div className="recipe">
                      <ItemIcon item={recipe[0]} />+
                      <ItemIcon item={recipe[1]} />=
                      <ItemIcon item={mega.stone} />
                      <span>{t(`item.${mega.stone}`)}</span>
                    </div>
                  ) : (
                    <p className="recipe">{t("wiki.mega_madness.no_stone")}</p>
                  )}
                  <p className="ability">
                    {t(`ability.${getPokemonData(mega.mega).skill}`)}
                    {MegaFormOverrides[mega.mega] &&
                      ` · ${t("wiki.mega_madness.specialty", {
                        profile: t(
                          `wiki.mega_madness.profile_${MegaFormOverrides[mega.mega]!.profile}`
                        )
                      })}`}
                  </p>
                  {mega.bases.length > 1 && (
                    <p className="forms">
                      {t("wiki.mega_madness.all_forms", {
                        forms: mega.bases.map((b) => t(`pkm.${b}`)).join(", ")
                      })}
                    </p>
                  )}
                </li>
              )
            })}
        </ul>
      </article>

      <ItemDetailTooltip />
      <GamePokemonDetailTooltip origin="wiki" />
    </div>
  )
}
