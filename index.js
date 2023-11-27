const c = require('compact-encoding')

const VERSION = 1
const UIntArray = c.array(c.uint)

module.exports.encoding = {
  preencode (state, m) {
    c.uint.preencode(state, VERSION)
    UIntArray.preencode(state, m)
  },
  encode (state, m) {
    c.uint.encode(state, VERSION)
    UIntArray.encode(state, m)
  },
  decode (state) {
    const version = c.uint.decode(state)
    if (version !== VERSION) throw new Error('Unsupported warmup-encoding version')
    return UIntArray.decode(state)
  }
}

module.exports.compress = function (blocks) {
  blocks.sort(numericSort)
  const res = []
  for (let i = 0; i < blocks.length; i++) {
    if (i === 0) {
      res.push(blocks[0])
    } else {
      const delta = blocks[i] - blocks[i - 1]
      if (delta !== 0) res.push(delta)
    }
  }
  return res
}

module.exports.decompress = function (arr) {
  if (arr.length === 0) return arr
  let min = arr[0]
  const res = [min]
  for (let i = 1; i < arr.length; i++) {
    min += arr[i]
    res.push(min)
  }
  return res
}

function numericSort (a, b) {
  return a - b
}
