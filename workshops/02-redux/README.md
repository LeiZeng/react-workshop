
class: middle center
# Redux
---
class: middle center
# Homework Review
---
layout: true
# Application with Data
---

```js
props => <Component {...props} />

          ...

data => <Application {...data} />
```
---

```js
const TodoMVC = props => (
  <Container>
    <Header>
      <Filters />
    </Header>
    <TodoList>
      <TodoItem>
        <Status />
        <Text />
        <TextEditor />
      </TodoItem>
      {...}
    </TodoList>
    <Footer />
  </Container>
)
```
???
- Dynamic use input
- Shared data cross components
---
class: middle
layout: false
# Redux
- State Management
- Predictable State
---
layout: true
# Data Flow
---

```
  data => <Application {...data} />

              ||
              ﹀
  (data <=> <Application />) <=> User

              ||
              ﹀
   State ----->  View(Component)
        ︿        /
         \       /
          \     ﹀
            User
```
---
layout: false
.center[
![](http://christianhall.me/redux-101/img/redux-unidir-ui-arch.jpg)
]
---

# Redux Store and Reducer

```js
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}
const store = createStore(counterReducer)
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch({ type: 'INCREMENT' })

```
---

# Practice
- Integrate Redux with React
- Do not use any other tools rather than React or Redux
- Add setInterval to dispatch 'INCREMENT' action

Hint: You might need `setState` API to update Component
---

# React Redux
- Provider
- connect

```js
import { Provider as Redux, connect } from 'react-redux'

const initialState = { count: 0 }

const store = createStore(counterReducer, initialState)
const App = props => <div>Redux Counter: {props.count}</div>
const ConnectedApp = connect(state => state)(App)

ReactDom.render(
  <Redux store={store}>
    <ConnectedApp />
  </Redux>
, rootDom)

```
---

# Reducer and Action

```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}
const incrementAction = { type: 'INCREMENT' }

const store = createStore(counterReducer)
store.dispatch(incrementAction)
```
---
class: middle center
# **Quick** Practice React Redux
## Refactor the previous Practice with `react-redux`

---
layout: true
# Thunk
---

## A thunk is a function that wraps an expression to delay its evaluation.

```js
let x = 1 + 2;

let foo = () => 1 + 2;
```
---

```js
const incrementAction = { type: 'INCREMENT' }

const incrementActionThunk = () => ({ type: 'INCREMENT' })

const incrementActionAsyncThunk = (dispatch) => {
  setTimeout(() => {
    dispatch(incrementAction)
  }, 1000)
}

const incrementIfOddActionAsyncThunk = (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 !== 0) {
    dispatch(incrementAction)
  }
}

```

---
layout: false
.center[
![](http://christianhall.me/redux-101/img/redux-unidir-ui-arch.jpg)
]

---
layout: true
# Redux Middleware
---

## Redux Thunk

```js
({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};
```

```js
({ dispatch, getState }) => {
  return next => {
    return action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      return next(action);
    };
  }
}
```
---

# Practice
- Create Async action with thunk
  - A component will trigger an action every 2 seconds from componentDidMount
  - This action will dispatch another increment action after 2 seconds
- Create a simple logger redux middleware
  - `console.log` every action with action type
---

## Logger and Dev Tool
- https://github.com/evgenyrodionov/redux-logger
- https://github.com/gaearon/redux-devtools
- https://github.com/zalmoxisus/redux-devtools-extension
---

## Setup Dev Tool
```js
import { createStore, applyMiddleware, compose } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTool = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'>
    <LogMonitor />
  </DockMonitor>
)
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), DevTools.instrument())
)
render(
  <Provider store={store}>
    <div><TodoApp /><DevTools /></div>
  </Provider>
  document.getElementById('app')
)
```
---
layout: false
# Utils for actions and reducers
```js
const increment = () => { type: INCREMENT }
const incrementTwiceWith = (x) => {
  type: INCREMENT_TWICE_WITH,
  payload: x * 2
}

const reducer = (state, action) => ({
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case INCREMENT_TWICE_WITH:
      return state + action.payload
    default:
      return state
  }
})
```

```js
import { createAction, handleActions } from 'redux-actions'
const increment = createAction(INCREMENT)
const incrementTwiceWith = createAction(INCREMENT_TWICE_WITH, x => x * 2)
const reducer = handleActions({
  [INCREMENT]: state => state + 1,
  [INCREMENT_TWICE_WITH]: (state, action) => state + action.payload * 2
})
```
---

## Practice
Refactor your practice with the `logger` and `redux-action`

```js
import { createAction, handleActions } from 'redux-actions'
const increment = createAction(INCREMENT)
const incrementTwiceWith = createAction(INCREMENT_TWICE_WITH, x => x * 2)
const reducer = handleActions({
  [INCREMENT]: state => state + 1,
  [INCREMENT_TWICE_WITH]: (state, action) => state + action.payload * 2
})
```

```js
import { createStore, applyMiddleware, compose } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const DevTool = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'>
    <LogMonitor />
  </DockMonitor>
)
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), DevTools.instrument())
)
```
---
layout: true
# Complex Actions
---

## Logic in Reducer or Action?
```js
const incrementActionThunk = () => ({ type: 'INCREMENT' })
const reducer = (state, action) => ({
  if (action.type === 'INCREMENT') {
    state = state + 1
  }
})
```

```js
const updateCount = (dispatch, getState) => ({
  type: 'INCREMENT',
  payload: getState().count + 1
})
const reducer = (state, action) => ({
  if (action.type === 'INCREMENT') {
    state = action.payload
  }
})
```
???
Complex action or Complex reducer
- Event system disadvantage
- Database driven design
---

## Reuse Actions
```js
const increment = () => { type: INCREMENT }
```
```js
const incrementTwiceWith = (x) => {
  type: INCREMENT_TWICE_WITH,
  payload: x * 2
}
```

```js
const incrementWith = x => {
  type: INCREMENT_WITH,
  payload: x
}
const increment = () => dispatch => dispatch(incrementWith(1))
const incrementTwiceWith = (x) => dispatch => dispatch(incrementWith(x * 2))

```
---

## Async Actions
```js
const initialState = {
  user: {
    id: null
  },
  isLoading: false
}
```
```js
const login = (username, password) => (dispatch, getState) => {
  const { isLoading } = getState()
  if (!isLoading) {
    dispatch(loading(true))
  }
  API.login({ username, password }).then(user => {
      dispatch(loading(false))
      dispatch(user ? loginSuccess(user) : loginFail())
    }).catch(e => {
      dispatch(loading(false))
      loginFail(e)
    })
}
```
---
layout: false
# Practice for Complex Actions
- Refactor previous Practice with `redux-actions`
- Add waiting status for async increment
  - An async increment button to trigger increment in 1 second
  - While waiting for async increment, show waiting
  - When increment done, remove waiting

Hint: you might need`react-redux` to connect your action with component
---
layout: true
# Redux Saga
---

## A separate thread in your application that's solely responsible for side effects
---
class: center middle
![](https://pbs.twimg.com/media/Ci4r4TgUUAAisub.jpg)
---

```js
const INCREMENT_ASYNC = 'INCREMENT_ASYNC'

const incrementAsync = createAction(INCREMENT_ASYNC)

const incrementAsyncSaga = function* incrementAsync() {
  return new Promise((res, rej) => {
    // Or do something else async
    setTimeout(() => res(), 1000)
  })
}
const rootSaga = function* root() {
  yield [
    takeLatest(INCREMENT_ASYNC, incrementAsyncSaga)
  ]
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(thunk, sagaMiddleware),
  initialState
)
sagaMiddleware.run(rootSaga)

```
---

# Practice

Refactor previous Practice **Complex Action** into Saga

---
layout: false
class: center middle
# Homework
.left[
## Improve your TodoMVC with Redux
- Map and manage your state to Redux
- Save your state in localStorage
- Use Saga to operate the localStorage
]

---
class: center middle
# Thanks
