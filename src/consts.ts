const PREFIX = 'bridge::'

/**
 * @private
 */
export const REQUESTS = {
  ADD_NOTIFICATION: PREFIX + 'add_notification',
  CLOSE_APP: PREFIX + 'close_app',
  OPEN_APP: PREFIX + 'open_app',
  GET_APP_INFO: PREFIX + 'get_app_info',
  GET_PATIENT_INFO: PREFIX + 'get_patient_info',
  SET_BADGE_COUNT: PREFIX + 'set_badge_count',
  SHOW_TILE: PREFIX + 'show_tile',
}

/**
 * @private
 */
export const RESPONSE = REQUESTS

/**
 * @private
 */
export const EVENTS = {
  APP_CLOSED: PREFIX + 'app_closed',
  BRIDGE_CLOSED: PREFIX + 'bridge_closed',
  PATIENT_CHANGED: PREFIX + 'patient_changed',
}
