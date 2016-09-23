import { connect } from 'react-redux';

import AppView from './AppView';
import { updateTimepickerRefreshInterval } from '../../../actions/timepicker';
import {
  getApplication,
  getTimepickerRefreshInterval
} from '../../../reducers';

const mapStateToProps = (state, props) => ({
  pluginId: props.params.pluginId,
  appMeta: getApplication(state, props.params.pluginId, props.params.appId),

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
