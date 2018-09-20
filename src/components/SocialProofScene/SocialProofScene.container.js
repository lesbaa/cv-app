import { connect } from 'react-redux'
import { compose } from 'ramda'
import { bindActionCreators } from 'redux'
import {
  fetchReferences,
  setIsFetching,
  setIsNotFetching,
} from '~/actionCreators'
import withPixi from '~/HOCs/withPixi'
import SocialProofScene from './SocialProofScene.component'

const mapStateToProps = ({
  detailsModal: {
    modalIsVisible,
  },
  references,
}) => ({
  modalIsVisible,
  references,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setIsFetching,
  setIsNotFetching,
  fetchReferences,
}, dispatch)

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPixi,
)

export default enhance(SocialProofScene)
