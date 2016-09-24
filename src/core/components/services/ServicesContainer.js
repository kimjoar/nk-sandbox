import { connect } from 'react-redux';

import ServicesView from './ServicesView';
import { getServices } from '../../reducers'

const mapStateToProps = state => ({
  services: getServices(state)
});

export default connect(
  mapStateToProps,
  {}
)(ServicesView);
