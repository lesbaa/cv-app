/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'

import Dialog from './Dialog.component'

describe('Dialog', () => {
  const wrapperVisibleWithChildren = shallow(
    <Dialog
      message="message 1"
      isVisible
    >
      <div className="child" />
    </Dialog>
  )

  const wrapperNotVisibleNoChildren = shallow(
    <Dialog
      message="message 2"
    />
  )

  it('matches its snapshots', () => {
    expect(wrapperVisibleWithChildren).toMatchSnapshot('visible with children')
    expect(wrapperNotVisibleNoChildren).toMatchSnapshot('visible with children')
  })

  it('renders children if present', () => {
    const childrenExist = wrapperVisibleWithChildren
      .find('.child')
      .exists()

    expect(childrenExist).toBe(true)
  })

  it('renders the className "active" if isVisible is true and not if !isVisible', () => {
    const classNameVisible = wrapperVisibleWithChildren
      .props()
      .className

    const classNameNotVisible = wrapperNotVisibleNoChildren
      .props()
      .className


    expect(classNameVisible).toMatch('active')
    expect(classNameNotVisible).not.toMatch('active')
  })
})
