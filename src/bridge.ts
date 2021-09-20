import { EVENTS, REQUESTS } from './consts'
import { onGetPatientResponse, onGetUserResponse } from './hooks/app'
import { PatientInfo, UserInfo } from './models/index'
import { emitToBridge } from './utils/mingle'
export { emitToApp, emitToBridge } from './utils/mingle'

export * from './hooks/app'
export * from './hooks/bridge'
export * from './models/index'

export function getUserInfo(): Promise<UserInfo> {
  return new Promise((resolve) => {
    const off = onGetUserResponse((user: UserInfo) => {
      off()
      resolve(user)
    })
    emitToBridge(REQUESTS.GET_USER_INFO)
  })
}

/**
 * Request from app to get the current patient
 *
 * @returns
 */
export function getPatientInfo(): Promise<PatientInfo> {
  return new Promise((resolve) => {
    const off = onGetPatientResponse((patient: PatientInfo) => {
      off()
      resolve(patient)
    })
    emitToBridge(REQUESTS.GET_PATIENT_INFO)
  })
}

/**
 * Notify bridge of a count change. Bridge will place an indicator on the icon
 * representing the application
 *
 * @param count
 *
 */
export function setBadgeCount(count: number = 0): void {
  emitToBridge(REQUESTS.SET_BADGE_COUNT, { count })
}

/**
 * Indicates if the tile should be displayed in the toolbar.
 *
 * @param visible
 */
export function showTile(visible: Boolean = true) {
  emitToBridge(REQUESTS.SHOW_TILE, { visible })
}

/**
 * Used by tile to open the associated application
 */
export function openApp(settings: any = {}) {
  emitToBridge(REQUESTS.OPEN_APP, settings)
}

/**
 * Used by tile to close the associated application
 */
export function closeApp() {
  emitToBridge(REQUESTS.CLOSE_APP)
}

/**
 * Notify bridge of a notification. Bridge will add the notification to the notifications array
 * with icon representing the application
 *
 * @param count
 *
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
