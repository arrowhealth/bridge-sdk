/**
 * Represents the patient that is currently active
 *
 */
export interface UserInfo {
  /**
   * Represents the EHR authenticated user
   */
  ehr: {
    username: string
  }

  /**
   * Represents the Bridge authenticated user
   */
  bridge: {
    userId: string
    username: string
  }
}
