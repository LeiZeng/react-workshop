import { createStore, applyMiddleware } from 'redux'
import { Provider as Redux, connect } from 'react-redux'
import thunk from 'redux-thunk'
const logger = ({ dispatch, getState }) => next => action => {
  console.log('action type', action.type);
  next(action)
}
const initialState = { count: 0 }
const reducer = (state = initialState, action) => {
  if (action.type === 'INC') {
    return { count: state.count + 1 }
  }
  return state
}
const store = createStore(reducer, applyMiddleware(thunk, logger))

const App = props => (<div>
  {props.count}
  <input type="text"/>
  <input type="text"/>
  <input type="submit" onClick={evt => props.login(2)}/>
</div>)
const ConnectedApp = connect(
  state => state,
  dispatch => ({
    login: (user, pass) => setTimeout(() => dispatch({ type: 'INC' }), 2000)
  })
)(App)

export default props => (
  <Redux store={store}>
    <ConnectedApp />
  </Redux>
)
