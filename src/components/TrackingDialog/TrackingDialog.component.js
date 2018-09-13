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

TrackingDialog.propTypes = {
  dialogVisible: PropTypes.bool,
  acceptTracking: PropTypes.func,
  denyTracking: PropTypes.func,
}

TrackingDialog.defaultProps = {
  dialogVisible: false,
  acceptTracking: () => console.log('TrackingDialog: no acceptTracking action passed as prop'),
  denyTracking: () => console.log('TrackingDialog: no denyTracking action passed as prop'),
}


export default TrackingDialog
