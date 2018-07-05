import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchSkills,
} from '~/actionCreators'
import { SOFT_SKILLS } from '~/constants/skillTypes'
import DevSkillsScene from './SoftSkillsScene.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
  },
  skills,
}) => ({
  modalIsVisible,
  skills: skills[SOFT_SKILLS],
})

const mapDispatchToProps = dispatch => bindActionCreators({
  hideSkillDetailModal,
  showDetailModal: ({ id }) => showSkillDetailModal({
    id,
    skillType: SOFT_SKILLS,
  }),
  fetchSkills,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevSkillsScene)
