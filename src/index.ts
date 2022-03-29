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

/**
 * Returns the version of Bridge being used within the application.
 */
export const version = '[VI]{version}[/VI]'
