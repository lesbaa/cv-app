import React from 'react'
import {
  HELLO,
  DEV_SKILLS,
  SOFT_SKILLS,
  UP_NEXT,
  HUMAN_TOO,
  SOCIAL_PROOF,
  HIRE_ME,
} from '~/constants/slideNames.js'

import HelloScene from '~/components/HelloScene'
import DevSkillsScene from '~/components/DevSkillsScene'

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
      return <div className="SoftSkillsScene">soft skills</div>
    }
    case UP_NEXT: {
      return <div className="UpNextScene">up next</div>
    }
    case HUMAN_TOO: {
      return <div className="HumanTooScene">human too</div>
    }
    case SOCIAL_PROOF: {
      return <div className="SocialProofScene">SocialProof</div>
    }
    case HIRE_ME: {
      return <div className="HireMesScene">hire me</div>
    }
    default: {
      return <HelloScene colors={colors} />
    }
  }
}

export default AnimatedScene
