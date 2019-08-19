import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

const envScript = `
window.env = {
  NODE_ENV: '${process.env.NODE_ENV}',
  API_BASE_URL: '${process.env.API_BASE_URL}'
}
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: envScript }} />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
