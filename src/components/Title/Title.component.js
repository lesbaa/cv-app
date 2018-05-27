import React from 'react'
import styles from './Title.styles'
import TextNode from './TextNode.component'

const mapSentenceToNodes = sentence => sentence
  .split(' ')
  .map((word, i) => <TextNode word={word} key={`${word}-${i}`} />)

const Title = ({ title }) => (
  <h2
    className="Title"
  >
    {mapSentenceToNodes(title)}
    <style jsx>{styles}</style>
  </h2>
)

export default Title
