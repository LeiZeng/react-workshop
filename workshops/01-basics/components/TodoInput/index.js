export default class TodoInput extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      title: ''
    }
  }

  addTodo = () => {
    this.props.addTodo({title: this.state.title})
    this.setState({title: ''})
  }

  handleChange = (event) => {
    this.setState({title: event.target.value});
  }

  render () {
    return (
      <div>
        <input value={this.state.title} onChange={this.handleChange}/>
        <button onClick={this.addTodo}>Add</button>
      </div>
    )
  }
}
