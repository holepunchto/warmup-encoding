# warmup-encoding
Encode/decode sets of random blocks for warmup.

### Installation
`npm i @holepunchto/warmup-encoding --save`

### Usage
```js
const WarmupEncoding = require('@holepunchto/warmup-encoding')
const c = require('compact-encoding')

// Pass an unsorted array of uints potentially containing dupes
// Will be encoded as a delta-encoded uint array
const encoded = c.encode(WarmupEncoding, [232, 244, 11, 3, 1, 2, 3, 4, 5, 23])
const decoded = c.decode(WarmupEncoding, encoded)
```

