/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import TrackingDialog from './TrackingDialog.component'
import Dialog from '~/components/Dialog'

jest.mock('~/components/Dialog', () => props => <div className="Dialog" />)

describe('Title', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockAcceptTracking = jest.fn()
  const mockDenyTracking = jest.fn()

  const wrapper = shallow(
    <TrackingDialog
      dialogVisible
      acceptTracking={mockAcceptTracking}
      denyTracking={mockDenyTracking}
    />
  )
  const wrapperNoProps = shallow(
    <TrackingDialog />
  )

  it('matches its snapshots', () => {
    expect(wrapper).toMatchSnapshot('with props')
    expect(wrapperNoProps).toMatchSnapshot('with no props')
  })

  it('calls acceptTracking on click of accept', () => {
    const mockEventData = '🎉'
    wrapper
      .find('.button.accept')
      .simulate('click', mockEventData)
    expect(mockAcceptTracking).toHaveBeenCalledWith(mockEventData)
  })

  it('passes the dialogVisible prop to the isVisible prop of Dialog', () => {
    const dialogIsVisibleProp = wrapper
      .find(Dialog)
      .props()
      .isVisible

    expect(dialogIsVisibleProp).toBe(true)

    const dialogIsNotVisible = wrapperNoProps
      .find(Dialog)
      .props()
      .isVisible

    expect(dialogIsNotVisible).toBe(false)
  })

  it('calls denyTracking on click of deny', () => {
    const mockEventData = '😦'
    wrapper
      .find('.button')
      .at(1)
      .simulate('click', mockEventData)
    expect(mockDenyTracking).toHaveBeenCalledWith(mockEventData)
  })

  it('calls console.log if no actions are passed', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    wrapperNoProps
      .find('.button')
      .forEach(node => node.simulate('click'))

    expect(consoleSpy).toHaveBeenCalledWith('TrackingDialog: no acceptTracking action passed as prop')
    expect(consoleSpy).toHaveBeenCalledWith('TrackingDialog: no denyTracking action passed as prop')
  })
})
