import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import { fetchSkills } from '~/actionCreators'
import { UP_NEXT } from '~/constants/skillTypes'
import withPixi from '~/HOCs/withPixi'
import UpNextScene from './UpNextScene.component'

const mapStateToProps = ({
  skills,
}) => ({
  skills: Object.values(skills[UP_NEXT] || {}),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSkills,
}, dispatch)

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPixi,
)

export default enhance(UpNextScene)
