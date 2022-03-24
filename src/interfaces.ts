/**
 * Indicates the current status auth status of application.
 * Only applies to applications using SSO through authUrl
 * 
 * ready - enables the tile for use
 * auth_required - displays a special badge on tile to indicate failed in SSO and needs to be addressed by user
 */
export declare interface AppStatus {
  status: 'ready' | 'auth_required'
}

/**
 * Bridge Authenticated User
 *
 */
export declare interface AuthUser {
  /**
    * Bridge User ID
    */
  id: string
  /**
   * First name of authenticated user
   */
  firstName?: string
  /**
   * Last name of authenticated user
   */
  lastName?: string
}

/**
 * Represents user authenticated by application (EHR)
 * @private
 */
export declare interface UserSession {
  /**
   * Realm is the connection name of the application used to log into
   */
  realm: string
  /**
   * username
   */
  username: string
  /**
   * password hash
   */
  passwordHash: string
}

/**
 * User session
 * @private
 */
export declare interface Org {
  /**
    * Org ID
    */
  id: string
}

/**
 * Represents the Patient being viewed in the EHR
 *
 */
export declare interface Patient {
  /**
   * EHR Patient ID
   */
  id: string

  /**
   * Patient's first name
   */
  first?: string

  /**
   * Patient's last name
   */
  last?: string

  /**
   * Patient's date of birth (DD/MM//YYYY)
   */
  dob?: string

  /**
   * Patient's sex
   */
  sex?: 'M' | 'F'
}

/**
 * TODO: Experimental. Not implemented
 * 
 * @private
 */
export declare interface PatientDetail {
  /**
   * EHR Patient ID
   */
  id: string

  /**
   * The type of detail
   */
  type: string

  /**
   * 
   */
  data: string
}
