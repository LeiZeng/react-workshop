import login from '../apis/login'
import '../mocks/login'
import test from 'ava'

test('Login 401 promise', t => {
  return login('admin', '123')
    .catch(error => {
      t.is(error.status, 401, 'login will fail with 401')
    })
})
test('Login 401 async', async t => {
  const error = await t.throws(login('admin', '123'))
  t.is(error.status, 401, 'login will fail with 401')
})
