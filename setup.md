The Bridge SDK provides an API to communicate with the Bridge platform

## Getting Started

### NPM

Install the npm package

```
$ npm i @arrowhealth/bridge-sdk
```

You can import the entire module or individual methods

```js
import * as bridge from '@arrowhealth/bridge-sdk'
import { onPatientChanged } from '@arrowhealth/bridge-sdk'
```

### CDN

Access the link below to get the latest version from the CDN

https://unpkg.com/@arrowhealth/bridge-sdk

### Usage

```js
import {
  getPatientInfo,
  onPatientChanged
} from '@arrowhealth/bridge-sdk'

getPatientInfo().then( 
  patientInfo => console.log('patient::init', patientInfo)
)

onPatientChanged(patientInfo => {
  console.log('patient::changed', patientInfo.ehrId, patientInfo.name)
})
```

### Repository

https://github.com/arrowhealth/bridge-sdk

### Changelog

https://github.com/arrowhealth/bridge-sdk/releases

### Reporting Issues

https://github.com/arrowhealth/bridge-sdk/issues


<hr />

[Arrow Health](https://arrowhealth.io) (c) 2021-present. All rights reserved.