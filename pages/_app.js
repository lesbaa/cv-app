import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '~/HOCs/withReduxStore'
import { PageTransition } from 'next-page-transitions'
import { Provider } from 'react-redux'

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
            <Component {...pageProps} />
          </Provider>
        </PageTransition>
      </Container>
    )
  }
}

export default withReduxStore(LesCV)
