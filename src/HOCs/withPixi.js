import React, { Component } from 'react'
import PropTypes from 'prop-types'
// because PIXI has some IIFE polyfill that freaks out on the server
// It would be nice to have a 'withCodeSplit' and make this more generic,
// However, babel / webpack freaks out unless you give it a hard-coded string
// this doesn't follow the spec, but I'm not 100% sure what else to do at the moment,
// I believe Zeit are working on it.

export default function withPixi(WrappedComponent) {
  class Pixified extends Component {
    state = {
      pixiHasLoaded: false,
    }

    componentDidMount = async () => {
      this.props.setIsFetching()

      this.PIXI = await import('pixi.js')

      this.props.setIsNotFetching()

      this.setState({
        pixiHasLoaded: true,
      })
    }

    render = () => (
      this.state.pixiHasLoaded
        ? (
          <WrappedComponent
            {...this.props}
            PIXI={this.PIXI}
          />
        ) : null
    )
  }

  Pixified.defaultProps = {
    setIsFetching: () => console.log('withPixi: no setIsFetching callback passed'),
    setIsNotFetching: () => console.log('withPixi: no setIsNotFetching callback passed'),
  }

  Pixified.propTypes = {
    setIsFetching: PropTypes.func,
    setIsNotFetching: PropTypes.func,
  }

  return Pixified
}
