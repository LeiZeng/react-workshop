import { createStore, applyMiddleware } from 'redux'
import { Provider as Redux } from 'react-redux'
import thunk from 'redux-thunk'

const initialState = {}
const reducer = (state = initialState, action) => {
  if (action.type) {
    return state
  }
  return state
}
const store = createStore(reducer, applyMiddleware(thunk), initialState)

export default props => (
  <Redux store={store}>
    <div>Redux</div>
  </Redux>
)
