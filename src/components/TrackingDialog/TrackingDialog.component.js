import React from 'react'
import PropTypes from 'prop-types'
import AcceptIcon from 'react-feather/dist/icons/thumbs-up'
import DenyIcon from 'react-feather/dist/icons/thumbs-down'
import Dialog from '~/components/Dialog'
import styles from './TrackingDialog.styles'

const TrackingDialog = ({
  dialogVisible,
  acceptTracking,
  denyTracking,
}) => (
  <Dialog
    message="I have a tiny bit of analytics to see how people use this cv. You cool with that?"
    isVisible={dialogVisible}
  >
    <button
      className="button accept"
      onClick={acceptTracking}
    >
      <AcceptIcon />
    </button>
    <button
      className="button"
      onClick={denyTracking}
    >
      <DenyIcon />
    </button>
    <style jsx>{styles}</style>
  </Dialog>
)

TrackingDialog.defaultProps = {

}

TrackingDialog.propTypes = {

}

export default TrackingDialog
