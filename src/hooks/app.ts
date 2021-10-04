import { EVENTS, RESPONSE } from '../consts'
import { PatientInfo } from '../interfaces/patient'
import { SessionInfo } from '../interfaces/session'
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
  return on(EVENTS.PATIENT_CHANGED, (payload: any) => handle(payload.data))
}

/**
 * @private
 */
export function onGetPatientInfoResponse(
  handle: (patient: PatientInfo) => void
): Function {
  return on(RESPONSE.GET_PATIENT_INFO, (payload: any) => handle(payload.data))
}
/**
 * @private
 */
export function onGetSessionInfoResponse(
  handle: (appInfo: SessionInfo) => void
): Function {
  return on(RESPONSE.GET_SESSION_INFO, (payload: any) => handle(payload.data))
}
