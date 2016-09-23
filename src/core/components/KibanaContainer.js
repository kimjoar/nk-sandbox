import { connect } from 'react-redux';

import KibanaView from './KibanaView';
import { getPlugins } from '../reducers';

const mapStateToProps = state => ({
  plugins: getPlugins(state)
});

export default connect(
  mapStateToProps,
  {},
  null,
  {
    pure: false
  }
)(KibanaView);
