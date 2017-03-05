DOM vs JSX
===

## Javascript Syntax with XML
- Variables/Function in HTML
- Operate HTML as variable/component

---
## DOM with Javascript
```html
<script type="text/javascript">
  function onChange(event) {
    console.log(event);
  }
</script>
<input type="text" name="input" value="" onChange="onChange">
```
## DOM with jQuery
```html
<input type="text" id="input" value="">
<script type="text/javascript">
  $('#id').on('change', function (event) {
    console.log(event);
  })
</script>
```
## JSX
```js
(props) => (
    <input type="text" name="input" value="input" onChange={event => {
      console.log(event)
    }}>
)
```
---

## Component based
```js
const Button = ({
  children,
  ...others
}) => <span {...others}>{children}</span>

const IconButton = ({
  children,
  icon,
  ...others
}) => (
<Button {...others}>
  <icon className={icon}></icon>
  {children}
</Button>)
```
