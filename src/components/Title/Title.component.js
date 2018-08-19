import React from 'react'
import PropTypes from 'prop-types'
import ReactHTMLParser from 'react-html-parser'
import styles from './Title.styles'

const Title = ({ title }) => (
  <h2
    className="Title"
  >
    {ReactHTMLParser(title)}
    <style jsx>{styles}</style>
  </h2>
)

Title.propTypes = {
  title: PropTypes.string,
}

Title.defaultProps = {
  title: '',
}

export default Title
