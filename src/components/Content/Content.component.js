import React from 'react'
import getBlurbContent from '~/components/blurbs'
import Main from '~/components/Main'
import Title from '~/components/Title'
import Nav from '~/components/Nav'
import styles from './Content.styles'

const Content = ({
  slideName,
}) => (
  <div
    className="Content"
  >
    <Title title="this is some title text in here by the way" />
    <Main>
      {getBlurbContent(slideName)}
    </Main>
    <Nav />
    <style jsx>{styles}</style>
  </div>
)

// TODO prop types

export default Content
