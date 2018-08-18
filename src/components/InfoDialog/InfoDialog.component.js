import React from 'react'
import PropTypes from 'prop-types'
import InfoIcon from 'react-feather/dist/icons/info'
import styles from './InfoDialog.styles'

const InfoDialog = ({
  message,
  isVisible,
}) => (
  isVisible
    ? (
      <div
        className="InfoDialog"
      >
        <InfoIcon size="1em" />
        <span className="message">{message}</span>
        <style jsx>{styles}</style>
      </div>
    ) : null
)

InfoDialog.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string,
}

InfoDialog.defaultProps = {
  isVisible: false,
  message: null,
}

export default InfoDialog
