/**
 * Indicates the current status auth status of application.
 * Only applies to applications using SSO through authUrl
 *
 * *"pending"* - initial state of application using SSO via Auth URL<br>
 * *"require"* - indicates the application requires user to authenticate in order for application to work properly<br>
 * *"fail"* - an unrecoverable failure occurred. application cannot authenticate at this time.<br>
 * *"pass"* - state of application once authentication succeeds. Needs to be set by apps using Auth URL.<br>
 */
export declare type AuthStatus = 'pending' | 'require' | 'fail' | 'pass'

/**
 * Bridge Authenticated User
 */
export declare interface AuthUser {
  /**
    * Bridge User ID
    */
  id: string
  /**
   * First name of authenticated user. *(May not be present)*
   */
  firstName?: string
  /**
   * Last name of authenticated user. *(May not be present)*
   */
  lastName?: string
  /**
   * Bridge username *(requires permission to access)*
   */
  email?: string
}

export declare interface LoginResult {
  success?: boolean
  unknownUser?: boolean
  invalidPw?: boolean
  error?: string
  id?: string
  email?: string
}

/**
 * Represents the current page being viewed in the EHR.
 */
export declare interface Page {
    html: string;
    href: string;
    frames: Page[];
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
   * EHR Alternative Patient IDs
   */
  altIds?: string[]

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
 * //TODO: Experimental. Not implemented
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

/**
 * Information about the platform Bridge is running on. `data` is platform specific.
 */
export declare interface Platform {
  kind: PlatformKind
  username?: string
  data?: any
}

export enum PlatformKind {
  Other = "Other",
  Athena = "Athena",
  eCW = "eCW"
}

export declare interface PushNotification {
  /**
   * Text to display in notification
   */
  text: string;
  /**
   * Open associated application when notification is clicked. *(Default: true)*
   */
  openOnClick?: boolean;
}

/**
 * Extension runtime details used for various operations such as debugging and support
 * @private
 */
export declare interface RuntimeDetails {
  /**
   * Extension name
   */
  name: string
  /**
   * Extension version
   */
  version: string
  /**
   * Extension Origin
   */
  origin: string
  /**
   * Browser is in incognito mode
   */
  incognito: boolean
  /**
   * Page title
   */
  pageTitle: string
  /**
   * Page origin
   */
  pageOrigin: string
}