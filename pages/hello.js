/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import PageHead from '~/components/PageHead'

class Hello extends Component {
  static getInitialProps = ({ req }) => {
    const ua = process.browser
      ? navigator.userAgent
      : req.headers['user-agent']

    return {
      ua,
    }
  }

  render = () => {
    return (
      <div>
        <PageHead
          title="Hey!"
        />
        {this.props.ua}
      </div>
    )
  }
}

export default Hello
