import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '~/HOCs/withReduxStore'
import { PageTransition } from 'next-page-transitions'
import { Provider } from 'react-redux'
import Router from 'next/router'
import {
  onRouteChangeStart,
  onRouteChangeComplete,
} from '~/actionCreators'
import drawConsoleFiglet from '~/utils/drawConsoleFiglet'

class LesCV extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const { store } = ctx
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)

      return {
        pageProps,
        store,
      }

    }

    return {
      pageProps: {},
      store,
    }
  }

  componentDidMount = () => {
    Router.onRouteChangeStart = () => {
      this.props.store.dispatch(onRouteChangeStart())
    }
    Router.onRouteChangeComplete = () => {
      this.props.store.dispatch(onRouteChangeComplete())
    }
    drawConsoleFiglet()
  }

  render() {

    const {
      Component,
      pageProps,
      store,
    } = this.props

    return (
      <Container>
        <PageTransition
          timeout={500}
          classNames="page-transition"
        >
          <Provider store={store}>
            <Component {...pageProps} store={store} />
          </Provider>
        </PageTransition>
      </Container>
    )
  }
}

export default withReduxStore(LesCV)
