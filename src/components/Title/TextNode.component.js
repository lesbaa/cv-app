import React from 'react'
import styles from './Title.styles'

const TextNode = ({
  word,
  nodeKey,
}) => (
  <span
    key={nodeKey}
    className="text-node"
    data-text={word}
  >
    {word}
    <style jsx>{styles}</style>
  </span>
)

export default TextNode

// TODO proptypes