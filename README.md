# Bridge SDK

Bridge SDK provides web applications the ability to integrate with the Bridge Platform.

### Setup

#### NPM

Install the npm package

```
$ npm i @arrowhealth/bridge-js-sdk
```

You can import the entire module or individual modules

```js
import * as bridge from '@arrowhealth/bridge-sdk'
```

```js
import { onPatientChanged } from '@arrowhealth/bridge-js-sdk'
```

#### CDN

Access the link below to get the latest version:

https://unpkg.com/@arrowhealth/bridge-js-sdk

### Usage

```js
import {
  onPatientChanged,
  updateBadgeCount,
} from '@arrowhealth/bridge-sdk'

const initApp = async () => {
  onPatientChanged(patientInfo => {
    console.log('patient:', patientInfo.ehrId, emrPatient.name)
  })

  updateBadgeCount(1)
}
```

### Building



Arrow Health (c) 2021. All rights reserved.
