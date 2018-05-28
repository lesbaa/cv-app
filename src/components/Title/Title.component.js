import React from 'react'
import ReactHTMLParser from 'react-html-parser'
import styles from './Title.styles'

const Title = ({ title, opacity }) => (
  <h2
    className="Title"
  >
    {ReactHTMLParser(title)}
    <style jsx>{styles}</style>
  </h2>
)

export default Title
