import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import reset from '~/theme/reset.styles'
import transitionStyles from '~/theme/page-transitions.styles'

const PageHead = ({
  title,
}) => (
  <div className="PageHead">
    <Head>
      <title>{title}</title>
      <link
        rel="preload"
        href="/static/fonts/LeagueSpartan-Bold.subset.woff"
        as="font"
        type="font/woff"
        crossOrigin
      />
      <link
        rel="preload"
        as="font"
        type="font/woff"
        href="/static/fonts/RobotoMono-Thin.subset.woff"
        crossOrigin
      />
      <link
        rel="preload"
        as="font"
        type="font/woff"
        href="/static/fonts/RobotoMono-ThinItalic.subset.woff"
        crossOrigin
      />
      <link
        rel="preload"
        as="font"
        type="font/woff"
        href="/static/fonts/RobotoMono-Light.subset.woff"
        crossOrigin
      />
      <link
        rel="preload"
        as="font"
        type="font/woff"
        href="/static/fonts/RobotoMono-LightItalic.subset.woff"
        crossOrigin
      />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#F7F7F7" />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="apple-touch-icon" sizes="57x57" href="/static/favicons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/static/favicons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/static/favicons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/static/favicons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/static/favicons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/static/favicons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/static/favicons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/static/favicons/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <meta name="msapplication-TileColor" content="#F7F7F7" />
      <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
      <meta name="msapplication-TileImage" content="/static/favicons/ms-icon-144x144.png" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
    </Head>
    <style jsx global>{reset}</style>
    <style jsx global>{transitionStyles}</style>
  </div>
)

PageHead.propTypes = {
  title: PropTypes.string,
}

PageHead.defaultProps = {
  title: 'Hi, I\'m Les',
}

export default PageHead
