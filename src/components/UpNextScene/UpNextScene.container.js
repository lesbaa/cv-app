import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSkills } from '~/actionCreators'
import { UP_NEXT } from '~/constants/skillTypes'
import UpNextScene from './UpNextScene.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
  },
  skills,
}) => ({
  modalIsVisible,
  skills: skills[UP_NEXT],
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSkills,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpNextScene)
