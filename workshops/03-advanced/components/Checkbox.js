export default ({ onChange, ...others}) => (
  <input
    {...others}
    type="checkbox"
    onChange={evt => onChange(evt.target.checked)}
  />
)
