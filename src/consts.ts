const EVENT_PREFIX = 'bridge::'
const WINDOW_PREFIX = 'bridge_'

/**
 * Indicates if application is running inside of popout
 */
export const inPopout: boolean = !!(window.opener && window.opener !== window)

/**
 * Indicates if application is running inside of iframe
 */
export const inIframe: boolean = !inPopout && window.parent !== window

/**
 * Indicates if application is running inside of Bridge
 */
export const inBridge: boolean = (window.name + '').includes(WINDOW_PREFIX)

/**
 * Indicates the current version
 */
export const version = '[VI]{version}[/VI]'

/**
 * @private
 */
export const EVENTS = {
  GET_ORG: EVENT_PREFIX + 'get_org',
  SET_ORG: EVENT_PREFIX + 'set_org',

  PUSH_NOTIFICATION: EVENT_PREFIX + 'push_notification',

  GET_AUTH_STATUS: EVENT_PREFIX + 'get_auth_status',
  SET_AUTH_STATUS: EVENT_PREFIX + 'set_auth_status',

  OPEN_APP: EVENT_PREFIX + 'open_app',
  CLOSE_APP: EVENT_PREFIX + 'close_app',

  CAPTURE_USER_EVENTS: EVENT_PREFIX + 'capture_user_events',
  RELEASE_USER_EVENTS: EVENT_PREFIX + 'release_user_events',

  GET_AUTH_USER: EVENT_PREFIX + 'get_auth_user',
  SET_AUTH_USER: EVENT_PREFIX + 'set_auth_user',

  GET_USER_SESSION: EVENT_PREFIX + 'get_user_session',

  GET_PATIENT_INFO: EVENT_PREFIX + 'get_patient',
  SET_PATIENT_INFO: EVENT_PREFIX + 'set_patient',

  SET_BADGE_COUNT: EVENT_PREFIX + 'set_badge_count',

  SHOW_TILE: EVENT_PREFIX + 'show_tile',
  HIDE_TILE: EVENT_PREFIX + 'hide_tile',

  ENABLE_TILE: EVENT_PREFIX + 'enable_tile',
  DISABLE_TILE: EVENT_PREFIX + 'disable_tile',

  PROXY_READY: EVENT_PREFIX + 'proxy_ready',

  GET_PAGE_DETAILS: EVENT_PREFIX + 'get_page_details',

  CLEAR_CACHE: EVENT_PREFIX + 'clear_cache',

  GET_PAGE: EVENT_PREFIX + 'get_page',
  GET_PLATFORM: EVENT_PREFIX + 'get_platform',
  SET_PLATFORM_DATA: EVENT_PREFIX + 'set_platform_data',
}
