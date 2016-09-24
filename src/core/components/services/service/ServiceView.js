import React, { Component } from 'react';
import deepEqual from 'deep-equal';

import ServiceAdapter from './ServiceAdapter';
import ServiceBase from './ServiceBase';

const createServiceClass = service => service.factory(ServiceBase)

class ServiceView extends Component {
  state = {
    // The currently running service
    Service: createServiceClass(this.props.serviceMeta)
  };

  // TODO Remove when React Router doesn't unnecessarily update `params`
  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state);
  }

  render() {
    const {
      serviceMeta,
      core,
      registerApi,
      updateTimepickerRefreshInterval
    } = this.props;
    const { Service } = this.state;

    // Build up the api that we make available to plugins
    const kibana = {
      timepicker: {
        updateRefreshInterval: updateTimepickerRefreshInterval
      }
    };

    return <ServiceAdapter
      key={ serviceMeta.id }
      Service={ Service }
      core={ core }
      kibana={ kibana }
      registerApi={ api => registerApi(serviceMeta.id, api) } />
  }
}

export default ServiceView

