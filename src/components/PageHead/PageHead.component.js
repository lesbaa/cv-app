import React from 'react'
import Head from 'next/head'
import reset from '~/theme/reset.styles'
import transitionStyles from '~/theme/page-transitions.styles'

const PageHead = ({
  title,
}) => (
  <div className="PageHead">
    <Head>
      <title>{title}</title>
    </Head>
    <style jsx global>{reset}</style>
    <style jsx global>{transitionStyles}</style>
  </div>
)

export default PageHead
