const PREFIX = 'bridge::'

/**
 * @private
 */
export const REQUESTS = {
  PUSH_NOTIFICATION: PREFIX + 'push_notification',
  GET_APP_CONFIG: PREFIX + 'get_app_config',
  GET_APP_STATUS: PREFIX + 'get_app_status',
  CLOSE_APP: PREFIX + 'close_app',
  OPEN_APP: PREFIX + 'open_app',
  GET_AUTH_USER: PREFIX + 'get_auth_user',
  GET_USER_SESSION: PREFIX + 'get_user_session',
  GET_PATIENT_INFO: PREFIX + 'get_patient_info',
  SET_BADGE_COUNT: PREFIX + 'set_badge_count',
  SHOW_TILE: PREFIX + 'show_tile',
  HIDE_TILE: PREFIX + 'hide_tile',
}

/**
 * @private
 */
export const RESPONSE = REQUESTS

/**
 * @private
 */
export const EVENTS = {
  AUTH_USER_CHANGED: PREFIX + 'auth_user_changed',
  APP_STATUS_CHANGED: PREFIX + 'app_status_changed',
  ORG_CHANGED: PREFIX + 'org_changed',
  PATIENT_CHANGED: PREFIX + 'patient_changed',
}
