# warmup-encoding
Encode/decode sets of random blocks for warmup.

### Installation
`npm i warmup-encoding --save`

### Usage
```js
const { compress, decompress, encoding: WarmupEncoding } = require('warmup-encoding')
const c = require('compact-encoding')

// Can use the exported encoding as a compact encoder
const MyEncoding = {
  preencode (state, m) {
    WarmupEncoding.preencode(state, m.warmup)
    ...
  },
  encode (state, m) {
    WarmupEncoding.encode(state, m.warmup)
    ...
  },
  decode (state) {
    return {
      warmup: WarmupEncoding.decode(state),
      ...
    }  
  }
} 

const warmup = [232, 244, 11, 3, 1, 2, 3, 4, 5, 23]
// Can run-length encode later, but warmups are mostly random
// [1, 1, 1, 1, 1, 6, 12, 209, 12]
const compressed = compress(warmup)
// [ 1, 2, 3, 4, 5, 11, 23, 232, 244 ]
const decompressed = decompress(compressed)
```

