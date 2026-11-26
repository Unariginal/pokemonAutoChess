import type { Client } from "colyseus"
import {
  applyUserStatChanges,
  canUseDebugTools,
  sanitizeUserStatChanges
} from "../../core/debug-tools"
import UserMetadata, {
  toUserMetadataJSON
} from "../../models/mongo-models/user-metadata"
import { Transfer } from "../../types"
import { EditableUserStats } from "../../types/enum/DebugAction"
import { logger } from "../../utils/logger"
import type CustomLobbyRoom from "../custom-lobby-room"

export function canClientUseDebugTools(room: CustomLobbyRoom, client: Client) {
  if (!client.auth) return false
  return canUseDebugTools({
    uid: client.auth.uid,
    email: client.auth.email,
    role: room.users.get(client.auth.uid)?.role
  })
}

// edit account stats (level, elo, boosters...) of any player, returns the updated user or an error message
export async function setUserStats(
  room: CustomLobbyRoom,
  client: Client,
  { uid, stats }: { uid: string; stats: unknown }
) {
  if (!canClientUseDebugTools(room, client)) {
    logger.warn("set user stats refused", client.auth?.uid, uid)
    return { error: "Not allowed" }
  }
  const changes = sanitizeUserStatChanges(stats)
  if (typeof uid !== "string" || Object.keys(changes).length === 0) {
    return { error: "Nothing to change" }
  }

  const user = await UserMetadata.findOne({ uid })
  if (!user) return { error: `No user found with ID ${uid}` }

  applyUserStatChanges(user, changes)
  await user.save()
  logger.info("set user stats", client.auth.uid, uid, changes)

  // keep the lobby cache of a connected user in sync with the database
  const cachedUser = room.users.get(uid)
  if (cachedUser) {
    for (const stat of EditableUserStats) cachedUser[stat] = user[stat]
  }

  const json = toUserMetadataJSON(user)
  room.clients.forEach((c) => {
    if (c.auth?.uid === uid) c.send(Transfer.USER_PROFILE, json)
  })
  return { user: json }
}
