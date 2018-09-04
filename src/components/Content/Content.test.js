/* eslint-env jest */
import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Content from './Content.component'

Enzyme.configure({
  adapter: new Adapter(),
})

describe('Content', () => {
  const wrapper = shallow(
    <Content
      store={{}}
      blurbMarkup=""
      title=""
      nextSlide=""
      previousSlide=""
      palette={{}}
      hasNav
    />
  )

  it('renders', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
