import { EVENTS } from './consts'
import { AppStatus, AuthUser, Org, Patient, UserSession } from './interfaces'
import { emitToChild, on, Request } from './utils/mingle'

/**
 * Sends patient info to an application
 * 
 */
export const setPatient = (win: Window, patient: Patient | null) => {
  emitToChild(win, EVENTS.SET_PATIENT_INFO, patient)
}

/**
 * Used by platform to perform SSO
 * 
 * @returns off
 */
export const onSetOrg = (handle: (appId: string, org: Org) => void): Function => {
  return on(EVENTS.SET_ORG, (request: Request) => {
    handle(request.appId, request.data?.org)
  })
}

/**
 * Used by platorm to perform SSO
 * 
 * @returns off
 */
export const onAuthUserChanged = (handle: (appId: string, authUser: AuthUser) => void): Function => {
  return on(EVENTS.SET_AUTH_USER, (request: Request) => {
    handle(request.appId, request.data?.authUser)
  })
}


/**
 * Request to open application. Can only be performed by smart tile.
 * 
 * @returns off
 */
export const onOpenAppRequest = (handle: (appId: string) => void): Function => {
  return on(EVENTS.OPEN_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to close application. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onCloseAppRequest = (handle: (appId: string) => void): Function => {
  return on(EVENTS.CLOSE_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to get the application status. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetAppStatusRequest = (handle: (appId: string, sendResponse: (appStatus: AppStatus) => void, data?: any) => void): Function => {
  return on(EVENTS.GET_APP_STATUS, (request: Request) => {
    handle(request.appId, (appStatus: AppStatus) => {
      emitToChild(request.win, request.event, appStatus)
    }, request.data)
  })
}

/**
 * Request to get patient info. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetPatientRequest = (handle: (appId: string, sendResponse: (patient: Patient | null) => void) => void): Function => {
  return on(EVENTS.GET_PATIENT_INFO, (request: Request) => {
    handle(request.appId, (patient: Patient | null) => {
      emitToChild(request.win, request.event, patient)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetAuthUserRequest = (handle: (appId: string, sendResponse: (authUser: AuthUser) => void) => void): Function => {
  return on(EVENTS.GET_AUTH_USER, (request: Request) => {
    handle(request.appId, (authUser: AuthUser) => {
      emitToChild(request.win, request.event, authUser)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetUserSessionRequest = (handle: (appId: string, sendResponse: (userSession: UserSession) => void) => void): Function => {
  return on(EVENTS.GET_USER_SESSION, (request: Request) => {
    handle(request.appId, (userSession: UserSession) => {
      emitToChild(request.win, request.event, userSession)
    })
  })
}

/**
 * Request to set badge count on tile. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onSetBadgeCountRequest = (handle: (appId: string, count: number) => void): Function => {
  return on(EVENTS.SET_BADGE_COUNT, (request: Request) => {
    const count = request.data as number
    handle(request.appId, count || 0)
  })
}

/**
 * Request to push notification to bridge. Can be performed by application or smart tile.
 * @returns off
 */
export const onPushNotificationRequest = (handle: (appId: string, content: { title: string; text: string }) => void): Function => {
  return on(EVENTS.PUSH_NOTIFICATION, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to hide tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onHideTileRequest = (handle: (appId: string) => void): Function => {
  return on(EVENTS.HIDE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to show tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onShowTileRequest = (handle: (appId: string) => void): Function => {
  return on(EVENTS.SHOW_TILE, (request: Request) => {
    handle(request.appId)
  })
}
