/**
 * Represents the patient that is currently active
 *
 */
export interface PatientInfo {
  /**
   * Represents the universal patient id generated provided by Bridge used across all providers
   */
  // uid: string

  /**
   * Represents the ID of the patient provided by the EMR
   */
  ehrId: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  name: string

  /**
   * Represents the first name of the patient provided by the EMR
   */
  first: string

  /**
   * Represents the last name of the patient provided by the EMR
   */
  last: string

  /**
   * Represents the DOB (Date of Birth) of the patient provided by the EMR
   */
  dob: string

  /**
   * Represents the sex of the patient provided by the EMR
   */
  sex: string
}
