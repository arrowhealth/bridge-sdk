/**
 * Represents the patient that is currently active
 *
 */
export interface PatientInfo {
  /**
   * Represents the universal patient id used across all providers
   */
  uid: string

  /**
   * Represents the id of the patient provided by the EMR
   */
  ehrId: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  name: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  first: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  last: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  dob: string

  /**
   * Represents the name of the patient provided by the EMR
   */
  sex: string
}
