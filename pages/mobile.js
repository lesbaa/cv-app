import React, { Component } from 'react'
import PageWrapper from '~/components/PageWrapper'
import Content from '~/components/Content'
import ICalLinkPicker from '~/components/ICalLinkPicker'

const blurbMarkup = `
  <p>I'm afraid I haven't finished building the mobile experience for this just yet!</p>
  <p>Would you like to <em>set yourself a reminder</em> to view the desktop version when you get back to the office?</p>
`
const Mobile = () => (
  <PageWrapper
    title="Gosh darn it!"
  >
    <Content
      title="Gosh darn it!"
      hasNav={false}
      blurbMarkup={blurbMarkup}
    >
      <ICalLinkPicker />
    </Content>
  </PageWrapper>
)

export default Mobile
