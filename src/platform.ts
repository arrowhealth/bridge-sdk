import { EVENTS, REQUESTS } from './consts'
import { AppConfig, AppStatus, AuthUser, Org, PatientInfo, UserSession } from './interfaces'
import { emitToChild, on, Request } from './utils/mingle'

/**
 * Sends patient info to an application
 * 
 */
export const setPatientInfo = (win: Window, patientInfo: PatientInfo | null) => {
  emitToChild(win, EVENTS.PATIENT_CHANGED, patientInfo)
}

/**
 * Used by platform to perform SSO
 * 
 * @returns off
 */
export const onOrgChanged = (handle: (org: Org) => void): Function => {
  return on(EVENTS.ORG_CHANGED, (request: Request) => {
    handle(request.data?.org)
  })
}

/**
 * Used by platorm to perform SSO
 * 
 * @returns off
 */
export const onAuthUserChanged = (handle: (authUser: AuthUser) => void): Function => {
  return on(EVENTS.AUTH_USER_CHANGED, (request: Request) => {
    handle(request.data?.authUser)
  })
}


/**
 * Request to open application. Can only be performed by smart tile.
 * 
 * @returns off
 */
export const onOpenAppRequest = (handle: ({ appId: string }) => void): Function => {
  return on(REQUESTS.OPEN_APP, (request: Request) => {
    handle({ appId: request.win.name })
  })
}

/**
 * Request to close application. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onCloseAppRequest = (handle: ({ appId: string }) => void): Function => {
  return on(REQUESTS.CLOSE_APP, (request: Request) => {
    handle({ appId: request.win.name })
  })
}

/**
 * Request to get the application config. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetAppConfigRequest = (handle: (appId: string, sendResponse: (appConfig: AppConfig) => void, data?: any) => void): Function => {
  return on(REQUESTS.GET_APP_CONFIG, (request: Request) => {
    handle(request.win.name, (appConfig: AppConfig) => {
      emitToChild(request.win, request.event, appConfig)
    }, request.data)
  })
}

/**
 * Request to get the application status. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetAppStatusRequest = (handle: (appId: string, sendResponse: (appStatus: AppStatus) => void, data?: any) => void): Function => {
  return on(REQUESTS.GET_APP_STATUS, (request: Request) => {
    handle(request.win.name, (appStatus: AppStatus) => {
      emitToChild(request.win, request.event, appStatus)
    }, request.data)
  })
}

/**
 * Request to get patient info. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetPatientInfoRequest = (handle: (sendResponse: (patientInfo: PatientInfo | null) => void) => void): Function => {
  return on(REQUESTS.GET_PATIENT_INFO, (request: Request) => {
    handle((patientInfo: PatientInfo | null) => {
      emitToChild(request.win, request.event, patientInfo)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetAuthUserRequest = (handle: (sendResponse: (authUser: AuthUser) => void) => void): Function => {
  return on(REQUESTS.GET_USER_SESSION, (request: Request) => {
    handle((authUser: AuthUser) => {
      emitToChild(request.win, request.event, authUser)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * 
 * @returns off
 */
export const onGetUserSessionRequest = (handle: (sendResponse: (userSession: UserSession) => void) => void): Function => {
  return on(REQUESTS.GET_USER_SESSION, (request: Request) => {
    handle((userSession: UserSession) => {
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
  return on(REQUESTS.SET_BADGE_COUNT, (request: Request) => {
    const count = request.data as number
    handle(request.appId, count || 0)
  })
}

/**
 * Request to push notification to bridge. Can be performed by application or smart tile.
 * @returns off
 */
export const onPushNotificationRequest = (handle: () => void): Function => {
  return on(REQUESTS.PUSH_NOTIFICATION, handle)
}

/**
 * Request to hide tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onHideTileRequest = (handle: () => void): Function => {
  return on(REQUESTS.HIDE_TILE, handle)
}

/**
 * Request to show tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onShowTileRequest = (handle: () => void): Function => {
  return on(REQUESTS.SHOW_TILE, handle)
}
