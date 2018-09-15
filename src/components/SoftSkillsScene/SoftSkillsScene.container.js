import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchSkills,
  setIsFetching,
  setIsNotFetching,
} from '~/actionCreators'
import { SOFT_SKILLS } from '~/constants/skillTypes'
import withPixi from '~/HOCs/withPixi'
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
  setIsFetching,
  setIsNotFetching,
  showDetailModal: ({ id }) => showSkillDetailModal({
    id,
    skillType: SOFT_SKILLS,
  }),
  fetchSkills,
}, dispatch)

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPixi,
)

export default enhance(DevSkillsScene)
