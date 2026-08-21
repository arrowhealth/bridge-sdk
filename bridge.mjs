/* Bridge SDK provided by Novo Health 2021-present. All rights reserved. */
class Bus {
    handlers=new Map;
    emit(key, ...[data]) {
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

var Kind;

(function(Kind) {
    Kind["CAPTURE_USER_EVENTS"] = "bridge::capture_user_events";
    Kind["RELEASE_USER_EVENTS"] = "bridge::release_user_events";
    Kind["CLOSE_APP"] = "bridge::close_app";
    Kind["DISABLE_TILE"] = "bridge::disable_tile";
    Kind["ENABLE_TILE"] = "bridge::enable_tile";
    Kind["HIDE_TILE"] = "bridge::hide_tile";
    Kind["SHOW_TILE"] = "bridge::show_tile";
    Kind["PUSH_NOTIFICATION"] = "bridge::push_notification";
    Kind["SET_BADGE_COUNT"] = "bridge::set_badge_count";
    Kind["GET_BRIDGE_VERSION"] = "bridge::get_bridge_version";
    Kind["GET_OPEN_ENCOUNTER"] = "bridge::get_open_encounter";
    Kind["GET_PAGE"] = "bridge::get_page";
    Kind["GET_PATIENT_INFO"] = "bridge::get_patient";
    Kind["GET_PLATFORM"] = "bridge::get_platform";
    Kind["SET_OPEN_ENCOUNTER"] = "bridge::set_open_encounter";
    Kind["SET_PATIENT_INFO"] = "bridge::set_patient";
    Kind["DEPRECATED_GET_AUTH_USER"] = "bridge::get_auth_user";
})(Kind || (Kind = {}));

const MAGIC_VALUE = "BRIDGE_EVENT";

const version = "2.12.0";

const bus = new Bus;

let bridgeReqHandler$1;

function setBridgeReqHandler$1(handler) {
    bridgeReqHandler$1 = handler;
}

function send$2(kind, data) {
    const msg = {
        event: kind,
        eventType: MAGIC_VALUE,
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

function asMessage$1(msg) {
    if (typeof msg !== "string") {
        return;
    }
    let parsed;
    try {
        parsed = JSON.parse(msg);
    } catch {
        return;
    }
    if (parsed.eventType !== MAGIC_VALUE) {
        return;
    }
    return parsed;
}

function handleMessage$1(msg) {
    if (msg.event === Kind.SET_OPEN_ENCOUNTER || msg.event === Kind.SET_PATIENT_INFO) {
        bridgeReqHandler$1?.(msg.event, msg.data);
        return;
    }
    bus.emit(msg.event, msg.data);
}

var v1 = Object.freeze({
    __proto__: null,
    asMessage: asMessage$1,
    handleMessage: handleMessage$1,
    send: send$2,
    sendAwaitResp: sendAwaitResp$2,
    setBridgeReqHandler: setBridgeReqHandler$1
});

let msgId = 0;

const awaitingResp = new Map;

let bridgeReqHandler;

function setBridgeReqHandler(handler) {
    bridgeReqHandler = handler;
}

function send$1(kind, data) {
    _send(msgId++, kind, data);
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
        _send(id, kind, data);
    });
}

function _send(id, kind, data) {
    const msg = {
        v: 2,
        magicValue: MAGIC_VALUE,
        id: id,
        kind: kind,
        data: data,
        sdkVersion: version
    };
    window.parent.postMessage(msg, "*");
}

function asMessage(msg) {
    const msgAsV2 = msg;
    if (msgAsV2?.v !== 2 || msgAsV2.magicValue !== MAGIC_VALUE) {
        return;
    }
    return msgAsV2;
}

function handleMessage(msg) {
    if ("id" in msg) {
        bridgeReqHandler?.(msg.kind, msg.data);
        return;
    }
    if ("respId" in msg) {
        awaitingResp.get(msg.respId)?.(msg.data);
        return;
    }
}

var v2 = Object.freeze({
    __proto__: null,
    asMessage: asMessage,
    handleMessage: handleMessage,
    send: send$1,
    sendAwaitResp: sendAwaitResp$1,
    setBridgeReqHandler: setBridgeReqHandler
});

setBridgeReqHandler$1((kind, data) => bus$1.emit(kind, data));

setBridgeReqHandler((kind, data) => bus$1.emit(kind, data));

let v = v1;

send$1(Kind.GET_PLATFORM);

function send(kind, data) {
    v.send(kind, data);
}

async function sendAwaitResp(kind, data, timeoutMs = 5e3) {
    return v.sendAwaitResp(kind, data, timeoutMs);
}

window.addEventListener("message", ev => {
    if (ev.source !== window.parent) {
        return;
    }
    const asV1 = asMessage$1(ev.data);
    if (asV1) {
        return handleMessage$1(asV1);
    }
    const asV2 = asMessage(ev.data);
    if (asV2) {
        v = v2;
        return handleMessage(asV2);
    }
});

const inBridge = (window.name + "").includes("bridge_");

function getBridgeVersion() {
    const cache = getBridgeVersion;
    return cache.p ??= sendAwaitResp(Kind.GET_BRIDGE_VERSION);
}

function getPage(deep = false) {
    return sendAwaitResp(Kind.GET_PAGE, {
        deep: deep
    });
}

async function getPatient() {
    return sendAwaitResp(Kind.GET_PATIENT_INFO);
}

async function getPlatform() {
    return sendAwaitResp(Kind.GET_PLATFORM);
}

function setBadgeCount(count = 0) {
    send(Kind.SET_BADGE_COUNT, count);
}

function showTile() {
    send(Kind.SHOW_TILE);
}

function hideTile() {
    send(Kind.HIDE_TILE);
}

function enableTile() {
    send(Kind.ENABLE_TILE);
}

function disableTile() {
    send(Kind.DISABLE_TILE);
}

function captureUserEvents() {
    send(Kind.CAPTURE_USER_EVENTS);
}

function releaseUserEvents() {
    send(Kind.RELEASE_USER_EVENTS);
}

function closeApp() {
    send(Kind.CLOSE_APP);
}

function pushNotification(notification) {
    send(Kind.PUSH_NOTIFICATION, {
        data: notification
    });
}

function getOpenEncounter() {
    return sendAwaitResp(Kind.GET_OPEN_ENCOUNTER);
}

function onOpenEncounterChanged(cb) {
    getOpenEncounter().then(cb);
    return bus$1.on(Kind.SET_OPEN_ENCOUNTER, data => cb(data));
}

function onPatientChanged(cb) {
    getPatient().then(cb);
    return bus$1.on(Kind.SET_PATIENT_INFO, data => cb(data));
}

export { PlatformKind, captureUserEvents, closeApp, disableTile, enableTile, getBridgeVersion, getOpenEncounter, getPage, getPatient, getPlatform, hideTile, inBridge, onOpenEncounterChanged, onPatientChanged, pushNotification, releaseUserEvents, setBadgeCount, showTile, version };
