The Bridge SDK provides an API to communicate with the Bridge platform

## Getting Started

### NPM

Install the npm package

```
npm i @arrowhealth/bridge-sdk
```

You can import the entire module...

```js
import * as bridge from '@arrowhealth/bridge-sdk'
```

Or you can import the methods you want to use...

```js
import { onPatientChanged } from '@arrowhealth/bridge-sdk'
```

#### Usage

```js
import {
  getPatient,
  onPatientChanged
} from '@arrowhealth/bridge-sdk'

getPatient().then( 
  patient => console.log('patient', patient)
)

onPatientChanged(patient => {
  console.log('patient:changed', patient.id)
})
```


### CDN

Add the following to the `header` tag:


```html
<script src="https://unpkg.com/@arrowhealth/bridge-sdk/dist/bridge.min.js"></script>
```

#### Usage

The Bridge SDK can be globally accessed.

```js
bridge.getPatient().then( 
  patient => console.log('patient', patient)
)

bridge.onPatientChanged(patient => {
  console.log('patient:changed', patient.id)
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