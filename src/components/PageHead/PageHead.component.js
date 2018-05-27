import React from 'react'
import Head from 'next/head'
import reset from '~/theme/reset.styles'

const PageHead = ({
  title,
}) => (
  <div className="PageHead">
    <Head>
      <title>{title}</title>
    </Head>
    <style jsx global>{reset}</style>
  </div>
)

export default PageHead
