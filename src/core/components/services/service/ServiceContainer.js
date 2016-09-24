import { connect } from 'react-redux';

import ServiceView from './ServiceView';
import {
  updateTimepickerRefreshInterval
} from '../../../actions/timepicker';
import {
  registerApi
} from '../../../actions/apis';
import {
  getTimepickerRefreshInterval
} from '../../../reducers';

const mapStateToProps = (state, props) => ({
  // TODO Maybe move this into reselect and process entire state
  // we want to give to plugins?
  core: {
    refreshInterval: getTimepickerRefreshInterval(state)
  }
});

export default connect(
  mapStateToProps,
  {
    updateTimepickerRefreshInterval,
    registerApi
  }
)(ServiceView);
