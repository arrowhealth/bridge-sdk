/* Bridge SDK provided by Novo Health 2021-present. All rights reserved. */
var PlatformKind;

(function(PlatformKind) {
    PlatformKind["ADVANCEDMD"] = "advancedmd";
    PlatformKind["ATHENA"] = "Athena";
    PlatformKind["AZALEA"] = "azalea";
    PlatformKind["AZARA"] = "azara";
    PlatformKind["CAREECO"] = "careeco";
    PlatformKind["CLINICIENT"] = "clinicient";
    PlatformKind["CROSSTX"] = "crosstx";
    PlatformKind["ECW"] = "eCW";
    PlatformKind["ELATION"] = "Elation";
    PlatformKind["EMPOWER"] = "empower";
    PlatformKind["GGASTRO"] = "ggastro";
    PlatformKind["HENO"] = "heno";
    PlatformKind["IKNOWMED"] = "iknowmed";
    PlatformKind["NETHEALTH"] = "nethealth";
    PlatformKind["NETSMART"] = "netsmart";
    PlatformKind["NEXTGEN"] = "nextgen";
    PlatformKind["OFFICEALLY"] = "Office Ally";
    PlatformKind["ONCOEMR"] = "oncoemr";
    PlatformKind["PRACTICEFUSION"] = "practicefusion";
    PlatformKind["PROMPT"] = "prompt";
    PlatformKind["PTEVERYWHERE"] = "pteverywhere";
    PlatformKind["PTPRACTICEPRO"] = "ptpracticepro";
    PlatformKind["RAINTREE"] = "raintree";
    PlatformKind["SIRRUS"] = "sirrus";
    PlatformKind["STRATAEMR"] = "strataemr";
    PlatformKind["STRATUS"] = "stratus";
    PlatformKind["THRIVE"] = "thrive";
    PlatformKind["TEBRA"] = "tebra";
    PlatformKind["TURBOPT"] = "turbopt";
    PlatformKind["WEBPT"] = "webpt";
    PlatformKind["OTHER"] = "Other";
})(PlatformKind || (PlatformKind = {}));

var MessageKind;

(function(MessageKind) {
    MessageKind["CAPTURE_USER_EVENTS"] = "bridge::capture_user_events";
    MessageKind["CLOSE_APP"] = "bridge::close_app";
    MessageKind["DISABLE_TILE"] = "bridge::disable_tile";
    MessageKind["ENABLE_TILE"] = "bridge::enable_tile";
    MessageKind["GET_OPEN_ENCOUNTER"] = "bridge::get_open_encounter";
    MessageKind["GET_PAGE"] = "bridge::get_page";
    MessageKind["GET_PATIENT_INFO"] = "bridge::get_patient";
    MessageKind["GET_PLATFORM"] = "bridge::get_platform";
    MessageKind["HIDE_TILE"] = "bridge::hide_tile";
    MessageKind["LOGIN"] = "bridge::login";
    MessageKind["LOGOUT"] = "bridge::logout";
    MessageKind["SET_OPEN_ENCOUNTER"] = "bridge::on_open_encounter";
    MessageKind["PUSH_NOTIFICATION"] = "bridge::push_notification";
    MessageKind["RELEASE_USER_EVENTS"] = "bridge::release_user_events";
    MessageKind["SET_BADGE_COUNT"] = "bridge::set_badge_count";
    MessageKind["SET_PATIENT_INFO"] = "bridge::set_patient";
    MessageKind["SHOW_TILE"] = "bridge::show_tile";
    MessageKind["DEPRECATED_GET_AUTH_USER"] = "bridge::get_auth_user";
})(MessageKind || (MessageKind = {}));

let numSubs = 0;

function on(event, handle) {
    if (numSubs++ === 0) window.addEventListener("message", messageListener, false);
    const eventHandler = evt => handle(evt.detail, evt.detail.srcWindow);
    window.addEventListener(event, eventHandler);
    return () => {
        if (--numSubs === 0) window.removeEventListener(event, eventHandler);
    };
}

const MAGIC_VALUE = "BRIDGE_EVENT";

function messageListener(event) {
    if (typeof event.data !== "string") return;
    let payload;
    try {
        payload = JSON.parse(event.data);
    } catch (e) {
        return;
    }
    if (payload.eventType !== MAGIC_VALUE) return;
    payload.srcWindow = event.source;
    window.dispatchEvent(new CustomEvent(payload.event, {
        detail: payload
    }));
}

function send(dest, msgKind, message) {
    const messageInternal = {
        event: msgKind,
        eventType: MAGIC_VALUE,
        ...message
    };
    dest.postMessage(JSON.stringify(messageInternal), "*");
}

const inPopout = !!(window.opener && window.opener !== window);

const inIframe = !inPopout && window.parent !== window;

const inBridge = (window.name + "").includes("bridge_");

const version = "2.8.0-beta.5";

function getPage(deep = false) {
    return new Promise((resolve => {
        if (!inBridge) resolve(null);
        const off = on(MessageKind.GET_PAGE, (({data: data}) => {
            off();
            resolve(data);
        }));
        sendToParent(MessageKind.GET_PAGE, {
            deep: deep
        });
    }));
}

async function getPatient() {
    return new Promise((resolve => {
        if (!inBridge) resolve(null);
        const off = on(MessageKind.GET_PATIENT_INFO, (({data: data}) => {
            off();
            resolve(data);
        }));
        sendToParent(MessageKind.GET_PATIENT_INFO);
    }));
}

async function getPlatform() {
    return new Promise((resolve => {
        if (!inBridge) resolve(null);
        const off = on(MessageKind.GET_PLATFORM, (({data: data}) => {
            off();
            resolve(data);
        }));
        sendToParent(MessageKind.GET_PLATFORM);
    }));
}

function setBadgeCount(count = 0) {
    sendToParent(MessageKind.SET_BADGE_COUNT, count);
}

function showTile() {
    sendToParent(MessageKind.SHOW_TILE);
}

function hideTile() {
    sendToParent(MessageKind.HIDE_TILE);
}

function enableTile() {
    sendToParent(MessageKind.ENABLE_TILE);
}

function disableTile() {
    sendToParent(MessageKind.DISABLE_TILE);
}

function captureUserEvents() {
    sendToParent(MessageKind.CAPTURE_USER_EVENTS);
}

function releaseUserEvents() {
    sendToParent(MessageKind.RELEASE_USER_EVENTS);
}

function closeApp() {
    sendToParent(MessageKind.CLOSE_APP);
}

function pushNotification(notification) {
    sendToParent(MessageKind.PUSH_NOTIFICATION, notification);
}

function getOpenEncounter() {
    return new Promise((resolve => {
        if (!inBridge) resolve(null);
        const off = on(MessageKind.GET_OPEN_ENCOUNTER, (({data: data}) => {
            off();
            resolve(data);
        }));
        sendToParent(MessageKind.GET_OPEN_ENCOUNTER);
    }));
}

function onOpenEncounterChanged(cb) {
    return on(MessageKind.SET_OPEN_ENCOUNTER, (msg => cb(msg.data)));
}

function onPatientChanged(cb) {
    return on(MessageKind.SET_PATIENT_INFO, (msg => cb(msg.data)));
}

function sendToParent(messageKind, data) {
    let parentWindow = window.parent;
    if (window.opener) {
        parentWindow = window.opener;
    }
    if (window === parentWindow) {
        console.warn("Cannot post message to self. No parent window found.");
        return;
    }
    if (!window.name) {
        console.warn("No app id assigned. Cannot post request.");
        return;
    }
    send(parentWindow, messageKind, {
        appId: window.name,
        data: data
    });
}

export { PlatformKind, captureUserEvents, closeApp, disableTile, enableTile, getOpenEncounter, getPage, getPatient, getPlatform, hideTile, inBridge, inIframe, inPopout, onOpenEncounterChanged, onPatientChanged, pushNotification, releaseUserEvents, setBadgeCount, showTile, version };
