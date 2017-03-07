# Basics of React

- ES6
- JSX

---

# ES6
## `class`
```js
class Person {
  say() {
    console.log('I am a Person.');
  }
}
class Man extends Person {
  say() {
    console.log('I am a Man.');
  }
}
class MyComponent extends React.Component {
  constructor() {

  }
}
```

---
# ES6
## Arrow Function
```js
const double = x => x * 2
const add = (a, b) => a + b

```

---

# ES6
## Arrow Function
```js
const onClick = function(evt) {
  console.log(this);
}

```

```js
const onClick = (evt) => {
  console.log(this);
}
// this === global

```

```js
const onClick = (evt) => {
  console.log(this);
}
const onClickWithContext = onClick.bind(other)
// this === global

```
---
layout: true

# ES6
## Destructing/Spread/Rest

```js
const user = {
  id: 0,
  favor: ['Game', 'Car'],
  products: { Car: [], Game: [] }
}

```
---
### Destructing
```js
const { favor, products } = user
// favor === ['Game', 'Car']
// products === { Car: [], Game: [] }
```
---

### Spread

```js
const sam = {
  ...user,
  id: 1,
  favor: ['Sports']
}
// const sam = {
//   id: 1,
//   favor: ['Sports'],
//   products: { Car: [], Game: [] }
// }
```

---
### Rest
```js
const { id, ...rest } = user
const tom = {
  id: id + 1,
  ...rest
}
```
---
layout: false

# JSX
## - Javascript Syntax for XML
```js
class MyComponent extends React.Component {
  getHeader() {
    return <div>Header</div>
  }
  render() {
    return <div>Hello {this.getHeader()}</div>
  }
}
```
---
class: middle center

# Questions for ES6 and JSX ?

https://github.com/LeiZeng/react-workshop

`cd workshops/01-basics && yarn && yarn start`
???
virtual DOM + Hyperscript vs React
---
# OOP ? FP

```js
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>
  }
}
const MyComponent = (props) => <div>Hello</div>

```
???
1. React vs FRP
2. class first

---

# When should we use Component?
- State
- Lifecycle

```js
class MyComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      target: 'loading'
    }
  }
  componentDidMount() {
    this.setState({
      target: 'loaded'
    })
  }
  render() {
    return <div>State: {this.state.target}</div>
  }
}
```

---

# **Pure Function** is always preferred

- Static styled components
- Self managed components
- Event Driven components

```js
const MyComponent = props => <div className="header-titile">Hello</div>

const Toggle = props => (
  <span
    onClick={props.onClick && (evt) => props.onClick(evt)}
  >
    {props.children}
  </span>
)
Toggle.displayName = 'Radio'
Toggle.propTypes = { ... }

```
???
FP
Performance
---
# Practice for Basics
1. A Text input component pass all the passible events to DOM
```js
<Text onClick={evt => console.log(evt)}
<Text onFocus={evt => console.log(evt)}
<Text onChange={evt => console.log(evt)}
...
```
3. List Component from an object
```js
const data = { a: 'a', b: 'b', c: 'c' }
const result = <Component data={data} />
// <ul><li>a:a</li><li>b:b</li><li>c:c</li></ul>
```
---
layout: true

# Lifecycle

---
## Initialization
- constructor
  - getDefaultProps
  - getInitialState
- componentWillMount
- render
- componentDidMount

```js
componentWillMount()
componentDidMount()
```
## Unmount
- componentWillUnmount

---
## Updating
- componentWillReceiveProps

  > state changes should never trigger any props changes.
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

```js
componentWillReceiveProps(nextProps) {
  setState({})
}

```
```js
shouldComponentUpdate(nextProps, nextState) {}
```
---
layout: true
# State vs Props
---

## State
  - Changeable
  - Local value have to be self managed

## Props
  - Readonly
  - PropType Check
  - Have to be passed from parent
---

## A case to use state

```js
class Text extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  render() {
    return (
      <div>
        <input type="text" onChange={evt => this.setState({
            value: evt.target.value
          })}
        />
        <span>You have input: {value}</span>
      </div>
    )
  }
}
```

---
layout: false

# Practice for State vs Props
1. Create a DropDown component:
 - Show a clickable button
 - When clicked, show a dropdown
 - Toggle the dropdown list when click again

```js
import DropDown from './DropDown'

const dropdownList = (
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
)
const MyDropDown = <DropDown dropdown={dropdownList}>Click Me</DropDown>

```
---
layout: true

#DOM vs JSX

---

## Javascript Syntax with XML
- Variables/Function in HTML
- Operate HTML as variable/component

---
## DOM with Javascript

- DOM based operation
- Context first
- DOM as single source of truce *

```html
<script type="text/javascript">
  function onChange(event) {
    console.log(event);
    console.log(this.value);
  }
</script>
<input type="text" name="input" value="" onChange="onChange">
```

---

## DOM with jQuery

- jQuery object based operation
- jQuery as namespace
- DOM as single source of truce *

```html
<input type="text" id="input" value="">
<script type="text/javascript">
  $('#id').on('change', function (event) {
    console.log(event);
    console.log($(this).val());
  })
</script>
```
---

## JSX

- Component based operation
- Modules/Packages
- Props data as single source of truce

```js
(props) => (
  <input type="text" name="input" value="input" onChange={event => {
    console.log(event)
    console.log(event.target.value)
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

const Icon = props => (
  <i className={`icon icon-${props.name}`}>{props.children}</i>
)

const IconButton = ({
  children,
  icon,
  ...others
}) => (
  <Button {...others}>
    <Icon name="home"/>
    {children}
  </Button>
)
```
---
layout: false

# Practice for DOM vs JSX

1. Create Flow component as in UML Graph

  ```js
  import Flow from './Flow'

  const FirstFlow = <Flow condition={true} yes={'yes'} no={'no'}/>

  const FirstFlow = <Flow condition={true} otherwise={'no'}>{'yes'}</Flow>

  ```

2. Implement following Appointment UML Graph with Flow and basic types

  ```ruby
   [Appointment]
        |
    <Is a Human>--------No-------> [You'r not a Human!]                           
        |                                   |
       Yes                                  |
        |                                   |
    <Is Booked?>--No-> [Back to Book it.]   |
        |                            \      |
       Yes                            \     |
        |                              \    |
    [Conference]                       [Reject]
  ```

---
layout: true
class: middle

# Form
---

- Dynamic user inputs
- Shared data


```html
<form action="post">
  <label>User Name<input type="text" name="username" /></label>
  <label>Email<input type="text" name="email" /></label>
  <fieldset>
    <label>
      I have a child:
      <input type="radio" name="have_child" value="yes"/>
    </label>
    <label>
      I don't have a child:
      <input type="radio" name="have_child" value="no" />
    </label>
  </fieldset>
  <select name="gander_of_child">
    <option value="boy">boy</option>
    <option value="girl">girl</option>
  </select>
  <input type="submit" value="submit"/>
</form>
```
???
- In PHP, Form is very easy to submit data
- Now days UX requires much more in a single form, leading, validation, show/hide, steps
- In React, it becomes difficult because of the state/props
---

## Fields

```js
const Text = props => <input type="text" {...props}/>

const Select = ({options, ...others}) => (
  <select {...others}>
    {Object.keys(options)
      .map((optionKey, index) => (
        <option value={optionKey} key={index}>{options[optionKey]}</option>
      ))
    }
  </select>
)
```
???
simple input vs complex select
---

## DOM Operation

```js
class Input extends Component {
  _onChange(event) {
    console.log(findDOM(this.refs.input), this.props);
  }
  render() {
    return (
      <input ref="input" type="text" {...this.props} >
    )
  }
}
```
---

## DOM without Operation


```js
class Input extends Component {
  _onChange(event) {
    console.log(findDOM(this.refs.input), this.props);
  }
  render() {
    return (
      <input ref="input" type="text" {...this.props} >
    )
  }
}
```
```js
const Input = props => (
  <input
    type="text"
    {...props}
    onChange={event => {
      console.log(event.target, props);
    }}
  />
)
```
---

## Event Driven Operation

```js
const Input = props => (
  <input
    type="text"
    {...props}
    onChange={event => {
      props.onChange && props.onChange(event.target.value)
    }}
  />
)
const Text = props => <Input onChange={value => console.log(value)} />
```
---

layout: false
# Practice for Form
## Create a Form with following requirements:
1. Email validation(required and with @)
2. Hide child gander and show while has child
3. Capture submit action and add onSubmit event

```html
<form action="post">
  <label>User Name<input type="text" name="username" /></label>
  <label>Email<input type="text" name="email" /></label>
  <fieldset>
    <label>
      I have a child:<input type="radio" name="have_child" value="yes"/>
    </label>
    <label>
      I don't have a child:<input type="radio" name="have_child" value="no" />
    </label>
  </fieldset>
  <select name="gander_of_child">
    <option value="boy">boy</option>
    <option value="girl">girl</option>
  </select>
  <input type="submit" value="submit"/>
</form>
```
---
class: center middle

# Thinking in React
https://facebook.github.io/react/docs/thinking-in-react.html
---
class: center

# Homework

## Implement a TodoMVC
.left[
- No style required
- State allowed
]

.left[
- No DOM operation
- Pure React
- Time count down from first line
]
