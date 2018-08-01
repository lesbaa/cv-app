import React from 'react'
import PropTypes from 'prop-types'
import {
  HELLO,
  DEV_SKILLS,
  SOFT_SKILLS,
  UP_NEXT,
  HUMAN_TOO,
  SOCIAL_PROOF,
  HIRE_ME,
} from '~/constants/slideNames'
import HelloScene from '~/components/HelloScene'
import DevSkillsScene from '~/components/DevSkillsScene'
import SoftSkillsScene from '~/components/SoftSkillsScene'
import UpNextScene from '~/components/UpNextScene'
import HumanTooScene from '~/components/HumanTooScene'
import HireMeScene from '~/components/HireMeScene'

const AnimatedScene = ({
  slidename,
  palette: { colors },
}) => {
  switch (slidename) {
    case HELLO: {
      return <HelloScene colors={colors} />
    }
    case DEV_SKILLS: {
      return <DevSkillsScene colors={colors} />
    }
    case SOFT_SKILLS: {
      return <SoftSkillsScene colors={colors} />
    }
    case UP_NEXT: {
      return <UpNextScene colors={colors} />
    }
    case HUMAN_TOO: {
      return <HumanTooScene colors={colors} />
    }
    case SOCIAL_PROOF: {
      return <div className="SocialProofScene">SocialProof</div> // will be included post MVP
    }
    case HIRE_ME: {
      return <HireMeScene colors={colors} />
    }
    default: {
      return <HelloScene colors={colors} />
    }
  }
}

AnimatedScene.propTypes = {
  slidename: PropTypes.string,
  palette: PropTypes.shape({
    gradient: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
}

AnimatedScene.defaultProps = {
  slidename: 'HELLO',
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  }
}

export default AnimatedScene
