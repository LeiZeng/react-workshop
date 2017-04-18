import test from 'ava'

import User from '../libs/User'

const TOM = 'Tom'
test('User constructor', t => {
  const user = new User(1, TOM)
  t.is(user.id, 1)
  t.is(user.name, TOM)
})
test('User hello', t => {
  const user = new User(0, TOM)
  t.is(user.hello('Sam'), 'Hello Sam, I am Tom.')
})
test('User report', t => {
  const user = new User(0, TOM)
  t.deepEqual(user.report(), { id: 0, name: TOM, favor: [] })
})
test('User addFavor', t => {
  const user = new User(0, TOM)
  user.addFavor('A')
  t.deepEqual(user.favor, ['A'])
})
