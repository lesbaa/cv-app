import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TYPES from '~/constants/types'
import {
  HELLO,
  DEV_SKILLS,
  SOFT_SKILLS,
  UP_NEXT,
  HUMAN_TOO,
  SOCIAL_PROOF,
  HIRE_ME,
  TIMELINE,
} from '~/constants/slideNames'
import HelloScene from '~/components/HelloScene'
import DevSkillsScene from '~/components/DevSkillsScene'
import SoftSkillsScene from '~/components/SoftSkillsScene'
import UpNextScene from '~/components/UpNextScene'
import HumanTooScene from '~/components/HumanTooScene'
import HireMeScene from '~/components/HireMeScene'

if (!HelloScene) console.log(HelloScene)
if (!DevSkillsScene) console.log(DevSkillsScene)
if (!SoftSkillsScene) console.log(SoftSkillsScene)
if (!UpNextScene) console.log(UpNextScene)
if (!HumanTooScene) console.log(HumanTooScene)
if (!HireMeScene) console.log(HireMeScene)

const AnimatedScene = (props) => {
  const {
    palette: { colors },
    slidename,
  } = props

  const SceneComponent = getSceneComponent(slidename)

  return (
    <SceneComponent
      colors={colors}
      {...props}
    />
  )
}

function getSceneComponent(slidename) {
  switch (slidename) {
    case HELLO: {
      return HelloScene
    }
    case DEV_SKILLS: {
      return DevSkillsScene
    }
    case SOFT_SKILLS: {
      return SoftSkillsScene
    }
    case UP_NEXT: {
      return UpNextScene
    }
    case HUMAN_TOO: {
      return HumanTooScene
    }
    case TIMELINE: {
      return () => <div className="TimelineScene">Timeline</div> // will be included post MVP
    }
    case SOCIAL_PROOF: {
      return () => <div className="SocialProofScene">SocialProof</div> // will be included post MVP
    }
    case HIRE_ME: {
      return HireMeScene
    }
    default: {
      return HelloScene
    }
  }
}

AnimatedScene.propTypes = {
  slidename: PropTypes.string,
  palette: TYPES.PALETTE,
}

AnimatedScene.defaultProps = {
  slidename: 'HELLO',
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  },
}

export default AnimatedScene
