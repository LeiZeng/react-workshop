import React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import Text from '../../components/Text'

const EmailBox = props => (
  <span>
    <i className="icon-email"/>
    <Text label="email" {...props}/>
  </span>
)

test.skip('EmailBox render Text -- bad', t => {
  const wrapper = shallow(<EmailBox onChange={onChange}/>)
  t.is(wrapper.find('input').length, 1)
})

test('EmailBox render Text', t => {
  const wrapper = shallow(<EmailBox />)
  t.is(wrapper.contains(<Text label="email" />), true)
})

test('EmailBox render Text with Callback', t => {
  const onChagneSpy = sinon.spy()
  const wrapper = shallow(<EmailBox onChange={onChagneSpy} />)
  t.is(wrapper.contains(<Text label="email" onChange={onChagneSpy} />), true)
})
