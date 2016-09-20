import { connect } from 'react-redux'

import Application from './'
import { updateTimepickerRefreshInterval } from '../../actions/timepicker'
import {
  getApplication,
  getTimepickerRefreshInterval
} from '../../reducers'

const mapStateToProps = (state, props) => ({
  appMeta: getApplication(state, props.params.id),

  // TODO Maybe move this into reselect and process entire state
  // we want to give to plugins?
  core: {
    refreshInterval: getTimepickerRefreshInterval(state)
  }
})

export default connect(
  mapStateToProps,
  {
    updateTimepickerRefreshInterval
  }
)(Application)
