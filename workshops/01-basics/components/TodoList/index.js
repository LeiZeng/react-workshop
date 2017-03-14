import TodoItem from '../TodoItem'
export default (props) => (
  <ul>
    {props.todos.map(todo => (
      <TodoItem {...todo} {...props} key={todo.id}/>
    ))}
  </ul>
)
