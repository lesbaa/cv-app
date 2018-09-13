/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'

import DevSkillsScene from './DevSkillsScene.component'
// TODO at present the component is pretty tricky to write test for,
// it might be easier to revisit this test after you've refactored
describe('Content', () => {
  const mockShowDetailModal = jest.fn()
  const mockFetchSkills = jest.fn()
  const wrapper = mount(
    <DevSkillsScene
      skills={{
        react: {
          _id: '_id',
          id: 'react',
          type: 'DEV',
          name: 'ReactJS',
          points: 8,
          desc: 'react description',
        },
        redux: {
          _id: '_id',
          id: 'redux',
          type: 'DEV',
          name: 'Redux',
          points: 8,
          desc: 'redux description',
        },
      }}
      showDetailModal={mockShowDetailModal}
      fetchSkills={mockFetchSkills}
    />
  )

  it('matches its snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
