import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
} from '~/actionCreators/modals'
import DevSkillsScene from './DevSkillsScene.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
  },
}) => ({
  modalIsVisible,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  hideSkillDetailModal,
  showSkillDetailModal,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevSkillsScene)
