export default class TodoItem extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      edit: false,
      title: this.props.title
    }
  }
  toggleEdit = () => {
    const edit = this.state.edit;
    this.setState({edit: !edit});
  }
  handleChange = (event) => {
    this.setState({title: event.target.value});
  }
  updateTodo = () => {
    this.props.updateTodo({id: this.props.id, title: this.state.title})
    this.setState({
      edit: false,
      title: this.props.title
    })
  }


  render () {
    const edit = this.state.edit;
    return (
      <li>
        { edit ? (
          <div>
            <input value={this.state.title} onChange={this.handleChange}/>
            <button onClick={this.updateTodo}>save</button>
            <button onClick={this.toggleEdit}>cancel</button>
          </div>
        ) : (
          <div>
            <span>{this.props.title}</span>
            <button onClick={this.toggleEdit}>edit</button>
            <button onClick={()=>{this.props.deleteTodo(this.props.id)}}>delete</button>
          </div>
        )
        }
      </li>
    )




  }
}
