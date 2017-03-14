import Todo from '../components/Todo'

export default class Index extends React.Component {
  constructor () {
    super()
  };
  // addTodo (todo) {
  //   const newTodo = Object.assign({}, {id: new Date().getTime()}, todo);
  //   this.todos = [{title: 'this is a test'}]
  //   this.todos.push(newTodo);
  //   console.log(this.todos)
  // }
  render () {
    return (
      <div>
        <h4>This is my list</h4>
        <Todo todos = {[
              {id: 1222, title: 'this is my first todo'},
        {id: 221112, title: 'this is my second todo'},
        {id: 32222, title: 'this is my third todo'}
        ]}></Todo>
      </div>
    )
  }
}
