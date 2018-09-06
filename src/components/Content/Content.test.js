/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ReactHTMLParser from 'react-html-parser'
import Main from '~/components/Main'
import Title from '~/components/Title'
import Nav from '~/components/Nav'

import Content from './Content.component'

jest.mock('react-html-parser')

const mockMarkupOne = '<p>Hiya this is a paragraph from backend!<p>'
const mockMarkupTwo = '<p class="heya">Hiya this is a another paragraph from backend!<p>'

describe('Content', () => {
  const wrapper = shallow(
    <Content
      store={{}}
      blurbMarkup={mockMarkupOne}
      title="Hiya this is a title!"
      nextSlide="dev-skills"
      previousSlide="hello"
    >
      <div className="child-one">Helooo!</div>
    </Content>
  )
  const wrapperNoNav = shallow(
    <Content
      blurbMarkup={mockMarkupTwo}
      title="Hiya this is a title!"
      nextSlide="dev-skills"
      previousSlide="hello"
      hasNav={false}
    />
  )

  it('matches its snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders its children', () => {
    const childExists = wrapper
      .find('.child-one')
      .exists()

    expect(childExists).toBeTruthy()
  })

  it('renders the Nav component', () => {
    const navExists = wrapper
      .find(Nav)
      .exists()

    expect(navExists).toBeTruthy()
  })

  it('does not render the Nav component if hasNav is false', () => {
    const navExists = wrapperNoNav
      .find(Nav)
      .exists()

    expect(navExists).toBeFalsy()
  })

  it('renders the Title component', () => {
    const titleExists = wrapper
      .find(Title)
      .exists()

    expect(titleExists).toBeTruthy()
  })

  it('renders the Main component', () => {
    const titleExists = wrapper
      .find(Main)
      .exists()

    expect(titleExists).toBeTruthy()
  })

  it('calls ReactHTMLParser with blurbContent', () => {
    expect(ReactHTMLParser).toHaveBeenCalledWith(mockMarkupOne)
    expect(ReactHTMLParser).toHaveBeenCalledWith(mockMarkupTwo)
  })
})
