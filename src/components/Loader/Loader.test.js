/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'

import Loader from './Loader.component'

describe('Loader', () => {
  const wrapperVisible = shallow(
    <Loader
      isFetching
    />
  )

  const wrapperNotVisible = shallow(
    <Loader />
  )

  it('matches its snapshots', () => {
    expect(wrapperVisible).toMatchSnapshot('visible')
    expect(wrapperNotVisible).toMatchSnapshot('notVisible')
  })
})
