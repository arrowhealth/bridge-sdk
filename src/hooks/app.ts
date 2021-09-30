import { EVENTS, RESPONSE } from '../consts'
import { PatientInfo } from '../interfaces/patient'
import { AppInfo } from '../interfaces/app'
import { on } from '../utils/mingle'

/**
 * Subscribe to the patient change event
 *
 * @param handle
 *
 */
export function onPatientChanged(
  handle: (patient: PatientInfo) => void
): Function {
  return on(EVENTS.PATIENT_CHANGED, handle)
}

/**
 * @private
 */
export function onGetPatientResponse(
  handle: (patient: PatientInfo) => void
): Function {
  return on(RESPONSE.GET_PATIENT_INFO, handle)
}
/**
 * @private
 */
export function onGetAppResponse(handle: (appInfo: AppInfo) => void): Function {
  return on(RESPONSE.GET_USER_INFO, handle)
}
