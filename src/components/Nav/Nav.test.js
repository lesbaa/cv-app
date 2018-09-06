/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right'
import { DIALOG_TIMEOUT } from '~/../les.config'
import Nav, { handleClick } from './Nav.component'

jest.mock('~/utils/clipboard', () => jest.fn(e => e))


describe('Nav', () => {
  const mockShowInfoAction = jest.fn()
  const wrapper = shallow(
    <Nav
      previousSlide="hello"
      nextSlide="goodbye"
      showInfoDialog={mockShowInfoAction}
    />
  )

  const wrapperNoPrev = shallow(
    <Nav
      nextSlide="hello"
      showInfoDialog={mockShowInfoAction}
    />
  )

  const wrapperNoNext = shallow(
    <Nav
      previousSlide="hello"
      showInfoDialog={mockShowInfoAction}
    />
  )

  const wrapperNoSlides = shallow(
    <Nav />
  )

  it('matches its snapshots', () => {
    expect(wrapper).toMatchSnapshot('normal')
    expect(wrapperNoPrev).toMatchSnapshot('noPrev')
    expect(wrapperNoNext).toMatchSnapshot('noNext')
    expect(wrapperNoSlides).toMatchSnapshot('noSlides')
  })


  it('renders the prev / next button if nextSlide and previousSlide are provided', () => {
    const nextButtonExists = wrapper
      .find(ArrowRightIcon)
      .exists()

    const prevButtonExists = wrapper
      .find(ArrowLeftIcon)
      .exists()

    expect(prevButtonExists).toBe(true)
    expect(nextButtonExists).toBe(true)
  })

  it('does not render the prev button if no prev slide is provided', () => {
    const prevButtonExists = wrapperNoPrev
      .find(ArrowLeftIcon)
      .exists()

    expect(prevButtonExists).toBe(false)
  })

  it('does not render the next button if no next slide is provided', () => {
    const nextButtonExists = wrapperNoNext
      .find(ArrowRightIcon)
      .exists()

    expect(nextButtonExists).toBe(false)
  })

  it('calls console.log with a message when showInfoDialog prop is not passed', () => {

    const consoleSpy = jest.spyOn(console, 'log')

    wrapperNoSlides
      .find('.share-link')
      .simulate('click')


    expect(consoleSpy).toHaveBeenCalledWith('Nav.component: no showInfoDialog action passed to component')

  })
})

describe('handleClick', () => {
  const mockShowInfoAction = jest.fn()

  beforeEach(() => {
    mockShowInfoAction.mockReset()
  })

  it('calls showInfoDialog with a success message if copyToClipboard is successful', () => {
    handleClick({
      action: mockShowInfoAction,
      href: true,
    })
    expect(mockShowInfoAction).toHaveBeenCalledWith({
      message: 'Url copied to clipboard!',
      timeout: DIALOG_TIMEOUT,
    })
  })

  it('calls showInfoDialog with a failure message if copyToClipboard fails', () => {
    handleClick({
      action: mockShowInfoAction,
      href: false,
    })
    expect(mockShowInfoAction).toHaveBeenCalledWith({
      message: 'Oops! Unable to copy to clipboard!',
      timeout: DIALOG_TIMEOUT,
    })
  })
})
