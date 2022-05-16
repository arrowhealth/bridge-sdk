import { EVENTS, inBridge } from './consts'
import { AuthUser, Org, PageDetails, UserSession } from './interfaces'
import { emitToParent, on } from './utils/mingle'

// !! INTERNAL USE ONLY !!
// Calling these functions will do nothing. Other applications and
// platforms cannot invoke these methods

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
 * Permits account to set the org
 * @private
 * @param org
 */
export function setOrg(org: Org | null) {
  emitToParent(EVENTS.SET_ORG, org)
}

/**
 * Permist account to set authenticated user
 * @private
 * @param authUser
 */
export function setAuthUser(authUser: AuthUser | null) {
  emitToParent(EVENTS.SET_AUTH_USER, authUser)
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
 * Permits account to open account application
 * @private
 */
export function openApp() {
  emitToParent(EVENTS.OPEN_APP)
}

/**
 * Clear internal storage cache set by bridge
 * @private
 */
export function clearCache() {
  emitToParent(EVENTS.CLEAR_CACHE)
}


/**
 * Requests page details
 * 
 * @returns 
 */
export function getPageDetails(): Promise<PageDetails> {
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
 * Used by bridge proxy to indicate ready
 */
export function proxyReady() {
  emitToParent(EVENTS.PROXY_READY)
}
