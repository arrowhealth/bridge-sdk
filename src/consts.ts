const PREFIX = 'bridge::'

/**
 * @private
 */
export const REQUESTS = {
  ADD_NOTIFICATION: PREFIX + 'add_notification',
  GET_CONFIG_INFO: PREFIX + 'get_config',
  CLOSE_APP: PREFIX + 'close_app',
  OPEN_APP: PREFIX + 'open_app',
  GET_SESSION_INFO: PREFIX + 'get_session_info',
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
  APP_UPDATE_AUTH_STATUS: PREFIX + 'app_update_auth_status',
  BRIDGE_CLOSED: PREFIX + 'bridge_closed',
  PATIENT_CHANGED: PREFIX + 'patient_changed',
}
