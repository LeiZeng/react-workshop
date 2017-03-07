const Input = props => (
  <input
    type="text"
    {...props}
    onChange={event => {
      console.log(props, event);
    }}
  />
)

export default props => (
  <div>
    Hello React!
    <Input />
  </div>
)
