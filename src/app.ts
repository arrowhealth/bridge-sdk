import { EVENTS, inBridge } from './consts'
import { emitToParent, on } from './utils/mingle'
import { AuthStatus, AuthUser, Patient, PushNotification } from './interfaces'

/**
 * Return user session info
 *
 * @returns
 */
export function getAuthUser(): Promise<AuthUser> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_AUTH_USER, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_AUTH_USER)
  })
}

/**
 * Get the current patient being displayed. This is typically used on application
 * initialization and thereafter onPatientChanged() is used to listen for additional
 * changes.
 *
 * @returns
 */
export const getPatient = async (): Promise<Patient> => {
  return new Promise(resolve => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_PATIENT_INFO, ({ data }) => {
      off()
      resolve(data)
    })
    emitToParent(EVENTS.GET_PATIENT_INFO)
  })
}

/**
 * Sets the badge count on the tile. Setting the value to 0 will cause it to go away
 *
 * @param count
 *
 */
export function setBadgeCount(count: number = 0): void {
  emitToParent(EVENTS.SET_BADGE_COUNT, count)
}

/**
 * Shows tile. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function showTile() {
  emitToParent(EVENTS.SHOW_TILE)
}

/**
 * Hide tile. Controlled by a Smart Tile tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function hideTile() {
  emitToParent(EVENTS.HIDE_TILE)
}

/**
 * Enables tile allowing event handling. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function enableTile() {
  emitToParent(EVENTS.ENABLE_TILE)
}

/**
 * Disables tile preventing user events. Controlled by a Smart Tile tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
export function disableTile() {
  emitToParent(EVENTS.DISABLE_TILE)
}

/**
 * Returns the status of the application known to Bridge set by application
 */
export function getAuthStatus(): Promise<AuthStatus> {
  return new Promise((resolve) => {
    if (!inBridge) resolve(null)
    const off = on(EVENTS.GET_AUTH_STATUS, ({ data }) => {
      off()
      resolve(data || 'ready')
    })
    emitToParent(EVENTS.GET_AUTH_STATUS)
  })
}

/**
 * Tells Bidge when authentication is complete. Set isAuthenticated
 * to false when authentication is required. This will open the
 * authentication panel where you have declared your Authentication
 * page.
 *
 * @param status
 */
export function setAuthStatus(status: AuthStatus) {
  emitToParent(EVENTS.SET_AUTH_STATUS, status)
}

/**
 * Smart tile request to capture user events. Bridge will not open an application while
 * tile is capturing user events.
 */
export function captureUserEvents() {
  emitToParent(EVENTS.CAPTURE_USER_EVENTS)
}

/**
 * Smart tile returns the capturing user events back to Bridge. Bridge can only open
 * application when Bridge is capturing user events.
 */
export function releaseUserEvents() {
  emitToParent(EVENTS.RELEASE_USER_EVENTS)
}

/**
 * Closes app making the request. The tile can also call this and it will close the linked application.
 */
export function closeApp() {
  emitToParent(EVENTS.CLOSE_APP)
}

/**
 * Bridge will add the notification to the notifications array
 * with icon representing the application
 *
 * @param text Message to display
 * @param patientId EHR patient ID
 */
export function pushNotification(notification: PushNotification): void {
  emitToParent(EVENTS.PUSH_NOTIFICATION, notification)
}

/**
 * Subscribe to the patient change event
 *
 * @param handle
 * @returns off
 */
export function onPatientChanged(
  handle: (patient: Patient) => void
): Function {
  return on(EVENTS.SET_PATIENT_INFO, (payload: any) => handle(payload.data))
}
