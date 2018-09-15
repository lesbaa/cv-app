import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'ramda'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchSkills,
  setIsFetching,
  setIsNotFetching,
} from '~/actionCreators'
import { DEV_SKILLS } from '~/constants/skillTypes'
import withPixi from '~/HOCs/withPixi'
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
  setIsFetching,
  setIsNotFetching,
  showDetailModal: ({ id }) => showSkillDetailModal({
    id,
    skillType: DEV_SKILLS,
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
