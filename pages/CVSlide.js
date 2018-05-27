/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PageWrapper from '~/components/PageWrapper'
import Content from '~/components/Content'
import AnimatedScene from '~/components/AnimatedScene'
import Gradient from '~/components/Gradient'

class CVSlide extends Component {
  static getInitialProps = ({ query }) => {
    const { slidename = 'hello' } = query

    return {
      slidename,
    }
  }

  render = () => {
    const {
      slidename,
    } = this.props

    return (
      <PageWrapper>
        <Gradient slideName={slidename} />
        <AnimatedScene slideName={slidename} />
        <Content slideName={slidename} />
      </PageWrapper>
    )
  }
}

// TODO default props

export default CVSlide
