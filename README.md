# Bridge SDK

The Bridge SDK provides an API to communicate with the Bridge platform

### Getting Started

#### NPM

Install the npm package

```
$ npm i @arrowhealth/bridge-js-sdk
```

You can import the entire module or individual exports

```js
import * as bridge from '@arrowhealth/bridge-sdk'
```

```js
import { onPatientChanged } from '@arrowhealth/bridge-sdk'
```

#### CDN

Access the link below to get the latest version from the CDN

https://unpkg.com/@arrowhealth/bridge-js-sdk

### Usage

```js
import {
  onPatientChanged,
  updateBadgeCount,
} from '@arrowhealth/bridge-sdk'

const main = async () => {
  onPatientChanged(patientInfo => {
    console.log('patient:', patientInfo.ehrId, emrPatient.name)
  })

  updateBadgeCount(1)
}

main()
```

Arrow Health (c) 2021. All rights reserved.
