import { EVENTS } from './consts'
import {
  AuthStatus,
  AuthUser,
  Org,
  Page,
  Patient,
  PushNotification,
  RuntimeDetails,
  UserSession,
} from './interfaces'
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
 * @returns off
 */
export const onGetOrgRequest = (
  handle: (appId: string, sendResponse: (org?: Org) => void) => void
): Function => {
  return on(EVENTS.GET_ORG, (request: Request) => {
    handle(request.appId, (org?: Org) => {
      emitToChild(request.win, request.event, org)
    })
  })
}

/**
 * Used by platform to perform SSO
 * @returns off
 */
export const onSetOrgRequest = (
  handle: (appId: string, org: Org | null) => void
): Function => {
  return on(EVENTS.SET_ORG, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Used by platorm to perform SSO
 * @returns off
 */
export const onSetAuthUserRequest = (
  handle: (appId: string, authUser: AuthUser | null) => void
): Function => {
  return on(EVENTS.SET_AUTH_USER, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to open application. Can only be performed by smart tile.
 * @returns off
 */
export const onOpenAppRequest = (handle: (appId: string) => void): Function => {
  return on(EVENTS.OPEN_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to close application. Can be performed by application or smart tile.
 * @returns off
 */
export const onCloseAppRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.CLOSE_APP, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to get the application status. Can be performed by application or smart tile.
 * @returns off
 */
export const onGetAuthStatusRequest = (
  handle: (
    appId: string,
    sendResponse: (authStatus: AuthStatus) => void,
    data?: any
  ) => void
): Function => {
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
 * Used by the Bridge Platform and Account for applications handling their own auth through OIDC or other means
 * @private
 * @returns off
 */
export const onSetAuthStatusRequest = (
  handle: (appId: string, status: AuthStatus) => void
): Function => {
  return on(EVENTS.SET_AUTH_STATUS, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to get patient info. Can be performed by application or smart tile.
 * @returns off
 */
export const onGetPatientRequest = (
  handle: (
    appId: string,
    sendResponse: (patient: Patient | null) => void
  ) => void
): Function => {
  return on(EVENTS.GET_PATIENT_INFO, (request: Request) => {
    handle(request.appId, (patient: Patient | null) => {
      emitToChild(request.win, request.event, patient)
    })
  })
}

/**
 * Request to get page. Can be performed by application or smart tile.
 * @returns off
 */
export const onGetPageRequest = (
  handle: (
    appId: string,
    sendResponse: (page: Page) => void
  ) => void
): Function => {
  return on(EVENTS.GET_PAGE, (request: Request) => {
    handle(request.appId, (page: Page) => {
      emitToChild(request.win, request.event, page)
    })
  })
}

/**
 * Request to get user session. Can be performed by application or smart tile.
 * @returns off
 */
export const onGetAuthUserRequest = (
  handle: (
    appId: string,
    sendResponse: (authUser: AuthUser | null) => void
  ) => void
): Function => {
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
export const onGetUserSessionRequest = (
  handle: (
    appId: string,
    sendResponse: (userSession: UserSession | null) => void
  ) => void
): Function => {
  return on(EVENTS.GET_USER_SESSION, (request: Request) => {
    handle(request.appId, (userSession?: UserSession) => {
      emitToChild(request.win, request.event, userSession)
    })
  })
}

/**
 * Request to set badge count on tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onSetBadgeCountRequest = (
  handle: (appId: string, count: number) => void
): Function => {
  return on(EVENTS.SET_BADGE_COUNT, (request: Request) => {
    const count = request.data as number
    handle(request.appId, count || 0)
  })
}

/**
 * Request to push notification to bridge. Can be performed by application or smart tile.
 * @returns off
 */
export const onPushNotificationRequest = (
  handle: (appId: string, notification: PushNotification) => void
): Function => {
  return on(EVENTS.PUSH_NOTIFICATION, (request: Request) => {
    handle(request.appId, request.data)
  })
}

/**
 * Request to hide tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onHideTileRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.HIDE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to show tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onShowTileRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.SHOW_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to disable tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onDisableTileRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.DISABLE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to enabled tile. Can be performed by application or smart tile.
 * @returns off
 */
export const onEnableTileRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.ENABLE_TILE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request from smart tile to capture user events
 * @returns off
 */
export const onCaptureUserEventsRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.CAPTURE_USER_EVENTS, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request from smart tile to release user events back to bridge
 * @returns off
 */
export const onReleaseUserEventsRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.RELEASE_USER_EVENTS, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request clear all cached items store in bridge
 * @returns off
 */
export const onClearCacheRequest = (
  handle: (appId: string) => void
): Function => {
  return on(EVENTS.CLEAR_CACHE, (request: Request) => {
    handle(request.appId)
  })
}

/**
 * Request to get the details of page currently being displayed
 *
 * @param handle
 * @returns off
 */
export const onGetRuntimeDetailsRequest = (
  handle: (
    appId: string,
    sendResponse: (runtimeDetails?: RuntimeDetails) => void
  ) => void
): Function => {
  return on(EVENTS.GET_PAGE_DETAILS, (request: Request) => {
    handle(request.appId, (runtimeDetails?: RuntimeDetails) => {
      emitToChild(request.win, request.event, runtimeDetails)
    })
  })
}

/**
 * Request to indicate bridge proxy is ready
 *
 * @param handle
 * @returns off
 */
export const onProxyReady = (handle: (appId: string) => void): Function => {
  return on(EVENTS.PROXY_READY, (request: Request) => {
    handle(request.appId)
  })
}
