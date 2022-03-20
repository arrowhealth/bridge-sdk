import { EVENTS, REQUESTS, RESPONSE } from "./consts"
import { AuthUser, Org, UserSession } from "./interfaces"
import { emitToParent, on, Request } from "./utils/mingle"

/**
 * Allows BRIDGE ACCOUNT to set the org
 * @private
 * 
 * @param org 
 */
export function setOrg(org: Org | null) {
  emitToParent(EVENTS.ORG_CHANGED, org)
}

/**
 * Allows BRIDGE ACCOUNT to set authenticated user
 * @private
 * 
 * @param authUser
 */
export function setAuthUser(authUser: AuthUser | null) {
  emitToParent(EVENTS.AUTH_USER_CHANGED, authUser)
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
    emitToParent(REQUESTS.GET_USER_SESSION)
  })
}

/**
 * @private
 * @returns off
 */
export function onGetUserSessionResponse(
  handle: (userSession: UserSession) => void
): Function {
  return on(RESPONSE.GET_USER_SESSION, (payload: any) => handle(payload.data))
}

/**
 * Used by the Bridge Account for applications handling their own auth either
 * through OIDC or other
 * 
 * @private
 * @returns off
 */
export const onAppStatusChanged = (handle: ({ appId: string, isAuthenticated: boolean }) => void): Function => {
  return on(EVENTS.APP_STATUS_CHANGED, (request: Request) => {
    handle({ appId: request.win.name, isAuthenticated: request.data?.isAuthenticated || false })
  })
}
