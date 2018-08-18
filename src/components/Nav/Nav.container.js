import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showInfoDialog } from '~/actionCreators'
import Nav from './Nav.component'

const mapDispatchToProps = dispatch => bindActionCreators({
  showInfoDialog,
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(Nav)
