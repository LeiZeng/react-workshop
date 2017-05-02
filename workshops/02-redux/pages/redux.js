import { Component } from 'react'
import { createStore, combineReduce } from 'redux'
const INCREMENT = 'INCREMENT'

const couterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    default:
      return state
  }
}
const rootReducer = combineReduce({ couterReducer })
const store = createStore(rootReducer, {
  couterReducer: 0
})

export default class ReduxCounter extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  shouldComponentUpdate(nextState, nextProps) {
    return nextState.count !== this.state.count
  }
  componentDidMount() {
    store.subscribe(() => {
      const count = store.getState()
      this.setState({ count })
    })
    setInterval(() => {
      store.dispatch({ type: INCREMENT })
    }, 1000)
  }
  render() {
    return (
      <div>
        Redux Counter: {this.state.count}
      </div>
    )
  }
}
