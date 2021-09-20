const PARENT_ORIGIN = '*'
const CHILD_ORIGIN = '*'
const EVENT_TYPE = 'BRIDGE_EVENT'

/**
 * @private
 */
export const emitToApp = (app: Window, event: string, data?: any) => {
  app.postMessage(
    JSON.stringify({
      data,
      event,
      eventType: EVENT_TYPE,
    }),
    CHILD_ORIGIN
  )
}

/**
 * @private
 */
export const emitToBridge = (event: string, data?: any) => {
  // window.parent for iframe
  let win = window.parent

  // if window.opener exists then it is a popup and needs to use the opener
  if (window.opener) {
    win = window.opener
  }
  // send the appId from the window name with message to bridge
  win.postMessage(
    JSON.stringify({
      data: {
        ...data,
        appId: window.name,
      },
      event,
      eventType: EVENT_TYPE,
    }),
    PARENT_ORIGIN
  )
}

export const on = (event: string, handle: Function): Function => {
  const f = (payload: any) => {
    handle(payload)
  }
  window.addEventListener(event, (evt: CustomEvent) => {
    f(evt.detail || {})
  })

  return () => {
    return window.removeEventListener(event, f)
  }
}

window.addEventListener(
  'message',
  (evt) => {
    let payload: any
    try {
      if (typeof evt.data === 'string') {
        payload = JSON.parse(evt.data)
        payload.app = evt.source
        if (payload.eventType === EVENT_TYPE) {
          window.dispatchEvent(
            new CustomEvent(payload.event, { detail: payload })
          )
        }
      }
    } catch (e) {
      // console.warn('[ MINGLE PARSING EVENT DATA ] ::', evt.data)
    }
  },
  false
)
