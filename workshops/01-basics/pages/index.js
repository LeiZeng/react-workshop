import { Component } from 'react'

const Text = props => (
  <input
    type="text"
    {...props}
    onChange={event => {
      props.onChange && props.onChange(event.target.value)
    }}
  />
)
const LabelText = ({label, onChange, ...props}) => (
  <label>{label}<Text {...props}/></label>
)
const RadioGroup = ({ options, onChange, ...others }) => (
  <fieldset>
    {options.map(({ label, ...rest }, key) => (
      <label key={key}>
        {label}
        <input type="radio" {...rest} onChange={
          evt => onChange && onChange(evt.target.value)
        } />
      </label>))}
  </fieldset>
)

const Select = ({options, ...others}) => (
  <select {...others}>
    {Object.keys(options)
      .map((optionKey, index) => (
        <option value={optionKey} key={index}>{options[optionKey]}</option>
      ))
    }
  </select>
)
export default class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  render() {
      return (
      <div>
        Hello React!
        <div>
          <form action="POST" onSubmit={
            value => console.log(value)
          }>
            <LabelText label="User Name" onChange={
              value => console.log(value)
            }/>
            <LabelText label="Email" onChange={
              value => console.log(value)
            }/>
            <RadioGroup options={[
              {
                label: 'I have a child',
                value: 'yes',
                name: 'have_child'
              },{
                label: 'I don\'t have a child',
                value: 'no',
                name: 'have_child'
              }
            ]}
            onChange={value => {
              console.log(value);
              this.setState({
                show: value === 'yes'
              })
            }}
          />
            {this.state.show ? (<Select options={
              {
                boy: 'boy',
                girl: 'girl'
              }
            } />) : null}
          </form>
        </div>
      </div>
    )
  }
}
