import { EVENTS } from './consts'
import {
  AuthStatus,
  AuthUser, LoginResult,
  Org,
  Page,
  Patient,
  Platform,
  PushNotification,
  RuntimeDetails,
  UserSession,
} from './interfaces'
import { emitToChild, on, Request } from './utils/mingle'

// !! PLATFORM USE ONLY !!
// Calling these functions will do nothing. Other applications and
// platforms cannot invoke these methods

/**
 * Request from smart tile to capture user events
 * @returns off
 */
export function onCaptureUserEventsRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.CAPTURE_USER_EVENTS, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request clear all cached items store in bridge
 * @returns off
 */
export function onClearCacheRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.CLEAR_CACHE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to close application. Can be performed by application or smart tile.
 * @returns off
 */
export function onCloseAppRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.CLOSE_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to disable tile. Can be performed by application or smart tile.
 * @returns off
 */
export function onDisableTileRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.DISABLE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to enabled tile. Can be performed by application or smart tile.
 * @returns off
 */
export function onEnableTileRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.ENABLE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to get the application status. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetAuthStatusRequest(handle: (appId: string, sendResponse: (authStatus: AuthStatus) => void, data?: any) => void): Function {
  return on(EVENTS.GET_AUTH_STATUS, (request: Request) => {
    handle(
      request.appId,
      (authStatus: AuthStatus) => {
        emitToChild(request.win, request.event, authStatus)
      },
      request.data
    )
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetAuthUserRequest(handle: (appId: string, sendResponse: (authUser: AuthUser | null) => void) => void): Function {
  return on(EVENTS.GET_AUTH_USER, (request: Request) => {
    handle(request.appId, (authUser: AuthUser) => {
      emitToChild(request.win, request.event, authUser)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetUserSessionRequest(handle: (appId: string, sendResponse: (userSession: UserSession | null) => void) => void): Function {
  return on(EVENTS.GET_USER_SESSION, (request: Request) => {
    handle(request.appId, (userSession?: UserSession) => {
      emitToChild(request.win, request.event, userSession)
    })
  })
}

/**
 * Request to get the org stored in chrome storage
 * @returns off
 */
export function onGetOrgRequest(handle: (appId: string, sendResponse: (org?: Org) => void) => void): Function {
  return on(EVENTS.GET_ORG, (request: Request) => {
    handle(request.appId, (org?: Org) => {
      emitToChild(request.win, request.event, org)
    })
  })
}

/**
 * Request to get page. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetPageRequest(handle: (appId: string, sendResponse: (page: Page) => void) => void): Function {
  return on(EVENTS.GET_PAGE, (request: Request) => {
    handle(request.appId, (page: Page) => {
      emitToChild(request.win, request.event, page)
    })
  })
}

/**
 * Request to get patient info. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetPatientRequest(handle: (appId: string, sendResponse: (patient: Patient | null) => void) => void): Function {
  return on(EVENTS.GET_PATIENT_INFO, (request: Request) => {
    handle(request.appId, (patient: Patient | null) => {
      emitToChild(request.win, request.event, patient)
    })
  })
}

/**
 * Request to get platform (e.g. Athena info, eCW, etc.) information. Can be performed by application or smart tile.
 * @returns off
 */
export function onGetPlatformRequest(handle: (appId: string, respond: (platform: Platform) => void) => void): Function {
  return on(EVENTS.GET_PLATFORM, (request: Request) => {
    handle(request.appId, (platform: Platform) => {
      emitToChild(request.win, request.event, platform)
    })
  })
}

/**
 * Request to get the details of page currently being displayed
 *
 * @param handle
 * @returns off
 */
export function onGetRuntimeDetailsRequest(handle: (appId: string, sendResponse: (runtimeDetails?: RuntimeDetails) => void) => void): Function {
  return on(EVENTS.GET_PAGE_DETAILS, (request: Request) => {
    handle(request.appId, (runtimeDetails?: RuntimeDetails) => {
      emitToChild(request.win, request.event, runtimeDetails)
    })
  })
}

/**
 * Request to hide tile. Can be performed by application or smart tile.
 * @returns off
 */
export function onHideTileRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.HIDE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

export function onLoginRequest(handle: (appId: string, realm: string, user: string, pw: string, sendResponse: (loginResult: LoginResult) => void) => void): Function {
  return on(EVENTS.LOGIN, (request: Request) => {
    handle(request.appId, request.data.realm, request.data.user, request.data.pw, (loginResult: LoginResult) => {
      emitToChild(request.win, request.event, loginResult)
    })
  })
}

/**
 * Request to open application. Can only be performed by smart tile.
 * @returns off
 */
export function onOpenAppRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.OPEN_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to indicate bridge proxy is ready
 *
 * @param handle
 * @returns off
 */
export function onProxyReady(handle: (appId: string) => void): Function {
  return on(EVENTS.PROXY_READY, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to push notification to bridge. Can be performed by application or smart tile.
 * @returns off
 */
export function onPushNotificationRequest(handle: (appId: string, notification: PushNotification) => void): Function {
  return on(EVENTS.PUSH_NOTIFICATION, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request from smart tile to release user events back to bridge
 * @returns off
 */
export function onReleaseUserEventsRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.RELEASE_USER_EVENTS, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Used by the Bridge Platform and Account for applications handling their own auth through OIDC or other means
 * @private
 * @returns off
 */
export function onSetAuthStatusRequest(handle: (appId: string, status: AuthStatus) => void): Function {
  return on(EVENTS.SET_AUTH_STATUS, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Used by platorm to perform SSO
 * @returns off
 */
export function onSetAuthUserRequest(handle: (appId: string, authUser: AuthUser | null) => void): Function {
  return on(EVENTS.SET_AUTH_USER, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to set badge count on tile. Can be performed by application or smart tile.
 * @returns off
 */
export function onSetBadgeCountRequest(handle: (appId: string, count: number) => void): Function {
  return on(EVENTS.SET_BADGE_COUNT, (request: Request) => {
    const count = request.data as number
    handle(request.appId, count || 0)
  })
}

/**
 * Used by platform to perform SSO
 * @returns off
 */
export function onSetOrgRequest(handle: (appId: string, org: Org | null) => void): Function {
  return on(EVENTS.SET_ORG, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to show tile. Can be performed by application or smart tile.
 * @returns off
 */
export function onShowTileRequest(handle: (appId: string) => void): Function {
  return on(EVENTS.SHOW_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Sends patient info to an application
 *
 */
export function setPatient(win: Window, patient: Patient | null) {
  emitToChild(win, EVENTS.SET_PATIENT_INFO, patient)
}
