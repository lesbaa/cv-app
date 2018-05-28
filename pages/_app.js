import App, { Container } from 'next/app'
import React from 'react'
import { PageTransition } from 'next-page-transitions'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      return { pageProps }
    }

    return { pageProps: {} }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <PageTransition timeout={500} classNames="page-transition">
          <Component {...pageProps} />
        </PageTransition>
      </Container>
    )
  }
}
