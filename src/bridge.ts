import { EVENTS, REQUESTS } from './consts'
import {
  onGetPatientInfoResponse,
  onGetSessionInfoResponse as onGetSessionInfoResponse,
} from './hooks/app'
import { PatientInfo, SessionInfo, AuthStatus } from './interfaces/index'
import { emitToBridge } from './utils/mingle'
export { emitToApp, emitToBridge } from './utils/mingle'

export * from './hooks/app'
export * from './hooks/bridge'
export * from './interfaces/index'

/**
 * Return user session info
 *
 * @returns
 */
export function getSessionInfo(): Promise<SessionInfo> {
  return new Promise((resolve) => {
    const off = onGetSessionInfoResponse((sessionInfo: SessionInfo) => {
      off()
      resolve(sessionInfo)
    })
    emitToBridge(REQUESTS.GET_SESSION_INFO)
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
    emitToBridge(REQUESTS.GET_PATIENT_INFO)
  })
}

/**
 * Sets the badge count on the tile. Setting the value to 0 will cause it to go away
 *
 * @param count
 *
 */
export function setBadgeCount(count: number = 0): void {
  emitToBridge(REQUESTS.SET_BADGE_COUNT, { count })
}

/**
 * Show or hide the tile. This is controlled by the tile itself based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 *
 * @param visible
 */
export function showTile(visible: Boolean = true) {
  emitToBridge(REQUESTS.SHOW_TILE, { visible })
}

/**
 * Tells bridge when authentication is complete. Set isAuthenticated
 * to false when authentication is required. This will open the
 * authentication panel where you have declared your Authentication
 * page.
 *
 * @param status
 * @default { isAuthenticated: true }
 */
export function updateAuthStatus(
  status: AuthStatus = { isAuthenticated: false }
) {
  emitToBridge(EVENTS.APP_UPDATE_AUTH_STATUS, status)
}

/**
 * Used by tile to open linked application.
 */
export function openApp(settings: any = {}) {
  emitToBridge(REQUESTS.OPEN_APP, settings)
}

/**
 * Closes app making the request. The tile can also call this and it will close the linked application.
 */
export function closeApp() {
  emitToBridge(REQUESTS.CLOSE_APP)
}

/**
 * Bridge will add the notification to the notifications array
 * with icon representing the application
 *
 * @param text Message to display
 * @param patientId EHR patient ID
 */
export function addNotification(text: string, patientId?: any): void {
  emitToBridge(REQUESTS.ADD_NOTIFICATION, { patientId, text })
}

window.addEventListener(
  'load',
  () => {
    if (window.opener) {
      window.addEventListener(
        'beforeunload',
        (evt) => {
          evt.preventDefault()
          emitToBridge(EVENTS.APP_CLOSED, { name: window.name })
          return true
        },
        true
      )
    }
  },
  { capture: true }
)
