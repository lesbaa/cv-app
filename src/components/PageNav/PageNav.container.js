import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import PageNav from './PageNav.component'

const mapStateToProps = ({
  slides,
}) => ({
  slides,
})

const enhance = compose(
  withRouter,
  connect(mapStateToProps)
)

export default enhance(PageNav)
