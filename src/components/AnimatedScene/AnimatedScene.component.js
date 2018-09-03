import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

class AnimatedScene extends Component {

  state = {
    componentLoaded: false,
  }

  componentDidMount = async () => {
    // TODO this could def be abstracted out to a HOC withCodeSplit or similar
    const module = await getSceneComponent(this.props.slidename)

    this.Component = module.default
    this.setState({
      componentLoaded: true,
    })
  }

  render = () => {

    const {
      palette: { colors },
    } = this.props

    return this.state.componentLoaded
      ? (
        <this.Component
          colors={colors}
          {...this.props}
        />
      ) : null
  }
}

function getSceneComponent(slidename) {
  switch (slidename) {
    case HELLO: {
      return import('~/components/HelloScene')
    }
    case DEV_SKILLS: {
      return import('~/components/DevSkillsScene')
    }
    case SOFT_SKILLS: {
      return import('~/components/SoftSkillsScene')
    }
    case UP_NEXT: {
      return import('~/components/UpNextScene')
    }
    case HUMAN_TOO: {
      return import('~/components/HumanTooScene')
    }
    case TIMELINE: {
      return () => <div className="TimelineScene">Timeline</div> // will be included post MVP
    }
    case SOCIAL_PROOF: {
      return () => <div className="SocialProofScene">SocialProof</div> // will be included post MVP
    }
    case HIRE_ME: {
      return import('~/components/HireMeScene')
    }
    default: {
      return import('~/components/HelloScene')
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
  },
}

export default AnimatedScene
