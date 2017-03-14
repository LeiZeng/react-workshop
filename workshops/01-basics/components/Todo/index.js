import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
export default class Todo extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      todos: this.props.todos || []
    }
  }
  addTodo = (todo) => {
    const newTodo = {id: new Date().getTime(), ...todo};
    const todos = [...this.state.todos, newTodo];
    this.setState({todos})
  }
  deleteTodo = (id) => {
    const todos = this.state.todos.filter((ele)=> ele.id !== id)
    this.setState({todos})
  }
  updateTodo = (todo) => {
    const todos = this.state.todos.map((ele) => ele.id !== todo.id ? ele : todo)
    this.setState({todos})
  }


  render () {
    return (
      <div>
        <TodoInput addTodo={this.addTodo}/>
        <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
      </div>
    )
  }
}
