/**
 * Represents the patient that is currently active
 *
 */
export interface AppInfo {
  name: string
  /**
   * Represents the authenticated App user
   */
  appUser: {
    username: string
  }

  /**
   * Represents the authenticated Bridge user
   */
  bridgeUser: {
    userId: string
    username: string
  }
  /**
   * Used internally by Bridge to validate information
   */
  checksum: string
}
