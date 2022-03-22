import { EVENTS } from './consts'
import { AppStatus, AuthUser, Org, Patient, UserSession } from './interfaces'
import { emitToChild, on, Request } from './utils/mingle'

// !! PLATFORM USE ONLY !!
// Calling these functions will do nothing. Other applications and
// platforms cannot invoke these methods

/**
 * Sends patient info to an application
 * 
 */
export const setPatient = (win: Window, patient: Patient | null) => {
  emitToChild(win, EVENTS.SET_PATIENT_INFO, patient)
}

/**
 * Request to get the org stored in chrome storage
 * 
 * @returns off
 */
export const onGetOrgRequest = (handle: (appId: string, sendResponse: (org?: Org) => void) => void): Function => {
  return on(EVENTS.GET_ORG, (request: Request) => {
    handle(request.appId, (org?: Org) => {
      emitToChild(request.win, request.event, org)
    })
  })
}


/**
 * Used by platform to perform SSO
 * 
 * @returns off
 */
export const onSetOrgRequest = (handle: (appId: string, org: Org | null) => void): Function => {
  return on(EVENTS.SET_ORG, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Used by platorm to perform SSO
 * 
 * @returns off
 */
export const onSetAuthUserRequest = (handle: (appId: string, authUser: AuthUser | null) => void): Function => {
  return on(EVENTS.SET_AUTH_USER, (request: Request) => {
    console.log('onSetAuthUserRequest', request.data)
    handle(request.appId, request.data)
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
 * Used by the Bridge Platform and Account for applications handling their own auth through OIDC or other means
 * 
 * @private
 * @returns off
 */
export const onSetAppStatusRequest = (handle: (appId: string, isAuthenticated: boolean) => void): Function => {
  return on(EVENTS.SET_APP_STATUS, (request: Request) => {
    handle(request.appId, request.data?.isAuthenticated || false )
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
export const onGetAuthUserRequest = (handle: (appId: string, sendResponse: (authUser: AuthUser | null) => void) => void): Function => {
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
export const onGetUserSessionRequest = (handle: (appId: string, sendResponse: (userSession: UserSession | null) => void) => void): Function => {
  return on(EVENTS.GET_USER_SESSION, (request: Request) => {
    handle(request.appId, (userSession?: UserSession) => {
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
