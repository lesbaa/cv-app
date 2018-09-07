/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import PageNav from '~/components/PageNav'
import PageHead from '~/components/PageHead'
import PageWrapper from './PageWrapper.component'

jest.mock('~/components/PageNav', () => props => <div className="PageNav" />)
jest.mock('~/components/PageHead', () => props => <div className="PageHead" />)

describe('Title', () => {
  const baseProps = {
    title: 'hey! a title?',
    palette: {
      gradient: 'GRADIENT',
    },
  }

  const wrapperMobile = shallow(
    <PageWrapper
      {...baseProps}
      isMobile
    >
      <div className="child-one" />
    </PageWrapper>
  )

  const wrapperDesktop = shallow(
    <PageWrapper {...baseProps} >
      <div className="child-two" />
    </PageWrapper>
  )


  it('matches its snapshots', () => {
    expect(wrapperMobile).toMatchSnapshot('mobile')
    expect(wrapperDesktop).toMatchSnapshot('desktop')
  })

  it('renders its kids', () => {
    const childOneExists = wrapperMobile
      .find('.child-one')
      .exists()

    expect(childOneExists).toBe(true)

    const childTwoExists = wrapperDesktop
      .find('.child-two')
      .exists()

    expect(childTwoExists).toBe(true)
  })

  it('renders PageNav on desktop', () => {
    const pageNavExists = wrapperDesktop
      .find(PageNav)
      .exists()

    expect(pageNavExists).toBe(true)
  })

  it('does not render PageNav on mobile', () => {
    const pageNavExists = wrapperMobile
      .find(PageNav)
      .exists()

    expect(pageNavExists).toBe(false)
  })

  it('renders the correct gradient to the style prop in gradient', () => {
    const gradient = wrapperDesktop
      .find('.gradient')
      .props()
      .style
      .background

    expect(gradient).toBe('linear-gradient(GRADIENT)')
  })

  it('passes the correct title prop to PageHead', () => {
    const pageHeadTitle = wrapperDesktop
      .find(PageHead)
      .props()
      .title

    expect(pageHeadTitle).toBe('Les Moffat | hey! a title?')
  })

})
