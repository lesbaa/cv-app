import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  showSkillDetailModal,
  hideSkillDetailModal,
} from '~/actionCreators'
import DetailModal from './DetailModal.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
    modalTitle,
    modalContent,
    skillId,
    originX,
    originY,
  },
}) => ({
  modalIsVisible,
  modalTitle,
  modalContent,
  originX,
  originY,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  showSkillDetailModal,
  hideSkillDetailModal,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailModal)

