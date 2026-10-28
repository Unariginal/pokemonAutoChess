import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  type EditableUserStat,
  EditableUserStats,
  type UserStatChanges
} from "../../../../../types/enum/DebugAction"
import type { IUserMetadataClient } from "../../../../../types/interfaces/UserMetadata"
import { canUseDebugTools, setUserStats } from "../../../network"

// admin tool to edit account stats of the searched player, only shown when the server allows it
export function UserStatsEditor({ user }: { user: IUserMetadataClient }) {
  const { t } = useTranslation()
  const [allowed, setAllowed] = useState(false)
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<EditableUserStat, string>>(
    toValues(user)
  )

  useEffect(() => {
    canUseDebugTools()
      .then(setAllowed)
      .catch(() => setAllowed(false))
  }, [])

  useEffect(() => {
    setValues(toValues(user))
  }, [user])

  if (!allowed) return null
  if (!open) {
    return (
      <button className="bubbly orange" onClick={() => setOpen(true)}>
        {t("debug_tools.edit_stats")}
      </button>
    )
  }

  const save = async () => {
    const changes: UserStatChanges = {}
    for (const stat of EditableUserStats) {
      const value = Number(values[stat])
      if (values[stat] !== "" && value !== user[stat]) changes[stat] = value
    }
    if (Object.keys(changes).length === 0) return
    const result = await setUserStats(user.uid, changes)
    alert(
      result?.error ?? t("debug_tools.stats_saved", { name: user.displayName })
    )
  }

  return (
    <div className="my-container user-stats-editor">
      <h3>{t("debug_tools.edit_stats")}</h3>
      <div className="user-stats-editor-grid">
        {EditableUserStats.map((stat) => (
          <label key={stat}>
            <span>{t(`debug_tools.stats.${stat}`)}</span>
            <input
              type="number"
              min={0}
              value={values[stat]}
              onChange={(e) => setValues({ ...values, [stat]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="user-stats-editor-actions">
        <button className="bubbly green" onClick={save}>
          {t("debug_tools.save")}
        </button>
        <button className="bubbly red" onClick={() => setOpen(false)}>
          {t("debug_tools.close")}
        </button>
      </div>
    </div>
  )
}

function toValues(user: IUserMetadataClient) {
  return Object.fromEntries(
    EditableUserStats.map((stat) => [stat, String(user[stat] ?? 0)])
  ) as Record<EditableUserStat, string>
}
