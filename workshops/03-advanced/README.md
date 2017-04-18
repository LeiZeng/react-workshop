# React Advanced
---
layout: true
# Fetch
---

## HTTP Request/Response for REST

```js
$.ajax({
  url: url,
  method: 'POST',
  data: {}
})
.then(data => console.log(data))
```

```js
fetch(url, {
  method: 'POST',
  body: {}
})
.then(response => {
  if (response.status > 400) {
    throw new Error(response)
  }
  return response.json() // response.text()
})
.then(json => console.log(json))
.catch(err => console.log(err))
```
---

## Credential

```js
fetch(url, {
  method: 'POST',
  credential: 'include', //'same-origin'
  headers: {
    'Content-Type': 'application/json'
  },
  body: {}
})
```

## Formdata and File Upload

```js
const form = new FormData()
const input = document.querySelector('input[type="file"]')

form.append('file', input.file[0])
fetch(url, {
  method: 'POST',
  body: form
})
```
---

## Browser Support
- Chrome
- Firefox
- Safari 6.1+
- Internet Explorer 10+
---

## Practice
### Get some data with the /fetch in nodejs
- Create fetch.js
- `fetch('https://api.chucknorris.io/jokes/random')`
- `fetch('http://www.google.com')`
- `node fetch.js`
### Get some data with the /fetch in browser
- Open console in Chrome
- `fetch('https://api.chucknorris.io/jokes/random')`
- `fetch('http://www.google.com')`
---
layout: false
class: center middle
# Form Code Review
---
layout: true
# Unit Test
---

## Mocha/Jest/AVA
- Mocha
  - Plugins based
- Jest
  - Easy Setup
- AVA
  - Fast & Simple

```js
import test from 'ava'

const add = (a, b) => a + b

test('Add', t => {
  t.is(add(2, 4), 6)
  t.is(add(0, 9), 9)
  t.is(add(-1, -5), -6)
  t.is(add(-1, 5), 4)
})
```
---

## AVA APIs

- test([title], implementation)

- test.only([title], implementation)
- test.skip([title], implementation)

- test.before([title], implementation)
- test.after([title], implementation)
- test.beforeEach([title], implementation)
- test.afterEach([title], implementation)
```js
import test from 'ava'
test('Testing', t => {})
test.beforeEach(t => {})
```
---

## AVA Assertions APIs
- .true(value, [message])
- .false(value, [message])

- .is(value, expected, [message])
- .not(value, expected, [message])

- .deepEqual(value, expected, [message])

- .throws(function|promise, [error, [message]])

---

## Practice
### Implement Test Cases/Class for `User`
- `User` is initialized by `id` and `name`: `new User(0, 'Tom')`
- `User` has public fields
  - `id` // Number
  - `name` // String
  - `favor` // [String]
- `User` has public methods
  - `hello(target)`: `'Hello ${target}, I am ${name}.'` // String
  - `report()`: `{ id, name, favor }` // Object
  - `addFavor(favor)`: add favor // Void

Hint:
- Create ./test/user.test.js
- `npm run ava -- -t ./test/user.test.js`
---
layout: true
# Fetch Mock
---
http://www.wheresrhys.co.uk/fetch-mock/api

```js
const fetchMock = require('fetch-mock')

fetchMock.get('*', { hello: 'world' })

fetch('http://www.blabla.com')
  .then(response => response.json())
  .then(data => console.log(data))
```
---

## Decouple with the Services

```js
// apis.js
export const login = (username, password) => fetch('/login', {
  method: 'POST', data: JSON.stringify({ username, password })
})
```
```js
// mocks.js
const fetchMock = require('fetch-mock')
fetchMock
.post(
  (url, opts) => (url === '/login' &&
    opts.data === JSON.stringify({ username: 'admin', password: 'admin' })),
  200
)
.post('/login', 403)
```
```js
import { login } from './apis'
if (NODE_ENV === 'development') {
  require('./mocks')
}
login('admin', 'admin').then(response => console.log(response.status))
```
---

## Mock in Unit Test
```js
const login = (username, password) => fetch('/login', {
  method: 'POST', data: JSON.stringify({ username, password })
}).then(response => {
  if (response.status > 400) {
    throw response
  }
  return response.json()
})

test(t => {
  login('admin', '123').catch(error => {
    t.is(error.status, 401)
  })
})
test(async t => {
  const error = await t.throws(login('admin', '123'))
  t.is(error.status, 401)
})
```
---
layout: false
# Fetch Mock
## Practice
### Implement User CRUD API without real APIs
- Create User
  - POST /user `{ username, password }` => 201 `{ id }`
  - `createUser({ username, password })`
- Retrieve User
  - GET /user/{id} => 200 `{ username, id }`
  - `getUser(id)`
- Update User
  - PUT /user/{id} `{ username, password }` => 200 `{ username, id }`
  - `updateUser(id, { username, password })`
- Delete User
  - DELETE /user/{id} => 200
  - `deleteUser(id)`
---
layout: true
# Sinon
---

- Spy
  - A test spy is a function that records arguments, return value ...
- Stub
  - Test stubs are functions (spies) with pre-programmed behavior.
---

## Spy
```js
test(t => {
  const callback = sinon.spy()
  doSomething(callback)
  t.true(callback.called)
  t.is(callback.callCount, 1)
})
```
---

## Stub
```js
test(t => {
  var count = sinon.stub();
  count.withArgs(1, 2).returns(3)
  t.is(count(1, 2), 3)
})
```
```js
test(t => {
  const getStub = sinon.stub()
  getStub.withArgs('key').returns('value')
  const localStorage = { get: getStub };
  t.is(localStorage.get('key'), 'value')
})
```
---
layout: true
# React Unit Test -- Enzyme
---

```js
import test from 'ava'
import React from 'react'
import { shallow, mount } from 'enzyme';

import Foo from '../path/to/foo'

test('shallow', t => {
  const wrapper = shallow(<Foo />)
  t.is(wrapper.contains(<span>Foo</span>), true)
})

test('mount', t => {
  const wrapper = mount(<Foo />)
  const fooInner = wrapper.find('.foo-inner')
  t.is(fooInner.is('.foo-inner'), true)
})
```
---

## Shallow
```js
test('renders children when passed in', t => {
  const wrapper = shallow(
    <MyComponent>
      <div className="unique" />
    </MyComponent>
  );
  t.is(wrapper.contains(<div className="unique" />)).to.equal(true);
});
```

## DOM
```js
test('calls componentDidMount', t => {
  sinon.spy(Foo.prototype, 'componentDidMount');
  const wrapper = mount(<Foo />);
  t.is(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
  Foo.prototype.componentDidMount.restore();
});
```
---

## Shallow
- Faster

## DOM
- More context of DOM or Event System, depends

## JSDOM
- Can't work with CSS rules
- No Browser behavior
- No real window/document

---

## Component with Redux store
```js
import { Provider, connect } from 'react-redux'
import store from '../getStore'
import MyContainer from './MyContainer'
import List from './List'

test(t => {
  const wrapper = shallow((
    <Provider store={store}>
      <MyContainer />
    </Provider>
  ))
  wrapper.find('button').simulate('click')
  t.true(wrapper.contains(<List />))
})
```
---

## Practice
### Test case for `./components/Text`, Shallow
  - label
  - onChange
  - name
  - onBlur
### Test case for `./components/RadioGroup`, Shallow
  - options
  - onChange
  - name
---
layout: false
# Homework
- Add Unit test to the todo MVC sub components
- Plus, add DOM render unit test, if needed
