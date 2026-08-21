type Encounter = {
    /**
     * The unique identifier for the encounter, as reported by the EHR.
     */
    id: string;
    /**
     * Date of the encounter in ISO format (YYYY-MM-DD), as reported by the EHR.
     */
    date: string;
    /**
     * The type of the encounter, as reported by the EHR.
     */
    type: string;
    /**
     * The type of the appointment the encounter was created from, as reported by the EHR (e.g. "New
     * Patient 30"). EHR-defined, and distinct from `type`, though some EHRs report the same in both.
     */
    appointmentType?: string;
    /**
     * The diagnoses associated with the encounter, as reported by the EHR.
     */
    dx: string[];
    /**
     * The provider of record on the encounter, as reported by the EHR.
     *
     * Not necessarily the logged-in user, and not the claim's rendering provider — that is determined
     * at billing time and can legitimately differ (e.g. incident-to services rendered by a mid-level
     * but billed under a supervising physician). That substitution is a billing-time concern; orders
     * and referrals generally carry the ordering clinician's own identity, which is this field.
     *
     * `undefined` if the EHR does not report a provider for the encounter, or if the integration does
     * not supply one.
     */
    provider?: {
        /**
         * The provider's name, verbatim as the EHR reports it. The format varies by EHR and may
         * include credentials.
         */
        name: string;
        /**
         * The provider's National Provider Identifier, if reported by the EHR.
         */
        npi?: string;
    };
};

/**
 * The current page being viewed in the EHR.
 */
type Page = {
    html: string;
    href: string;
    /**
     * frames is an optional property that recursively contains the html, href, and frames of all descendant frames.
     * Returned by getPage(true). getPage(false) and getPage() will not return frames.
     * NOTE: only contains frames that are from the same origin as the parent frame.
     */
    frames?: Page[];
};

/**
 * The patient object is delivered to a bridge app via the sdk when a user navigates to a patient page within the EHR
 */
type Patient = {
    /**
     * The external facing patient identifier as displayed in the EHR
     */
    id: string;
    /**
     * EHR Alternative Patient IDs
     */
    altIds?: string[];
    /**
     * The given name for the patient
     */
    first?: string;
    /**
     * The family name for the patient
     */
    last?: string;
    /**
     * ISO 8601 format date string representing the date of birth from the EHR. YYYY-MM-DD
     */
    dob?: string;
    /**
     * The patient sex as reported by the EHR.
     *
     * F: female, M: male, O: other (any other defined value outside of female/male)
     */
    sex?: 'F' | 'M' | 'O';
    /**
     * Additional patient data
     */
    xdata?: {
        /**
         * Primary contact email identified for the patient
         */
        email?: string;
        /**
         * Home phone or Primary Phone in the format provided by the EHR
         */
        phoneHome?: string;
        /**
         * Cell phone in the format provided by the EHR
         */
        phoneCell?: string;
        /**
         * {line1: String, line2: String, city: String, state: String, zip: String} as reported by the EHR
         */
        address?: {
            line1?: string;
            line2?: string;
            city?: string;
            state?: string;
            zip?: string;
        };
        pcpIds?: {
            id: string;
            type: string;
        }[];
        /**
         * The name of the physical location associated with the patient in the EHR.
         * This is not standardized and may even be an internal nickname for the practice. Bridge reports what is in the EHR
         */
        dept?: string;
        /**
         * Name of provider associated with the patient if any, in the format provided by the EHR.
         *
         * Prompt: The provider on the most recent active case. `undefined` if no active cases, or no provider on the most recent active case. Format: "<last>, <first>[ <middle>][, <space-delimited credentials>]"
         */
        provider?: string;
        /**
         * Name of provider identified by the EHR as the primary referring provider associated with the patient if any, in the format provided by the EHR.
         *
         * Prompt: The referring provider on the most recent active case. `undefined` if no active cases, or no referring provider on the most recent active case. Format: "<last>, <first>[ <middle>][, <space-delimited credentials>]"
         */
        referringProvider?: string;
        /**
         * Name of Payer and name of Plan identified as the primary insurance or the first insurance in the list of patient insurances as reported by the EHR. Insurance must be effective.
         *
         * Prompt: This is the first listed active insurance. `undefined` if no active insurances. Format: "<payer name>[ <plan name>]"
         */
        primaryInsurance?: string;
        /**
         * Member id associated with the primary insurance as reported by the EHR
         */
        primaryInsurancePolicyNum?: string;
        /**
         * The primary insurance group number as provided by the EHR.
         */
        primaryInsuranceGroupNum?: string;
        /**
         * Name of Payer and name of Plan identified as the secondary insurance or the second insurance in the list of patient insurances as reported by the EHR. Insurance must be effective.
         *
         * Prompt: This is the second listed active insurance. `undefined` if fewer than 2 insurances. Format: "<payer name>[ <plan name>]"
         */
        secondaryInsurance?: string;
        /**
         * Member id associated with the secondary insurance as reported by the EHR.
         */
        secondaryInsurancePolicyNum?: string;
        /**
         * Group ID associated with the secondary insurance as reported by the EHR.
         */
        secondaryInsuranceGroupNum?: string;
        /**
         * A list of strings representing current problems as reported by the EHR. Elements typically include a combination of a code and a description as reported by the EHR.
         *
         * Prompt: List of active cases' visits' services' diagnoses. Sorted alphabetically. Empty array if no active cases.
         * OncoEMR: Combined problem list (oncology diagnoses + non-oncology diagnoses).
         * gGastro: Combined problems/diagnoses list + conditions list.
         */
        problems?: string[];
        /**
         * The ISO 8601 date of the last date of service as identified in the EHR.
         *
         * Prompt: Most recent visit's (across all cases) date of service. `undefined` if no visits.
         */
        lastDateOfService?: string;
    };
};

/**
 * Information about the platform Bridge is running on. `data` is platform specific.
 */
type Platform = {
    kind: PlatformKind;
    username?: string;
    data?: unknown;
};
declare enum PlatformKind {
    ADVANCEDMD = "advancedmd",
    ATHELAS = "athelas",
    ATHENA = "Athena",// non-standard
    AZALEA = "azalea",
    AZARA = "azara",
    CAREECO = "careeco",
    CLINICIENT = "clinicient",
    CROSSTX = "crosstx",
    ECW = "eCW",// non-standard
    ELATION = "Elation",// non-standard
    EMPOWER = "empower",
    GGASTRO = "ggastro",
    HELLONOTE = "hellonote",
    HENO = "heno",
    IKNOWMED = "iknowmed",
    MATRIXCARE = "matrixcare",
    MEDITECH = "meditech",
    MODMED = "modmed",
    NETHEALTH = "nethealth",
    NETSMART = "netsmart",
    NEXTGEN = "nextgen",
    OFFICEALLY = "Office Ally",// non-standard
    ONCOEMR = "oncoemr",
    POINTCLICKCARE = "pointclickcare",
    PRACTICEFUSION = "practicefusion",
    PROMPT = "prompt",
    PTEVERYWHERE = "pteverywhere",
    PTPRACTICEPRO = "ptpracticepro",
    RAINTREE = "raintree",
    SIRRUS = "sirrus",
    SPRYPT = "sprypt",
    STRATAEMR = "strataemr",
    STRATUS = "stratus",
    STRIDE = "stride",
    THRIVE = "thrive",
    TEBRA = "tebra",
    TOUCHWORKS = "touchworks",
    TURBOPT = "turbopt",
    WEBPT = "webpt",
    OTHER = "Other"
}

type PushNotification = {
    /**
     * Text to display in notification
     */
    text: string;
    /**
     * Open associated application when notification is clicked. *(Default: true)*
     */
    openOnClick?: boolean;
};

/**
 * The Bridge SDK version.
 */
declare const version = "2.12.0";

/**
 * An unsubscribe function returned by subscription methods, such as `onPatientChanged()`.
 */
type Unsubscribe = () => void;
/**
 * Indicates if application is running inside of Bridge.
 *
 * If not running in Bridge, SDK features are unavailable.
 */
declare const inBridge: boolean;
/**
 * The Bridge extension version.
 */
declare function getBridgeVersion(): Promise<string>;
/**
 * Return the current page HTML and href.
 */
declare function getPage(deep?: boolean): Promise<Page>;
/**
 * Get the current patient being viewed in the EHR. If no patient is being viewed, returns `null`.
 */
declare function getPatient(): Promise<Patient | null>;
declare function getPlatform(): Promise<Platform>;
/**
 * Sets the badge count on the tile. Setting the value to 0 will cause it to go away.
 */
declare function setBadgeCount(count?: number): void;
/**
 * Shows tile. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
declare function showTile(): void;
/**
 * Hide tile. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
declare function hideTile(): void;
/**
 * Enables tile allowing event handling. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
declare function enableTile(): void;
/**
 * Disables tile preventing user events. Controlled by a Smart Tile based on the
 * information it receives through the available hooks such as "onPatientChanged()"
 */
declare function disableTile(): void;
/**
 * Smart tile request to capture user events. Bridge will not open an application while
 * tile is capturing user events.
 */
declare function captureUserEvents(): void;
/**
 * Smart tile returns the capturing user events back to Bridge. Bridge can only open
 * application when Bridge is capturing user events.
 */
declare function releaseUserEvents(): void;
/**
 * Closes app making the request. The tile can also call this and it will close the linked application.
 */
declare function closeApp(): void;
/**
 * Bridge will add the notification to the notifications array
 * with icon representing the application
 */
declare function pushNotification(notification: PushNotification): void;
declare function getOpenEncounter(): Promise<Encounter | null>;
/**
 * Subscribe to the open encounter change event.
 * When the user navigates to an open encounter page, `cb` is called with the encounter information.
 * When the user navigates away from an open encounter page, `cb` is called with `null`.
 *
 * This also immediately obtains the currently viewed open encounter (or `null`) and passes it to `cb`.
 *
 * @param cb - The callback function to be called when the open encounter changes.
 */
declare function onOpenEncounterChanged(cb: (encounter: Encounter | null) => void): Unsubscribe;
/**
 * Subscribe to the patient change event.
 * When the user navigates to a patient page, `cb` is called with the patient information.
 * When the user navigates away from a patient page, `cb` with `null`.
 *
 * @param cb - The callback function to receive the patient data.
 */
declare function onPatientChanged(cb: (patient: Patient | null) => void): Unsubscribe;

export { PlatformKind, captureUserEvents, closeApp, disableTile, enableTile, getBridgeVersion, getOpenEncounter, getPage, getPatient, getPlatform, hideTile, inBridge, onOpenEncounterChanged, onPatientChanged, pushNotification, releaseUserEvents, setBadgeCount, showTile, version };
export type { Encounter, Page, Patient, Platform, PushNotification, Unsubscribe };
