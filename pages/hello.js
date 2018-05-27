/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PageWrapper from '~/components/PageWrapper'
import Content from '~/components/Content'
import AnimatedScene from '~/components/AnimatedScene'
import Gradient from '~/components/Gradient'

class Section extends Component {
  static getInitialProps = ({ query }) => {
    const { section } = query

    return {
      section,
    }
  }

  render = () => {
    const {
      section,
    } = this.props

    return (
      <PageWrapper>
        <Gradient section={section} />
        <AnimatedScene section={section} />
        <Content section={section} />
      </PageWrapper>
    )
  }
}

export default Section
