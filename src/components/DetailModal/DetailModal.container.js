import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showSkillDetailModal,
  hideSkillDetailModal,
} from '~/actionCreators/modals.js'
import DetailModal from './DetailModal.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
    modalTitle,
    modalContent,
    originX,
    originY,
  },
}, ownProps) => ({
  modalIsVisible,
  modalTitle,
  modalContent,
  originX,
  originY,
  ...ownProps,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  showSkillDetailModal,
  hideSkillDetailModal,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailModal)

