const c = require('compact-encoding')

const VERSION = 1
const UIntArray = c.array(c.uint)

module.exports.preencode = function (state, blocks) {
  c.uint.preencode(state, VERSION)
  state._arr = deltaEncode(blocks)
  UIntArray.preencode(state, state._arr)
}

module.exports.encode = function (state, blocks) {
  c.uint.encode(state, VERSION)
  UIntArray.encode(state, state._arr || deltaEncode(blocks))
  state._arr = null
}

module.exports.decode = function (state) {
  c.uint.decode(state) // VERSION
  return deltaDecode(UIntArray.decode(state))
}

function deltaEncode (blocks) {
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

function deltaDecode (arr) {
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
