/* Bridge SDK provided by Novo Health 2021-present. All rights reserved. */
class Bus {
    handlers=new Map;
    emit(key, data) {
        for (const handler of [ ...this.handlers.get(key) ?? [] ]) {
            try {
                handler(data);
            } catch (err) {
                console.error(`bus: handler for ${key} threw`, err);
            }
        }
    }
    on(key, handler) {
        let set = this.handlers.get(key);
        if (!set) this.handlers.set(key, set = new Set);
        set.add(handler);
        return () => {
            set.delete(handler);
            if (set.size === 0 && this.handlers.get(key) === set) this.handlers.delete(key);
        };
    }
}

var bus$1 = new Bus;

var PlatformKind;

(function(PlatformKind) {
    PlatformKind["ADVANCEDMD"] = "advancedmd";
    PlatformKind["ATHELAS"] = "athelas";
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
    PlatformKind["HELLONOTE"] = "hellonote";
    PlatformKind["HENO"] = "heno";
    PlatformKind["IKNOWMED"] = "iknowmed";
    PlatformKind["MATRIXCARE"] = "matrixcare";
    PlatformKind["MEDITECH"] = "meditech";
    PlatformKind["MODMED"] = "modmed";
    PlatformKind["NETHEALTH"] = "nethealth";
    PlatformKind["NETSMART"] = "netsmart";
    PlatformKind["NEXTGEN"] = "nextgen";
    PlatformKind["OFFICEALLY"] = "Office Ally";
    PlatformKind["ONCOEMR"] = "oncoemr";
    PlatformKind["POINTCLICKCARE"] = "pointclickcare";
    PlatformKind["PRACTICEFUSION"] = "practicefusion";
    PlatformKind["PROMPT"] = "prompt";
    PlatformKind["PTEVERYWHERE"] = "pteverywhere";
    PlatformKind["PTPRACTICEPRO"] = "ptpracticepro";
    PlatformKind["RAINTREE"] = "raintree";
    PlatformKind["SIRRUS"] = "sirrus";
    PlatformKind["SPRYPT"] = "sprypt";
    PlatformKind["STRATAEMR"] = "strataemr";
    PlatformKind["STRATUS"] = "stratus";
    PlatformKind["STRIDE"] = "stride";
    PlatformKind["THRIVE"] = "thrive";
    PlatformKind["TEBRA"] = "tebra";
    PlatformKind["TOUCHWORKS"] = "touchworks";
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
    MessageKind["GET_BRIDGE_VERSION"] = "bridge::get_bridge_version";
    MessageKind["GET_OPEN_ENCOUNTER"] = "bridge::get_open_encounter";
    MessageKind["GET_PAGE"] = "bridge::get_page";
    MessageKind["GET_PATIENT_INFO"] = "bridge::get_patient";
    MessageKind["GET_PLATFORM"] = "bridge::get_platform";
    MessageKind["HIDE_TILE"] = "bridge::hide_tile";
    MessageKind["LOGIN"] = "bridge::login";
    MessageKind["LOGOUT"] = "bridge::logout";
    MessageKind["SET_OPEN_ENCOUNTER"] = "bridge::set_open_encounter";
    MessageKind["PUSH_NOTIFICATION"] = "bridge::push_notification";
    MessageKind["RELEASE_USER_EVENTS"] = "bridge::release_user_events";
    MessageKind["SET_BADGE_COUNT"] = "bridge::set_badge_count";
    MessageKind["SET_PATIENT_INFO"] = "bridge::set_patient";
    MessageKind["SHOW_TILE"] = "bridge::show_tile";
    MessageKind["DEPRECATED_GET_AUTH_USER"] = "bridge::get_auth_user";
})(MessageKind || (MessageKind = {}));

var MessageKind$1 = MessageKind;

const version = "2.11.1";

const MAGIC_VALUE$1 = "BRIDGE_EVENT";

const bus = new Bus;

let bridgeReqHandler$1;

function setBridgeReqHandler$1(handler) {
    bridgeReqHandler$1 = handler;
}

function send$2(kind, data) {
    const msg = {
        event: kind,
        eventType: MAGIC_VALUE$1,
        appId: window.name,
        data: data,
        sdkVersion: version
    };
    window.parent.postMessage(JSON.stringify(msg), "*");
}

function sendAwaitResp$2(kind, data, timeoutMs = 5e3) {
    return new Promise((resolve, reject) => {
        const off = bus.on(kind, data => {
            clearTimeout(timer);
            off();
            resolve(data);
        });
        const timer = setTimeout(() => {
            off();
            reject(new Error(`timeout waiting for ${kind} response from Bridge`));
        }, timeoutMs);
        send$2(kind, data);
    });
}

window.addEventListener("message", event => {
    if (typeof event.data !== "string") return;
    let payload;
    try {
        payload = JSON.parse(event.data);
    } catch {
        return;
    }
    if (payload.eventType !== MAGIC_VALUE$1) return;
    if (payload.event === MessageKind$1.SET_OPEN_ENCOUNTER || payload.event === MessageKind$1.SET_PATIENT_INFO) {
        bridgeReqHandler$1?.(payload.event, payload.data);
        return;
    }
    bus.emit(payload.event, payload.data);
});

var v1 = Object.freeze({
    __proto__: null,
    send: send$2,
    sendAwaitResp: sendAwaitResp$2,
    setBridgeReqHandler: setBridgeReqHandler$1
});

const MAGIC_VALUE = "BRIDGE_EVENT";

let msgId = 0;

const awaitingResp = new Map;

let bridgeReqHandler;

function setBridgeReqHandler(handler) {
    bridgeReqHandler = handler;
}

function send$1(kind, data) {
    const msg = {
        id: msgId++,
        v: 2,
        kind: kind,
        magicValue: MAGIC_VALUE,
        data: data,
        sdkVersion: version
    };
    window.parent.postMessage(msg, "*");
}

function sendAwaitResp$1(kind, data, timeoutMs = 5e3) {
    const id = msgId++;
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            awaitingResp.delete(id);
            reject(new Error(`timeout waiting for ${kind} response (v2) from Bridge`));
        }, timeoutMs);
        const cb = data => {
            clearTimeout(timer);
            awaitingResp.delete(id);
            resolve(data);
        };
        awaitingResp.set(id, cb);
        const msg = {
            id: id,
            v: 2,
            kind: kind,
            magicValue: MAGIC_VALUE,
            data: data,
            sdkVersion: version
        };
        window.parent.postMessage(msg, "*");
    });
}

window.addEventListener("message", ev => {
    const msg = ev.data;
    if (msg?.v !== 2 || msg?.magicValue !== MAGIC_VALUE) {
        return;
    }
    if ("id" in msg) {
        bridgeReqHandler?.(msg.kind, msg.data);
        return;
    }
    if ("respId" in msg) {
        awaitingResp.get(msg.respId)?.(msg.data);
        return;
    }
});

var v2 = Object.freeze({
    __proto__: null,
    send: send$1,
    sendAwaitResp: sendAwaitResp$1,
    setBridgeReqHandler: setBridgeReqHandler
});

const v = (async () => {
    try {
        await sendAwaitResp$1(MessageKind$1.GET_PLATFORM, undefined, 1e3);
        return v2;
    } catch {
        return v1;
    }
})();

async function send(kind, data) {
    (await v).send(kind, data);
}

async function sendAwaitResp(kind, data, timeoutMs = 5e3) {
    return (await v).sendAwaitResp(kind, data, timeoutMs);
}

v.then(v => {
    v.setBridgeReqHandler((kind, data) => bus$1.emit(kind, data));
});

const inBridge = (window.name + "").includes("bridge_");

function getBridgeVersion() {
    const cache = getBridgeVersion;
    return cache.p ??= sendAwaitResp(MessageKind$1.GET_BRIDGE_VERSION);
}

function getPage(deep = false) {
    return sendAwaitResp(MessageKind$1.GET_PAGE, {
        deep: deep
    });
}

async function getPatient() {
    return sendAwaitResp(MessageKind$1.GET_PATIENT_INFO);
}

async function getPlatform() {
    return sendAwaitResp(MessageKind$1.GET_PLATFORM);
}

function setBadgeCount(count = 0) {
    send(MessageKind$1.SET_BADGE_COUNT, count);
}

function showTile() {
    send(MessageKind$1.SHOW_TILE);
}

function hideTile() {
    send(MessageKind$1.HIDE_TILE);
}

function enableTile() {
    send(MessageKind$1.ENABLE_TILE);
}

function disableTile() {
    send(MessageKind$1.DISABLE_TILE);
}

function captureUserEvents() {
    send(MessageKind$1.CAPTURE_USER_EVENTS);
}

function releaseUserEvents() {
    send(MessageKind$1.RELEASE_USER_EVENTS);
}

function closeApp() {
    send(MessageKind$1.CLOSE_APP);
}

function pushNotification(notification) {
    send(MessageKind$1.PUSH_NOTIFICATION, {
        data: notification
    });
}

function getOpenEncounter() {
    return sendAwaitResp(MessageKind$1.GET_OPEN_ENCOUNTER);
}

function onOpenEncounterChanged(cb) {
    getOpenEncounter().then(cb);
    return bus$1.on(MessageKind$1.SET_OPEN_ENCOUNTER, data => cb(data));
}

function onPatientChanged(cb) {
    getPatient().then(cb);
    return bus$1.on(MessageKind$1.SET_PATIENT_INFO, data => cb(data));
}

export { PlatformKind, captureUserEvents, closeApp, disableTile, enableTile, getBridgeVersion, getOpenEncounter, getPage, getPatient, getPlatform, hideTile, inBridge, onOpenEncounterChanged, onPatientChanged, pushNotification, releaseUserEvents, setBadgeCount, showTile };
