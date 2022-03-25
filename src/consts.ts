const PREFIX = 'bridge::'

/**
 * @private
 */
export const EVENTS = {
  GET_ORG: PREFIX + 'get_org',
  SET_ORG: PREFIX + 'set_org',

  PUSH_NOTIFICATION: PREFIX + 'push_notification',
  
  GET_AUTH_STATUS: PREFIX + 'get_auth_status',
  SET_AUTH_STATUS: PREFIX + 'set_auth_status',

  OPEN_APP: PREFIX + 'open_app',
  CLOSE_APP: PREFIX + 'close_app',
  
  GET_AUTH_USER: PREFIX + 'get_auth_user',
  SET_AUTH_USER: PREFIX + 'set_auth_user',

  GET_USER_SESSION: PREFIX + 'get_user_session',

  GET_PATIENT_INFO: PREFIX + 'get_patient',
  SET_PATIENT_INFO: PREFIX + 'set_patient',

  SET_BADGE_COUNT: PREFIX + 'set_badge_count',

  SHOW_TILE: PREFIX + 'show_tile',
  HIDE_TILE: PREFIX + 'hide_tile',
}
