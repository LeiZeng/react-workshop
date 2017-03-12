import { createStore } from 'redux'
import { Provider as Redux } from 'react-redux';

const initialState = {}
const reducer = (state = initialState, action) => {
  if (action.type) {
    return state
  }
  return state
}
const store = createStore(reducer, initialState)

export default props => (
  <Redux store={store}>
    <div>Redux</div>
  </Redux>
)
