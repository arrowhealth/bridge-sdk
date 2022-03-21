import { EVENTS, REQUESTS, RESPONSE } from './consts'
import { emitToParent, on } from './utils/mingle'
import { AppStatus, AuthUser, PatientInfo } from './interfaces'

/**
 * Return user session info
 *
 * @returns
 */
export function getAuthUser(): Promise<AuthUser> {
  return new Promise((resolve) => {
    const off = onGetAuthUserResponse((sessionInfo: AuthUser) => {
      off()
      resolve(sessionInfo)
    })
    emitToParent(REQUESTS.GET_USER_SESSION)
  })
}

/**
 * Get the current patient being displayed. This is typically used on application
 * initialization and thereafter onPatientChanged() is used to listen for additional
 * changes.
 *
 * @returns
 */
export function getPatientInfo(): Promise<PatientInfo> {
  return new Promise((resolve) => {
    const off = onGetPatientInfoResponse((patient: PatientInfo) => {
      off()
      resolve(patient)
    })
    emitToParent(REQUESTS.GET_PATIENT_INFO)
  })
}

/**
 * Sets the badge count on the tile. Setting the value to 0 will cause it to go away
 *
 * @param count
 *
 */
export function setBadgeCount(count: number = 0): void {
  emitToParent(REQUESTS.SET_BADGE_COUNT, count)
}

/**
 * Shows tile. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function showTile() {
  emitToParent(REQUESTS.SHOW_TILE)
}


/**
 * Hide tile. Controlled by a Smart Tile tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function hideTile() {
  emitToParent(REQUESTS.HIDE_TILE)
}


/**
 * Returns the status of the application known to Bridge set by application
 */
export function getAppStatus(): Promise<AppStatus> {
  return new Promise((resolve) => {
    const off = onGetAppStatusResponse((status: AppStatus) => {
      off()
      resolve(status)
    })
    emitToParent(REQUESTS.GET_APP_STATUS)
  })
}

/**
 * Tells Bidge when authentication is complete. Set isAuthenticated
 * to false when authentication is required. This will open the
 * authentication panel where you have declared your Authentication
 * page.
 *
 * @param status
 * @default { isAuthenticated: false }
 */
export function setAppStatus(
  status: AppStatus = { isAuthenticated: false }
) {
  emitToParent(EVENTS.APP_STATUS_CHANGED, status)
}

/**
 * Used by tile to open linked application.
 */
export function openApp() {
  emitToParent(REQUESTS.OPEN_APP)
}

/**
 * Closes app making the request. The tile can also call this and it will close the linked application.
 */
export function closeApp() {
  emitToParent(REQUESTS.CLOSE_APP)
}

/**
 * Bridge will add the notification to the notifications array
 * with icon representing the application
 *
 * @param text Message to display
 * @param patientId EHR patient ID
 */
export function pushNotification(text: string, patientId?: any): void {
  emitToParent(REQUESTS.PUSH_NOTIFICATION, { patientId, text })
}

/**
 * Subscribe to the patient change event
 *
 * @param handle
 * @returns off
 */
export function onPatientChanged(
  handle: (patientInfo: PatientInfo) => void
): Function {
  return on(EVENTS.PATIENT_CHANGED, (payload: any) => handle(payload.data))
}

/**
 * @private
 * @returns off
 */
export function onGetAppStatusResponse(
  handle: (appStatus: AppStatus) => void
): Function {
  return on(RESPONSE.GET_APP_STATUS, (payload: any) => handle(payload.data))
}

/**
 * @private
 * @returns off
 */
export function onGetPatientInfoResponse(
  handle: (patientInfo: PatientInfo) => void
): Function {
  return on(RESPONSE.GET_PATIENT_INFO, (payload: any) => handle(payload.data))
}

/**
 * @private
 * @returns off
 */
export function onGetAuthUserResponse(
  handle: (authUser: AuthUser) => void
): Function {
  return on(RESPONSE.GET_AUTH_USER, (payload: any) => handle(payload.data))
}