import test from 'ava'

const add = (a, b) => a + b

test('Add', t => {
  t.is(add(2, 4), 6)
  t.is(add(0, 9), 9)
  t.is(add(-1, -5), -6)
  t.is(add(-1, 5), 4)
})
