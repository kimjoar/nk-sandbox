import { connect } from 'react-redux';

import AppView from './AppView';
import {
  updateTimepickerRefreshInterval
} from '../../../actions/timepicker';
import {
  getApplication,
  getTimepickerRefreshInterval
} from '../../../reducers';

function getApplicationWithPlugin(state, pluginId, appId) {
  const app = getApplication(state, pluginId, appId)
  return {
    ...app,
    pluginId
  }
}

const mapStateToProps = (state, props) => ({
  appMeta: getApplicationWithPlugin(state, props.params.pluginId, props.params.appId),

  // TODO Maybe move this into reselect and process entire state
  // we want to give to plugins?
  core: {
    refreshInterval: getTimepickerRefreshInterval(state)
  }
});

export default connect(
  mapStateToProps,
  {
    updateTimepickerRefreshInterval
  }
)(AppView);
