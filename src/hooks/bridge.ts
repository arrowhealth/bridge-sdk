import { EVENTS, REQUESTS } from '../consts'
import { emitToApp, on } from '../utils/mingle'

/**
 * @private
 */
export const setPatientInfo = (app: Window, data?: any) => {
  emitToApp(app, EVENTS.PATIENT_CHANGED, data)
}

/**
 * @private
 */
export const onAppAuthStatusChanged = (handle: Function): Function => {
  return on(EVENTS.APP_UPDATE_AUTH_STATUS, handle)
}

/**
 * @private
 */
export const onAppClosed = (handle: Function): Function => {
  return on(EVENTS.APP_CLOSED, handle)
}

/**
 * @private
 */
export const onOpenAppRequest = (handle: Function): Function => {
  return on(REQUESTS.OPEN_APP, handle)
}
/**
 * @private
 */
export const onGetPatientInfoRequest = (handle: Function): Function => {
  return on(REQUESTS.GET_PATIENT_INFO, handle)
}
/**
 * @private
 */
export const onGetSessionInfoRequest = (handle: Function): Function => {
  return on(REQUESTS.GET_SESSION_INFO, handle)
}
/**
 * @private
 */
export const onSetBadgeCountRequest = (handle: Function): Function => {
  return on(REQUESTS.SET_BADGE_COUNT, handle)
}
/**
 * @private
 */
export const onAddNotificationRequest = (handle: Function): Function => {
  return on(REQUESTS.ADD_NOTIFICATION, handle)
}

/**
 * @private
 */
export const onShowTileRequest = (handle: Function): Function => {
  return on(REQUESTS.SHOW_TILE, handle)
}
