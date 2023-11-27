const test = require('brittle')

const { compress, decompress } = require('.')

test('can encode a random range with dupes', t => {
  const range = [121, 33, 21, 2, 343, 55, 2, 1, 3551, 434, 66, 33, 12, 12, 323, 55]
  const expected = new Set(range)

  t.alike(new Set(decompress(compress(range))), expected)
})
