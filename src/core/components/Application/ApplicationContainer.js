import { connect } from 'react-redux'

import Application from './'
import { getApplication } from '../../reducers'

const mapStateToProps = (state, props) => ({
  appMeta: getApplication(state, props.params.id)
})

export default connect(
  mapStateToProps,
  {}
)(Application)
