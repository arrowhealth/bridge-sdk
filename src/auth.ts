import { EVENTS } from "./consts"
import { AuthUser, Org, UserSession } from "./interfaces"
import { emitToParent, on, Request } from "./utils/mingle"

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
    const off = onGetUserSessionResponse((userSession: UserSession) => {
      off()
      resolve(userSession)
    })
    emitToParent(EVENTS.GET_USER_SESSION)
  })
}

// TODO: There is another one of these in platform
/**
 * @private
 * @returns off
 */
export function onGetUserSessionResponse(
  handle: (userSession: UserSession) => void
): Function {
  return on(EVENTS.GET_USER_SESSION, (payload: any) => handle(payload.data))
}

/**
 * Used by the Bridge Account for applications handling their own auth through OIDC or other means
 * 
 * @private
 * @returns off
 */
export const onSetAppStatus = (handle: ({ appId: string, isAuthenticated: boolean }) => void): Function => {
  return on(EVENTS.SET_APP_STATUS, (request: Request) => {
    handle({ appId: request.win.name, isAuthenticated: request.data?.isAuthenticated || false })
  })
}
