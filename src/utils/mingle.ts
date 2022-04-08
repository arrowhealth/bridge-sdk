const PARENT_ORIGIN = '*'
const CHILD_ORIGIN = '*'
const EVENT_TYPE = 'BRIDGE_EVENT'

export interface Request {
  appId: string
  event: string
  win: Window
  data?: any
}

/**
 * @private
 */
export const emitToChild = (win: Window, event: string, data?: any) => {
  if (win && win.postMessage) {
    win.postMessage(
      JSON.stringify({
        data,
        event,
        eventType: EVENT_TYPE,
      }),
      CHILD_ORIGIN
    )
  } else {
    console.warn('[ BRIDGE SDK ] :: emitToChild is missing required "win" param')
  }
}

/**
 * @private
 */
export const emitToParent = (event: string, data?: any) => {
  // window.parent for iframe
  let win = window.parent
  // if window.opener exists then it is a popup and needs to use the opener
  if (window.opener) {
    win = window.opener
  }
  if (window === win) {
    console.warn('Cannot post message to self. No parent window found.')
    return
  }
  if(!window.name) {
    console.warn('No app id assigned. Cannot post request.')
    return
  }
  // sends the appId from the window name with message to Bridge
  win.postMessage(
    JSON.stringify({
      appId: window.name,
      data,
      event,
      eventType: EVENT_TYPE,
    }),
    PARENT_ORIGIN
  )
}

export const on = (event: string, handle: (request: Request) => void): Function => {
  const eventHandler = (evt: CustomEvent) => {
    handle(evt.detail || {})
  }
  window.addEventListener(event, eventHandler)

  return () => {
    return window.removeEventListener(event, eventHandler)
  }
}

window.addEventListener(
  'message',
  (evt) => {
    let payload: any
    try {
      if (typeof evt.data === 'string') {
        payload = JSON.parse(evt.data)
        payload.win = evt.source
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
