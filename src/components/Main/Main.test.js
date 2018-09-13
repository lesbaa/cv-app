/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'

import Main from './Main.component'

describe('Main', () => {
  const wrapper = shallow(
    <Main>
      <div className="child" />
      <div className="child" />
    </Main>
  )

  it('matches its snapshots', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its children', () => {
    const childrenExist = wrapper
      .find('.child')
      .exists()

    expect(childrenExist).toBe(true)
  })
})
