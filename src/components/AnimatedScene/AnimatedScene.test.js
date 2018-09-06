/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import HelloScene from '~/components/HelloScene'
import DevSkillsScene from '~/components/DevSkillsScene'
import SoftSkillsScene from '~/components/SoftSkillsScene'
import UpNextScene from '~/components/UpNextScene'
import HumanTooScene from '~/components/HumanTooScene'
import HireMeScene from '~/components/HireMeScene'
import {
  HELLO,
  DEV_SKILLS,
  SOFT_SKILLS,
  UP_NEXT,
  HUMAN_TOO,
  HIRE_ME,
} from '~/constants/slideNames'
import AnimatedScene from './AnimatedScene.component'

const slideComponentPaths = {
  [HELLO]: HelloScene,
  [DEV_SKILLS]: DevSkillsScene,
  [SOFT_SKILLS]: SoftSkillsScene,
  [UP_NEXT]: UpNextScene,
  [HUMAN_TOO]: HumanTooScene,
  [HIRE_ME]: HireMeScene,
}

describe('AnimatedScene', () => {
  const wrappers = Object.entries(slideComponentPaths).reduce(
    async (acc, [slide, path]) => ({
      ...acc,
      [slide]: await shallow(
        <AnimatedScene
          slidename={slide}
        />
      ),
    }), {}
  )

  it('loads the correct component from given the slidename as a prop', () => {
    Object.entries(wrappers).forEach(([slidename, component]) => {
      const expectedComponent = slideComponentPaths[slidename]

      expect(component).toBeInstanceOf(expectedComponent)
    })
  })
})
