import { EVENTS, inBridge } from './consts'
import { AuthUser, LoginResult, Org, RuntimeDetails, UserSession } from './interfaces'
import { emitToParent, on } from './utils/mingle'

// !! INTERNAL USE ONLY !!
// Calling these functions will do nothing. Other applications and
// platforms cannot invoke these methods

/**
 * Clear internal storage cache set by bridge
 * @private
 */
export function clearCache() {
  emitToParent(EVENTS.CLEAR_CACHE)
}

/**
 * Permits account to get the assigned org from chrome storage
 * @private
 * @returns
 */
export function getOrg(): Promise<Org> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_ORG, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_ORG)
  })
}

/**
 * Requests page details
 *
 * @returns
 */
export function getRuntimeDetails(): Promise<RuntimeDetails> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_PAGE_DETAILS, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_PAGE_DETAILS)
  })
}

/**
 * Permits account to get the current user's session
 * @private
 * @returns
 */
export function getUserSession(): Promise<UserSession> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_USER_SESSION, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_USER_SESSION)
  })
}

/**
 * Permits account to login.
 * @private
 */
export function login(realm: string, user: string, pw: string): Promise<LoginResult> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.LOGIN, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.LOGIN, { realm, user, pw })
  })
}

/**
 * Permits account to logout.
 * @private
 */
export function logout(): Promise<void> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.LOGOUT, () => {
      off()
      resolve()
    })
    emitToParent(EVENTS.LOGOUT)
  })
}

/**
 * Permits account to open account application
 * @private
 */
export function openApp() {
  emitToParent(EVENTS.OPEN_APP)
}

/**
 * Permits account to set authenticated user
 * @private
 * @param authUser
 */
export function setAuthUser(authUser: AuthUser | null) {
  emitToParent(EVENTS.SET_AUTH_USER, authUser)
}

/**
 * Permits account to set the org
 * @private
 * @param org
 */
export function setOrg(org: Org | null) {
  emitToParent(EVENTS.SET_ORG, org)
}
