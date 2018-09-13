/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'

import DetailModal from './DetailModal.component'

describe('DetailModal', () => {

  const mockCloseModal = jest.fn()

  const wrapper = shallow(
    <DetailModal
      skillId="hello"
      modalTitle="TITLE"
      modalContent="<p>content markup in here from backend</p>"
      hideSkillDetailModal={mockCloseModal}
      palette={{
        gradient: 'to bottom right, #eee6ee, #d9d9d9',
        colors: [
          '#eee6ee',
          '#d9d9d9',
        ],
      }}
    />
  )

  it('matches its snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('renders applies a className "is-closed" if modalIsVisible is falsey', () => {
    const { className } = wrapper.props()

    expect(className).toMatch('is-closed')
  })

  it('calls the hideSkillDetailModal action', () => {
    const closeButton = wrapper
      .find('button')

    closeButton.simulate('click')

    expect(mockCloseModal).toHaveBeenCalled()
  })

})
