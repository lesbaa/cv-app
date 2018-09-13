/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import PageNav from './PageNav.component'

const mockSlides = {
  'les is so cool': {
    order: 1,
    altText: 'ALT_TEXT',
  },
  'really?': {
    order: 3,
    altText: 'ALT_TEXT',
  },
  'yeah, he\'s like the coolest cat out there, man': {
    order: 7,
    altText: 'ALT_TEXT',
  },
  'well, we should probably give him a job': {
    order: 5,
    altText: 'ALT_TEXT',
  },
  'fo sho?': {
    order: 4,
    altText: 'ALT_TEXT',
  },
  'FO. SHO.': {
    order: 2,
    altText: 'ALT_TEXT',
  },
  'you\'re god damn hired, Les.': {
    order: 6,
    altText: 'ALT_TEXT',
  },
}

describe('PageNav', () => {
  const wrapperOne = shallow(
    <PageNav
      slides={mockSlides}
      router={{
        query: {
          slidename: 'les is so cool',
        },
      }}
    />
  )

  const wrapperTwo = shallow(
    <PageNav
      slides={mockSlides}
      router={{
        query: {
          slidename: 'fo sho?',
        },
      }}
    />
  )

  it('matches its snapshots', () => {
    expect(wrapperOne).toMatchSnapshot('wrapperOne')
    expect(wrapperTwo).toMatchSnapshot('wrapperTwo')
  })

  it('renders the links in the correct order', () => {
    wrapperOne
      .find('.nav-item')
      .forEach((node, index) => {
        const expectedKey = String(index + 1)
        expect(expectedKey).toBe(node.key())
      })
  })

  it('renders the links with the correct props', () => {
    const {
      as,
      href,
    } = wrapperOne
      .find('Link')
      .at(3) // chosen at random...
      .props()

    expect(href).toBe('/CVSlide?slidename=well, we should probably give him a job')
    expect(as).toBe('/cv/well, we should probably give him a job')
  })

  it('renders a span element instead of a Link for the active link', () => {
    // this is not ideal and makes the test fragile, however, see here
    // https://stackoverflow.com/questions/52221341/enzyme-findselector-does-not-seem-to-find-a-selector
    // https://github.com/airbnb/enzyme/issues/1807
    const isSpan = wrapperOne
      .find('.active-nav-option')
      .html()
      .match('<span')

    expect(Boolean(isSpan)).toBe(true)
  })

})
