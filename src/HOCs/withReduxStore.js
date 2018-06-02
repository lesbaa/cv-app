/* eslint-disable no-underscore-dangle */
/* global window */

import React from 'react'
import configureStore from '~/store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState)
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => class Redux extends React.Component {
  static async getInitialProps(appContext) {
    const store = getOrCreateStore()

    // Provide the store to getInitialProps of pages
    appContext.ctx.store = store

    let appProps = {}
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appContext)
    }

    return {
      ...appProps,
      initialReduxState: store.getState(),
    }
  }

  constructor(props) {
    super(props)
    this.store = getOrCreateStore(props.initialReduxState)
  }

  render() {
    return <App {...this.props} store={this.store} />
  }
}

// TODO default props