export default ({ options, onChange, ...others}) => (
  <div>
    {Object.keys(options).map((key, index) => (
      <label key={index}>
        <span>{options[key]}</span>
        <input
          {...others}
          type="radio"
          value={key}
          onChange={evt => onChange(evt.target.value)}
        />
      </label>
    ))}
  </div>
)
