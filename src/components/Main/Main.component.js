import React from 'react'
import PropTypes from 'prop-types'
import styles from './Main.styles'

const Main = ({ children }) => (
  <main
    className="Main"
  >
    {children}
    <style jsx>{styles}</style>
  </main>
)

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
}

Main.defaultProps = {
  children: null,
}

export default Main
