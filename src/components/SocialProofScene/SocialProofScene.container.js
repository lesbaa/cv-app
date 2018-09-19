import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import {
  hideSkillDetailModal,
  showSkillDetailModal,
  fetchReferences,
  setIsFetching,
  setIsNotFetching,
} from '~/actionCreators'
import { SOFT_SKILLS } from '~/constants/skillTypes'
import withPixi from '~/HOCs/withPixi'
import DevSkillsScene from './SocialProofScene.component'

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
  fetchReferences,
}, dispatch)

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPixi,
)

export default enhance(DevSkillsScene)
