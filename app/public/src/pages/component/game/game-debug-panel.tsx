import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Transfer } from "../../../../../types"
import {
  DebugAction,
  type DebugMessage
} from "../../../../../types/enum/DebugAction"
import { Item } from "../../../../../types/enum/Item"
import { Pkm, PkmIndex } from "../../../../../types/enum/Pokemon"
import { Synergy } from "../../../../../types/enum/Synergy"
import { getPortraitSrc } from "../../../../../utils/avatar"
import { rooms } from "../../../network"
import DraggableWindow from "../modal/draggable-window"
import "./game-debug-panel.css"

const MAX_RESULTS = 40
const ALL_PKMS = Object.values(Pkm).filter((p) => p !== Pkm.DEFAULT)
const ALL_ITEMS = Object.values(Item)

function sendDebug(message: DebugMessage) {
  rooms.game?.send(Transfer.DEBUG_COMMAND, message)
}

function useSearch<T extends string>(
  values: T[],
  query: string,
  label: (value: T) => string
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return values.slice(0, MAX_RESULTS)
    return values
      .filter(
        (v) => v.toLowerCase().includes(q) || label(v).toLowerCase().includes(q)
      )
      .slice(0, MAX_RESULTS)
  }, [values, query, label])
}

export default function GameDebugPanel() {
  const { t } = useTranslation()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const room = rooms.game
    if (!room) return
    const unbind = room.onMessage(Transfer.DEBUG_TOOLS_ACCESS, (ok: boolean) =>
      setAllowed(ok === true)
    )
    room.send(Transfer.DEBUG_TOOLS_ACCESS)
    return () => unbind?.()
  }, [])

  if (!allowed) return null
  return (
    <DraggableWindow
      title={t("debug_tools.title")}
      className="my-container game-debug-panel"
      defaultMinimized={true}
    >
      <DebugPanelContent />
    </DraggableWindow>
  )
}

function DebugPanelContent() {
  const { t } = useTranslation()
  const [gold, setGold] = useState(50)
  const [level, setLevel] = useState(9)
  const [stage, setStage] = useState(10)
  const [life, setLife] = useState(100)
  const [stars, setStars] = useState(1)
  const [synergy, setSynergy] = useState<Synergy>(Synergy.NORMAL)
  const [pkmQuery, setPkmQuery] = useState("")
  const [itemQuery, setItemQuery] = useState("")
  const [selectedPkm, setSelectedPkm] = useState<Pkm | null>(null)

  const pkmLabel = useMemo(() => (p: Pkm) => t(`pkm.${p}`), [t])
  const itemLabel = useMemo(() => (i: Item) => t(`item.${i}`), [t])
  const pkms = useSearch(ALL_PKMS, pkmQuery, pkmLabel)
  const items = useSearch(ALL_ITEMS, itemQuery, itemLabel)

  return (
    <div className="game-debug-panel-content">
      <section>
        <label>{t("debug_tools.gold")}</label>
        <input
          type="number"
          value={gold}
          onChange={(e) => setGold(Number(e.target.value))}
        />
        <button
          className="bubbly blue"
          onClick={() =>
            sendDebug({ action: DebugAction.GIVE_GOLD, amount: gold })
          }
        >
          {t("debug_tools.give")}
        </button>
      </section>

      <section>
        <label>{t("debug_tools.level")}</label>
        <input
          type="number"
          min={1}
          max={9}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
        <button
          className="bubbly blue"
          onClick={() => sendDebug({ action: DebugAction.SET_LEVEL, level })}
        >
          {t("debug_tools.set")}
        </button>
        <button
          className="bubbly blue"
          onClick={() => sendDebug({ action: DebugAction.ADD_XP, amount: 4 })}
        >
          +4 XP
        </button>
      </section>

      <section>
        <label>{t("debug_tools.stage")}</label>
        <input
          type="number"
          min={0}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
        />
        <button
          className="bubbly blue"
          onClick={() => sendDebug({ action: DebugAction.SET_STAGE, stage })}
        >
          {t("debug_tools.set")}
        </button>
        <button
          className="bubbly orange"
          onClick={() => sendDebug({ action: DebugAction.END_PHASE })}
        >
          {t("debug_tools.end_phase")}
        </button>
      </section>

      <section>
        <label>{t("debug_tools.life")}</label>
        <input
          type="number"
          min={1}
          value={life}
          onChange={(e) => setLife(Number(e.target.value))}
        />
        <button
          className="bubbly blue"
          onClick={() => sendDebug({ action: DebugAction.SET_LIFE, life })}
        >
          {t("debug_tools.set")}
        </button>
      </section>

      <section>
        <label>{t("debug_tools.synergy")}</label>
        <select
          value={synergy}
          onChange={(e) => setSynergy(e.target.value as Synergy)}
        >
          {Object.values(Synergy).map((s) => (
            <option key={s} value={s}>
              {t(`synergy.${s}`)}
            </option>
          ))}
        </select>
        <button
          className="bubbly blue"
          onClick={() =>
            sendDebug({ action: DebugAction.ADD_SYNERGY, synergy, delta: 1 })
          }
        >
          +1
        </button>
        <button
          className="bubbly red"
          onClick={() =>
            sendDebug({ action: DebugAction.ADD_SYNERGY, synergy, delta: -1 })
          }
        >
          -1
        </button>
      </section>

      <section>
        <button
          className="bubbly green"
          onClick={() => sendDebug({ action: DebugAction.REROLL_SHOP })}
        >
          {t("debug_tools.free_reroll")}
        </button>
      </section>

      <h3>{t("debug_tools.pokemon")}</h3>
      <section>
        <input
          type="search"
          placeholder={t("debug_tools.search")}
          value={pkmQuery}
          onChange={(e) => setPkmQuery(e.target.value)}
        />
        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          title={t("debug_tools.stars")}
        >
          {[1, 2, 3, 4].map((s) => (
            <option key={s} value={s}>
              {"★".repeat(s)}
            </option>
          ))}
        </select>
      </section>
      <ul className="game-debug-panel-list">
        {pkms.map((p) => (
          <li
            key={p}
            className={p === selectedPkm ? "selected" : ""}
            title={p}
            onClick={() => setSelectedPkm(p)}
          >
            <img src={getPortraitSrc(PkmIndex[p])} alt="" />
            <span>{t(`pkm.${p}`)}</span>
          </li>
        ))}
      </ul>
      <section>
        <button
          className="bubbly blue"
          disabled={!selectedPkm}
          onClick={() =>
            selectedPkm &&
            sendDebug({
              action: DebugAction.SPAWN_POKEMON,
              pkm: selectedPkm,
              stars
            })
          }
        >
          {t("debug_tools.spawn_on_bench")}
        </button>
        <button
          className="bubbly blue"
          disabled={!selectedPkm}
          onClick={() =>
            selectedPkm &&
            sendDebug({ action: DebugAction.FILL_SHOP, pkm: selectedPkm })
          }
        >
          {t("debug_tools.fill_shop")}
        </button>
      </section>

      <h3>{t("debug_tools.items")}</h3>
      <section>
        <input
          type="search"
          placeholder={t("debug_tools.search")}
          value={itemQuery}
          onChange={(e) => setItemQuery(e.target.value)}
        />
      </section>
      <ul className="game-debug-panel-list">
        {items.map((item) => (
          <li
            key={item}
            title={`${item} – ${t("debug_tools.click_to_give")}`}
            onClick={() => sendDebug({ action: DebugAction.GIVE_ITEM, item })}
          >
            <img src={`assets/item/${item}.png`} alt="" />
            <span>{t(`item.${item}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
