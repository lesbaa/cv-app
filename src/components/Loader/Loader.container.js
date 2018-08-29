import { connect } from 'react-redux'

import Loader from './Loader.component'

const mapStateToProps = ({
  network: {
    isFetching,
  },
}) => ({
  isFetching,
})

export default connect(mapStateToProps)(Loader)
