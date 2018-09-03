import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.styles'

const Loader = ({
  isFetching,
}) => {
  const loaderClassname = [
    'Loader',
    isFetching && 'loading',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={loaderClassname}
    >
      <style jsx>{styles}</style>
    </div>
  )
}

Loader.propTypes = {
  isFetching: PropTypes.bool,
}

Loader.defaultProps = {
  isFetching: false,
}

export default Loader
