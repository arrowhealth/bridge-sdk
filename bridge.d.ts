type Encounter = {
    /**
     * Date of the encounter in ISO format (YYYY-MM-DD) as reported by the EHR.
     */
    date: string;
    /**
     * The type of the encounter as reported by the EHR.
     */
    type: string;
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
 * The Patient being viewed in the EHR.
 */
type Patient = {
    /**
     * EHR Patient ID
     */
    id: string;
    /**
     * EHR Alternative Patient IDs
     */
    altIds?: string[];
    /**
     * Patient's first name
     */
    first?: string;
    /**
     * Patient's last name
     */
    last?: string;
    /**
     * Patient's date of birth (DD/MM//YYYY)
     */
    dob?: string;
    /**
     * Patient's sex
     */
    sex?: 'M' | 'F';
    /**
   * Additional patient data
   */
    xdata?: {
        email?: string;
        phoneHome?: string;
        phoneCell?: string;
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
        dept?: string;
        /**
         * The provider assigned to the patient.
         *
         * Prompt: The provider on the most recent active case. `undefined` if no active cases, or no provider on the most recent active case. Format: "<last>, <first>[ <middle>][, <space-delimited credentials>]"
         */
        provider?: string;
        /**
         * The provider that referred the patient.
         *
         * Prompt: The referring provider on the most recent active case. `undefined` if no active cases, or no referring provider on the most recent active case. Format: "<last>, <first>[ <middle>][, <space-delimited credentials>]"
         */
        referringProvider?: string;
        /**
         * The primary insurance of the patient.
         *
         * Prompt: This is the first listed active insurance. `undefined` if no active insurances. Format: "<payer name>[ <plan name>]"
         */
        primaryInsurance?: string;
        /**
         * The primary insurance policy number as provided by the EHR.
         */
        primaryInsurancePolicyNum?: string;
        /**
         * The primary insurance group number as provided by the EHR.
         */
        primaryInsuranceGroupNum?: string;
        /**
         * The patient's secondary insurance.
         *
         * Prompt: This is the second listed active insurance. `undefined` if fewer than 2 insurances. Format: "<payer name>[ <plan name>]"
         */
        secondaryInsurance?: string;
        /**
         * The secondary insurance policy number as provided by the EHR.
         */
        secondaryInsurancePolicyNum?: string;
        /**
         * The secondary insurance group number as provided by the EHR.
         */
        secondaryInsuranceGroupNum?: string;
        /**
         * The patient's list of medical diagnoses as provided by the EHR.
         *
         * Prompt: List of active cases' visits' services' diagnoses. Sorted alphabetically. Empty array if no active cases.
         */
        problems?: string[];
        /**
         * Last date of service in ISO 8601 format: "YYYY-MM-DD"
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
    ATHENA = "Athena",
    AZALEA = "azalea",
    AZARA = "azara",
    CAREECO = "careeco",
    CLINICIENT = "clinicient",
    CROSSTX = "crosstx",
    ECW = "eCW",
    ELATION = "Elation",
    EMPOWER = "empower",
    GGASTRO = "ggastro",
    HENO = "heno",
    IKNOWMED = "iknowmed",
    NETHEALTH = "nethealth",
    NETSMART = "netsmart",
    NEXTGEN = "nextgen",
    OFFICEALLY = "Office Ally",
    ONCOEMR = "oncoemr",
    PRACTICEFUSION = "practicefusion",
    PROMPT = "prompt",
    PTEVERYWHERE = "pteverywhere",
    PTPRACTICEPRO = "ptpracticepro",
    RAINTREE = "raintree",
    SIRRUS = "sirrus",
    STRATAEMR = "strataemr",
    STRATUS = "stratus",
    THRIVE = "thrive",
    TEBRA = "tebra",
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
 * An unsubscribe function returned by subscription methods, such as `onPatientChanged()`.
 */
type Unsubscribe = () => void;
/**
 * Indicates if application is running inside of popout
 */
declare const inPopout: boolean;
/**
 * Indicates if application is running inside of iframe
 */
declare const inIframe: boolean;
/**
 * Indicates if application is running inside of Bridge
 */
declare const inBridge: boolean;
/**
 * The Bridge SDK version.
 */
declare const version = "2.8.0-beta.3";
/**
 * Return the current page HTML and href.
 */
declare function getPage(deep?: boolean): Promise<Page>;
/**
 * Get the current patient being displayed. This is typically used on application
 * initialization and thereafter onPatientChanged() is used to listen for additional
 * changes.
 */
declare function getPatient(): Promise<Patient>;
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
 * @param cb - The callback function to be called when the open encounter changes.
 */
declare function onOpenEncounterChanged(cb: (encounter: Encounter) => void): Unsubscribe;
/**
 * Subscribe to the patient change event.
 * When the user navigates to a patient page, `cb` is called with the patient information.
 * When the user navigates away from a patient page, `cb` with `null`.
 *
 * @param cb - The callback function to be called when the patient changes.
 */
declare function onPatientChanged(cb: (patient: Patient) => void): Unsubscribe;

export { PlatformKind, captureUserEvents, closeApp, disableTile, enableTile, getOpenEncounter, getPage, getPatient, getPlatform, hideTile, inBridge, inIframe, inPopout, onOpenEncounterChanged, onPatientChanged, pushNotification, releaseUserEvents, setBadgeCount, showTile, version };
export type { Encounter, Page, Patient, Platform, PushNotification, Unsubscribe };
