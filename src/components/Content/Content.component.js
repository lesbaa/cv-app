import React from 'react'
import PropTypes from 'prop-types'
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

Content.propTypes = {
  blurbMarkup: PropTypes.string,
  title: PropTypes.string,
  nextSlide: PropTypes.string,
  previousSlide: PropTypes.string,
  palette: PropTypes.shape({
    gradient: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
}

Content.defaultProps = {
  blurbMarkup: '<p>Oops! No markup!</p>',
  title: '<h2>Somethings gone awry...</h2>',
  nextSlide: 'DEV_SKILLS',
  previousSlide: null,
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  },
}

export default Content
