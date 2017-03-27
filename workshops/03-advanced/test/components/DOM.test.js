import React, { Component, PropTypes } from 'react'
import test from 'ava'
import sinon from 'sinon'
import { mount } from 'enzyme'

import { jsdom } from 'jsdom'
global.document = jsdom('')
global.window = document.defaultView

import Text from '../../components/Text'

const EmailBox = props => (
  <span>
    <i className="icon-email"/>
    <Text label="email" {...props}/>
  </span>
)

test('Text mount', t => {
  const wrapper = mount(<Text />)
  t.is(wrapper.find('label').length, 1)
  t.is(wrapper.find('input').length, 1)
})

test('EmailBox mount', t => {
  const wrapper = mount(<EmailBox />)
  t.is(wrapper.find('label').length, 1)
  t.is(wrapper.find('input').length, 1)
})

test('Text onChange callback', t => {
  const onChangeSpy = sinon.spy()
  const wrapper = mount(<EmailBox onChange={onChangeSpy}/>)
  wrapper.find('input').simulate('change', { target: { value: 0 } })
  t.true(onChangeSpy.calledOnce)
  t.true(onChangeSpy.calledWith(0))
})

class LoginForm extends Component {
  static propTypes = {
    onInit: PropTypes.func
  }
  componentDidMount() {
    this.props.onInit && this.props.onInit(this)
  }
  render() {
    return (
      <form>
        <Text label="User Name" />
        <Text label="Password" />
        <input type="submit" value="Login"/>
      </form>
    )
  }
}

test('LoginForm should run onInit with the instance', t => {
  const onInitSpy = sinon.spy()
  const wrapper = mount(<LoginForm onInit={onInitSpy} />)
  t.true(onInitSpy.calledOnce)
  t.true(onInitSpy.calledWith(wrapper.getNode()))
})
