import { EVENTS } from "./consts"
import { AuthUser, Org, UserSession } from "./interfaces"
import { emitToParent, on } from "./utils/mingle"

/**
 * Allows BRIDGE ACCOUNT to set the org
 * @private
 * 
 * @param org 
 */
export function setOrg(org: Org | null) {
  emitToParent(EVENTS.SET_ORG, org)
}

/**
 * Allows BRIDGE ACCOUNT to set authenticated user
 * @private
 * 
 * @param authUser
 */
export function setAuthUser(authUser: AuthUser | null) {
  emitToParent(EVENTS.SET_AUTH_USER, authUser)
}

/**
 * Allows BRIDGE ACCOUNT to get the current User Session
 * 
 * @private
 * @returns
 */
export function getUserSession(): Promise<UserSession> {
  return new Promise((resolve) => {
    const off = on(EVENTS.GET_USER_SESSION, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_USER_SESSION)
  })
}
