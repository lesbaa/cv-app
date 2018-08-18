import { connect } from 'react-redux'
import InfoDialog from './InfoDialog.component'

const mapStateToProps = ({
  infoDialog: {
    isVisible,
    message,
  },
}) => ({
  isVisible,
  message,
})

export default connect(mapStateToProps)(InfoDialog)
