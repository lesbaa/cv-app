/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'

import Nav, { handleClick } from './Nav.component'

describe('Nav', () => {
  const mockShowInfoAction = jest.fn()
  const wrapper = shallow(
    <Nav
      previousSlide="hello"
      nextSlide="goodbye"
      showInfoDialog={mockShowInfoAction}
    />
  )

  it('matches its snapshots', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleClick', () => {
  it('handleClick', () => {
    handleClick(console.log)
  })
})
