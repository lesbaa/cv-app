import { connect } from 'react-redux'
import Dialog from '~/components/Dialog'

const mapStateToProps = ({
  infoDialog: {
    isVisible,
    message,
  },
}) => ({
  isVisible,
  message,
})

export default connect(mapStateToProps)(Dialog)
