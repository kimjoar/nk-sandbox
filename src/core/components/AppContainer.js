import { connect } from 'react-redux'

import App from './App'
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
)(App)
