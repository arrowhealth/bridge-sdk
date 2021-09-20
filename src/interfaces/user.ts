/**
 * Represents the patient that is currently active
 *
 */
export interface UserInfo {
  /**
   * Represents the EHR user authenticated into
   */
  ehr: {
    /**
     * Represents the username of the authenticated user
     */
    username: string
  }

  bridge: {
    /**
     * Represents the auth user id
     */
    userId: string
    /**
     * Represents the auth username
     */
    username: string
  }
}
