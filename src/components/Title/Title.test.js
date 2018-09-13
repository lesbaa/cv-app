/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import Title from './Title.component'


describe('Title', () => {
  const wrapperOne = shallow(
    <Title title="<h2>this has some html in it</h2>" />
  )
  const wrapperTwo = shallow(
    <Title title="this has some plain text" />
  )

  it('matches its snapshots', () => {
    expect(wrapperOne).toMatchSnapshot('html')
    expect(wrapperTwo).toMatchSnapshot('plain text')
  })
})
