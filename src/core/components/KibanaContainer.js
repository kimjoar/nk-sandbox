import { connect } from 'react-redux';

import KibanaView from './KibanaView';
import { getApplications } from '../reducers';

const mapStateToProps = state => ({
  applications: getApplications(state)
});

export default connect(
  mapStateToProps,
  {},
  null,
  {
    pure: false
  }
)(KibanaView);
