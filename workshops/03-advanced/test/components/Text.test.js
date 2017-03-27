import React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import Text from '../../components/Text'

test('Test shallow render', t => {
  const wrapper = shallow(<Text />)
  t.is(wrapper.find('label').length, 1)
  t.is(wrapper.find('input').length, 1)
})

test('Test onChange callback', t => {
  const onChange = sinon.spy()
  const wrapper = shallow(<Text onChange={onChange}/>)
  wrapper.find('input').simulate('change', { target: { value: 0 } })
  t.is(onChange.called, true)
  t.is(onChange.callCount, 1)
  t.is(onChange.calledWith(0), true)
})
