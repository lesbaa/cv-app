import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  acceptTracking,
  denyTracking,
} from '~/actionCreators'
import TrackingDialog from './TrackingDialog.component'

const mapStateToProps = ({
  tracking: {
    dialogVisible,
  },
}) => ({
  dialogVisible,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  acceptTracking,
  denyTracking,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackingDialog)
