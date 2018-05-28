/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PropTypes from 'proptypes'
import PageWrapper from '~/components/PageWrapper'
import Content from '~/components/Content'
import AnimatedScene from '~/components/AnimatedScene'
import { getSlide } from '~/utils/api'

class CVSlide extends Component {

  static pageTransitionDelayEnter = true

  state = {
    loaded: false,
  }

  static getInitialProps = async ({ query }) => {
    const {
      slidename,
    } = query

    const {
      blurbMarkup,
      title,
      palette,
      nextSlide,
      previousSlide,
    } = await getSlide({ slidename })

    return {
      slidename,
      blurbMarkup,
      title,
      palette,
      nextSlide,
      previousSlide,
    }
  }

  componentDidMount = () => {
    this.props.pageTransitionReadyToEnter()
    this.setState({ loaded: true })
  }

  render = () => {
    if (!this.state.loaded) return null
    const {
      slidename,
      blurbMarkup,
      title,
      palette,
      nextSlide,
      previousSlide,
    } = this.props

    return (
      <PageWrapper
        palette={palette}
        title={title}
      >
        <AnimatedScene slideName={slidename} />
        <Content
          title={title}
          blurbMarkup={blurbMarkup}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          palette={palette}
        />
      </PageWrapper>
    )
  }
}

CVSlide.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
}

CVSlide.defaultProps = {
  pageTransitionReadyToEnter: () => {},
}

// TODO more proptypes!


export default CVSlide
