/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '~/components/PageWrapper'
import Content from '~/components/Content'
import AnimatedScene from '~/components/AnimatedScene'
import DetailModal from '~/components/DetailModal'
import { fetchSlides } from '~/actionCreators'
import InfoDialog from '~/components/InfoDialog'
import TrackingDialog from '~/components/TrackingDialog'
import Error from './_error'

class CVSlide extends Component {

  static pageTransitionDelayEnter = true

  static getInitialProps = async ({ req, query, store }) => {
    const {
      slidename,
    } = query
    // TODO you can probably "containerize" this.
    await store.dispatch(fetchSlides())

    const slideData = store.getState().slides[slidename]

    if (!slideData) {
      const url = req
        ? req.originalUrl
        : window.location

      return {
        err: {
          statusCode: 404,
          message: `Page ${url} not found.`,
        },
      }
    }

    const {
      blurbMarkup,
      title,
      palette,
      nextSlide,
      previousSlide,
    } = slideData

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
  }

  render = () => {
    const {
      slidename,
      blurbMarkup,
      title,
      palette,
      nextSlide,
      previousSlide,
      store,
      err,
    } = this.props

    if (err) return <Error statusCode={err.statusCode} />

    return (
      <PageWrapper
        palette={palette}
        title={title}
      >
        <InfoDialog />
        <TrackingDialog />
        <AnimatedScene
          store={store}
          palette={palette}
          slidename={slidename}
        />
        <Content
          title={title}
          blurbMarkup={blurbMarkup}
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          palette={palette}
        />
        <DetailModal palette={palette} />
      </PageWrapper>
    )
  }

}

CVSlide.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
  slidename: PropTypes.string,
  blurbMarkup: PropTypes.string,
  title: PropTypes.string,
  palette: PropTypes.string,
  nextSlide: PropTypes.string,
  previousSlide: PropTypes.string,
  store: PropTypes.object,
  err: PropTypes.oneOf([
    PropTypes.shape({
      statusCode: PropTypes.number,
      message: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
}

CVSlide.defaultProps = {
  pageTransitionReadyToEnter: () => {},
  slidename: null,
  blurbMarkup: null,
  title: null,
  palette: null,
  nextSlide: null,
  previousSlide: null,
  store: PropTypes.object,
  err: false,
}

export default CVSlide
