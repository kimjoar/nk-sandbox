import { connect } from 'react-redux'

import AppView from './AppView'
import { getApplications } from '../reducers'

const mapStateToProps = state => ({
  applications: getApplications(state)
})

export default connect(
  mapStateToProps,
  {},
  null,
  {
    pure: false
  }
)(AppView)
