/**
 * Represents the patient that is currently active
 *
 */
export interface SessionInfo {
  /**
   * Application Bridge resides in
   */
  appId: string
  /**
   * App auth Username
   */
  username: string
  /**
   * Bridge User ID
   */
  bridgeUserId: string
  /**
   * Bridge Auth Username
   */
  bridgeUsername: string
  /**
   * @private For internal use only
   */
  $: string
}
