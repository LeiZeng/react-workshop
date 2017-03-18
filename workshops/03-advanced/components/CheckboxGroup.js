import { Component } from 'react'
import Checkbox from './Checkbox'

export default class CheckboxGroup {
  constructor() {
    super()
    this.state = {
      options: {}
    }
  }
  _onChange(key) {
    return checked => {
      this.setState({
        ...this.state.options,
        [key]: checked
      })
      if (this.props.onChange) {
        onChange(this.state.options)
      }
    }
  }
  render() {
    const { options, onChange, ...others } = this.props
    return (
      <div>
        {Object.keys(options).map((key, index) => (
          <label key={index}>
            <span>{options[key]}</span>
            <Checkbox
              {...others}
              value={key}
              onChange={checked => onChange(key)(checked)}
            />
          </label>
        ))}
      </div>
    )
  }
}
