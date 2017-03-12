import { createStore, applyMiddleware } from 'redux'
import { Provider as Redux } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

const initialState = {}
const reducer = (state = initialState, action) => {
  return state
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware), initialState)

sagaMiddleware.run(rootSaga)

export default props => (
  <Redux store={store}>
    <div>Redux</div>
  </Redux>
)
