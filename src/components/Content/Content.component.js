import React from 'react'
import Main from '~/components/Main'
import Title from '~/components/Title'
import Nav from '~/components/Nav'
import styles from './Content.styles'

const Content = ({
  blurbMarkup,
  title,
  nextSlide,
  previousSlide,
  palette,
}) => (
  <div
    className="Content"
  >
    <Title title={title} opacity={palette.offsetOpacity} />
    <Main>
      <span
        className="content-blurb"
        dangerouslySetInnerHTML={{ __html: blurbMarkup }} // eslint-disable-line
        opacity={palette.offsetOpacity}
      />
    </Main>
    <Nav
      nextSlide={nextSlide}
      previousSlide={previousSlide}
    />
    <style jsx>{styles}</style>
  </div>
)

// TODO prop types

export default Content
