import React from 'react'
import PropTypes from 'prop-types'
import ReactHTMLParser from 'react-html-parser'
import TYPES from '~/constants/types'
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
  hasNav,
  children,
}) => (
  <div
    className="Content"
  >
    <Title title={title} opacity={palette.offsetOpacity} />
    <Main>
      <span
        className="content-blurb"
        opacity={palette.offsetOpacity}
      >
        {ReactHTMLParser(blurbMarkup)}
      </span>
      {children}
    </Main>
    {hasNav &&
      <Nav
        nextSlide={nextSlide}
        previousSlide={previousSlide}
      />
    }
    <style jsx>{styles}</style>
  </div>
)

Content.propTypes = {
  blurbMarkup: PropTypes.string,
  title: PropTypes.string,
  nextSlide: PropTypes.string,
  previousSlide: PropTypes.string,
  hasNav: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  palette: TYPES.PALETTE,
}

Content.defaultProps = {
  blurbMarkup: '<p>Oops! No markup!</p>',
  title: '<h2>Somethings gone awry...</h2>',
  nextSlide: null,
  previousSlide: null,
  hasNav: true,
  children: null,
  palette: {
    gradient: 'to bottom right, #eee6ee, #d9d9d9',
    colors: [
      '#eee6ee',
      '#d9d9d9',
    ],
  },
}

export default Content
