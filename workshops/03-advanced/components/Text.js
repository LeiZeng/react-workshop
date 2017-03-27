import React from "react"

export default ({
  label,
  onChange,
  ...others
}) => (
  <label>
    {label || 'Text Input'}
    <input
      type="text"
      onChange={evt => onChange(evt.target.value)}
      {...others}
    />
  </label>
)
