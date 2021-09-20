import { EVENTS, RESPONSE } from '../consts'
import { PatientInfo } from '../models/patient'
import { UserInfo } from '../models/user'
import { on } from '../utils/mingle'

/**
 * Subscribe to the patient change event
 *
 * @param handle
 *
 * @private
 */
export const onPatientChanged = (
  handle: (patient: PatientInfo) => void
): Function => {
  return on(EVENTS.PATIENT_CHANGED, handle)
}

/**
 * @private
 */
export const onGetPatientResponse = (
  handle: (patient: PatientInfo) => void
): Function => {
  return on(RESPONSE.GET_PATIENT_INFO, handle)
}
/**
 * @private
 */
export const onGetUserResponse = (handle: (user: UserInfo) => void): Function => {
  return on(RESPONSE.GET_USER_INFO, handle)
}
