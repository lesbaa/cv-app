import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchSkills,
} from '~/actionCreators'
import { DEV_SKILLS } from '~/constants/skillTypes'
import DevSkillsScene from './DevSkillsScene.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
  },
  skills,
}) => ({
  modalIsVisible,
  skills: skills[DEV_SKILLS],
})

const mapDispatchToProps = dispatch => bindActionCreators({
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchSkills,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevSkillsScene)
