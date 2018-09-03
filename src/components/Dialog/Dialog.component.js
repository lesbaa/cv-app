import React from 'react'
import PropTypes from 'prop-types'
import InfoIcon from 'react-feather/dist/icons/info'
import styles from './Dialog.styles'

const Dialog = ({
  message,
  isVisible,
  children,
}) => {
  const className = [
    'Dialog',
    isVisible && 'active',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
    >
      <div
        className="dialog-content"
      >
        <InfoIcon size="1em" />
        <span className="message">{message}</span>
        {children}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

Dialog.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]),
}

Dialog.defaultProps = {
  isVisible: false,
  message: null,
  children: null
}

export default Dialog
