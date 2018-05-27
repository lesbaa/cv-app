import React from 'react'
import styles from './Main.styles'

const Main = ({ children }) => (
  <main
    className="Main"
  >
    {children}
    <style jsx>{styles}</style>
  </main>
)

// TODO proptypes

export default Main
