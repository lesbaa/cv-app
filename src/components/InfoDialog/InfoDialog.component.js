import React from 'react'
import PropTypes from 'prop-types'
import InfoIcon from 'react-feather/dist/icons/info'
import styles from './InfoDialog.styles'

const InfoDialog = ({
  message,
  isVisible,
}) => {
  const className = [
    'InfoDialog',
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
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

InfoDialog.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string,
}

InfoDialog.defaultProps = {
  isVisible: false,
  message: null,
}

export default InfoDialog
