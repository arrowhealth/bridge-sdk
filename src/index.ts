import * as consts from './consts'
export * from './interfaces'
export * from './app'



/**
 * $$ represents the functionaly used to establish setup and SSO.
 * @private
 */
export * as $$ from './internal'

/**
 * $ represents the requests bridge receives from hosted applications.
 * @private
 */
export * as $ from './platform'

/*
 * Indicates if application is running inside of popout
*/
export const inPopout = consts.inPopout

/**
 * Indicates if application is running inside of iframe
 */
export const inIframe = consts.inIframe

/**
 * Indicates if application is running inside of Bridge
 */
export const inBridge = consts.inBridge

/**
 * Returns the version of Bridge being used within the application.
 */
export const version = consts.version
